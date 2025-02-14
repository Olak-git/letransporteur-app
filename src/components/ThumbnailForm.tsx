import useThumbnail from '@/hooks/useThumbnail'
import React, { useRef } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import ErrorInput from './error'
import Icon from './ui/icon'
import Image from 'next/image';
import { API_STORAGE } from '@/helpers/request'

export default function ThumbnailForm ({
    label,
    _id,
    name,
    error,
    source,
    onChange,
    optional,
    className
}: {
    label?: string,
    _id?: string,
    name: 'logo' | 'rccm_image' | 'ifu_image' | 'sales_point_image' | string,
    error: string | null,
    source?: string | null,
    onChange: (a: string, b: any) => void,
    optional?: boolean,
    className?: string
}) {

    const { fileChange, source: imageSource, clearSources } = useThumbnail({ multiple: false })
    const inputRef = useRef(null)

    const onHandleClearSource = function () {
        onChange(name, null)
        clearSources()
        // @ts-ignore
        inputRef.current.value = ''
    }
    const onHandleChangeImage = function (e: any) {
        const { name, files } = e.target
        onChange(name, files[0])
        fileChange(e)
    }

    return (
        <div className={`grid gap-2 ${className || ''}`}>
            {label && (
                <Label htmlFor={_id}>{label}{optional && (<span className='text-neutral-400'> (optionnel)</span>)}: </Label>
            )}
            <Input
                ref={inputRef}
                type='file'
                accept='image/*'
                name={name}
                id={_id}
                onChange={onHandleChangeImage}
            />
            <ErrorInput error_message={error} />
            {imageSource ? (
                <div className="relative">
                    <Icon.X
                        onClick={onHandleClearSource}
                        className='absolute top-0 right-0 hover:text-red-700'
                    />
                    <Image
                        loading='eager'
                        src={imageSource}
                        alt=''
                        className="max-w-[100px] max-h-[100px] w-auto h-auto border rounded-lg"
                        width={1000}
                        height={1000}
                        priority
                    />
                </div>
            ) : source ? (
                <Image
                    loading='eager'
                    src={`${API_STORAGE}/${source}`}
                    alt='Fichier'
                    className="max-w-[100px] max-h-[100px] w-auto h-auto border rounded-lg"
                    width={1000}
                    height={1000}
                    priority
                />
            ) : null}
        </div>
    )
}


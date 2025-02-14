import { PaginateLinkType } from '@/helpers/type.models'
import React from 'react'
import { Button } from './ui/button'
import ReactPaginate from 'react-paginate'

interface PaginatorProps {
    links: PaginateLinkType[]|null,
    action:(a:string, b?:boolean) => void,
    concat?: boolean,
    pageRange?: number
}

export default function PaginatorLinks({
    links,
    action,
    concat
} : PaginatorProps) {
    const L = links?.length
    return (
        <div className=''>
            <ul className="flex justify-end gap-x-1">
            {links?.map((lk, i:number) => 
                <li key={i.toString()} className=''>
                    <Button variant='outline' className={`w-5 h-5 ${lk.active?'cursor':''}`} disabled={lk.active} onClick={()=>action(lk.url, concat)}>
                        {i==0 ? (
                            <>&laquo;</>
                        ) : i==((L||0)-1) ? (
                            <>&raquo;</>
                        ) : (
                            lk.label
                        )}
                    </Button>
                </li>
            )}
            </ul>
        </div>
    )
}

export function Paginator({
    links,
    action,
    concat,
    pageRange
} : PaginatorProps) {
    return (
        links!==null ? (
            <div className='flex justify-end'>
            <ReactPaginate
                className='flex gap-x-1'
                breakLabel="..."
                nextLabel={(
                    <Button variant='ghost' className={`w-5 h-5`} disabled={links[0].active||links[links.length-1].url==null} onClick={()=>{
                        if(links[links.length-1].url) {
                            action(links[links.length-1].url, concat)
                        }
                    }}>
                        &raquo;
                    </Button>
                )}
                // onPageChange={handlePageClick}
                pageRangeDisplayed={pageRange??5}
                pageCount={links.length}
                previousLabel={(
                    <Button variant='ghost' className={`w-5 h-5`} disabled={links[0].active||links[0].url==null} onClick={()=>{
                        if(links[0].url) {
                            action(links[0].url, concat)
                        }
                    }}>
                        &laquo;
                    </Button>
                )}
                pageLabelBuilder={(page:number) => (page!==1 && page!==links.length) && (
                    <Button variant='outline' className={`w-5 h-5`} disabled={links[page-1].active} onClick={()=>action(links[page-1].url, concat)}>
                        {links[page-1].label}
                    </Button>
                )}
                renderOnZeroPageCount={null}
            />
            </div>
        ) : null
    )
}

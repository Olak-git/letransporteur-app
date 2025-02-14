import React, { PropsWithChildren } from 'react'
import { Button } from './ui/button'
import * as Icon from 'lucide-react'
import { Separator } from './ui/separator'

type PaginationProps = PropsWithChildren<{
    totalItems: number,
    nbItems: number,
    prev_page_url: string|null,
    next_page_url: string|null,
    previousAction: any,
    nextAction: any,
    loader?: boolean,
    useIcon?: boolean
}>
export default function Pagination({
    totalItems,
    nbItems,
    prev_page_url,
    next_page_url,
    previousAction,
    nextAction,
    loader,
    useIcon
}: PaginationProps) {

    // const SHOW = !(!prev_page_url && !next_page_url);
    const SHOW = totalItems>0;

    return (
        SHOW ? (
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    <span className="dark:text-primary-ground">{nbItems}</span> sur <span className="dark:text-primary-ground">{totalItems}</span>
                    {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
                    {/* {table.getFilteredRowModel().rows.length} row(s) selected. */}
                </div>
                <div className="flex items-center gap-x-1">
                    {loader && (
                        <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <div className="flex flex-row items-center gap-x-2">
                        <button 
                            type="button" 
                            onClick={prev_page_url?previousAction:undefined}
                            disabled={!prev_page_url}
                            style={{  }}
                        >
                            {useIcon ? (
                                <Icon.ChevronLeft className={`${!prev_page_url?'text-neutral-300 dark:text-neutral-700':'dark:text-primary-ground'}`} />
                            ) : (
                                'Previous'
                            )}
                        </button>
                        <Separator orientation='vertical' className='h-4' />
                        <button 
                            type="button" 
                            onClick={next_page_url?nextAction:undefined}
                            disabled={!next_page_url}
                            style={{  }}
                        >
                            {useIcon ? (
                                <Icon.ChevronRight className={`${!next_page_url?'text-neutral-300 dark:text-neutral-700':'dark:text-primary-ground'}`} />
                            ) : (
                                'Next'
                            )}
                        </button>
                        {/* <Button
                            variant="outline"
                            size="sm"
                            onClick={prev_page_url?previousAction:undefined}
                            disabled={!prev_page_url}
                        >
                            {useIcon ? (
                                <Icon.ChevronLeft className={`${!prev_page_url?'text-neutral-300':''}`} />
                            ) : (
                                'Previous'
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={next_page_url?nextAction:undefined}
                            disabled={!next_page_url}
                        >
                            {useIcon ? (
                                <Icon.ChevronRight className={`${!next_page_url?'text-neutral-300':''}`} />
                            ) : (
                                'Next'
                            )}
                        </Button> */}
                    </div>
                </div>
            </div>
        ) : null
    )
}

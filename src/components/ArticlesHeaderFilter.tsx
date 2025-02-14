import React from 'react'
import { BSlideImage } from './Carous'
import FilterForm from './FilterForm'
import SearchForm from './SearchForm'

interface ArticlesHeaderFilterProps {
    images: Array<string>,
    placeholder: string,
    setSearch: (a:string)=>void,
    setCountry: (a:string)=>void,
    setCity?: (a:string)=>void,
    setAddress?: (a:string)=>void,
    onHandleSubmit: (e:any)=>void,
    loader: boolean,
    trigger?: string,
    table?: 'transports'|'cinemas'|'events'

    filter?: (a:any)=>void,
    setCategorySelected?: (a:string)=>void,
    
    hiddenCategory?: boolean,
    searchContentClass?: string,
}
export default function ArticlesHeaderFilter({
    images,
    placeholder,
    setSearch,
    setCountry,
    setCity,
    setAddress,
    onHandleSubmit,
    loader,
    trigger,
    table,

    filter,
    setCategorySelected,
    hiddenCategory,
    searchContentClass,
}: ArticlesHeaderFilterProps) {
    return (
        <>
                {/* <div className="-mt-[57px] flex border-b bg-neutral-300/100 h-[380px] bg-no-repeat bg-center bg-[length:100%_100%]" style={{ backgroundImage: `url(${API_URL}/storage/${transports[0]?.company?.logo})` }}>
                    <div className="py-6 px-4 w-full md:w-3/4 mx-auto self-center backdrop-sepia-0 bg-white/30 sticky top-[70px] md:w-11/12">
                        <FilterForm filter={filter} setCategorySelected={setCategorySelected} hiddenCategory searchContentClass='py-6' />
                    </div>
                </div> */}
                <div className="relative border-b bg-neutral-300/100 -mt-[49px]">
                    <BSlideImage 
                        itms={images}
                    />

                    <div className="flex absolute w-full h-full top-0 left-0 bg-white/30 dark:bg-black/20 z-10 flex     flex-col justify-center" style={{  }}>

                        <div className={`w-full mb-2 border-0 border-red-300`}>
                            <h1 className="text-center text-black dark:text-white font-bold text-3xl">{trigger}</h1>
                        </div>

                        <div className="py-6 px-4 w-full md:w-3/4 mx-auto self-center backdrop-sepia-0 bg-white/30 dark:bg-black/30 sticky top-[70px] md:w-11/12">
                            
                            <SearchForm 
                                placeholder={placeholder}
                                editSearchText={setSearch}
                                editCountry={setCountry} 
                                editCity={setCity}
                                editAddress={setAddress}
                                onPress={onHandleSubmit} 
                                loader={loader}
                                table={table}
                            />
                        </div>

                        {/* <div className="py-6 px-4 w-full md:w-3/4 mx-auto self-center backdrop-sepia-0 bg-white/30 dark:bg-black/30 sticky top-[70px] md:w-11/12">
                            {trigger && (
                                <div className={`absolute w-full left-0 ${table=='transports'?'bottom-[180px]':'bottom-[110px]'} border-0 border-red-300`}>
                                    <h1 className="text-center text-black dark:text-white font-bold text-3xl">{trigger}</h1>
                                </div>
                            )}
                            
                            <SearchForm 
                                placeholder={placeholder}
                                editSearchText={setSearch}
                                editCountry={setCountry} 
                                onPress={onHandleSubmit} 
                                loader={loader}
                                table={table}
                            />
                        </div> */}
                    </div>
                </div>
        </>
    )
}

                            {/* <FilterForm 
                                filter={filter} 
                                setCategorySelected={setCategorySelected} 
                                onHandleSubmit={onHandleSubmit}
                                hiddenCategory 
                                searchContentClass='py-6' 
                            /> */}

import React, { useState } from 'react'
import Urls from '../assests/Urls'
import ProductPage from './ProductPage'

function Others() {
    const[currentCategory, setCurrentCategory] = useState("tv-shows");
    return (
        <>
            <div className='mt-[15vh] flex justify-around items-center'>
                <button className='p-3  bg-amber-700 text-white rounded font-bold text-3xl' onClick={()=>setCurrentCategory("tv-shows")}>TV-Shows</button>
                <button className='p-3  bg-amber-700 text-white rounded font-bold text-3xl' onClick={()=>setCurrentCategory("top-picks")}>Top-Pics</button>
                <button className='p-3  bg-amber-700 text-white rounded font-bold text-3xl' onClick={()=>setCurrentCategory("new-releases")}>New-Releases</button>
            </div>
            <div className='mt-[5vh]'>
            <ProductPage URL={Urls[currentCategory]} Heading={currentCategory.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())} />

            </div>

           
            
        </>
    )
}

export default Others

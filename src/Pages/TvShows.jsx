import React from 'react'
import ProductPage from './ProductPage'
import Urls from '../assests/Urls'

function TvShows() {
    return (
        <div className='mt-[15vh]'>
            <ProductPage URL={Urls["tv-shows"]} Heading={"TV-SHOWS"}></ProductPage>
        </div>
    )
}

export default TvShows

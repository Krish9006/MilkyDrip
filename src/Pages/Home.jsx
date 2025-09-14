import React from 'react'
import Carousel from '../Components/Carousel'
import CardCarousel from './CardCarousel'
import ProductPage2 from './ProductPage2'
import Urls from '../assests/Urls'
function Home() {
    return (
        <>
            <section>
                <div className='w-full h-[90vh]'>
                    <Carousel></Carousel>
                </div>
                <div>
                    <CardCarousel></CardCarousel>
                </div>
                <div className='border-t-gray-300 mt-15'>
                    
                    <ProductPage2 URL={Urls['new-releases']} Heading={"18$ new-releases!"}></ProductPage2>
                </div>

                <div className='border-t-gray-300 mt-15'>
                    
                    <ProductPage2 URL={Urls['top-picks']} Heading={"top-picks!"}></ProductPage2>
                </div>
            </section>
        </>
    )
}

export default Home

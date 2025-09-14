import React from 'react'
import Carousel from '../Components/Carousel'
import CardCarousel from './CardCarousel'
import ProductPage2 from './ProductPage2'
import ProductPage from './ProductPage'
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
                    <div className=''>
                        <ProductPage URL={Urls.horror} Heading={"Horror"}></ProductPage>
                    </div>
                </div>

                
            </section>
        </>
    )
}

export default Home

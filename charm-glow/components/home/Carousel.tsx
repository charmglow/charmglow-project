import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import Link from 'next/link';

const slider = [

    {
        title: "Necklaces",
        url: "slide8.jpg"
    },
    {
        title: "Bracelets",
        url: "slide7.jpg"
    },
    {
        title: "Personalized Jewelry",
        url: "slide6.jpg"
    },
    {
        title: "Luxury Jewelry",
        url: "slide5.jpg"
    },
]

const Carousel = () => {
    return (
        <div className='carousel'>
            <div>
                <div className='carousel-content'>
                    <span>discover</span>
                    <h1>Charm Glow Jewelry</h1>
                    <hr />
                    <p>Discover Timeless Elegance: Explore Our Exquisite Handcrafted Jewelry Collection for Every Occasion</p>
                    <Link className='slider-btn' href="/products">EXPLORE MORE</Link>
                </div>
            </div>

            <Swiper
                className='myswiper'
                modules={[Pagination, EffectCoverflow, Autoplay]}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 3,
                    slideShadows: true
                }}
                loop={true}
                pagination={{ clickable: true }}

                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 2
                    },
                    1560: {
                        slidesPerView: 3
                    },
                }}

            >
                {
                    slider.map((data, index) => (
                        <SwiperSlide style={{ backgroundImage: `url(${data.url})` }} className="myswiper-slider" key={index}>
                            <div>
                                <h2>{data.title}</h2>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Carousel
/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react';
import { Button, Carousel, Typography } from 'antd';
import { useRouter } from 'next/navigation';


const { Title, Text } = Typography;

const Slider: React.FC = () => {
    const { push } = useRouter();
    return (

        <Carousel autoplay>
            <div>
                <div className='h-[80vh] relative flex flex-start bg-orange-100'>
                    <img src='/slide1.png' alt="slide1" className='h-full object-fill' />
                    <div className='absolute h-full w-full flex justify-center items-center'>
                        <div className='h-full w-full flex flex-col '>
                            <div className='h-full w-full flex flex-col justify-center items-center max-md:justify-center max-md:items-end'>
                                <Title level={4} className='uppercase max-md:hidden'>
                                    Elevate Style with Charm Glow
                                </Title>
                                <Text className='pt-3 text-base max-md:hidden' italic>
                                    Crafted with Precision and Passion.  A World of Exquisite Gemstones
                                </Text>
                                <Button type="primary" size='middle' className='bg-[#876553] mt-4' onClick={() => push("/products")}>
                                    SHOP NOW
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='h-[80vh] relative flex flex-start bg-red-50'>
                    <img src='/slide3.png' alt="slide3" className='h-full object-fill' />
                    <div className='absolute h-full w-full flex justify-center items-center'>
                        <div className='h-full w-full flex flex-col justify-center items-center'>
                            <div className='h-full w-full flex flex-col justify-center items-center max-md:justify-center max-md:items-end'>
                                <Title level={4} className='uppercase max-md:hidden'>
                                    Elevate Style with Charm Glow
                                </Title>
                                <Text className='pt-3 text-base max-md:hidden' italic>
                                    Crafted with Precision and Passion.  A World of Exquisite Gemstones
                                </Text>
                                <Button type="primary" size='middle' className='bg-[#876553] mt-4' onClick={() => push("/products")}>
                                    SHOP NOW
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Carousel>
    )
};

export default Slider;
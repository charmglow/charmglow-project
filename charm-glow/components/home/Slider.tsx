/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button, Carousel, Flex, Typography } from 'antd';


const { Title, Text } = Typography;

const Slider: React.FC = () => (
    <Carousel autoplay>
        <div>
            <div className='h-[80vh] relative flex flex-start bg-red-50'>
                <img src='/slide1.png' alt="slide1" className='h-full object-fill' />
                <div className='absolute h-full w-full flex justify-center items-center'>
                    <div className='h-full w-full flex flex-col '>
                        <div className='h-full w-[90%] flex flex-col justify-center items-center max-md:justify-center max-md:items-end'>
                            <Title level={4} className='uppercase max-md:hidden'>
                                Elevate Style with Charm Glow
                            </Title>
                            <Text className='pt-3 text-base max-md:hidden' italic>
                                Crafted with Precision and Passion.
                            </Text>
                            <Text className='pb-3 text-base max-md:hidden' italic>
                                A World of Exquisite Gemstones
                            </Text>
                            <Button type="primary" size='middle' className='bg-[#876553]'>
                                SHOP NOW
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='h-[80vh] relative flex flex-start bg-stone-200'>
                <img src='/slide3.png' alt="slide3" className='h-full object-contain max-md:object-contain' />
                <div className='absolute h-full w-full flex justify-center items-center'>
                    <div className='h-full w-full flex flex-col '>
                        <div className='h-full w-[90%] flex flex-col justify-center items-center max-md:justify-center max-md:items-end'>
                            <Title level={4} className='uppercase max-md:hidden'>
                                Elevate Style with Charm Glow
                            </Title>
                            <Text className='pt-3 text-base max-md:hidden' italic>
                                Crafted with Precision and Passion.
                            </Text>
                            <Text className='pb-3 text-base max-md:hidden' italic>
                                A World of Exquisite Gemstones
                            </Text>
                            <Button type="primary" size='middle' className='bg-[#876553]'>
                                SHOP NOW
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Carousel>
);

export default Slider;
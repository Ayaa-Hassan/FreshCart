 
import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import {  useQuery } from 'react-query';
import { Oval } from 'react-loader-spinner';
import { RiFireLine } from "react-icons/ri";
import { Helmet } from 'react-helmet';






export default function CategorySlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        arrows: false
    };

    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories') 
    };
    const { data, isLoading } = useQuery('categorySlider', getAllCategories, {
         refetchOnMount:false
     })

    if (isLoading) {
        return <div className=" d-flex w-100 my-auto justify-content-center align-items-center">
            <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    
}


    return <>
        <Helmet>
            <title>Categories</title>
            
        </Helmet>
        <h4 className='fw-normal my-3 ms-4'><RiFireLine className='min-color' />Shop Popular Categories </h4>
        <Slider {...settings}>
            
            {data?.data.data.map(function (category, idx) {
                return <div key={idx}>
                    <img style={{ width: '100%', height: "200px" }} src={category.image} alt="slider product" />
                    <h6 className='text-center fw-normal mt-2 mb-3'>{category.name.split(' ').slice(0, 1).join(" ")}</h6>

                </div>
                
            })
           }

          
           


        </Slider>
    </>
}



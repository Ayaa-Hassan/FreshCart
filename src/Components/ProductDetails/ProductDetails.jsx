import axios from "axios";
import React, { useContext, useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import { Oval, ThreeDots } from 'react-loader-spinner';

export default function ProductDetails() {
  const { id } = useParams();
 const [loader, setLoader] = useState(false);


  const { addProductToCart  } = useContext(cartContext);

  async function addProduct(id) {
    setLoader(true)
   const res = await addProductToCart (id);
    
    if (res.status === "success") {
      toast.success(res.message, {

        duration: 1500,


      })
    } else {
      toast.error('please try again', {
        duration: 1500,
      })
    }

    setLoader(false)
  };






 

  function getIdProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isLoading } = useQuery("getId", getIdProductDetails);

  if (isLoading) {
    return (
      <div className="  d-flex w-100 my-5 py-5  justify-content-center align-items-center">
        <div className=" my-5 py-5 ">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=" container">
        <div className="row my-5 py-5 shadow-lg bg-light ">
          <div className="col-md-4 text-center ">
            <figure className="p-5">
              <img
                src={data.data.data.imageCover}
                alt={data.data.data.title}
                className="img-fluid"
              />
            </figure>
          </div>
          <div className="col-md-8  py-5 my-5 ">
            <div className="">
              <h5 className="my-3">{data.data.data.title}</h5>
              <p className=" text-muted my-3 p-3">
                {data.data.data.description}
              </p>
              <p className="my-3"> {data.data.data.category.name}</p>
              <div className="  w-75   ">
                <p>{data.data.data.price} EGP </p>
                <p>
                  <FaStar className=" text-warning me-1" />

                  {data.data.data.ratingsAverage}
                </p>
              </div>
              
              <div className="w-100 text-center d-flex justify-content-around">
                <button onClick={() => addProduct(data.data.data.id)} className=" btn cart text-white min-bg-color ">
                  {loader ? <>
                    <ThreeDots
                      visible={true}
                      height="40"
                      width="40"
                      color="#fff"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </> : '+ Add to cart'}
                </button>
              
              
                <button className=" btn cart text-white min-bg-color "><FaRegHeart size={20} />
                    Add to WishList
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

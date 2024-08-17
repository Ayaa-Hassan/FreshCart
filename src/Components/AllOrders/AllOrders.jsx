import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner';

export default function AllOrders() {

    
    const [userOrders, setUserOrders] = useState(null);

useEffect(() => {
    
    const res = jwtDecode(localStorage.getItem('tok'));

    getUserOrders(res.id)

}, []);

    async function getUserOrders(id) {
    try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      
        setUserOrders(data)

    } catch (error) {
        console.error(error);
        
    }
    
}
    
    
    if (userOrders === null) {
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
    


    return <>
        <div className="container py-5">
            <div className="row justify-content-center ">
                <h2 className='text-center '>All Orders</h2>
                {userOrders?.map(function (order,keay) {
                  return  <>
                        <div key={keay} className="col-md-12   m-3 p-5 shadow-lg  bg-light">
                          
                          <div className="card-body d-flex justify-content-between ">

                              <div className="  w-25 ">
                                  <p>
                                      <strong> Order Number: </strong> {keay + 1}


                                  </p>
                                  <p>
                                      <strong> phone : </strong> {order.shippingAddress.phone}


                                  </p>
                                  <p>
                                      <strong>Details : </strong> {order.shippingAddress.details}

                                  </p>

                                  <p>
                                      <strong>City : </strong>  {order.shippingAddress.city}

                                  </p>
                                  <p>
                                      <strong>Payment Method : </strong>  {order.paymentMethodType}
                                  </p>
                                    </div>
                              <div className=" w-75 text-end px-2  d-flex justify-content-between ">
                                  {order.cartItems?.map(function (item, idx) {
                                      return <>
                                          <div className="text-center " key={idx}>
                                              <div className="   ">
                                                  <img src={item.product.imageCover} alt="" className='w-50 py-3' />
                                              </div>
                                              <strong> Price: </strong> {item.price}
                                          </div>


                                      </>

                                  })}
                                      </div>

                                      
                                  </div>

                         
                        </div>
                    </> 
                })  }
            </div>
        </div>
        



    </>
}

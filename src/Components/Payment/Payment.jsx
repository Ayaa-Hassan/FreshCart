import axios from 'axios';
import React, { useContext } from 'react'
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
const naveFun= useNavigate()

    const { cartId, updateUi } = useContext(cartContext);





   async function confirmPayment() {
        const detailsValue = document.querySelector('#details').value;
        const phoneValue = document.querySelector('#phone').value;
        const cityValue = document.querySelector('#city').value;

        const shippingAddress = {
            "shippingAddress": {
                "details": detailsValue,
                "phone": phoneValue,
                "city": cityValue
            }
        }

try {
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, shippingAddress, {
        headers: {
            token: localStorage.getItem('tok')
        }
    });
   
    if (data?.status === "success") {
        toast.success('Order successfully initialized')
        updateUi()

        setTimeout(() => {
            naveFun('/allOrders')
        }, 800)


    } else {
        toast.error('Failed to initialize order')
        
    }
   
} catch (error) {
    console.error(error);
    
}


    
 }
    async function OnlinePayment() {
        const detailsValue = document.querySelector('#details').value;
        const phoneValue = document.querySelector('#phone').value;
        const cityValue = document.querySelector('#city').value;

        const shippingAddress = {
            "shippingAddress": {
                "details": detailsValue,
                "phone": phoneValue,
                "city": cityValue
            }
        }

try {
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, shippingAddress, {
        headers: {
            token: localStorage.getItem('tok')
        },
        params: {
            url: "http://localhost:3000"
            }
    });
    console.log(data); 
    updateUi()


    window.open(data.session.url, "_blank");
   

    
   return data
} catch (error) {
    console.error(error);
    
}


    
 }


    return <>
        <div className=" container py-5 my-5">
            <div className="row  ">
                <h2 className=' text-center mb-5'>Shipping</h2>
                <div className="col-md-4 mx-auto  shadow-lg bg-light">
                    
                    <div className="m-5">
                        <form action="">
                            <div className="form-group">
                                <label htmlFor="city"> City</label>
                                <input type="text" className="form-control my-3" id="city" placeholder="Type here" />
                                <label htmlFor="phone"> Phone</label>
                                <input type="tel" className="form-control my-3" id="phone" placeholder="Type here" />
                                <label htmlFor="details">Details</label>
                                <input type="text" className="form-control my-3" id="details" placeholder="Type here" />
                                 <button type='button' onClick={confirmPayment} className=' btn-min p-2 w-100 my-3'>Confirm Cash Payment</button>
                                 <button type='button' onClick={OnlinePayment} className=' btn-min p-2 w-100 my-3'>Confirm Online Payment</button>
                                
                            </div>
                        </form>
                    </div>

                </div>
            </div>
    </div>
    
    
    
    </>
}

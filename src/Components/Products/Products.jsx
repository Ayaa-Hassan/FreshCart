
import axios from 'axios'
import { FaStar } from 'react-icons/fa';
import { Oval } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { GiShoppingCart } from "react-icons/gi";
import { useContext } from 'react';
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';



export default function Products() {
  const { addProductToCart } = useContext(cartContext);
 

  async function addProduct(id) {
 
   const res = await addProductToCart(id);
   if (res?.status === "success") {
     toast.success(res.message, {
       
       duration: 1500,
       
       
     })
   } else {
     toast.error('please try again', {
       duration: 1500,
     })
    }
   
  }
  






  function allProducts() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/products');
 }
  const { isLoading, data } = useQuery('allProducts', allProducts)

   if (isLoading) {
    return <div className="  d-flex w-100 my-5 py-5  justify-content-center align-items-center">
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
  }


  return <>
    
    <div className=" container py-5  ">
      
      <div className="row gx-0 mb-5">
        <div className=" col-sm-9">
          <div className="">
            <HomeSlider />
          </div>
        </div>
        <div className=" col-sm-3">
          <div className="">
           
            <img style={{ width: '100%', height: '200px' }} src={require("../../images/sale-with-special-discount-vr-glasses_23-2150040378.jpg")} alt=" product" />
            <img style={{ width: '100%', height: '200px' }} src={require('../../images/creative-display-makeup-products_23-2150063088.jpg')} alt=" makeup product" />
          </div>
        </div>

</div>

      <div className=" mb-5 ">
        <CategorySlider />
</div>

      <div className="row my-3">
        {data?.data.data.map(function (product, idx) {
          return <div key={idx} className="col-md-3 text-center  ">
            <div className="">
            <Link to={`/productDetails/${product.id}`}>
                <div className="w-75  mx-auto  text-center shadow-lg rounded-top-3 mt-5">
                <img className=' h-75 w-100 rounded-3' src={product.imageCover} alt="product" />
                <p className='min-color fw-normal my-2'>{product.category.name}</p>
                <h6 className=' fw-semibold'>{product.title.split(' ').slice(0, 2).join(" ")}</h6>
                <div className=" d-flex justify-content-evenly">
                  <p>{product.price} EGP </p>
                  <p>
                    <FaStar className=' text-warning me-1' />

                    {product.ratingsAverage}
                  </p>
                  
                </div>
              
              </div>
            </Link>
              <button onClick={() => addProduct(product.id)} className='w-75 text-center   shadow-lg mb-4 btn-min  cart  mx-auto'> 
                <GiShoppingCart size={25}  />
              
              </button>
            </div>
          </div>

        })
        }



      </div>
    </div>
    





  </>
}



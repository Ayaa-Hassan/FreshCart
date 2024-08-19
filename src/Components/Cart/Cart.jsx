import React, { useContext } from 'react'
import { cartContext } from '../../Context/cartContext'
import { ImBin } from "react-icons/im";
import { Oval } from 'react-loader-spinner';
import { TiShoppingCart } from 'react-icons/ti';
import { TbReportMoney } from 'react-icons/tb';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';






export default function Cart() {
  const { numOfCartItems, cartProduct, totalCartPrice, DeleteProduct, updateCart, clearCart } = useContext(cartContext);
  
if (cartProduct === null) {
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
  if (cartProduct.length === 0) {
    return <>

      <div className=" container py-5">
        <div className=" text-center py-5 my-5 ">
          <h1 className="text-center my-5">Your Cart is Empty</h1>
          <button className='btn-min  p-2'><Link to={'/products'} >
            Products Page
          </Link></button>

        </div>
      </div>




    </>

  }
  
  
  
  
  
async function deleteItem(id) {
  const res = await DeleteProduct(id);
  if (res.status === "success") {
    toast.success('Product Removed Successfully',
      {
        duration: 1500,
      }
    )
    
  } else {
    toast.error('Failed to Remove Product', {
      duration: 1500,
    })
  }
}

  async function updateItemCount(id, count) {
    const res = await updateCart(id, count);

    if (res.status === "success") {
      toast.success('Product Quantity Updated Successfully',
        {
          duration: 1500,
        }
      )
      
    
  
    } else {
      toast.error('Failed to Update Product Quantity', {
        duration: 1500,
      })

    
    }
  
  
  }



  async function clearCartItems() {
    await clearCart();
  }





 
  
  return <>
    <Helmet>
      <title>Cart</title>
      

    </Helmet>
    <div className=" container py-5 my-5 " style={{ backgroundColor: '#eee' }}>
      
      <div className=" w-100 border-bottom pb-5  d-flex justify-content-between">
        <h2 className=' mx-5  text-center '> Shop Cart <TiShoppingCart size={30} /></h2>
        <button className=' mx-5 btn-min p-2' onClick={clearCartItems}> Clear Cart </button>
      </div>
      
      {cartProduct.map(function (product, idx) {
        return <div key={idx} className="row m-4 py-3 border-bottom border-3">
          <div className="col-sm-2">
            <div className="">
              <img src={product.product.imageCover} alt={product.product.title} className='w-100 ' />
            </div>
          </div>
          <div className=" col-sm-7">
            <div className=" pt-5 mx-3">
              <p> {product.product.title}</p>
              <p className=' min-color'>Price : {product.price } EPG</p>
              <button onClick={() => deleteItem(product.product.id)} className=' p-2 btn-min'>   Remove <ImBin size={20} className='min-color ' /></button>
            </div>
          </div>
          <div className="col-sm-2">
            <div className=" d-flex  pt-5 align-items-center">
              <button onClick={() => updateItemCount(product.product.id , product.count + 1)} className='btn-min p-2 '>+</button>
              <span className='mx-2'>{product.count }</span>
              <button onClick={() => updateItemCount(product.product.id, product.count - 1)} className='btn-min p-2  fw-bold'>-</button>
            </div>
          </div>
        </div>
      
      })}
    
      <div className=" w-100     d-flex justify-content-between   ">
        <div className=" w-50">
          <p className='  h3 fw-bold  '><TbReportMoney size={30} />  Total Price : {totalCartPrice} EPG</p>
          <p className=' mb-4    fw-bold' > Total Items : {numOfCartItems}</p>
        </div>
        <div className=" w-50  text-center my-auto">
          <Link to={"/payment"}>
            <button className='btn-min p-2 w-100' >Checkout</button>
          </Link>
        </div>
      </div>
    </div>

  </>
}

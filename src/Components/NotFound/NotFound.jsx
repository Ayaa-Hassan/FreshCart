import React from 'react'
import { Helmet } from 'react-helmet'
import errorImg from "../../images/monster-404-error-concept-illustration_114360-1899.jpg";
import { Link } from 'react-router-dom';
export default function NotFound() {
  return <>
    <Helmet>
      <title>404 - Page Not Found</title>

    </Helmet>
  
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 mx-auto">
          <div className=" w-75 text-center mx-auto">
            <div className=" ">
              <img src={errorImg} alt="404 error" className='w-100 p-5' />
            </div>
            <Link to={'/products'}>
              <button className=' p-3 btn-min-ho btn-min'> Back to Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  
  
  
  
  </>
  
}

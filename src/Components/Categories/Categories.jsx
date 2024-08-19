import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet'
import { Oval } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Categories() {


  function getAllCategories() {

    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");



  }
  const { isLoading, data } = useQuery('getAllCategories', getAllCategories)




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








  return  <>
    <Helmet>
      <title>Categories</title>
      <meta name="description" content="Categories page" />
      
      
    </Helmet>
    
 <div className=" container py-5">
      <div className="row g-3">
        {data?.data.data.map(function (item, idx) {
          return <>
            <div key={idx} className="col-md-4   px-5   py-4 mx-auto">
              
              <div className=" ">
                <div className=" card w-75 mx-auto   shadow-lg   text-center">
                  <div className=" card-img   ">
                    <img src={item.image} alt={item.name} className='w-100 img-fluid ' />
                  </div>
                  <div className=" card-body  border-top border-2   ">
                    <h5 className="card-title">{item.name}</h5>

                  </div>
                </div>
              </div>
            </div>
          </>
       })}
       
      </div>
</div>



 </>
}

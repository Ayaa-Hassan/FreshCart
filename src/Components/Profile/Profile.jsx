import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner';
import hello from "../../images/vecteezy_3d-kid-character-waving-hand-with-cute-happy-face_34918438.png";



export default function Profile() {
const [name, setName] = useState(null);
  useEffect(() => {

    const user = jwtDecode(localStorage.getItem('tok'));
    console.log(user);
    
    setName(user.name);

  },[])


  if (name === null) {
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



  return < >
    <div className=" ">

      <div className=" container">
        <div className="row my-5 mx-auto py-5 ">
          <div className="col-md-6 mx-auto  shadow-lg   my-5 py-5 bg-light  ">
            <div className="">
              <div className=" rounded-circle  w-50 text-center mx-auto mb-5">
                <img src={hello} alt="happy face" className='w-100' />
              </div>
              <h1 className="text-center">Welcome, <span className='min-color fw-bold h1 text-uppercase fst-italic'>{name}</span></h1>

           </div>

          </div>
        </div>
      </div>

  </div>
  
  
  </>
}

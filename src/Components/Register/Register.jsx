import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import {  ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let user = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: ''
  }

  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigateFun=useNavigate();

  async function submitFun(values) {
    setLoading(true);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      if (data.message === "success") {
        setSuccessMsg("Account has created Successful");
        setTimeout(() => {
          navigateFun('/login')
        },1500)
        
        
      }
    } catch (error) {
      

      setErrMsg(error.response.data.message);


    };
    setLoading(false);
  };





  const userObj = useFormik({
    initialValues: user,
    onSubmit: submitFun,
    validate: function validateFun(values) {
      setErrMsg(null);
      let errors = {}
      if (values.name.length < 2 || values.name.length > 10) { errors.name = 'Name must be from 2 characters to 10 characters' };
      if (values.email.includes('@') === false || values.email.includes('.') === false) { errors.email = 'Email invalid' };
      if (values.phone.match(/^(02)?01[0123][0-9]{9}$/)) { errors.phone = 'Phone invalid' };
      if (values.password.length < 6 || values.password.length > 12) { errors.password = 'Password must be from 6 characters to 12 characters' };
      if (values.password !== values.rePassword) { errors.rePassword = " Password and Re password doesn't match " };

      return errors;
      }



})



  return <>
    <Helmet>
      <title>Sign Up</title>
      
    </Helmet>
    <div className="container">
      <div className="row   my-5 shadow-lg  w-75 mx-auto">
         <div className="col-md-5 mx-auto my-5 ">
          <div className="img  m-5">
            <img src={require('../../images/signup.jpg')}  className='w-100 ' alt="signup png " />
            {errMsg ? <div className=" alert alert-danger  text-center my-5 w-100 ">{errMsg}</div> : ''}
            {successMsg ? <div className=" alert alert-success  text-center  my-5 w-100 ">{successMsg}</div> : ''}
          </div>
        </div>
        <div className="col-md-6 mx-auto my-5 ">
          <form onSubmit={userObj.handleSubmit}>
          
            <div className="form-group w-75">
              <h3 className='  text-success text-center'>
                <i className="fa-regular fa-pen-to-square text-success me-2"></i>
              Crate new account</h3>
              <label className='fw-normal text-success' htmlFor="name"><span className=' text-danger'>*</span>Name:</label>
              <input onBlur={userObj.handleBlur} onChange={userObj.handleChange} value={userObj.values.name} className='form-control my-2' id='name' type='text' name='name' placeholder='Enter your name' />
              {userObj.errors.name && userObj.touched.name ? <div className=" px-3 py-0 m-0 alert alert-danger">{userObj.errors.name}</div> : ""} 
              
              <label className='fw-normal text-success' htmlFor="em1ail"><span className=' text-danger'>*</span>Email:</label>
              <input onBlur={userObj.handleBlur} onChange={userObj.handleChange} value={userObj.values.email} className='form-control my-2' id='email' type='email' name='email' placeholder='Enter your email' />
              {userObj.errors.email && userObj.touched.email ? <div className=" px-3 py-0 m-0 alert alert-danger">{userObj.errors.email}</div> : ""}
              

              <label className='fw-normal text-success' htmlFor="password"><span className=' text-danger'>*</span>Password:</label>
              <input onBlur={userObj.handleBlur} onChange={userObj.handleChange} value={userObj.values.password} className='form-control my-2' id='password' type='password' name='password' placeholder='Enter password' />
              {userObj.errors.password && userObj.touched.password ? <div className=" px-3 py-0 m-0 alert alert-danger">{userObj.errors.password}</div> : ""} 
              

              <label className='fw-normal text-success' htmlFor="rePassword"><span className=' text-danger'>*</span>Re Password:</label>
              <input onBlur={userObj.handleBlur} onChange={userObj.handleChange} value={userObj.values.rePassword} className='form-control my-2' id='rePassword' type='password' name='rePassword' placeholder='Enter Re password' />
              {userObj.errors.rePassword && userObj.touched.rePassword ? <div className=" px-3 py-0 m-0 alert alert-danger">{userObj.errors.rePassword}</div> : ""} 
              

              <label className='fw-normal text-success' htmlFor="phone"><span className=' text-danger'>*</span>Phone</label>
              <input onBlur={userObj.handleBlur} onChange={userObj.handleChange} value={userObj.values.phone} className='form-control my-2' id='phone'  type='tel' name='phone' placeholder='Enter your phone number'/>
              {userObj.errors.phone && userObj.touched.phone ? <div className=" px-3 py-0 m-0 alert alert-danger">{userObj.errors.phone}</div> : ""}
              <div className="w-100 text-center">
                <button
                  disabled={userObj.isValid === false || userObj.dirty === false} type='submit' className='text-center w-25 mt-4 btn btn-success'
                >
                  {loading ? <ThreeDots
                    visible={true}
                    height="30"
                    width="40"
                    color="#fff"
                    radius="9"
                    ariaLabel="three-dots-loading"
                  /> : "  Signup "}
                </button>
               </div>
              
            
            </div>
          </form>
        </div>
       
      </div>
    </div>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  </>
}

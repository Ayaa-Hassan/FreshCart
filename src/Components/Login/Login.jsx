import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { authContext } from '../../Context/authentication';
import { Helmet } from 'react-helmet';


export default function Login() {
  const {  setToken } = useContext(authContext);
 
  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading]=useState(false)
  const navigateFun = useNavigate();
  let user = {
  
    email: '',
    password: '',
   
  }
  async function loginFun(values) {
   setLoading(true)
   try {
    const{ data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
     if (data.message === "success") {
       setSuccessMsg("Welcome back");

       localStorage.setItem('tok', data.token)
       
       setToken(data.token);
       

      
       setTimeout(()=>{
        navigateFun('/products')
      },1000)
         
      
     }
     
   } catch (error) {
    
     setErrMsg(error.response.data.message);
    
   }
   setLoading(false);
  };







  const userObj = useFormik({
    initialValues: user,
    onSubmit: loginFun,
    validate: function validateFun(values) {
      setErrMsg(null);
      let errors = {}
     
      if (values.email.includes('@') === false || values.email.includes('.') === false) { errors.email = 'Email invalid' };
      if (values.password.length < 6 || values.password.length > 12) { errors.password = 'Password must be from 6 characters to 12 characters' };
      
      return errors;
      }



})
  return <>
    <Helmet>
      <title>Login</title>
      

    </Helmet>

    <div className="container  ">
      {errMsg ? <div className=" alert alert-danger mx-auto  text-center mt-3 w-25 ">{errMsg}</div> : ''}
      {successMsg ? <div className=" alert alert-success  mx-auto text-center  mt-3 w-25 ">{successMsg}</div> : ''}
      <div className="row my-5 shadow-lg  w-75 mx-auto">
        
        <div className="col-md-5 mx-auto my-5 ">
        
          <div className="img ">
            <img src={require('../../images/loin.jpg')}  className='w-100 ' alt="signin jpg " />
          
          </div>
        </div>
        <div className="col-md-6 mx-auto my-5 ">
         
          <form onSubmit={userObj.handleSubmit}>

            <div className="form-group w-75">
              <h3 className='  text-success text-center'>
                <i className="fa-regular fa-pen-to-square text-success me-2"></i>
                Login</h3>
             
              <label className='fw-normal text-success' htmlFor="em1ail"><span className=' text-danger'>*</span>Email:</label>
              <input onBlur={userObj.handleBlur} onChange={userObj.handleChange} value={userObj.values.email} className='form-control my-2' id='email' type='email' name='email' placeholder='Enter your email' />
              {userObj.errors.email && userObj.touched.email ? <div className=" px-3 py-0 m-0 alert alert-danger">{userObj.errors.email}</div> : ""}
              

              <label className='fw-normal text-success' htmlFor="password"><span className=' text-danger'>*</span>Password:</label>
              <input onBlur={userObj.handleBlur} onChange={userObj.handleChange} value={userObj.values.password} className='form-control my-2' id='password' type='password' name='password' placeholder='Enter password' />
              {userObj.errors.password && userObj.touched.password ? <div className=" px-3 py-0 m-0 alert alert-danger">{userObj.errors.password}</div> : ""} 
              
              <div className="w-100 text-center">
                <button disabled={userObj.isValid === false || userObj.dirty === false} type='submit' className='btn text-center w-25 mt-4 btn-success'>
                  {loading ?<ThreeDots
                    visible = { true }
                    height = "30"
                    width = "40"
                    color= "#fff"
                    radius = "9"
                    ariaLabel = "three-dots-loading"
                  /> : 'Login'}
                </button>
             </div>

             
              
            
            </div>
          </form>
        </div>
       
      </div>
    </div>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  </>
}


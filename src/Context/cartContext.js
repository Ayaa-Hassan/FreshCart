import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'




export const cartContext =createContext();


export  function CartContextProvider({ children })
{
    const [cartProduct, setCartProduct] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setCartId] = useState(null);

    async function addProductToCart(productId) {
    try {
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
            {
                "productId": productId
            },
            {
                headers: { token: localStorage.getItem('tok') }
            }
        );
    
       
        getUserCart()

        return data;
    }
    catch (error) {
        console.log(error,'error');
        
      };
    
    };

  async function getUserCart() {
    try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
            {
                headers: {
                    token: localStorage.getItem('tok')
                }
            }
        )
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProduct(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
        setCartId(data.data._id);
      
    } catch (error) {
        console.log(error );
        
    }
    }
    
  async function DeleteProduct(productId) {
     try {
         const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${ productId }`, {
             headers: { token: localStorage.getItem('tok') }
         });

         setTotalCartPrice(data.data.totalCartPrice);
         setCartProduct(data.data.products);
         setNumOfCartItems(data.numOfCartItems);

         return data;
     } catch (error) {
         console.log(error,'error');
        
     }
    
 }
    
    async function updateCart(productId,count) {
      try {
        
          const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
              
              "count": count,
             
          }, {
              headers: { token: localStorage.getItem('tok') }
          });

          setTotalCartPrice(data.data.totalCartPrice);
          setCartProduct(data.data.products);
          setNumOfCartItems(data.numOfCartItems);

          return data;
      } catch (error) {
        console.log(error,'error');
        
      }
    
  }  

    
    async function clearCart() {
       try {
           await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
               headers:{ token:localStorage.getItem('tok')}
           })
           setTotalCartPrice(0);
           setCartProduct([]);
           setNumOfCartItems(0);
          
       } catch (error) {
        console.log(error,'error');
        
       }
    
   } 
    
    
    
    
    useEffect(() => {
        getUserCart()
       
    }, []);
    
    
   function updateUi() {
       setTotalCartPrice(0);
       setCartProduct([]);
       setNumOfCartItems(0);
   } 
    


    return <cartContext.Provider value={{
        getUserCart,
        addProductToCart,
        DeleteProduct,
        updateCart,
        totalCartPrice,
        cartProduct,
        numOfCartItems,
        clearCart,
        cartId,
        setNumOfCartItems,
        setTotalCartPrice,
        setCartProduct,
        updateUi
    }}>
        {children}
    
    </cartContext.Provider>;
};

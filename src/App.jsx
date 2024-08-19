
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Products from './Components/Products/Products';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import NotFound from './Components/NotFound/NotFound';
import Profile from './Components/Profile/Profile';
import { AuthProvider } from './Context/authentication';  
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { CartContextProvider } from './Context/cartContext';
import { Toaster } from 'react-hot-toast';
import Cart from './Components/Cart/Cart';
import Payment from './Components/Payment/Payment';
import AllOrders from './Components/AllOrders/AllOrders';
import { Offline } from 'react-detect-offline';




const myRouter = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      {
        index: true, element: <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      },
      {
        path: 'products', element: <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      },
      {
        path: 'allOrders', element: <ProtectedRoute>
          <AllOrders />
        </ProtectedRoute>
      },
      {
        path: 'cart', element: <ProtectedRoute>
          <Cart  />
        </ProtectedRoute>
      },
      {
        path: 'payment', element: <ProtectedRoute>
          <Payment  />
        </ProtectedRoute>
      },
      {
        path: 'productDetails/:id', element: <ProtectedRoute>
          <ProductDetails />
        </ProtectedRoute>
      },
    
      {
        path: 'brands', element: <ProtectedRoute>
          <Brands />
        </ProtectedRoute>
      },
      {
        path: 'categories', element: <ProtectedRoute>
          <Categories />
        </ProtectedRoute>
      },
      {
        path: 'profile', element: <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      
    ]
    
  },
  { path: '*', element: <NotFound /> }
]);




function App() {
  let clintQuery = new QueryClient({
    
  })
  return <>
  
    <QueryClientProvider client={clintQuery}>
      <CartContextProvider>
        <AuthProvider>
          <RouterProvider router={myRouter} />

        </AuthProvider>
      </CartContextProvider>
      <Toaster />
    </QueryClientProvider>
  
  
  
    <Offline>
      <div className=" position-fixed top-0 start-50 bg-dark text-white p-3 rounded-3 ">
        <h5 className="text-center">Oops.... You are offline</h5>

      </div>




  </Offline>
  
  
  
  
  
  
  
  
  
  
  
  </>


  
  
};

export default App;

import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'

import Layout from './Layouts/Layout'
import Order from './Pages/Order';
import Product from './Pages/Product';
import Dashboard from './Pages/Dashboard';
import User from './Pages/User';
import Setting from './Pages/Setting';

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="order" element={<Order />} />
      <Route path="product" element={<Product />} />
      <Route path="user" element={<User />} />
      <Route path="setting" element={<Setting />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

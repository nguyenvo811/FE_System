import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutAdmin from './adminPage/layout/LayoutAdmin';
import ProductTable from './adminPage/page/product/ProductTable';
import Authentication from './adminPage/page/Authentication';
import CategoryTable from './adminPage/page/category/CategoryTable';
import UserTable from './adminPage/page/user/UserTable';
import Home from './clientPage/page/Home';
import LayoutClient from './clientPage/layout/LayoutClient';
import Cart from './clientPage/page/Cart';
import Favorites from './clientPage/page/Favorites';
import BrandTable from './adminPage/page/brand/BrandTable';
import slug from './resource/slug';
import ProductDetail from './clientPage/page/ProductDetail';
import OrderTable from './adminPage/page/order/OrderTable';
import Orders from './clientPage/page/Orders';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutClient />}>
            <Route index path='/' element={<Home />} />
            <Route index path='/cart' element={<Cart />} />
            <Route index path='/favorites' element={<Favorites />} />
            <Route index path='/orders' element={<Orders />} />
            <Route index path={slug.DETAIL} element={<ProductDetail />} />
          </Route>
          <Route index path='/sign-in' element={<Authentication />} />
          <Route element={<LayoutAdmin />}>
            <Route index path='/products' element={<ProductTable />} />
            <Route path='/categories' element={<CategoryTable />} />
            <Route path='/user-list' element={<UserTable />} />
            <Route path='/brands' element={<BrandTable />} />
            <Route path='/management/orders' element={<OrderTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

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
import FindProductByCategory from './clientPage/page/FindProductByCategory';
import SearchResult from './clientPage/page/SearchResult';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutClient />}>
            <Route index path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/orders' element={<Orders />} />
            <Route path={slug.DETAIL} element={<ProductDetail />} />
            <Route path='/search/:categoryName' element={<FindProductByCategory />} />
            <Route path={slug.SEARCH} element={<SearchResult />} />
          </Route>
          <Route index path='/sign-in' element={<Authentication />} />
          <Route element={<LayoutAdmin />}>
            <Route index path='/managements/products' element={<ProductTable />} />
            <Route path='/managements/categories' element={<CategoryTable />} />
            <Route path='/managements/user-list' element={<UserTable />} />
            <Route path='/managements/brands' element={<BrandTable />} />
            <Route path='/management/orders' element={<OrderTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

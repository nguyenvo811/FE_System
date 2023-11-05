import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutAdmin from './adminPage/layout/LayoutAdmin';
import ProductTable from './adminPage/page/product/ProductTable';
import Authentication from './adminPage/page/Authentication';
import CategoryTable from './adminPage/page/category/CategoryTable';
import UserTable from './adminPage/page/user/UserTable';
import Home from './clientPage/page/Home';
import LayoutClient from './clientPage/layout/LayoutClient';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutClient />}>
            <Route index path='/' element={<Home />} />
          </Route>
          <Route index path='/dang-nhap' element={<Authentication />} />
          <Route element={<LayoutAdmin />}>
            <Route index path='/products' element={<ProductTable />} />
            <Route path='/categories' element={<CategoryTable />} />
            <Route path='/user-list' element={<UserTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

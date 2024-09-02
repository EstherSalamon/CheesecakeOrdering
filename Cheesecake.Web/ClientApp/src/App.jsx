import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Order from './Pages/Order';
import Success from './Pages/Success';
import ViewOrders from './Pages/ViewOrders';
import View from './Pages/View';
const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/order' element={<Order />} />
                <Route path='/success' element={<Success />} />
                <Route path='/viewall' element={<ViewOrders />} />
                <Route path='/view/:id' element={<View />} />
            </Routes>
        </Layout>
    );
}

export default App;
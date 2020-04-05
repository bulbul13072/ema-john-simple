import React from 'react';
import './App.css';
import Header from './components/header/Header.js';
import Shop from './components/shop/Shop.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review.js';
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import ProductDetail from './productDetail/ProductDetail';
import Login from './components/Login/Login';
import { AuthContextProvider, PrivateRoute } from './components/Login/useAuth';
import Shipment from './components/Ship/Shipment';

                                                                                                                                                                                                                    

function App(props) {
  return (
    <div>
      <AuthContextProvider>
          <Header></Header>
          <Router>
            <Switch>
              <Route path="/shop">
                <Shop></Shop>
              </Route>
              <Route path="/review">
                <Review></Review>
              </Route>
              <Route path="/inventory">
                <Inventory></Inventory>
              </Route>
              <Route exact path="/">
              <Shop></Shop>
              </Route>
              <Route path="/products/:productKey">
                <ProductDetail></ProductDetail>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <PrivateRoute path="/shipment">
                <Shipment></Shipment>
              </PrivateRoute>
              <Route path="*">
                  <Notfound></Notfound>
              </Route>
            </Switch>
          </Router>
        </AuthContextProvider>
    </div>
  );
}

export default App;

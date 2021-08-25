import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import ProductList from './ProductList';
import Cart from './Cart';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';


class App extends React.Component
{
    render(){
        return  ( 
            <div className="App">
              <BrowserRouter>
                <div className="userProfile">
                  <Route exact path="/" component={ProductList} />
                  <Route exact path="/cart" component={Cart} />
                </div>
              </BrowserRouter>
            </div>
       );
    }
}
export default App;
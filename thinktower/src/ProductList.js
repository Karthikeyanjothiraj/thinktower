import React from 'react';
import productList from './ProductList.json';
import './ProductList.css';
import Cart from './Cart';
import { Button } from 'semantic-ui-react';
import InfinitScroll from 'react-infinite-scroll-component';
import image from './productimg/ribold.png';
import { toast } from 'react-toastify';
toast.configure();

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            addcart: [],
            cart: [],
            added: false,
            viewCartPage: false,
        }
    }
    componentDidMount = () => {
        this.setState({
            product: productList.productsList,
        })
    }
    addCart = (e, dataCard) => {
        const { addcart, product } = this.state;
        addcart.push(dataCard);
        this.setState({
            cart: addcart,

        })
        toast('added to cart succesfully...');
    }

    increase = (name, id) => {
        const {product} = this.state;
        if (name === 'increase') {
          let cardDetails = product.filter((task) => {
              if (task.id === id) {
                  task.quantity = task.quantity + 1;
              }
              return task;
          });
          this.setState({
            ...this.state,
            product: cardDetails,
          })
        } else {
          let cardDetails = product.filter((task) => {
            if (task.id === id) {
                task.quantity = task.quantity > 0 ? task.quantity - 1 : 0;
            }
            return task;
        });
        this.setState({
          ...this.state,
          cart: cardDetails,
        })
        }
      }



    viewCart = () => {
        const { viewCartPage } = this.state;
        this.setState({
            viewCartPage: !viewCartPage,
        })

    }

    render() {
        const { product, viewCartPage, cart } = this.state;
        return (
            <div>
                <InfinitScroll dataLength={product.length}
                    hasMore={true}
                    loader={< h4 > {product.length !== 0 ? 'Loading ...' : 'No Data'} </h4>}
                    className="card_layout"
                >
                    {
                        !viewCartPage ?
                            (< div className="dashboard" >
                                <div className="topBar" >
                                    <button className="all" > ALL PRODUCTS </button>
                                    <button className="cart"
                                        onClick={this.viewCart} > VIEW CART </button>
                                </div>
                                <div className="product" > {
                                    product.map((data) =>
                                        <div id={data.id}
                                            className="productList" >
                                            <div className="imageProduct" > < img src={image} className="productimage"
                                            /></div >
                                            <div className="productName" > PRODUCT: {data.name} </div>
                                            <div className="productName" > CATEGORY {data.category} </div>
                                            <div className="productName" > PRICE: {data.price} </div>
                                            <div className="productName" > Made in {data.country} </div>
                                            <div>
                                                <Button onClick={(e) => { this.increase('increase', data.id) }}>+</Button>
                                            </div>
                                            <div>
                                                {data.quantity}
                                            </div>
                                            <div>
                                                <Button onClick={(e) => { this.increase('decrease', data.id) }}>-</Button>
                                            </div>
                                            <button className="productButton"
                                                onClick={
                                                    (e) => this.addCart(e, data)
                                                } > ADD TO CART </button>
                                        </div>

                                    )
                                }
                                </div>
                            </div >) : < Cart cart={cart}
                                viewCart={this.viewCart}
                                removeCart={this.removeCart}
                            />
                    }
                </InfinitScroll>
            </div>
        )
    }
}

export default ProductList;

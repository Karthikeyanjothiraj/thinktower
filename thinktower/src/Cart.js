import React from 'react';
import { Button } from 'semantic-ui-react';
import image from './productimg/ribold.png';
import './Cart.css';
import { Icon } from 'semantic-ui-react';




class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
        }

    }

    removeCart=(e,data)=>{
        const{cart}=this.props;
        const newCart = cart.indexOf(e.target.value);
            cart.splice(newCart,1);
            alert('hi');
    }

    increase = (name, id) => {
        const {cart} = this.props
        if (name === 'increase') {
          let cardDetails = cart.filter((task) => {
              if (task.id === id) {
                  task.quantity = task.quantity + 1;
              }
              return task;
          });
          this.setState({
            ...this.state,
            cart: cardDetails,
          })
        } else {
          let cardDetails = cart.filter((task) => {
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

    render() {
        const { cart, viewCart, removeCart } = this.props;
        console.log(cart,"klkl");
        return (
            <div className="cartpage">
                <div className="back" onClick={viewCart}><Icon name="arrow left"/>Back to home</div>
                {cart.length === 0 ?
                    <div className="blink_me">No items added</div> :
                    (<div className="cartdetail">
                        {cart.map((cartData) =>
                            <div id={cartData.id} className="cartList">
                                <div><img id={cartData.id} src={image} className="cartImage" /></div>
                                <div className="productName">PRODUCT:{cartData.name}</div>
                                <div className="productName">CATEGORY{cartData.category}</div>
                                <div className="productName">PRICE:{cartData.price}</div>
                                <div className="productName">Made in {cartData.country}</div>
                                <div>
                                    <Button onClick={(e) => { this.increase('increase', cartData.id) }}>+</Button>
                                </div>
                                <div>
                                    {cartData.quantity}
                                </div>
                                <div>
                                    <Button onClick={(e) => { this.increase('decrease', cartData.id) }}>-</Button>
                                </div>
                                <div>
                                    <Button onClick={(e)=>{this.removeCart(e,cartData)}}> REMOVE FROM CART</Button>
                                </div>
                            </div>
                        )}
                    </div>)}
            </div>
        );
    }
}
export default Cart;
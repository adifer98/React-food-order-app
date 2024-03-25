import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import Modal from "../UI/Modal.jsx";
import {currencyFormatter} from "../util/formmating.js";
import UserProgressContext from "../store/UserProgressContext.jsx";
import userProgressContext from "../store/UserProgressContext.jsx";

export default function Cart() {

    const usrProgressCtx = useContext(UserProgressContext)
    const cartCtx = useContext(CartContext);

    const totalQuantity = cartCtx.items.reduce((quantity, item) => quantity + item.quantity, 0);
    const totalPrice = cartCtx.items.reduce(
        (totPrice, item) => totPrice + item.quantity * item.price, 0);

    function handleAddQuantity(item) {
        cartCtx.addItem(item);
    }

    function handleReduceQuantity(item) {
        cartCtx.removeItem(item.id);
    }

    function handleCloseCart() {
        usrProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        usrProgressCtx.showCheckout();
    }


    return (
        <Modal
            className="cart"
            open={usrProgressCtx.progress === 'cart'}
            onClose={usrProgressCtx.progress === 'cart' ? handleCloseCart : null}
        >
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <li key={item.id} className="cart-item">
                        <p>
                            {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
                        </p>
                        <p className="cart-item-actions">
                            <button onClick={() => handleReduceQuantity(item)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleAddQuantity(item)}>+</button>
                        </p>
                    </li>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
            <p className="modal-actions">
                <button className="text-button" onClick={handleCloseCart}>Close</button>
                {totalQuantity > 0 ?
                <button className="button" onClick={handleGoToCheckout}>Go to Checkout</button>
                : null}
            </p>
        </Modal>
    )
}
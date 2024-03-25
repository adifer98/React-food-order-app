import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import Modal from "../UI/Modal.jsx";
import {currencyFormatter} from "../util/formmating.js";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Input from "../UI/Input.jsx";
import {useAddOrder} from "../http.js";

export default function Checkout() {

    let {loading, error, sendRequest: addOrder, succeed, removeSucceed} = useAddOrder();

    const usrProgressCtx = useContext(UserProgressContext)
    const cartCtx = useContext(CartContext);

    const totalPrice = cartCtx.items.reduce(
        (totPrice, item) => totPrice + item.quantity * item.price, 0);

    function handleClose() {
        usrProgressCtx.hideCheckout();
        if(succeed) {
            cartCtx.clearCart();
        }
        removeSucceed();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        const order = {
            customer: customerData,
            items: cartCtx.items
        }

        addOrder(order);
    }

    let action =
        <>
            <button className="text-button" type="button" onClick={handleClose}> Close </button>
            <button className="button"> Submit Order </button>
        </>

    if (loading) {
        action = <span>Loading your order...</span>
    }

    if (succeed) {
        return (
            <Modal open={usrProgressCtx.progress === 'checkout'} onClose={handleClose} >
                <h2> Success! </h2>
                <p>Your order was submitted successfuly.</p>

                <p className="modal-actions">
                    <button className="button" onClick={handleClose}>Okay</button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal
            className="checkout"
            open={usrProgressCtx.progress === 'checkout'}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>

                <Input label="Full Name" type="text" id="name"/>
                <Input label="E-Mail Address" type="email" id="email"/>
                <Input label="Street" type="text" id="street"/>

                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>

                {error ? (
                    <div className="center">
                        <h2>Oh No! Failed To Fetch Meals</h2>
                        <p>{error.message}</p>
                    </div>
                ) : null}
                <p className="modal-actions">
                    {action}
                </p>
            </form>
        </Modal>
    )
}
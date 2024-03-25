import reactOrderLogo from '../assets/logo.jpg';
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {

    const usrProgressCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext);
    const totalItemsSelected = cartCtx.items.reduce((quantity, item) => quantity + item.quantity, 0);

    function handleShowCart() {
        usrProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={reactOrderLogo} alt="Food order logo" />
                <h1>REACTFOOD</h1>
            </div>
            <nav>
                <button
                    className="text-button"
                    onClick={handleShowCart}
                >
                    Cart ({totalItemsSelected})
                </button>
            </nav>
        </header>
    )
}
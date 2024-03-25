import {currencyFormatter} from "../util/formmating.js";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";


export default function MealCard({meal}) {

    const cartCtx = useContext(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt="meal"/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <button
                        className="button"
                        onClick={handleAddMealToCart}
                    >
                        Add to cart
                    </button>
                </p>
            </article>
        </li>
    )
}
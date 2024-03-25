import {createContext, useReducer} from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

function cartReducer(state, action) {

    const updatedItems = [...state.items];

    if (action.type === "ADD_ITEM") {
        // state.items.push(action.item); not good

        const itemIndex = state.items.findIndex(item => item.id === action.item.id);
        if (itemIndex === -1) {
            updatedItems.push({ ...action.item, quantity: 1});
        } else {
            const existingItem = state.items[itemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[itemIndex] = updatedItem;
        }
        return { ...state, items: updatedItems };
    }

    if (action.type === "REMOVE_ITEM") {
        // remove an item
        const itemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[itemIndex];
        if (existingItem.quantity === 1) {
           updatedItems.splice(itemIndex, 1);
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1
            };
            updatedItems[itemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === "CLEAR_CART") {
        return { ...state, items: [] };
    }

    return state;
}



export function CartContextProvider({ children }) {
    const [ cart, dispatchCartAction ] = useReducer(cartReducer, {
        items: []
    });

    function addItem(item) {
        dispatchCartAction({
            type: "ADD_ITEM",
            item
        })
    }

    function removeItem(id) {
        dispatchCartAction({
            type: "REMOVE_ITEM",
            id
        })
    }

    function clearCart() {
        dispatchCartAction({
            type: "CLEAR_CART",
        })
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };


    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;
import {useEffect, useState} from "react";

export async function fetchAvailableMeals() {
    const response = await fetch('http://localhost:3000/meals'); // not throwing an error
    const resData = await response.json();
    //error response
    if (!response.ok) { // 400, 500 status code
        throw new Error(resData.message || 'Failed to fetch meals');
    }
    return resData
}


export async function addOrder(order) {
    const response = await fetch(`http://localhost:3000/orders`, {
        method: 'POST',
        body: JSON.stringify({order}),
        headers: {
            'Content-Type': 'application/json' //inform the backend that the data attached would be in json format
        }
    })

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Failed to submit the order');
    }

    return resData.message; //the response in this request contains a message property, will not be used though
}


export function useFetchMeals() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchMeals() {
            setLoading(true);
            try {
                const meals = await fetchAvailableMeals();
                setMeals(meals);
            } catch(error) {
                setError({
                    message: error.message || "Something went wrong..."
                });
            }
            setLoading(false);
        }
        fetchMeals();
    }, [fetchAvailableMeals]);

    return {
        meals,
        loading,
        error
    }
}

export function useAddOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [succeed, setSucceed] = useState(false);

    async function sendRequest(order) {
        setLoading(true);
        try {
            await addOrder(order);
            setSucceed(true);
        } catch(error) {
            setError({
                message: error.message || 'Failed to submit the order'
            });
            setSucceed(false);
        }
        setLoading(false);
    }
    function removeSucceed() {
        setSucceed(false);
    }

    return {
        loading,
        error,
        sendRequest,
        succeed,
        removeSucceed
    }
}

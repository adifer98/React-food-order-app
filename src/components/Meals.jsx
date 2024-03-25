
import MealCard from "./MealCard.jsx";
import {useFetchMeals} from "../http.js";

export default function Meals() {

    const {
        meals: availableMeals,
        loading,
        error
    } = useFetchMeals();

    if (error) {
        return (
            <div className="center">
                <h2>Oh No! Failed To Fetch Meals</h2>
                <p>{error.message}</p>
            </div>
        );
    }

    if (loading) {
        return <p className="center">Loading...</p>;
    }

    return (
        <ul id="meals">
            {availableMeals.map((meal) => (
                <MealCard
                    key={meal.id}
                    meal={meal}
                />
            ))}
        </ul>
    )
}
import Button from "~/components/Button";
import { NewRestaurantForm } from "./new-restaurant-fom";

export function RestaurantList (){
    return <div>
        <Button
        data-test="addRestaurantButton"
        >
            Add Restaurant
        </Button>

        <NewRestaurantForm/>
    </div>
}
import Button from "~/components/Button";
import { NewRestaurantForm } from "./new-restaurant-fom";
import { useState } from "react";
import { RestaurantList } from "./restaurant-list";

export function RestaurantListContainer (){

    const [restaurantList, setRestaurantList] = useState<string[]>([])


    return <div>
        <Button
        data-test="addRestaurantButton"
        >
            Add Restaurant
        </Button>

        <NewRestaurantForm onSave={(restaurant:{
  newRestaurantName: string;
})=>{
            setRestaurantList(prevState=>[...prevState, restaurant.newRestaurantName])
        }}/>

        <RestaurantList restaurants= {restaurantList} />
    </div>
}
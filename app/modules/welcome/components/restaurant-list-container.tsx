import { Button } from "~/components/ui/button";
import { NewRestaurantForm } from "./new-restaurant-fom";
import { useState } from "react";
import { RestaurantList } from "./restaurant-list";

export function RestaurantListContainer() {
  const [restaurantList, setRestaurantList] = useState<string[]>([]);
  const [showNewRestaurantForm, setShowNewRestaurantForm] = useState(false);

  return (
    <div className="w-full mx-auto container">
      <Button
        type="button"
        data-test="addRestaurantButton"
        onClick={() => setShowNewRestaurantForm(true)}
      >
        Add Restaurant
      </Button>

      <NewRestaurantForm
        open={showNewRestaurantForm}
        onClose={() => setShowNewRestaurantForm(false)}
        onSave={(restaurant: { newRestaurantName: string }) => {
          setRestaurantList((prev) => [...prev, restaurant.newRestaurantName]);
          setShowNewRestaurantForm(false);
        }}
      />

      <RestaurantList restaurants={restaurantList} />
    </div>
  );
}

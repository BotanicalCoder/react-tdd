import { Button } from "~/components/ui/button";
import { NewRestaurantForm } from "./new-restaurant-fom";
import { useState } from "react";
import { RestaurantList } from "./restaurant-list";

export function RestaurantListContainer() {
  const [restaurantList, setRestaurantList] = useState<string[]>([]);
  const [showNewRestaurantForm, setShowNewRestaurantForm] = useState(false);
  const handleShowNewRestaurantForm = () => {
    setShowNewRestaurantForm(true);
  };

  return (
    <div className="w-full mx-auto container">
      <Button
        type="button"
        data-test="addRestaurantButton"
        onClick={handleShowNewRestaurantForm}
      >
        Add Restaurant
      </Button>

      {showNewRestaurantForm && (
        <NewRestaurantForm
          onSave={(restaurant: { newRestaurantName: string }) => {
            setRestaurantList((prevState) => [
              ...prevState,
              restaurant.newRestaurantName,
            ]);
            setShowNewRestaurantForm(false);
          }}
        />
      )}

      <RestaurantList restaurants={restaurantList} />
    </div>
  );
}

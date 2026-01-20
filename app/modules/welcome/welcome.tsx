import { HydrationMarker } from "~/components/HydrationMarker";
import { RestaurantListContainer } from "./components/restaurant-list-container";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <HydrationMarker />
      <RestaurantListContainer />
    </main>
  );
}

export function RestaurantList ({restaurants}:{
    restaurants:string[]
}){
    return <ul>
        {
            restaurants.map((restaurantName, index)=>{
                return <li key={restaurantName+index}> {restaurantName} </li>
            })
        }
     </ul>;
}
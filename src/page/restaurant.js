import { React, useState, useEffect } from "react";

function Restaurant(restaurant, stars, rate) {
    console.log(JSON.parse(restaurant.items), "items")
    [rating, setRating] = useState(Math.round(restaurant.rateing))
    const foods = () => {   
        return JSON.parse(restaurant.items).map((food, index) => {
            return (
                <tr key={index}>
                    <td><img src={food.image.url} alt={food.name} /></td>
                    <td><h5>{food.name}</h5></td>
                    <td><h6>{food.price/100} {food.currency}</h6></td>
                </tr>
            )
        })
    }
    // const rateModal = (id_place) => {
    //     rate({ 'id_place': id_place, 'rateing':  document.getElementById("modal")?.value})
    //   }
    


    return (
        <div className="restaurant">
            {restaurant !== undefined &&
            <>
                <div className="header">
                    <h1>{restaurant.name}</h1>
                    <img src={restaurant.image} alt={restaurant.name} />
                </div>
                <h2>Type {restaurant.type}</h2>
                <h3>Price point {"$".repeat(restaurant.price)}</h3>
                <h4>Rating {restaurant.rateing} from {restaurant.number_of_vote} votes</h4>
                <div class="header" id={restaurant.id_place}>
                    {stars("modal", Math.round(restaurant.rateing))}
                    <button className="add" onClick={() => {console.log(document.getElementById("modal")?.value, "asd")}}>Rate</button>
                </div>
                <table>
                    {foods()}
                </table>
            </>
            }
            
        </div>
    );
}

export default Restaurant;
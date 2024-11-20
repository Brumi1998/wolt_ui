import { React, useState, useEffect } from "react";

function Restaurant(restaurant, stars,post, table) {
    console.log(restaurant, "items")


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

    const comments = () => {
        return JSON.parse( restaurant.comments).map((comment, index) => {
            return (
                <tr key={index}>
                    <td><h5>{comment.timestamp.split("T")[0]}</h5></td>
                    <td><h5>{comment.text}</h5></td>
                </tr>
            )
        })
    }

    return (
        <div className="restaurant">
            {restaurant !== undefined &&
            <>
                <div className="header">
                    <div>
                        <h1>{restaurant.name}</h1>
                        <h4>{restaurant.location}</h4>
                    </div>
                    
                    <img src={restaurant.image} alt={restaurant.name} />
                </div>
                <h2>Type {restaurant.type}</h2>
                <h3>Price point {"$".repeat(restaurant.price)}</h3>
                <h4>Rating {Math.round((parseFloat(restaurant.rateing) + Number.EPSILON) * 100) / 100} from {restaurant.number_of_vote} votes</h4>
                <div class="header" id={restaurant.id_place}>
                    {stars("modal", Math.round(restaurant.rateing))}
                    <button className="add" onClick={() => {post({ 'id_place': restaurant.id_place, 'rateing': table["modal"] })}}>Rate</button>
                </div>
                <table className="food">
                    {restaurant.items !== undefined && foods()}
                </table>
                <h2>Comments</h2>
                <table>
                    {restaurant.comments !== undefined && comments()}
                </table>
                <h3>Leave a comment</h3>
                <div className="header">
                    <textarea id="comment" placeholder="Comment here"></textarea>
                    <button className="add" onClick={() => {post({ 'id_place': restaurant.id_place, 'comment': { 'text': document.getElementById("comment").value, 'timestamp': Intl.DateTimeFormat().format(Date.now()) } })}}>Submit</button>
                </div>
            </>
            }
            
        </div>
    );
}

export default Restaurant;
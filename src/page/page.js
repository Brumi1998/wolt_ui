import { React, useState, useEffect } from "react"
import axios from "axios"

function Page() {
  const [getResult, setResult] = useState({ 'Item': [] })
  const https = "https://jby0skz9lk.execute-api.eu-central-1.amazonaws.com/dev/hello"
  const authHeaders = {}
  const tabel = {}
  console.log(getResult)
  const rate = (id_place) => {
    postItem({ 'id_place': id_place, 'rateing': tabel[id_place] })
  }

  const addNewItem = (rate, itemName) => {
    console.log(rate, itemName)
    postItem({ 'rateing': rate, 'name': itemName })
  }
  const postItem = (item) => {
    fetch(https, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


  const mybutton = () => {
    return <div class="container">

      <a href="#" class="button">
        <div class="button__line"></div>
        <div class="button__line"></div>
        <span class="button__text" onClick={() => { getItems() }}>Refresh</span>
        <div class="button__drow1"></div>
        <div class="button__drow2"></div>
      </a>

    </div>
  }
  const getItems = () => {
    fetch(https, { mode: "cors", headers: {} })
      .then(result => result.json())
      .then(data => setResult({ 'Item': data }))
      .catch(error => console.log(error))
  }

  const stars = (id) => {
    return <form class="rating" id={id}>
      <label>
        <input type="radio" name="stars" value="1" onClick={() => { tabel[id] = 1 }} />
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="stars" value="2" onClick={() => { tabel[id] = 2 }} />
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="stars" value="3" onClick={() => { tabel[id] = 3 }} />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="stars" value="4" onClick={() => { tabel[id] = 4 }} />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="stars" value="5" onClick={() => { tabel[id] = 5 }} />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
    </form>
  }


  const renderTableData = () => {
    if (getResult == undefined) { return null }
    return getResult?.Item.map((item, index) => {
      const { id, name, number_of_vote, rateing, id_place } = item;
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{number_of_vote}</td>
          <td>{rateing}</td>
          <td>{stars(id_place)}</td>
          <td><button class="add" onClick={() => rate(id_place)}>Rate</button></td>
        </tr>
      )
    });
  }

  return (
    <div>
      <section class="wrapper">
        <div class="top">Wolt</div>
        <div class="bottom" aria-hidden="true">Wolt</div>
      </section>
      {mybutton()}
      <table>
        <tbody>
          {renderTableData()}

        </tbody>
      </table>
      <p class="small outline">Add New Restaurant</p>
      <table>
        <tr>
          <td><input class="newItem" placeholder="Name" id="new"></input></td>
          <td>{stars("new")}</td>
          <td><button class="add" onClick={() => { addNewItem(tabel["new"], document.getElementById("new").value) }}>Add</button></td>
        </tr>
      </table>
    </div>
  )
}

export default Page;
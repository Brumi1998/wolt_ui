import { React, useState, useEffect } from "react"
import Select from "react-dropdown-select";
import Restaurant from "./restaurant";
import Modal from "react-modal";




function Page() {
  const [getResult, setResult] = useState({ 'Item': [] })
  const [newRestaurnatType, setNewRestaurnatType] = useState()
  const [priceCategory, setPriceCategory] = useState()
  const [filterPrice, setFilterPrice] = useState()
  const [filterType, setFilterType] = useState()
  const [sortBy, setSortBy] = useState()
  const [showRestaurant, setShowRestaurant] = useState(false)
  const [restaurantId, setRestaurantId] = useState("0")
  const [optionType, setOptionType] = useState()  

  const https = "https://jby0skz9lk.execute-api.eu-central-1.amazonaws.com/dev/hello"
  const authHeaders = {}
  const tabel = {}
  const rate = (id_place) => {
    postItem({ 'id_place': id_place, 'rateing': tabel[id_place] })
  }


  const addNewItem = (rate, itemName) => {
    postItem({ 'rateing': rate, 'name': itemName, 'price': priceCategory, 'type': newRestaurnatType})
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
      })
      .finally(() => {getItems()})
  }
  

  const setTypes = (data) => {
    let list = [];
    data.forEach(element => {
      list.push(element.type); // Use push instead of append
    });
    console.log(list, "list");
  
    let optionType = [{id: "undefined", name: "All"}];
    Array.from(new Set(list)).forEach(element => { // Convert Set to array
      optionType.push({ id: element, name: element });
    });

    setOptionType(optionType);
  };


  const optionsPrice = [
    {
      id: "1",
      name: "$"
    },
    {
      id: "2",
      name: "$$"
    },
    {
      id: "3",
      name: "$$$"
    }
  ];
  
  const findRestaurant = (id) => {
    for (let i = 0; i < getResult.Item.length; i++) {
      if (getResult.Item[i].id_place === id) {
        return getResult.Item[i]
      }
    }
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
    fetch(`${https}?sortBy=${sortBy}&filterType=${filterType}&filterPrice=${filterPrice}`, { mode: "cors", headers: {} })
    .then(result => result.json())
    .then(data => setResult({ 'Item': data }))
    .catch(error => console.log(error))
  }

  const getInitialItems = () => {
    fetch(`${https}`, { mode: "cors", headers: {} })
    .then(result => result.json())
    .then(data => setTypes(data))
    .catch(error => console.log(error))
  }

  useEffect( () => {
    getItems()
  }, [sortBy,filterType,filterPrice])

  useEffect(() => {
    getInitialItems()
  }, [])


  const stars = (id, def) => {
    return <form class="rating" id={id}>
      <label>
        <input type="radio" name="stars" value="1" onClick={() => { tabel[id] = 1 }} defaultChecked={def === 1 ? "checked" : ""}/>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="stars" value="2" onClick={() => { tabel[id] = 2 }} defaultChecked={def === 2 ? "checked" : ""}/>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="stars" value="3" onClick={() => { tabel[id] = 3 }} defaultChecked={def === 3 ? "checked" : ""}/>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="stars" value="4" onClick={() => { tabel[id] = 4 }} defaultChecked={def === 4 ? "checked" : ""}/>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="stars" value="5" onClick={() => { tabel[id] = 5 }} defaultChecked={def === 5 ? "checked" : ""}/>
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
      const { id, name, number_of_vote, rateing, id_place, type, price } = item;
      return (
        <tr key={id}>
          <td><div class="restaurant-name" onClick={() => {setRestaurantId(id_place); setShowRestaurant(true)}}>{name}</div></td>
          <td>{number_of_vote}</td>
          <td>{Math.round((parseFloat(rateing) + Number.EPSILON) * 100) / 100}</td>
          <td>{type}</td>
          <td>{"$".repeat(price)}</td>
          <td>{stars(id_place, Math.round(rateing))}</td>
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
      <p class="small outline">Add New Restaurant</p>
      {getResult.Item.length > 0 && <Modal
        style={{overlay: {zIndex: 1000}}}
        portalClassName="modal"
        isOpen={showRestaurant}
        onRequestClose={() => setShowRestaurant(false)}
        contentLabel="Restaurant"
      >
        {Restaurant(findRestaurant(restaurantId), stars, postItem, tabel)}
      </Modal>}
      <table>
        <tr>
          <td><input class="newItem" placeholder="Name" id="new"></input></td>
          <td>  
            <Select
              classNamePrefix='filter'
              placeholder="Type"
              options={optionType}
              labelField="name"
              valueField="id"
              onChange={(values) => setNewRestaurnatType(values[0]["id"])}
            />
          </td>
          <td>
            <Select
                classNamePrefix='filter'
                placeholder="Price"
                options={optionsPrice}
                labelField="name"
                valueField="id"
                onChange={(values) => setPriceCategory(values[0]["id"])}
              />
          </td>
          <td>{stars("new")}</td>
          <td><button class="add" onClick={() => { addNewItem(tabel["new"], document.getElementById("new").value) }}>Add</button></td>
        </tr>
      </table>
      {mybutton()}
      <table>
        <tbody>
        <tr>
          <td><div onClick={() => setSortBy("name")}>Name</div></td>
          <td><div onClick={() => setSortBy("number_of_vote")}>Number of vote</div></td>
          <td><div onClick={() => setSortBy("rateing")}>Rateing</div></td>
          <td><Select
                classNamePrefix='filter'
                placeholder="Type"
                options={optionType}
                labelField="name"
                valueField="id"
                onChange={(values) => setFilterType(values[0]["id"])}
              />
          </td>
          <td><Select
                classNamePrefix='filter'
                placeholder="Price"
                options={optionsPrice}
                labelField="name"
                valueField="id"
                onChange={(values) => setFilterPrice(values[0]["id"])}
              />
          </td>
        </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  )
}

export default Page;
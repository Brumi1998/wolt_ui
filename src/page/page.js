import {React, useState}  from "react"

function Page() {

    const [getResult,setResult] = useState()
    const https = "https://8fj0hojx1g.execute-api.eu-central-1.amazonaws.com/dev/hello"
    const authHeaders = {'x-api-key': ""  ,   'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,'Content-Type': 'application/json'}

  const tabel = {}

    const rate = (id_place) => {
      postItem({'id_place':id_place, 'rate': tabel[id_place]})
    }

    const addNewItem = (rate,itemName) => {
      console.log(rate,itemName)
      postItem({'rate': rate, 'name': itemName})
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
        <span class="button__text" onClick={() => {getItems()}}>Refresh</span>
        <div class="button__drow1"></div>
        <div class="button__drow2"></div>
      </a>
    
    </div>
    }
    const getItems = () => {
        /*fetch(https,{'headers': authHeaders,'mode': 'cors'})
            .then(response => response.json())
            .then(data => setResult(data))
            .catch(error => console.log(error))*/
            setResult({'Item':[
                {
                    "id_place": "2",
                    "name": "PIZZICA",
                    "number_of_vote": "1",
                    "rateing": "5"
                },
                {
                    "id_place": "1",
                    "name": "Hari",
                    "number_of_vote": "100",
                    "rateing": "4.5"
                },
                {
                    "id_place": "4",
                    "name": "meki",
                    "number_of_vote": "1",
                    "rateing": "5"
                },
                {
                    "id_place": "3",
                    "name": "manu",
                    "number_of_vote": "1",
                    "rateing": "5"
                }
            ]})
        }
        const stars = (id) => {
            return <form class="rating" id={id}>
            <label>
              <input type="radio" name="stars" value="1"  onClick={() => {tabel[id] = 1}}/>
              <span class="icon">★</span>
            </label>
            <label>
              <input type="radio" name="stars" value="2" onClick={() => {tabel[id] = 2}} />
              <span class="icon">★</span>
              <span class="icon">★</span>
            </label>
            <label>
              <input type="radio" name="stars" value="3"  onClick={() => {tabel[id] = 3}}/>
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>   
            </label>
            <label>
              <input type="radio" name="stars" value="4"  onClick={() => {tabel[id] = 4}} />
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
            </label>
            <label>
              <input type="radio" name="stars" value="5" onClick={() => {tabel[id] = 5}} />
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
            </label>
          </form>
        }


        const renderTableData = () => {
            return getResult?.Item.map((item, index) => {
              const { id, name, number_of_vote, rateing , id_place} = item;
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
        getResult?.Item.map((item) => {console.log(item)})

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
              <td><button class="add" onClick={() => {addNewItem(tabel["new"],document.getElementById("new").value)}}>Add</button></td>
          </tr>
        </table>
    </div>
    )
}

export default Page;
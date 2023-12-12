// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch('https://opendata.liege.be/api/explore/v2.1/catalog/datasets/defibrillateurs/records?limit=40');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to render data in cards
async function renderData() {
  const container = document.querySelector('.container-bloc');
  const data = await fetchData();

  if (!data) {
    return;
  }


  data.forEach(item => {


    if (item.floor == null) { return " " }
    //console.log(item)
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.textContent = "Identifiant " + item.gid;

    const body = document.createElement('p');
    body.innerHTML = `<strong ">Adresse</strong> : ${item.street_name} ${item.house_number}, ${item.postal_code} Liège, (${item.floor})`;

    const footer = document.createElement('footer')
    footer.innerHTML = `<strong ">Informations techniques</strong> :
    <ul> 
    <li>(lisrue) ${item.street_code}</li>
    <li>(ICAR street) ${item.icar_street_id}</li>
    <li>(ICAR address) ${item.icar_address_id}</li>
    <li>Date ${item.created}</li>
    <li>Modification ${item.last_modified}</li>
    </ul>`;
    card.appendChild(title);
    card.appendChild(body);
    card.appendChild(footer);
    container.appendChild(card);
  });
}

// Call the renderData function to display data
renderData();

const searchBar = document.querySelector("#search-bar");
const cardsList = document.querySelector(".cards-list");

const listItems = []

searchBar.addEventListener('input', (e) => filterData(e.target.value))

const result = document.getElementById('result')
const filter = document.getElementById('filter')
getData()
filter.addEventListener('input', (e) => filterData(e.target.value))
async function getData() {
  const res = await fetch('https://opendata.liege.be/api/explore/v2.1/catalog/datasets/defibrillateurs/records?limit=40')
  const { results } = await res.json()
  // Clear result
  result.innerHTML = ''
  results.forEach(item => {
    const div = document.createElement('div')
    listItems.push(div)
    div.innerHTML = `
<div class="cards-info">
<div class="card"><h2>Identifiant ${item.gid}</h2>
<p><strong "="">Adresse</strong> : ${item.street_name} ${item.house_number}, ${item.postal_code} Liège, (${item.floor})</p>
<footer><strong "="">Informations techniques</strong> :
    <ul> 
    <li>(lisrue) ${item.street_code}</li>
    <li>(ICAR street) ${item.icar_street_id}</li>
    <li>(ICAR address) ${item.icar_address_id}</li>
    <li>Date ${item.created}</li>
    <li>Modification ${item.last_modified}</li>
    </ul></footer></div>
</div>
`
    result.appendChild(div)

  })
}



function filterData(searchTerm) {
  let containerBloc = document.querySelector(".container-bloc");

  if (searchTerm === "") {
    containerBloc.style.display = "flex"
    cardsList.style.display = "none"
  } else {
    containerBloc.style.display = "none"
    cardsList.style.display = "flex"
  }

  listItems.forEach(item => {
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove('hide')
    } else {
      item.classList.add('hide')
    }
  })
}

/*
// Keyup eventlistener for search inpout
searchBar.addEventListener('keyup', (event) => {
  let searchTerm = event.target.value;
  console.log(searchTerm)
  let containerBloc = document.querySelector(".container-bloc");
  if (searchTerm === "") {
    containerBloc.style.display = "flex"
  } else {
    containerBloc.style.display = "none"
  }


  //showList(searchTerm);
})
*/
/*
// Filter and Show list
function showList(searchTerm) {
  renderData()
    .then(items => filteredItems(items, searchTerm))
}

// filter users as per searchTerm
function filteredItems(items, searchTerm) {
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm)
  )
  // console.log(filteredUsers.length ? filteredUsers : users)   
  return filteredItems.length ? filteredItems : items;
}
*/
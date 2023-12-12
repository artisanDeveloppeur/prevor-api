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
    console.log(item)
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

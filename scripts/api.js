

// 1. GET request using fetch()
fetch("https://opendata.liege.be/api/explore/v2.1/catalog/datasets/defibrillateurs/records?limit=40")
  // Converting received data to JSON
  .then((response) => response.json())
  .then((json) => {
    //console.log(json.results)

    // 2. Create a variable to store HTML table headers
    let li = `<tr>
    <th>Identifiant</th>
    <th>Street name</th>
    <th>House number</th>
    <th>Postal code</th>
    <th>Floor</th>
    <th>Created</th>
    <th>Last modified</th>
    <th>Street code</th>
    <th>Icar address (ID) </th>
    <th>Icar street (ID)</th>
    <th class="hidden">City</th>
    <th class="hidden">Provider</th>
    </tr>`;

    // 3. Loop through each data and add a table row
    json.results.forEach((defibrillateurs) => {
      //console.log(defibrillateurs)
      if (defibrillateurs.floor == null) { return " " }
      li += `<tr>
      <td>${defibrillateurs.gid}</td>
      <td>${defibrillateurs.street_name}</td>
      <td>${defibrillateurs.house_number}</td>
      <td>${defibrillateurs.postal_code}</td>
      <td>${defibrillateurs.floor}</td>
      <td>${defibrillateurs.created}</td>
      <td>${defibrillateurs.last_modified}</td>
      <td>${defibrillateurs.street_code}</td>
      <td>${defibrillateurs.icar_address_id}</td>
      <td>${defibrillateurs.icar_street_id}</td>
      <td class="hidden">${defibrillateurs.city}</td>
      <td class="hidden">${defibrillateurs.provider}</td>
    </tr>`;
    });



    // 4. DOM Display result
    document.getElementById("defibrillateurs").innerHTML = li;


  });

/*
{
"gid":"4286",
"provider":"SIPPT",
"city":"Liège",
"street_name":"boulevard de la Constitution",
"house_number":"82",
"additional_details":"Salle des sports - - Salle des sports",
"geo_point_2d":{
"lon":5.5918270747,
"lat":50.644958397
},
"geo_shape":{
"type":"Feature",
"geometry":{
"coordinates":[
5.5918270747,
50.644958397
],
"type":"Point"
},
"properties":{
}
},
"street_code":6016,
"icar_address_id":1137235,
"created":"2021-10-20",
"last_modified":"2021-10-20",
"floor":"Salle des sports",
"postal_code":4020,
"icar_street_id":7729676
},
*/
/*
  Identifiant
  2706
  Gestionnaire
  SIPPT
  Ville
  Liège
  Rue
  rue Burenville
  Numéro
  46
  Complément d'information
  Local des professeurs - - Local des professeurs
  Code rue (lisrue)
  4 024
  Identifiant d'adresse (ICAR / BeStaddress)
  1 109 362
  Date de création
  12 juillet 2023
  Date de dernière modification
  12 juillet 2023
  Étage
  Local des professeurs
  Code postal
  4 000
  Identifiant de la rue (ICAR / BeStaddress)
  7 730 235
*/


// main.js

// 5. POST request using fetch()




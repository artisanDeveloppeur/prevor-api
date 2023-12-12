let gridApi;

/** @type {import('ag-grid-community').GridOptions} */
const gridOptions = {
  columnDefs: [
    { field: 'gid' },
    { field: 'street_name', minWidth: 100 },
    { field: 'house_number', minWidth: 100 },

    { field: 'street_code' },
    { field: 'icar_address_id' },
    { field: 'created' },
    { field: 'last_modified' },
    { field: 'floor' },
    { field: 'postal_code' },
    { field: 'icar_street_id' },

    /*
    { field: 'provider' },
    { field: 'city' },
    { field: 'additional_details' },
    { field: 'geo_point_2d.lat' },
    */
  ],
  defaultColDef: {
    flex: 1,
  },
};

function onFilterTextBoxChanged() {
  gridApi.setGridOption(
    'quickFilterText',
    document.getElementById('filter-text-box').value
  );
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  const gridDiv = document.querySelector('#myGrid');
  gridApi = agGrid.createGrid(gridDiv, gridOptions);
  //console.log(gridApi)
  //fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  fetch('https://opendata.liege.be/api/explore/v2.1/catalog/datasets/defibrillateurs/records?limit=40')
    .then((response) => response.json())
    .then((data) => gridApi.setGridOption('rowData', data.results));
});


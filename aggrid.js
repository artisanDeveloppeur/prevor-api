let gridApi;

/** @type {import('ag-grid-community').GridOptions} */
const gridOptions = {
  columnDefs: [
    { field: 'gid' },
    { headerName: 'Street name', field: 'street_name', minWidth: 250 },
    { headerName: 'House number', field: 'house_number' },
    { headerName: 'Postal code', field: 'postal_code' },
    { field: 'floor' },
    { headerName: 'Street code', field: 'street_code' },
    { headerName: 'ID icar address', field: 'icar_address_id' },
    { headerName: 'ID icar street', field: 'icar_street_id' },





    /*
    { field: 'provider' },
    { field: 'city' },
    { field: 'additional_details' },
    { field: 'geo_point_2d.lat' },
    { field: 'geo_shape.geometry.coordinates' },
    { field: 'created' },
    { field: 'last_modified' },
    
    */
  ],
  /*
  defaultColDef: {
    flex: 1,
  },
  */
  defaultColDef: {
    // set the default column width
    width: 150,
    // make every column editable
    editable: false,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
    // enable floating filters by default
    floatingFilter: true,
    // disable cell data types
    cellDataType: false,
  },

  // default ColGroupDef, get applied to every column group
  defaultColGroupDef: {
    marryChildren: true,
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
  fetch('https://opendata.liege.be/api/explore/v2.1/catalog/datasets/defibrillateurs/records?limit=100')
    .then((response) => response.json())
    .then((data) => gridApi.setGridOption('rowData', data.results));
});


let gridApi;
const filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    const dateAsString = cellValue;
    const dateParts = dateAsString.split('/');
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );

    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }

    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }

    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
}
/** @type {import('ag-grid-community').GridOptions} */
const gridOptions = {

  columnDefs: [
    { headerName: 'Identifiant', field: 'gid', minWidth: 50 },
    {
      headerName: 'Defibrillator address (Street name / House number / Postal code / Floor)',
      children: [
        { headerName: 'Street name', field: 'street_name', minWidth: 250 },
        { headerName: 'House number', field: 'house_number', minWidth: 200 },
        { headerName: 'Postal code', field: 'postal_code' },
        { field: 'floor', minWidth: 250 },
      ]
    },
    {
      headerName: 'Professional (Street code / ID icar address and street)',
      children: [
        { headerName: 'Street code', field: 'street_code' },
        { headerName: 'Address', field: 'icar_address_id' },
        { headerName: 'Street', field: 'icar_street_id' },
      ]
    },
    {
      headerName: 'Dates',
      children: [
        { headerName: 'Last modified', field: 'last_modified', minWidth: 150 },
      ]
    },






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
    width: 125,
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
  fetch('https://opendata.liege.be/api/explore/v2.1/catalog/datasets/defibrillateurs/records?limit=80')
    .then((response) => response.json())
    .then((data) => gridApi.setGridOption('rowData', data.results));
});


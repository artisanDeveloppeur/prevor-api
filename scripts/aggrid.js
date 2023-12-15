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
    {
      headerName: 'Identifiant', field: 'gid', minWidth: 50,
      tooltipField: 'gid',
    },
    {
      headerName: 'Defibrillator address (Street name / House number / Postal code / Floor)',
      children: [
        { headerName: 'Street name', field: 'street_name', minWidth: 250 },
        { headerName: 'House number', field: 'house_number', minWidth: 150 },
        { headerName: 'Postal code', field: 'postal_code', minWidth: 50 },
        { field: 'floor', minWidth: 250 },
        {
          headerName: 'Coordinates',
          field: 'geo_point_2d',
          cellRenderer: 'btnCellRenderer',
          cellRendererParams: {
            clicked: function (field) {
              window.open(`http://www.google.com/maps/place/${field.lat},${field.lon}`, "_blank")
            }
          },
          minWidth: 150
        },
      ],
      //tooltipField: ['gid', 'street_name', 'house_number', 'postal_code', 'floor']

    },

    {
      headerName: 'Professional (Street code / ID icar address and street)',
      children: [
        { headerName: 'Street code', field: 'street_code' },
        { headerName: 'Address', field: 'icar_address_id' },
        { headerName: 'Street', field: 'icar_street_id' },
      ],


    },
    /*
    {
      headerName: 'Dates',
      children: [
        { headerName: 'Last modified', field: 'last_modified', minWidth: 150 },
      ]
    },
    */







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
    tooltipComponent: CustomTooltip,
  },
  tooltipShowDelay: 0,
  tooltipHideDelay: 2000,
  // default ColGroupDef, get applied to every column group
  defaultColGroupDef: {
    marryChildren: true,
  },
  components: {
    btnCellRenderer: BtnCellRenderer
  }

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


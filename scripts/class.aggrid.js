
function BtnCellRenderer() { }

BtnCellRenderer.prototype.init = function (params) {
  this.params = params;

  this.eGui = document.createElement('button');
  this.eGui.classList.add("btn-map")
  this.eGui.innerHTML = 'Map';

  this.btnClickedHandler = this.btnClickedHandler.bind(this);
  this.eGui.addEventListener('click', this.btnClickedHandler);
}

BtnCellRenderer.prototype.getGui = function () {
  return this.eGui;
}

BtnCellRenderer.prototype.destroy = function () {
  this.eGui.removeEventListener('click', this.btnClickedHandler);
}

BtnCellRenderer.prototype.btnClickedHandler = function (event) {
  this.params.clicked(this.params.value);
}


class CustomTooltip {
  eGui;
  init(params) {
    const eGui = (this.eGui = document.createElement('div'));
    const color = params.color || '#F2F2F2ff';
    const data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;

    eGui.classList.add('custom-tooltip');
    //@ts-ignore
    eGui.style['background-color'] = color;
    eGui.innerHTML = `
        <div style="padding:1rem;font-size:14px;">
        <h3 style="font-size:18px;">Dates (<span class"name">ID ${data.gid}</span>)</h3>
        <p>Création <span> (${data.created})</span></p>
        <p>Dernière modification <strong> (${data.last_modified})</strong></p>
        </div>
        `;
  }

  getGui() {
    return this.eGui;
  }
}

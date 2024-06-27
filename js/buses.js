function renderBuses(buses) {
  const listHeader = document.createElement('ons-list-header');
  listHeader.textContent = 'Buses';
  document.querySelector('#directoryList').appendChild(listHeader);

  buses.forEach(bus => {
    const listItem = document.createElement('ons-list-item');
    const busInfo = `
      <div class="center">
        <span class="list-item__title">${bus.get('nombre')}</span>
        <span class="list-item__subtitle">${bus.get('origen')} - ${bus.get('destino')}</span>
      </div>
      <div class="right">
        <span class="list-item__label">Salida: ${bus.get('salida')}</span>
        <span class="list-item__label">Llegada: ${bus.get('llegada')}</span>
        <span class="list-item__label">Tel: ${bus.get('telefono')}</span>
      </div>
    `;
    listItem.innerHTML = busInfo;
    listItem.setAttribute('tappable', true);
    document.querySelector('#directoryList').appendChild(listItem);
  });
}

document.addEventListener('DOMContentLoaded', async function() {
  const buses = await getBuses();
  renderBuses(buses);
});

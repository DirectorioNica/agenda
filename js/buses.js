// buses.js
async function getBuses() {
  try {
    const B4aVehicle = Parse.Object.extend('B4aVehicle');
    const query = new Parse.Query(B4aVehicle);
    const results = await query.find();
    console.log('Buses encontrados:', results); // Log para verificar que se obtienen los datos
    return results;
  } catch (error) {
    console.error('Error obteniendo buses:', error);
  }
}

function renderBuses(buses) {
  const list = document.querySelector('#directoryList');
  list.innerHTML = ''; // Clear the list before rendering

  const listHeader = document.createElement('ons-list-header');
  listHeader.textContent = 'Buses';
  list.appendChild(listHeader);

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
        <a href="tel:${bus.get('telefono')}"><span class="list-item__label">Tel: ${bus.get('telefono')}</span></a>
      </div>
    `;
    listItem.innerHTML = busInfo;
    listItem.setAttribute('tappable', true);
    list.appendChild(listItem);
  });
}

document.addEventListener('DOMContentLoaded', async function() {
  window.buses = await getBuses();
  renderBuses(window.buses);
});

function filterBuses() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filteredBuses = window.buses.filter(bus => {
    const nombre = bus.get('nombre').toLowerCase();
    const origen = bus.get('origen').toLowerCase();
    const destino = bus.get('destino').toLowerCase();
    return nombre.includes(query) || origen.includes(query) || destino.includes(query);
  });
  renderBuses(filteredBuses);
}

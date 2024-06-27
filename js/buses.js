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

function populateSelects(buses) {
  const origins = new Set();
  const destinations = new Set();

  buses.forEach(bus => {
    origins.add(bus.get('origen'));
    destinations.add(bus.get('destino'));
  });

  const originSelect = document.getElementById('select-origen');
  const destinationSelect = document.getElementById('select-destino');

  origins.forEach(origen => {
    const option = document.createElement('option');
    option.value = origen;
    option.textContent = origen;
    originSelect.appendChild(option);
  });

  destinations.forEach(destino => {
    const option = document.createElement('option');
    option.value = destino;
    option.textContent = destino;
    destinationSelect.appendChild(option);
  });
}

function renderBuses(buses, listId) {
  const list = document.getElementById(listId);
  list.innerHTML = ''; // Clear the list before rendering

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
  renderBuses(window.buses, 'directoryList');
  populateSelects(window.buses);
});

function searchBuses() {
  const origin = document.getElementById('select-origen').value;
  const destination = document.getElementById('select-destino').value;

  const filteredBuses = window.buses.filter(bus => {
    const busOrigin = bus.get('origen');
    const busDestination = bus.get('destino');
    return busOrigin === origin && busDestination === destination;
  });

  renderBuses(filteredBuses, 'resultsList');
  showDialog();
}

function showDialog() {
  const dialog = document.getElementById('results-dialog');
  if (dialog) {
    dialog.show();
  }
}

function hideDialog() {
  const dialog = document.getElementById('results-dialog');
  if (dialog) {
    dialog.hide();
  }
}

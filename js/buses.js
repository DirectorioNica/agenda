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
  if (!buses || buses.length === 0) {
    console.log('No se encontraron buses para renderizar.');
    return;
  }

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

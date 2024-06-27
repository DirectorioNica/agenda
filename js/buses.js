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

async function searchBuses() {
  try {
    const origen = document.getElementById('select-origen').value;
    const destino = document.getElementById('select-destino').value;
    const B4aVehicle = Parse.Object.extend('B4aVehicle');
    const query = new Parse.Query(B4aVehicle);

    if (origen) {
      query.equalTo('origen', origen);
    }
    if (destino) {
      query.equalTo('destino', destino);
    }

    const results = await query.find();
    console.log('Resultados de búsqueda:', results); // Log para verificar los resultados de búsqueda
    renderBuses(results);
  } catch (error) {
    console.error('Error en la búsqueda de buses:', error);
  }
}

function renderBuses(buses) {
  const directoryList = document.getElementById('directoryList');
  directoryList.innerHTML = ''; // Limpiar la lista antes de renderizar nuevos resultados

  if (!buses || buses.length === 0) {
    console.log('No se encontraron buses para renderizar.');
    return;
  }

  const listHeader = document.createElement('li');
  listHeader.textContent = 'Buses';
  listHeader.classList.add('w3-large');
  directoryList.appendChild(listHeader);

  buses.forEach(bus => {
    const listItem = document.createElement('li');
    const busInfo = `
      <div>
        <strong>${bus.get('nombre')}</strong><br>
        ${bus.get('origen')} - ${bus.get('destino')}<br>
        Salida: ${bus.get('salida')}<br>
        Llegada: ${bus.get('llegada')}<br>
        <a href="tel:${bus.get('telefono')}">Tel: ${bus.get('telefono')}</a>
      </div>
    `;
    listItem.innerHTML = busInfo;
    listItem.classList.add('w3-padding');
    directoryList.appendChild(listItem);
  });
}

async function populateSelectOptions() {
  try {
    const buses = await getBuses();
    const origins = new Set();
    const destinations = new Set();

    buses.forEach(bus => {
      origins.add(bus.get('origen'));
      destinations.add(bus.get('destino'));
    });

    const selectOrigen = document.getElementById('select-origen');
    const selectDestino = document.getElementById('select-destino');

    // Agregar una opción vacía al principio de los selectores
    const emptyOptionOrigen = document.createElement('option');
    emptyOptionOrigen.value = '';
    emptyOptionOrigen.textContent = 'Todos los orígenes';
    selectOrigen.appendChild(emptyOptionOrigen);

    const emptyOptionDestino = document.createElement('option');
    emptyOptionDestino.value = '';
    emptyOptionDestino.textContent = 'Todos los destinos';
    selectDestino.appendChild(emptyOptionDestino);

    origins.forEach(origen => {
      const option = document.createElement('option');
      option.value = origen;
      option.textContent = origen;
      selectOrigen.appendChild(option);
    });

    destinations.forEach(destino => {
      const option = document.createElement('option');
      option.value = destino;
      option.textContent = destino;
      selectDestino.appendChild(option);
    });
  } catch (error) {
    console.error('Error al llenar las opciones de selección:', error);
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  await populateSelectOptions();
});

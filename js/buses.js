async function getBuses() {
  const Bus = Parse.Object.extend('Buses');
  const query = new Parse.Query(Bus);
  return await query.find();
}

function renderBuses(buses) {
  const listHeader = document.createElement('ons-list-header');
  listHeader.textContent = 'Buses';
  document.querySelector('ons-list').appendChild(listHeader);

  buses.forEach(bus => {
    const listItem = document.createElement('ons-list-item');
    listItem.textContent = bus.get('nombre'); // Asume que tienes un campo 'nombre'
    listItem.setAttribute('tappable', true);
    document.querySelector('ons-list').appendChild(listItem);
  });
}

document.addEventListener('init', function(event) {
  var page = event.target;

  // Lógica para la página 'page1.html'
  if (page.id === 'page1') {
    page.querySelector('#push-button').onclick = function() {
      document.querySelector('#myNavigator').pushPage('info.html');
    };

    // ... más código para la página 'page1.html'
  } 

  // Lógica para la página 'page2.html'
  else if (page.id === 'page2') {
    page.querySelector('#pop-button').onclick = function() {
      document.querySelector('#myNavigator').popPage();
    };

    // ... más código para la página 'page2.html'
  }

  // Lógica para otras páginas...
});

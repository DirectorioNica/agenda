document.addEventListener('init', function(event) {
  var page = event.target;

  if (page.id === 'page1') {
    page.querySelector('#push-button').onclick = function() {
      document.querySelector('#myNavigator').pushPage('info.html');
    };
  } else if (page.id === 'info') {
    page.querySelector('#pop-button').onclick = function() {
      document.querySelector('#myNavigator').popPage();
    };
  }
});

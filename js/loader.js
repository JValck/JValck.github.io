loadNavbar(getCurrentPageName());

function loadNavbar(pageName) {
  $.get('/partials/navbar.html', function (content) {
    $('.navigation').html(content);
    $('#'+pageName).addClass('active');
  }, 'html');
}

function getCurrentPageName() {
  return $('meta[itemprop="pagename"]').attr("content");
}

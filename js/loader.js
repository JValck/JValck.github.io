loadNavbar(getCurrentPageName());

function loadNavbar(pageName) {
  $.get('/partials/navbar.html', function (content) {
    $(content).find('#'+pageName).attr('class','active');
    $('.navigation').html(content);
  }, 'html');
}

function getCurrentPageName() {
  return $('meta[itemprop="pagename"]').attr("content");
}

function getPagination() {

  var rowsShown = 5;
  var rowsTotal = $('#data ul li').length;
  var numPages = rowsTotal/rowsShown;

  if (rowsTotal > rowsShown) {
    $('#data').after ('<div id="navContainer"><a href="#" class="arrow" id="prev"></a><div id="nav"></div><a href="#" class="arrow" id="next"></a> <div class="clear"></div></div>');
  }

  for (i = 0; i < numPages; i++) {
    var pageNum = i + 1;
    $('#nav').append('<a href="#" rel="' + i + '">' + pageNum + '</a> ');
  }

    $('#nav a').on('click', function() {
    $('#nav a').removeClass('active');
    $(this).addClass('active');

    var currPage = $(this).attr('rel');
    var startItem = currPage * rowsShown;
    var endItem = startItem + rowsShown;
    $('#data ul li').css('opacity', '0.0').hide().slice(startItem, endItem)
      .css('display', 'block').animate({
        opacity: 1
      }, 300);
  });


  $("#navContainer .arrow").on("click", function() {
    var currentPage = +$('#nav a.active').attr("rel");
    var prev = this.id === "prev";
    if (currentPage === 0 && prev);
    else if (currentPage === +$('#nav a:last').attr("rel") && !prev);
    else {
      currentPage += prev ? -1 : 1;
      $("#nav a").eq(currentPage).click();
    }
  })

  $("#nav a").eq(0).click();

}

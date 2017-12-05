'use strict';

$(document).ready(function () {
  $('.search-wrapper').on('mouseover', function () {
    $(this).addClass('permahover');
  });
  $('#ic-del').on('click', function () {
    $('#search').val('');
    $('.search-wrapper').removeClass('a-top').removeClass('permahover');
    $('#dis').empty();
    $('#dis').removeClass('set');
  });
  $('#search').keyup(function (e) {
    if (e.which == 13) {
      $('.search-wrapper').addClass('a-top');
      search_call();
      $('#dis').html(" ");
    }
  });
  $('#ic-sr').on('click', function () {
    $('.search-wrapper').addClass('a-top');
    search_call();
    $('#dis').html(" ");
  });
});

var display = function display(data) {
  var pageurl = "https://en.wikipedia.org/?curid=";
  $('#dis').addClass('set');
  for (var i in data) {
    $('#dis').append("<div id='result'><a target='_blank' href='" + pageurl + data[i].pageid + "'><h3>" + data[i].title + "</h3><p>" + data[i].extract + "</p></a></div>");
  }
};
var search_call = function search_call() {
  var input = $('#search').prop('value');
  var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=3&exlimit=max&gsrsearch=" + input + "&callback=?";
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function success(result) {
      var data = result.query.pages;
      display(data);
      console.log(result);
    }
  });
};
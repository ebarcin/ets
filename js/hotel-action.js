const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.getElementById('item');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

var sortType = null;
localStorage.setItem('items', JSON.stringify(itemsArray));


const liMaker = (hotelData) => {
  const li = document.createElement('li');
  li.innerHTML = '<div class="list_container"><button class="delete" data-bs-toggle="modal" data-bs-target="#deleteModal" data-index="'+hotelData.id+'">X</button><div class="list" id="list"><div class="hotel_img"><img src="img/otel.jpg" width="84" height="84" alt="" border="0" /></div><div class="hotel"><p class="hotel_name">' + hotelData.name +'</p><div id="otel1"><p><span class="hotel_rating" id="puan">' + hotelData.point.toFixed(1) +'</span></p><a href="#" class="increase" onclick="arttir(' + hotelData.id +')">PUAN ARTIR</a><a href="#" class="decrease"  onclick="azalt(' + hotelData.id +')">PUAN AZALT</a></div></div><div class="clear"></div></div></div>';
  ul.appendChild(li);
}


form.addEventListener('submit', function (e) {
  e.preventDefault();

  let newHotel = new Object();

  newHotel.name = input.value;
  newHotel.point = 0.0;
  newHotel.id = Math.floor((Math.random() * 100) + 1);
  newHotel.createdAt = new Date();
  itemsArray.push(newHotel);
  localStorage.setItem('items', JSON.stringify(itemsArray));

  input.value = "";

  $('#item').val("");
  $('#btn-add-hotel').addClass("addbtn_success");
  $('#btn-add-hotel').val("EKLENDİ");

});
function textClick() {
  $('#btn-add-hotel').removeClass("addbtn_success");
  $('#btn-add-hotel').val("EKLE");
}

$( document ).ready(function() {
  sortType = $('#sortingBy').val();
  const hotels = JSON.parse(localStorage.getItem('items'));
  hotelList(hotels);
  getPagination();
});

function hotelList(hotels) {

  $("#hotel-list").html("");

  if (sortType == 'pointAsc') {
    hotels = _.sortBy(hotels, 'point');
  } else if (sortType == 'pointDesc') {
    hotels = _.sortBy(hotels, 'point').reverse();
  } else {
    hotels = _.sortBy(hotels, 'createdAt').reverse();
  }

  $.each(hotels, function(index, item) {
    liMaker(item);
  });
}

$( "#sortingBy" ).change(function() {
  sortType = $('#sortingBy').val();
  const hotels = JSON.parse(localStorage.getItem('items'));
  hotelList(hotels);
});

function arttir(id) {
  const hotels = JSON.parse(localStorage.getItem('items'));
  var hotel = _.findWhere(hotels, {id: id});//hotels[index];
  if (hotel.point < 10) {
    hotel.point = hotel.point + parseFloat(0.1);
  }
  localStorage.setItem('items', JSON.stringify(hotels));

  hotelList(hotels);
}
function azalt(id) {
  const hotels = JSON.parse(localStorage.getItem('items'));

  var hotel = _.findWhere(hotels, {id: id});//hotels[index];
  if (hotel.point > 0) {
    hotel.point = parseFloat(hotel.point) - parseFloat(0.1);
  }
  localStorage.setItem('items', JSON.stringify(hotels));

  hotelList(hotels);
}

//modal
$(document).on("click", ".delete", function () {
     var hotelIndex = $(this).data('index');
     $("div#deleteModal #modal-delete-btn").attr("data-index", hotelIndex);
});

$("#modal-delete-btn").on("click", function () {
  var hotelId = $(this).data('index');
  if (hotelId > 0) {
    const hotels = JSON.parse(localStorage.getItem('items'));

    $.each(hotels, function(key, hotel) {
      if (hotel.id == hotelId) {

        hotels.splice(key, 1);

        hotelList(hotels);
        $('#deleteModal').modal('hide');
        $("div#deleteModal #modal-delete-btn").attr("data-index", '');
        localStorage.setItem('items', JSON.stringify(hotels));
        window.location.reload();
      }
    });

    hotelList(hotels);
    $('#deleteModal').modal('hide');
    $("div#deleteModal #modal-delete-btn").attr("data-index", '');
    window.location.reload();
  }

});

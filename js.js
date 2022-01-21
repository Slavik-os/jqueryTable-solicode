// Search bar 
$(document).ready(function(){
    $("#myInput").on("keyup", function() { // event listnner on typing
      var value = $(this).val().toLowerCase(); // set everything to lower case
      $("#myTable tr").filter(function() { // filter all the cases from filltering data provided
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1) // remove the indexes of none found items
      });
    });
  });


// display json

$(document).ready(function(){
    $.getJSON('data.json',(data)=>{
    $.each(data, function(idx, elem){
        $('#myTable').append("<tr class='table-row'><th scope='row' class='table-data'>"+elem.id+"</th><td class='table-data'>"+elem.info.brand_name+"</td> <td> <img class='thumbnail' src='"+elem.info.thumbnail+"'></td> <td class='table-data'>" + elem.info.description+"</td> <td class='table-data'>"+elem.info.price+"$</td> <td class='table-data'>"+elem.info.categorie+"</td> <td class='table-data'>"+elem.info.availibility+"</td> <td class='table-data'>"+elem.info.supplier[0]+"</td> <td class='table-data'>"+elem.info.supplier[1]);
    });
});
})


// Sort table
var properties =[           // select all th from table to click
  'ID',
  'Brand',
  'Thumnail',
  'Description',
  'Price',
  'Categorie',
  'Stock_status',
  'Supplier',
  'Supply_Date'
];

$.each( properties, function( i, val ) { // for each elemen in th list
  var orderClass = '';

  $("#" + val).click(function(e){
      e.preventDefault();
      $('.filter__link.filter__link--active').not(this).removeClass('filter__link--active'); // insure that the columns doesnt contain only nums 
        $(this).toggleClass('filter__link--active');
         $('.filter__link').removeClass('asc desc'); // keep track if the sorting is asciding or descending

         if(orderClass == 'desc' || orderClass == '') { // if sorting is --
              $(this).addClass('asc'); // add this class of ascending ++ 
              orderClass = 'asc';
         } else {
             $(this).addClass('desc'); // else --
             orderClass = 'desc';
         }

      var parent = $(this).closest('.header__item'); // Get the child elements of tbody
      var index = $(".header__item").index(parent); // get index number of parrent (TH)
      var $table = $('.table-content');
      var rows = $table.find('.table-row').get();
      var isSelected = $(this).hasClass('filter__link--active'); // sort by string
      var isNumber = $(this).hasClass('filter__link--number'); // sort by number
          
      rows.sort(function(a, b){

          var x = $(a).find('.table-data').eq(index).text(); // get text of td
          var y = $(b).find('.table-data').eq(index).text(); // get text of td to compare
              
          if(isNumber == true) { // if the TD is number
                      
              if(isSelected) {
                  return x - y;
              } else {
                  return y - x;
              }

          } else {
          
              if(isSelected) {		 // if the TD is string
                  if(x < y) return -1;
                  if(x > y) return 1;
                  return 0;
              } else {
                  if(x > y) return -1;
                  if(x < y) return 1;
                  return 0;
              }
          }
          });

      $.each(rows, function(index,row) {
          $table.append(row); // append each row back to the table again
      });

      return false; // if something went wrong return nothing . 
  });

});

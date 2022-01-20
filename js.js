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
        $('#myTable').append("<tr class='table-row'><th scope='row' class='table-data'>"+elem.id+"</th><td class='table-data'>"+elem.info.brand_name+"</td> <td> <img class='thumbnail' src='"+elem.info.thumbnail+"'></td> <td class='table-data'>" + elem.info.description+"</td> <td class='table-data'>"+elem.info.price+"</td> <td class='table-data'>"+elem.info.categorie+"</td> <td class='table-data'>"+elem.info.availibility+"</td> <td class='table-data'>"+elem.info.supplier[0]+"</td> <td class='table-data'>"+elem.info.supplier[1]);
        console.log(typeof(elem.id))
    });
});
})


// Sort table

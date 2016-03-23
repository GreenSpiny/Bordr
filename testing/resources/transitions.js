var page = 0;

// Function to change device pages
function goToPage(num) {

  // Change to a given page
  $(".page").each(function(){
    if ($(this).val() == num) {
      $(this).show();
    }
    else {
      $(this).fadeOut(500);
    }
  });
  
  // Reduce / Enlarge header
  var scroll = $("#header").height() * -0.621;
  $("#header").animate({top: scroll}, 1000);
  $(".page").animate({top: scroll}, 1000);
}

$(document).ready(function() {

  // Resize the window
  $(window).resize(function() {
    if (page != 0) {
      var scroll = $("#header").height() * -0.621;
      $("#header").animate({top: scroll}, 0);
      $(".page").animate({top: scroll}, 0);
    }
  });

  // Login -> Homepage
  $("#loginBTN").click(function(){
    goToPage(1);
  });
  
});
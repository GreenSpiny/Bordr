var page = 0;
var imageRatio = 0.621;

// Document functions --- o
$(document).ready(function() {

  // Resize the window
  $(window).resize(function() {
    if (page > 0) {
      scroll("up",0);
    }
    else {
      scroll("down",0);
    }
  });

  // Login -> Homepage
  $("#loginBTN").click(function(){
    goToPage(1);
  });
  
});

// Helper functions --- o
function goToPage(num) {

  $(".page").each(function(){
    if ($(this).val() == num) {
      $(this).show();
    }
    else {
      $(this).fadeOut(500);
    }
  });
  
  page = num;
  
  if (page > 0) {
    scroll("up",1000);
  }
  else {
    scroll("down",1000);
  }
}

function scroll(direction, duration) {
  if (direction == "up") {
      var scroll = $("#header").height() * -imageRatio;
      $("#header").animate({top: scroll}, duration);
      $(".page").animate({top: scroll}, duration);
  }
  else {
      $("#header").animate({top: 0}, duration);
      $(".page").animate({top: 0}, duration);
  }
}
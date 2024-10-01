$(document).ready(function () {
  // This function runs when the document is fully loaded
  $(".league-buttons").each(function () {
    // Loop through each element with the class 'league-buttons'
    if ($(this).val() === currentLeague) {
      // If the value of the button matches the current league, add the 'active' class
      $(this).addClass("active");
    }
  });

  // Add a click event handler to elements with the class 'league-buttons'
  $(".league-buttons").click(function () {
    // Remove the 'active' class from all buttons
    $(".league-buttons").removeClass("active");
    // Add the 'active' class to the button that was clicked
    $(this).addClass("active");
  });
});

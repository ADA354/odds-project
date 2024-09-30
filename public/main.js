$(document).ready(function () {
  $(".league-buttons").each(function () {
    if ($(this).val() === currentLeague) {
      $(this).addClass("active");
    }
  });

  $(".league-buttons").click(function () {
    $(".league-buttons").removeClass("active");
    $(this).addClass("active");
  });
});

$(function () {
  let check = 0;
  console.log(check);
  $("#btn").click(function () {
    if ($(window).width() < 1250) {
      if (check == 0) {
        $("#btn").removeClass("change");
        $(".menuWrap").animate({ left: "100%" }, 500);
        check = 1;
      } else {
        $("#btn").toggleClass("change");
        $(".menuWrap").animate({ left: "0%" }, 500);
        check = 0;
      }
    }
  });

  let isOn = 0;
  $("#nav>li").click(function () {
    if ($(window).width() < 1250) {
      $(this)
        .find(".sub")
        .stop()
        .slideToggle(500)
        .parents()
        .siblings()
        .find(".sub")
        .slideUp();

      let i = $(this).index();
      if (isOn != i) {
        $("#nav>li>a>span").removeClass("on2");
      }
      $(this).find("a>span").toggleClass("on2");
      isOn = i;
    }
  });
});

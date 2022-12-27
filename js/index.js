$(function () {
  // scroll event
  $(".wheel").on("mousewheel", function (e) {
    e.preventDefault();
    let present = $(window).scrollTop();
    console.log(present);

    let d = e.originalEvent.wheelDelta;
    console.log(d);

    if (d > 0) {
      try {
        let prev = $(this).prev().offset().top;
        $("html, body").stop().animate({ scrollTop: prev }, 1000);
      } catch (e) {
        return false;
      }
    } else {
      if (present == 0) {
        console.log(present);
        $("html, body")
          .stop()
          .animate({ scrollTop: 280 }, 1000, function () {
            present = 280;
          });
      } else {
        try {
          let next = $(this).next().offset().top;
          if (next == 0) {
            return false;
          }
          $("html, body").stop().animate({ scrollTop: next }, 1000);
        } catch (e) {
          return false;
        }
      }
    }
  });

  // fade-in,fade-out
  $("#mainBanner").each(function () {
    let slides = $(this).find(".bannerWrap>div"),
      slideConnt = slides.length,
      currentIndex = 0;

    slides.eq(currentIndex).css("opacity", 1);

    setInterval(showNextSlide, 5000);

    function showNextSlide() {
      let nextIndex = (currentIndex + 1) % slideConnt;

      slides.eq(currentIndex).css("opacity", 1);

      slides.eq(nextIndex).css("opacity", 0);

      $(".banText")
        .eq(currentIndex)
        .addClass("active")
        .siblings()
        .removeClass("active");

      currentIndex = nextIndex;
    }
  });

  //topSale slide
  let list = $(".topSaleUl");
  let length = list.children().length;
  let innerSize = 600;
  let topCount = 4;

  list.css("width", (100 * length) / topCount + "%");

  let listWidth = list.children().outerWidth();
  console.log(listWidth);

  //next
  $(".topArrow").click(function () {
    list.animate({ left: -listWidth + "px" }, 500, function () {
      $(this).append($(this).find("li:first"));
      $(this).css("left", 0);
    });
  });

  // trend Center slide
  let list2 = $(".trend");

  let length2 = list2.children().length;
  console.log(length2);
  let time2;

  let topCount2 = 3;
  list2.css("width", (100 * length2) / topCount2 + "%");

  let listWidth2 = list2.children().outerWidth();
  console.log(listWidth2);

  //next
  $(".rightBtn").click(function () {
    list2.animate({ left: -listWidth2 + "px" }, 500, function () {
      $(this).append($(this).find(">div:first"));
      $(this).css("left", 0);
    });
  });

  interval2();
  function interval2() {
    time2 = setInterval(function () {
      $(".rightBtn").trigger("click");
    }, 5000);
  }

  let winWidth = $(window).width();

  function resizeInit() {
    if (winWidth > innerSize) {
      topCount2 = 3;
      topCount = 4;
    } else {
      topCount2 = 2;
      topCount = 2;
    }
    list.css("width", (100 * length) / topCount + "%");
    list2.css("width", (100 * length2) / topCount2 + "%");
    listWidth = list.children().outerWidth();
    listWidth2 = list2.children().outerWidth();
  }

  resizeInit();

  $(window).on("resize", function () {
    resizeInit();
  });

  //newWrap height
  $(".newsWrapUl>li").on({
    mouseover: function () {
      let i = $(this).index();
      $(".newsWrapUl>li").eq(i).addClass("on").siblings().removeClass("on");
      console.log(i);
    },
  });

  // hamberger
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

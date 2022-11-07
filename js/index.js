$(function(){
    // scroll event
    $('.wheel').on('mousewheel', function(e){ //임의로 e, d로 설정
    // 마우스 휠 이벤트는 파라미터 2개 받아서 처리
    // 첫번째 파라미터(e) : 이벤트 객체
    //e.originalEvent.wheelDelta : 마우스의 움직임을 감지
    //                              d<0 : 마우스휠을 내림 (-120)
    //                              d>0 : 마우스휠을 올림 (120)
        e.preventDefault(); //기본 이벤트 실행을 방지 : scroll발생 방지
        let present = $(window).scrollTop();
        console.log(present);

        let d = e.originalEvent.wheelDelta;
        // var scrollBottom = $('.wheel').height() - $(window).height() - $(window).scrollTop();
        console.log(d);
        if(d>0){ //마우스휠을 올렸을 경우
            try{
                let prev = $(this).prev().offset().top;
                $('html, body').stop().animate({scrollTop: prev}, 1000);
            } catch(e) {
                return false;
            }
        } else { //마우스휠을 내렸을 경우
            if(present ==0){
                console.log(present);
                $('html, body').stop().animate({scrollTop: 280}, 1000,function(){
                    present = 280;
                });
            } else{
            try{
                let next = $(this).next().offset().top;
                if(next==0){
                    return false;
                }
                $('html, body').stop().animate({scrollTop: next}, 1000);
            } catch(e) {
                return false;
            }
        }
        }
    });



    // fade-in,fade-out
   $('#mainBanner').each(function(){
        let slides = $(this).find('.bannerWrap>div'),
            slideConnt = slides.length,
            currentIndex = 0;
            
            //fadein fadeout 화면 줄였을때 멀쩡하도록 opacity값 준다
            slides.eq(currentIndex).css("opacity",1);
            //3초마다 showNextSlide 함수 반복 처리
            setInterval(showNextSlide, 5000);

            function showNextSlide(){
                //다음에 표시할 슬라이드 인덱스를 구한 nextIndex
                // 0%4=0, 1%4=1, 2%4=2, 3%4=3, 4%4=0
                let nextIndex = (currentIndex+1)%slideConnt; //나머지값을 구함

                //현재 슬라이드 fadeOut
                slides.eq(currentIndex).css("opacity",1);
                //다음 슬라이드 fadeIn
                slides.eq(nextIndex).css("opacity",0);

                $('.banText').eq(currentIndex).addClass('active').siblings().removeClass('active');

                //현재 슬라이드를 업데이트
                currentIndex= nextIndex;
            }
        });

        //topSale slide
        let list = $('.topSaleUl');
        let length = list.children().length;
        let topCount = 4;
        //.topSaleUl>li의 넓이와 높이를 설정
        list.css('width', 100 * length /topCount+ '%');
        // console.log(listWidth);
        let listWidth = list.children().outerWidth();
        console.log(listWidth);
    
        //next버튼을 클릭했을 경우
        $('.topArrow').click(function () {
            //animate({}, time, function(){}); 애니메이션이 실행된 다음 function블록의 실행
            list.animate({ left: -listWidth + 'px' }, 500, function () {
                //append : 새로운 태그를 만들어서 append하면 추가가 되지만
                // 기존에 선택자를 append하면 이동된다 (복사가 안됨)
                $(this).append($(this).find('li:first'));
                // $(this).find('img:first').remove();
                $(this).css('left', 0);
            });
        });

        // trend Center slide
        let list2 = $('.trend');

        let length2 = list2.children().length;
        console.log(length2);
        let time2;
    
        let topCount2 = 3;
        //.trend>div의 넓이와 높이를 설정
        list2.css('width', 100 * length2 /topCount2 + '%');

        let listWidth2 = list2.children().outerWidth();
        console.log(listWidth2);

        //next버튼을 클릭했을 경우
        $('.rightBtn').click(function () {
            //animate({}, time, function(){}); 애니메이션이 실행된 다음 function블록의 실행
            list2.animate({ left: -listWidth2 + 'px' }, 500, function () {
                //append : 새로운 태그를 만들어서 append하면 추가가 되지만
                // 기존에 선택자를 append하면 이동된다 (복사가 안됨)
                $(this).append($(this).find('>div:first'));
                // $(this).find('img:first').remove();
                $(this).css('left', 0);
            });
        });

        interval2();
        function interval2() {
            time2 = setInterval(function () {
                $('.rightBtn').trigger('click');
            }, 5000);
        }

        //newWrap height
        $('.newsWrapUl>li').on({
            "mouseover": function(){
                let i = $(this).index();
                $('.newsWrapUl>li').eq(i).addClass('on').siblings().removeClass('on');
                console.log(i);
            }
        });

        //모바일 햄버거 처리
        // 1. 햄버거 모양 x로 바뀜
        let check=0;
        console.log(check);
        $("#btn").click(function(){
            if($(window).width() < 1250) {
                if(check==0){ //메뉴가 보이지 않는 상태
                    $('#btn').removeClass('change');
                    $(".menuWrap").animate({left:'100%'}, 500);
                    check=1; //메뉴 보이는 상태로 바꿔줌
                } else {
                    $("#btn").toggleClass('change');
                    $(".menuWrap").animate({left:'0%'}, 500);
                    check=0; //메뉴 보이는 상태로 바꿔줌
                }
            }
        });
        //메뉴를 클릭했을때 서브메뉴가 보여지게 처리
        let isOn=0; //이전에 선택 메뉴의 index
        $("#nav>li").click(function(){
            if($(window).width() < 1250) {
                $(this).find('.sub').stop().slideToggle(500)
                   .parents().siblings().find('.sub').slideUp();

                //다른 메뉴를 선택했을 경우 a>span태그에 on클래스를 삭제 필요
                let i = $(this).index(); //지금 클릭한 메뉴의 index
                if(isOn != i) {
                    $('#nav>li>a>span').removeClass('on2');
                }
                $(this).find('a>span').toggleClass('on2');
                isOn = i;
            }
        });
});
$(function(){
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

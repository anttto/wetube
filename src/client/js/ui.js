$(function(){
    $('html, body').stop().animate({
        scrollTop: 0
    }, 100 );
    setTimeout(function(){ initGameInfo();}, 100);
    
    initImg(); //이미지 노출

    $(window).scroll(function(){
        var scrollVal = $(document).scrollTop();
        if ( scrollVal >= 60 ) {
            $('.go-top').fadeIn(0);
            TweenMax.to('.go-top', 0.3,{y:-40, opacity:1});
        } else {
            TweenMax.to('.go-top', 0.3,{y:40, opacity:0});
            $('.go-top').fadeOut(100);
        }
    });

   /* setLanguage
   var lang = document.documentElement.lang;
   if ( lang == "zh-TW" ) lang = "tw";
   if ( lang == "zh-CN" ) lang = "cn";
    */
   setLanguage(lang);
});

//얼음 깨기  (item: 아이템명 / msg: 팝업메시지)
function iceBreak(item, msgNum, callback){
    var $ice = $(".bingo-wrap li").eq(item - 1);
    $ice.css({"z-index":10});
    TweenMax.to($ice, 0.05, {y:-6, yoyo:true, repeat:21, onComplete: function(){
        $ice.append('<span class="block1"></span><span class="block2"></span><span class="block3"></span>');
        TweenMax.fromTo('.block1', 0.7, {y:0, opacity:1}, {y:-20, opacity:1});
        TweenMax.fromTo('.block2', 0.7, {x:0, y:0, opacity:1}, {x:-20, y:20, opacity:1});
        TweenMax.fromTo('.block3', 0.7, {x:0, y:0, opacity:1}, {x:20, y:20, opacity:1, onComplete: function(){
                //팝업 함수 호출
                popup('.popup.alert', bingoReward[item], msg[msgNum]);
                $ice.css({"z-index":1}).find("span").remove();
                fnCall(callback); //결과 데이터 반영 콜백
        }});
    }});
}

//결과 데이터 반영 콜백
function fnCall(callback){
    setTimeout(function(){
        $(".popup .popup-inner .btn-confirm").attr("onclick",'popupClose(this);'+callback+'();')
    }, 100);
}


function setLanguage(currentLanguage) {  
   $('[data-langNum]').each(function() {
      var $this = $(this); 
      $this.html($.lang[currentLanguage][$this.data('langnum')]); 
   });    
}

function initImg(){
    $("#header .evt-img").each(function(){
      var evtImg = $(this).data("img");
      var alt = $(this).next(".evt-desc").find(".tit").text();
      var describedby = $(this).next(".evt-desc").attr("id");
      $(this).html('<img src="'+evtImg+'" alt="'+alt+'" aria-describedby="'+describedby+'">');
    });

    $("section .evt-img").each(function(){
      var evtImg = $(this).data("img");
      $(this).html('<img src="'+evtImg+'">');
    });
}

function goToSec(target){
    var targetPos = $('.' + target).offset().top;
    $('html, body').stop().animate({
        scrollTop: targetPos
    }, 500);
}

var posY;
function popup(obj,item,msgNum) {
    posY = $(window).scrollTop();
   $("body").addClass("dimmed");
    $("#wrapper").css("top",-posY);
    $(obj).addClass("show");
    $(obj).find("p").html(msgNum);
    $(obj).find(".item-name").text(item);
}

function popupClose(that) {
    $("body").removeClass("dimmed").unbind('touchmove');
    $(".popup .popup-inner p").empty();
   var obj = typeof(that); //this == "object"
   if ( obj == "object" ){
      $(that).parents('.popup').removeAttr("style").removeClass("show");
        $(that).parents('.popup-char').removeAttr("style").removeClass().addClass('popup-char');
        $(that).parents('.popup').find('span').removeClass();
   } else {
      $(that).removeAttr("style").removeClass("show");
   }
   posY = $(window).scrollTop(posY);

    if($(that).parents('.popup').hasClass("game-result")){
        init();
    }
    
    $(".popup .popup-inner .btn-confirm").attr("onclick",'popupClose(this);')
}


// 언어팩 선언
// 언어팩 선언
$.lang = {};
$.lang.ko = {
    0: '마술양품점 - 아이스 BINGO!',
    1: '8월 2차 EVENT 아이스 BINGO!',
    2: '일일 미션을 해결하여 빙고 티켓을 모아 빙고를 완성해주세요! 빙고를 완성할 수록 더 큰 보상이 준비되어 있습니다!',
    3: '기간: ~ 2021년 9월 1일 (수) 15:00까지',
    4: '빙고 티켓 획득 미션',
    5: '매일 하루에 한번 티켓 획득하기!',
    6: '5,000골드 사용하기',
    7: '티켓 획득',
    8: '아이스 빙고판',
    9: '나의 빙고 티켓 현황',
    10: '보상 받기 클릭 시, 빙고 티켓 1개가 사용됩니다.',
    11: '5,000 골드',
    12: '탐험 나침반 3개',
    13: '★3~5 의상 랜덤 상자 2개',
    14: '★3 마법석 상자 1개',
    15: '암시장 구매 횟수 추가 티켓 2개',
    16: '★3 강화 재료 상자 1개',
    17: '1,000 골드 뽑기 티켓',
    18: '★2-★4 인형 랜덤 상자 1개',
    19: '★3~5 의상 랜덤 상자 2개',
    20: '16색 염색 이용권 2개',
    21: '의뢰 도움 요청 횟수 추가 티켓 2개',
    22: '탐험 나침반 3개',
    23: '1,000 골드 뽑기 티켓',
    24: '★3 마법석 상자 1개',
    25: '★3 강화 재료 상자 1개',
    26: '5,000 골드',
    27: '얼음 깨기',
    28: '빙고 완성 보너스',
    29: '2회 참여 - ★2~4 인형 랜덤 상자 1개',
    30: '4회 참여 - ★2~4 인형 랜덤 상자 2개',
    31: '6회 참여 - ★2~4 인형 랜덤 상자 3개',
    32: '8회 참여 - ★2~4 인형 랜덤 상자 5개',
    33: '보상 받기',
    34: '빙고 티켓 교환',
    35: '남은 빙고 티켓은 나침반으로 교환해 줄게!',
    36: '티켓 교한 하기',
    37: '꼭 읽어주세요!',
    38: '<li>빙고 티켓은 초기화되지 않으며 이벤트 기간에만 사용 가능합니다.</li><li>빙고 티켓은 일일 사용 제한 없으며, 보유 수량 만큼 사용이 가능합니다.</li><li>빙고 티켓 획득 미션은 매일 00시에 초기화됩니다.</li><li>모든 보상은 \'보상 받기\' 버튼 클릭 시 우편함으로 지급됩니다.</li><li>이벤트에 대한 문의사항은 1:1 문의를 통해 접수 부탁 드립니다.</li>',
    99: '확인',
};

var lang = document.documentElement.lang;
switch (lang) {
   case 'ko':
      var msg = [
         // 공통 문구(수정 X)
         "오류가 발생하였습니다.<br>[설정]-[고객 지원]으로 접속해 문의해주세요.",
         "보안 이슈로 이벤트 페이지 재접속 부탁 드립니다.<br>불편을 드린 점 양해 부탁 드립니다.",
         "일시적 오류가 발생했습니다. <br>잠시 후에 다시 시도해 주세요.",
         "일시적 오류가 발생했습니다. <br>게임을 재실행 합니다.",

         // 이벤트 문구
            "아직 티켓을 획득할 수 없습니다.<br>미션 내용을 확인해 주세요!",
            "<em class=\"point-c\">빙고 티켓 1개 획득!</em><br>빙고판으로 이동하여 사용해 주세요!",
            "이미 티켓을 획득한 미션입니다.<br>내일 다시 참여해 주세요!",

            "<em class=\"item-name\"></em> 획득!<br>우편함에서 보상을 확인해 주세요!",
            "티켓이 부족하여 얼음을 깰 수 없어요!<br>미션을 통해 <em class=\"point-c\">빙고 티켓</em>을 획득해 주세요!",
         "빙고 완성 횟수가 부족해요!<br>조건을 확인해 주세요!",
            
            "탐험 나침반 x <em class=\"item-name\"></em> 교환 완료!<br>우편함에서 보상을 확인해 주세요!",
            "빙고판을 모두 완성한 이후부터<br>티켓을 교환하실 수 있습니다.",
            "교환 가능한 티켓이 없습니다!<br>빙고 티켓 현황을 확인해 주세요!"
        ];

        //빙고 보상
        var bingoReward = [
            "",
            "[5,000 골드]",
            "[탐험 나침반 3개]",
            "[★3~5 의상 랜덤 상자 2개]",
            "[★3 마법석 상자 1개]",
            "[암시장 구매 횟수 추가 티켓 2개]",
            "[★3 강화 재료 상자 1개]",
            "[1,000 골드 뽑기 티켓]",
            "[★2-★4 인형 랜덤 상자 1개]",
            "[★3~5 의상 랜덤 상자 2개]",
            "[16색 염색 이용권 2개]",
            "[의뢰 도움 요청 횟수 추가 티켓 2개]",
            "[탐험 나침반 3개]",
            "[1,000 골드 뽑기 티켓]",
            "[★3 마법석 상자 1개]",
            "[★3 강화 재료 상자 1개]",
            "[5,000 골드]"
        ];

        //빙고 완성 보상
        var totalReward = [
            "",
            "[10,000 골드]",
            "[400 리치 뽑기 티켓]",
            "[600 리치 뽑기 티켓]",
            "[1,000 리치 뽑기 티켓]"
        ];
      break;
   default:
      console.log('Sorry, we are out of ' + lang + '.');
}
$(function () {
    $('.hamburger-menu').on('click', function() {
        $('.hamburger-menu').toggleClass('active'); // hamburger-menuクラスのdivにactiveクラスを追加
        if ($(this).hasClass('active')) {
            // メニューが非アクティブな状態であれば、画面の上に表示する
            $('.hamburger-menu-content').css('display', 'flex').animate({ 'opacity': '1'}, 100);
        } else {
            // メニューがアクティブな状態であれば、画面の下に隠す
            $('.hamburger-menu-content').animate({ 'opacity': '0'}, 300, function() {
                $(this).css('display', 'none');
            });
        }
    });

});


$(function () {
  //bigVideo
  var BV = new $.BigVideo();
  BV.init();
  BV.show(["../AI_forum//img/tokyo.mp4", "../AI_forum//img/tokyo02.mp4", "../AI_forum//img/tokyo03.mp4", "../AI_forum//img/tokyo04.mp4"], { ambient: true });
   
  });
  

/*sliderニュースティッカー*/
var slider;
var sliderFlag = false;
var breakpoint = 768; //768px以下の場合

function sliderSet() {
    var windowWidth = window.innerWidth;
    if (!sliderFlag) { // すべての画面サイズで1行表示
        slider = $('.slider').bxSlider({
            touchEnabled: false, //リンクを有効にするためスライドをマウスでドラッグした際にスライドの切り替えを可能にする機能を無効化
            mode: 'vertical', //横スライドに設定
            controls: false, //前後のコントロールを表示させる。
            auto: 'true', //自動的にスライド
            pager: false, //ページ送り無効化
            minSlides: 1, //最小表示スライド数を1に設定
            maxSlides: 1, //最大表示スライド数を1に設定
            moveSlides: 1, //一度に動かすスライド数
            speed: 500, // 500ミリ秒でスライド遷移
            pause: 20000 // 各スライドの表示時間を3000ミリ秒（3秒）に設定
            
        });
        sliderFlag = true;
    } else if (windowWidth < breakpoint && !sliderFlag) {
        slider.reloadSlider(); //bxSliderのOptionであるreloadSliderを使用してスライダーの設定を再読み込み
    }
}

$(window).on('load resize', function() {
    sliderSet();
});


/*textエフェクト*/
var arr = []
//初期値の設定
function TypingInit() {
    $('.js_typing').each(function (i) { //js_typingクラスを全て処理をおこなう
        arr[i] = new ShuffleText(this);//動作させるテキストを配列に格納
    });
}
//スクロールした際のアニメーションの設定
function TypingAnime() {
    $(".js_typing").each(function (i) {
        var elemPos = $(this).offset().top - 50;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            if(!$(this).hasClass("endAnime")){//endAnimeのクラスがあるかチェック
                arr[i].start();//配列で登録テキストのアニメーションをおこなう
                arr[i].duration = 1200;//テキストが最終変化するまでの時間※規定値600
                $(this).addClass("endAnime");//１度アニメーションした場合はendAnimeクラスを追加
            }
        }else{
            return false;
        }
    });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    TypingAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    TypingInit(); //初期設定
    TypingAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

// 定期的にエフェクトを再生する
setInterval(function() {
    TypingAnime();
}, 5000); // 5000ミリ秒（5秒）ごとにエフェクトを再生



/*TextTypingというクラス名がついている子要素（span）を表示から非表示にする定義 */
function TextTypingAnime() {
  $('.TextTyping').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var thisChild = "";

    if (scroll >= elemPos - windowHeight) {
      thisChild = $(this).children(); //spanタグを取得
      //spanタグの要素の１つ１つ処理を追加
      thisChild.each(function (i) {
        var time = 200;
        //時差で表示する為にdelayを指定しその時間後にfadeInで表示させる
        $(this).delay(time * i).fadeIn(time);
      });
    } else {
      thisChild = $(this).children();
      thisChild.each(function () {
        $(this).stop(); //delay処理を止める
        $(this).css("display", "none"); //spanタグ非表示
      });
    }
  });
}

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  // 3秒待ってから TextTypingAnime 関数を実行
  setTimeout(TextTypingAnime, 3000);

  //spanタグを追加する
  var element = $(".TextTyping");
  element.each(function () {
    var text = $(this).html();
    var textbox = "";
    text.split('').forEach(function (t) {
      if (t !== " ") {
        textbox += '<span>' + t + '</span>';
      } else {
        textbox += t;
      }
    });
    $(this).html(textbox);

  });
});

// 画面をスクロールしたら動かしたい場合の記述
$(window).scroll(function () {
  TextTypingAnime();/* アニメーション用の関数を呼ぶ*/
});

/*videoのテキストアニメーション*/
$(window).on('load', function() {
  setTimeout(function() {
    $('.video-container .TextTyping').addClass('animate');
  }, 1500); // Set the delay to 1000 milliseconds (1 second)
});


/*hover mailblock*/
$(document).ready(function(){
  $(".mailbox").hover(function(){
    $(this).find(".regular").hide();
    $(this).find(".img_hover").show();
  }, function(){
    $(this).find(".regular").show();
    $(this).find(".img_hover").hide();
  });
});



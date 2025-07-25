import $ from "jquery";

/* アンカーリンクのスムーススクロール */
$('a[href^="#"]').on('click', function() {
  var speed = 400;
  var offset = 0;
  var $this = $(this);
  var href = $this.attr("href");
  var target = $(href == "#" || href == "" ? 'html' : href);
  var position = target.offset().top - offset
  $('body,html').animate({scrollTop:position}, speed, 'swing');
  return false
});

/**
 * スクロール上下を判定
 */
var onceProcessScrollEvent = function() {
    var timer = false;
    var scroll_top = $(window).scrollTop();
    $(window).on('scroll', function(){
        if (timer !== false) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            var current_position = $(this).scrollTop();
            if (current_position > scroll_top) {
                $('body').removeClass('scroll_up').addClass('scroll_down');
            } else {
                $('body').removeClass('scroll_down').addClass('scroll_up');
            }
            scroll_top = current_position;
        }, 50);
    });
}

/**
 * ブラウザ領域内に表示されたらクラス追加
 * @param {selector} elm 
 * @param {string} activeClass 
 * @param {int} offset 
 */
function viewportInAddClass(elm,activeClass,offset){
  var activeClass = typeof activeClass !== 'undefined' ?  activeClass : 'active';
  var offset = typeof offset !== 'undefined' ?  offset : 0;
  var timer = false;
  
  $(window).on('scroll load',function () {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      $(elm).each(function(i,e){
          var $scrollBottom = $(window).scrollTop() + $(window).height() - offset;
          var $trigger = $(this).offset().top;
          if( $scrollBottom > $trigger) {
              $(this).addClass(activeClass);
          } 
      });
    }, 16); // 60fps対応
  });
}

/**
 * スクロールするとフェードイン
 * @param {selector} e 
 */
function scroll_to_fadein(e) {
  var $elm = $(e);
  $elm.hide();
  var timer = false;
  
  $(window).on('scroll load',function () {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      if ($(window).scrollTop() > 200) {
        $elm.fadeIn();
      } else {
        $elm.fadeOut();
      }
    }, 16);
  });
}


/**
 * 指定要素にStickyする
 * @param {String} element 
 * @param {String} target 
 * @param {Number} offset 
 */
function sticky(element,target,offset) {
  var $elm = $(element);
  var $btn = $elm.children();
  var offset = typeof offset !== 'undefined' ?  offset : 0;
  var timer = false;
  
  $(window).on('scroll load',function () {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      var $w = $(window);
      var $target = $(target);
      if ($target.length === 0) return;
      
      var $stickyTarget = $target.offset().top;
      var $trigger = $w.scrollTop() + $w.height();
      var sticky_scrolled = $trigger > $stickyTarget ? true : false;
      if(sticky_scrolled) {
          var $stickyPosition = $trigger - $stickyTarget + offset;
          $elm.css('bottom', $stickyPosition);
      } else {
          $elm.attr('style','');
      }
    }, 16);
  });
}


/**
 * scrollで要素が画面頂点に到達したらclassを追加
 * @param {selector} el 
 * @param {string} classname 
 */
function scrollTopAddClass(el,classname) {
  var $element = $(el);
  var offset = 0;
  
  // 初期化時の処理
  function updateClass() {
    if ($element.length === 0) return;
    
    var default_position = $element.offset().top;
    if($(window).scrollTop() > default_position + offset) {
        $element.addClass(classname);
    } else {
        $element.removeClass(classname);
    }
  }
  
  // 初回実行
  updateClass();

  var timer = false;
  $(window).on('scroll load', function(){
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      updateClass();
    }, 50);
  });
}


export const scroll = {
  onceProcessScrollEvent,
  viewportInAddClass,
  scroll_to_fadein,
  sticky,
  scrollTopAddClass
};
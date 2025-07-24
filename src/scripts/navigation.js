import $ from "jquery";
export function navigation() {
/**
 * メニュー (Mobile)
 */
$(function() {
    var navElement = '#js-toggleMenu';
    var $body = $('body');
    var $button = $('<button type="button" class="c-menu__button">');
    var $overlay = $('<div class="c-menu__overlay">').appendTo('body').hide();
    $overlay.css({
        'top': 0,
        'bottom': 0,
        'right': 0,
        'left': 0,
        'position': 'fixed',
        'z-index': 99,
        'background-color': 'rgba(0, 0, 0, 0.8)'
    });
  
    var $navAside = {
        'main': $(navElement),
        'container': $(navElement).find('nav'),
        'close': ''
    }
    
    var openClass = 'open';
    var bodyClass = 'menu-open';
    var openText = 'メニューを開く'
    var closeText = 'メニューを閉じる'
    
  
    $navAside['main'].prepend($button);

    // WAI-ARIA setting
    var ariaControlsID = 'aside-nav'
    $(navElement).find('nav').attr({
        'id': ariaControlsID,
        'aria-hidden': true
    });
    $button.attr({
        'aria-expanded': false,
        'aria-controls': ariaControlsID
    }).text(openText);

    if( $navAside['main'].hasClass(openClass) ) {
        menuOpen();
        windowScrollLock(true);
    }

    $button.on('click', function(){
        if ( $navAside['main'].hasClass(openClass) ) {
            menuClose();
            windowScrollLock(false);
        } else {
            menuOpen();
            windowScrollLock(true);
        }
        return false
    });


    function menuOpen(){
        $navAside['main'].addClass(openClass);
        $navAside['container'].attr({
            'aria-hidden': false
        });
        $button.addClass(openClass).attr({
            'aria-expanded': true
        }).text(closeText);
        $body.addClass(bodyClass);
        $overlay.fadeIn();
    }

    function menuClose(){
        $navAside['main'].removeClass(openClass);
        $navAside['container'].attr({
            'aria-hidden': true
        });
        $button.removeClass(openClass).attr({
            'aria-expanded': false
        }).text(openText);
        $body.removeClass(bodyClass).attr('style','');
        $overlay.fadeOut();
    }

    var openedPosition;

    /**
     * メニューOPEN時スクロールさせない（iOS対応）
     * @param {boolean} isOpen 
     */
    function windowScrollLock(isOpen){
        if(isOpen) {
            openedPosition = $(window).scrollTop();
            $body.css({'width':'100%', 'position':'fixed', 'top': -(openedPosition)});
        } else {
            $(window).scrollTop(openedPosition);
            $body.attr('style','');
        }
    }

});
}
import $ from "jquery";
/* tab */
export function tab() {
$(function() {
    var currentClass = 'current';
    $('[data-ui-tab]').each(function(i,e){
        var $tab = $(e);
        var $tabItems = $tab.children();
        var $tabContents = $(e).next();

        $tab.children(':nth-child(1)').addClass(currentClass);
        $tabContents.children(':nth-child(1)').addClass(currentClass);

        $tabItems.on('click', function() {
            var index = $(this).index();
            $(this).siblings().removeClass(currentClass);
            $(this).addClass(currentClass);
            $tabContents.children().removeClass(currentClass).eq(index).addClass(currentClass);
            return false
        });
    });
});

}
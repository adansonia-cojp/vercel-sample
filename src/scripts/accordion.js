import $ from "jquery";

export function accordion() {

    /* accordion */
    $(function() {
        const $accordion = $('[data-accordion=main]');
        const openClass = 'open';
        const ariaControls = 'accordion-';
    
        $.each( $accordion, function(i,e){
            const $toggle = $(e).find('[data-accordion=toggle]')
                            .attr('aria-expanded', false)
                            .attr('aria-controls', ariaControls+i);
            const $content = $(e).find('[data-accordion=content]')
                             .attr('id', ariaControls+i);
            if ( $(e).hasClass(openClass) ){
                $content.show();
                $toggle.attr('aria-expanded', true);
            } else {
                $content.hide();
            }
            $($toggle).on('click',function(){
                const $parent = $(this).parents('[data-accordion=main]');
                if ($parent.hasClass(openClass) ){
                    $content.slideUp();
                    $parent.removeClass(openClass);
                    $(this).attr('aria-expanded', false);
                } else {
                    $content.slideDown();
                    $parent.addClass(openClass);
                    $(this).attr('aria-expanded', true);
                }
                return false
            });
        });
    });
}

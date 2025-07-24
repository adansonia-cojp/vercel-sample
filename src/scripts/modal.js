import $ from "jquery";

export function modal() {
  /**
   * フォーカストラップ
   * @param {string} parent 
   */
  function focusTrap(parent) {
    const focusableElementsString = 'a[href], area[href], input:not([disabled]), button:not([disabled]), object, embed, [tabindex="0"], [contenteditable]';
    var elements = $(parent).find('.focus-trap').find(focusableElementsString);
    var el = {
        first: elements[0],
        last: elements[elements.length -1]
    }
    $(el.last).on('focusout', function(){
        $(el.first).trigger( "focus" );
    })
  }

  const modalOpenTrigger = $('[modal-open]');
  modalOpenTrigger.each(function() {
    $(this).on('click', function() {
      const target = $(this).data('target');
      const modal = document.getElementById(target);
      modal.showModal();
      modal.classList.add('is-animation');
      // dummyのbuttonを追加
      const dummyButton = document.createElement('button');
      dummyButton.setAttribute('tabindex', '0');
      dummyButton.setAttribute('aria-hidden', 'true');
      dummyButton.setAttribute('style', 'opacity: 0; position: absolute;');
      dummyButton.classList.add('dummy-button');
      modal.appendChild(dummyButton);
     
      focusTrap(modal);

      $(modal).find('[modal-close]').on('click', function() {
        modal.close('閉じた時に渡すテキスト(String)を指定できます');
        modal.classList.remove('is-animation');
        // dummyButtonを削除
        $(modal).find('.dummy-button').remove();
      });
    });
  });

}
(function ($) {
  jQuery.fn.modalWindow = function (options) {
    options = $.extend(
      {
        triggerEl: false,
        refuseButton: false,
        typeModal: 'success',
        closedModalOnFonClick: false,
        text: 'Are you sure?',
        autoShow: false
      },
      options
    );

    $modal = $(`
    <div class="modal">
      <div class="modal-overlay ${
        options.closedModalOnFonClick ? 'modal-cancel' : null
      }"></div>
      <div class="modal-wrapper modal-transition">
        <div class="modal-header ${options.typeModal}">
          <button class="modal-close"><img class="modal-close-icon modal-cancel" src="./js/jqwery/times-circle-regular.svg" alt="close modal window"></button>
          
        </div>
        
        <div class="modal-body">
          <div class="modal-content">
            <p>${options.text}</p>
             <div class="modal-button-wrepper">
              <button class="modal-ok modal-button">Ok</button>
             ${
               options.refuseButton
                 ? '<button class="modal-cancel modal-button">Cancel</button>'
                 : ''
             }
          </div>
             </div>
        </div>
      </div>
    </div>`);

    const buttonsHandleClick = function (e) {
      if (e.target.classList.contains('modal-ok')) {
        console.log('[OK]');
        $('.modal').remove();
      }
      if (e.target.classList.contains('modal-cancel')) {
        console.log('[CANCEL]');
        $('.modal').remove();
      }
    };

    const myFunction = function (e) {
      if (e.key === 'Escape') {
        $('.modal').remove();
      }
    };
    $(document).keyup(myFunction);

    $modal.click(buttonsHandleClick);

    if (options.autoShow) {
      setTimeout(() => {
          $('body').append($modal);
          $modal.toggleClass('is-visible');
      }, options.autoShow);
    } else {
      $('body').append($modal);
      $modal.toggleClass('is-visible');
    }
  };
})(jQuery);

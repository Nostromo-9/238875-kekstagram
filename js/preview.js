'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // функция закрытия картинки с удалением обработчика нажатия 'Esc'
  function closeOverlay() {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onOverlayEscPress);
  }

  // функция обработки нажатия 'Esc' при открытой картинке
  function onOverlayEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeOverlay();
    }
  }

  var galleryOverlay = document.querySelector('.gallery-overlay');  // место для отрисовки выбранной фотографии
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  // Нажатие на любой элемент .picture удаляет класс .invisible у блока .gallery-overlay
  window.pictureElementsBlock.onclick = function (evt) {
    var target = evt.target;
    evt.preventDefault();
    while (target !== this) {
      if (target.className === 'picture') {
        galleryOverlay.querySelector('.gallery-overlay-image').src = target.querySelector('img').src;
        galleryOverlay.querySelector('.likes-count').textContent = target.querySelector('.picture-likes').textContent;
        galleryOverlay.querySelector('.comments-count').textContent = target.querySelector('.picture-comments').textContent;

        galleryOverlay.classList.remove('hidden');
        document.addEventListener('keydown', onOverlayEscPress);
        return;
      }
      target = target.parentNode;
    }
  };

  // обработчик нажатия на закрывающий элемент окна .gallery-overlay
  galleryOverlayClose.addEventListener('click', function () {
    closeOverlay();
  });

  // обработчик нажатия 'Enter' на закрывающий элемент окна .gallery-overlay
  galleryOverlayClose.addEventListener('keydown', function (anotherEvt) {
    if (anotherEvt.keyCode === ENTER_KEYCODE) {
      closeOverlay();
    }
  });
})();

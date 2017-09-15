'use strict';

(function () {
  var imagePreview = document.querySelector('.effect-image-preview');
  var resizeDec = document.querySelector('.upload-resize-controls-button-dec');  // кнопка уменьшения изображения
  var resizeInc = document.querySelector('.upload-resize-controls-button-inc');  // кнопка увеличения изображения
  var resizeValue = document.querySelector('.upload-resize-controls-value');  // поле со значением масштаба изображения

  window.initializeScale = function (callback, decValue, incValue) {
    resizeDec.addEventListener('click', function () {
      callback(imagePreview, resizeValue, decValue);
    });
    resizeInc.addEventListener('click', function () {
      callback(imagePreview, resizeValue, incValue);
    });
  };
})();

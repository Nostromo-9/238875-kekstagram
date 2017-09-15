'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;

  var resizeValue = document.querySelector('.upload-resize-controls-value');  // поле со значением масштаба изображения

  function changeSizeValue(valueField, step) {
    var startSize = +valueField.value.substr(0, valueField.value.length - 1);  // числовое значение поля масштаба изображения
    var endSize = startSize + step;
    if ((endSize <= MAX_SCALE) && (endSize >= MIN_SCALE)) {
      resizeValue.value = endSize + '%';
    }
  }

  window.initializeScale = function (controls, callback) {
    controls.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'BUTTON') {
        if (evt.target.classList[2].lastIndexOf('dec') !== -1) {
          changeSizeValue(resizeValue, -SCALE_STEP);
        } else if (evt.target.classList[2].lastIndexOf('inc') !== -1) {
          changeSizeValue(resizeValue, SCALE_STEP);
        }
        callback(+resizeValue.value.substr(0, resizeValue.value.length - 1));
      }
    });
  };
})();

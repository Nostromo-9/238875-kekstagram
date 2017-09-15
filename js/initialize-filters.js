'use strict';

(function () {
  var imagePreview = document.querySelector('.effect-image-preview');
  var effectTabs = document.querySelector('.upload-effect-controls');  // поле выбора эффектов обработки изображения
  var effectLevel = document.querySelector('.upload-effect-level');  // область регулировки насыщенности фильтра
  var effectLevelPin = effectLevel.querySelector('.upload-effect-level-pin');  // ползунок насыщенности фильтра
  var effectLevelValue = effectLevel.querySelector('.upload-effect-level-val');  // текущее значение насыщенности фильтра

  window.initializeFilters = function (callback) {
    effectTabs.addEventListener('click', function (evt) {
      callback(evt, imagePreview, effectLevelPin, effectLevelValue, effectLevel);
    });
  };
})();

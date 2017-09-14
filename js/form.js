'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;

  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS_QTY = 5;

  // функция проверки поля хэш-тэгов
  function checkHashTags() {
    var tagsArray = hashTags.value.split(' ');
    if (tagsArray.length > MAX_HASHTAGS_QTY) {  // проверка общего количества хэш-тэгов
      return false;
    }
    for (var i = 0; i < tagsArray.length; i++) {
      var hashTag = tagsArray[i];
      if ((hashTag.length > MAX_HASHTAG_LENGTH) || (hashTag.substr(0, 1) !== '#')) {  // проверка первого символа и длины хэш-тэга
        return false;
      }
      for (var j = i + 1; j < tagsArray.length; j++) {  // проверка уникальности хэш-тэгов
        if (tagsArray[j] === hashTag) {
          return false;
        }
      }
    }
    return true;
  }


  var uploadForm = document.getElementById('upload-select-image');  // форма загрузки изображения
  var uploadField = document.getElementById('upload-file');  // поле загрузки файла
  var uploadFormClose = uploadForm.querySelector('.upload-form-cancel');  // кнопка закрытия формы загрузки изображения
  var uploadFormSubmit = uploadForm.querySelector('.upload-form-submit');  // кнопка отправки загруженного изображения
  var uploadDescription = uploadForm.querySelector('.upload-form-description');  // форма ввода комментария
  var hashTags = uploadForm.querySelector('.upload-form-hashtags');  // форма ввода хэш-тэгов

  var effectTabs = uploadForm.querySelector('.upload-effect-controls');  // поле выбора эффектов обработки изображения
  var imagePreview = uploadForm.querySelector('.effect-image-preview');  // получившееся после наложения эффектов изображение

  var resizeDec = uploadForm.querySelector('.upload-resize-controls-button-dec');  // кнопка уменьшения изображения
  var resizeInc = uploadForm.querySelector('.upload-resize-controls-button-inc');  // кнопка увеличения изображения
  var resizeValue = uploadForm.querySelector('.upload-resize-controls-value');  // поле со значением масштаба изображения

  // --------- Обработчики событий загрузки и обработки изображений ---------
  uploadField.addEventListener('change', function () {
    uploadForm.querySelector('.upload-image').classList.add('hidden');
    uploadForm.querySelector('.upload-overlay').classList.remove('hidden');

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        uploadForm.querySelector('.upload-overlay').classList.add('hidden');
        uploadForm.querySelector('.upload-image').classList.remove('hidden');
      }
    });
  });

  uploadFormClose.addEventListener('click', function () {
    uploadForm.querySelector('.upload-overlay').classList.add('hidden');
    uploadForm.querySelector('.upload-image').classList.remove('hidden');
  });

  // если фокус находится на форме ввода комментария, то 'Esc' не закрывает форму .upload-overlay
  uploadDescription.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  // обработчик применения эффекта к изображению, реализовано одновременное наложение только 1 эффекта
  effectTabs.onclick = function (evt) {
    var target = evt.target;
    var defaultClassList = 'effect-image-preview';  // classList изображения по-умолчанию, без эффектов

    evt.preventDefault();
    while (target !== this) {
      if (target.classList.contains('upload-effect-label')) {
        if (target.classList.length > 1) {  // если нажали на label с эффектом
          var effect = 'effect-' + target.classList[1].slice(20, target.classList[1].length);
          imagePreview.classList = defaultClassList;  // 'зачищаем' classList от предыдущих эффектов
          imagePreview.classList.add(effect);
        } else {  // если нажали на label с оригинальным изображением
          imagePreview.classList = defaultClassList;  // 'зачищаем' classList от предыдущих эффектов
        }
        return;
      }
      target = target.parentNode;
    }
  };

  // обработчик нажатия кнопки уменьшения загружаемого изображения
  resizeDec.addEventListener('click', function () {
    var value = +resizeValue.value.substr(0, resizeValue.value.length - 1);  // числовое значение поля масштаба изображения
    if ((value <= MAX_SCALE) && (value > MIN_SCALE)) {
      resizeValue.value = value - SCALE_STEP + '%';
      uploadForm.querySelector('.effect-image-preview').style = 'transform: scale(' + 0.01 * (value - SCALE_STEP) + ')';
    }
  });

  // обработчик нажатия кнопки увеличения загружаемого изображения
  resizeInc.addEventListener('click', function () {
    var value = +resizeValue.value.substr(0, resizeValue.value.length - 1);  // числовое значение поля масштаба изображения
    if ((value < MAX_SCALE) && (value >= MIN_SCALE)) {
      resizeValue.value = value + SCALE_STEP + '%';
      uploadForm.querySelector('.effect-image-preview').style = 'transform: scale(' + 0.01 * (value + SCALE_STEP) + ')';
    }
  });

  // обработчик нажатия кнопки отправки изображения
  uploadFormSubmit.addEventListener('click', function (evt) {
    if (!checkHashTags()) {  // проверка поля хэш-тэгов
      evt.preventDefault();
      hashTags.style = 'outline: 2px dashed red';
      hashTags.value = 'некорректный хэш-тег!';
    }
  });
})();

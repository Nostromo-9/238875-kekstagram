'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MIN_SCALE = 25;
var MAX_SCALE = 100;

function randomElement(array) {  // функция выбора случайного элемента из массива
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPicturesArray(length) {  // функция создания массива JS-объектов
  var array = [];
  for (var i = 0; i < length; i++) {
    var randomPicture = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: randomRange(15, 200),
      comments: [
        randomElement(COMMENTS),
        randomElement(COMMENTS)
      ]
    };
    array.push(randomPicture);
  }
  return array;
}

function createPicture(picture) {  // функция создания DOM-элемента на основе шаблона и JS-объекта
  var pictureTemplate = document.querySelector('#picture-template').content;
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
  return pictureElement;
}

function fillPicturesFragment(picturesArray) {  // функция заполнения блока DOM-элементами на основе массива JS-объектов
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < picturesArray.length; i++) {
    fragment.appendChild(createPicture(picturesArray[i]));
  }
  return fragment;
}

// функция проверки поля хэш-тэгов
function checkHashTags() {
  var tagsArray = hashTags.value.split(' ');
  if (tagsArray.length > 5) {  // проверка общего количества хэш-тэгов
    return false;
  }
  for (var i = 0; i < tagsArray.length; i++) {
    var hashTag = tagsArray[i];
    if ((hashTag.length > 20) || (hashTag.substr(0, 1) !== '#')) {  // проверка первого символа и длины хэш-тэга
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

function closeOverlay() {  // функция закрытия картинки с удалением обработчика нажатия 'Esc'
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onOverlayEscPress);
}

function onOverlayEscPress(evt) {  // функция обработки нажатия 'Esc' при открытой картинке
  if (evt.keyCode === ESC_KEYCODE) {
    closeOverlay();
  }
}

var pictureElementsBlock = document.body.querySelector('.pictures');  // место отрисовки сгенерированных DOM-элементов
var galleryOverlay = document.querySelector('.gallery-overlay');  // место для отрисовки первого элемента JS-массива
var randomPicturesArray = createPicturesArray(25);

pictureElementsBlock.appendChild(fillPicturesFragment(randomPicturesArray));

var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

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

// Нажатие на любой элемент .picture удаляет класс .invisible у блока .gallery-overlay
pictureElementsBlock.onclick = function (evt) {
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
    resizeValue.value = value - 25 + '%';
    uploadForm.querySelector('.effect-image-preview').style = 'transform: scale(' + 0.01 * (value - 25) + ')';
  }
});

// обработчик нажатия кнопки увеличения загружаемого изображения
resizeInc.addEventListener('click', function () {
  var value = +resizeValue.value.substr(0, resizeValue.value.length - 1);  // числовое значение поля масштаба изображения
  if ((value < MAX_SCALE) && (value >= MIN_SCALE)) {
    resizeValue.value = value + 25 + '%';
    uploadForm.querySelector('.effect-image-preview').style = 'transform: scale(' + 0.01 * (value + 25) + ')';
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

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

document.querySelector('.upload-overlay').classList.add('hidden');

var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

pictureElementsBlock.onclick = function (evt) {  // Нажатие на любой элемент .picture удаляет класс .invisible у блока .gallery-overlay
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

galleryOverlayClose.addEventListener('click', function () {
  closeOverlay();
});

galleryOverlayClose.addEventListener('keydown', function (anotherEvt) {
  if (anotherEvt.keyCode === ENTER_KEYCODE) {
    closeOverlay();
  }
});

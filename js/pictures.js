'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];

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

var pictureElementsBlock = document.body.querySelector('.pictures');  // место отрисовки сгенерированных DOM-элементов
var galleryOverlay = document.querySelector('.gallery-overlay');  // место для отрисовки первого элемента JS-массива
var randomPicturesArray = createPicturesArray(25);

pictureElementsBlock.appendChild(fillPicturesFragment(randomPicturesArray));

document.querySelector('.upload-overlay').classList.add('hidden');

galleryOverlay.querySelector('.gallery-overlay-image').src = randomPicturesArray[0].url;
galleryOverlay.querySelector('.likes-count').textContent = randomPicturesArray[0].likes;
galleryOverlay.querySelector('.comments-count').textContent = randomPicturesArray[0].comments.length;
galleryOverlay.classList.remove('hidden');

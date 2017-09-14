'use strict';

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  // функция выбора случайного элемента из массива
  function randomElement(array) {
    var rand = Math.floor(Math.random() * array.length);
    return array[rand];
  }

  // функция выборы случайного числа из диапазона
  function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // функция создания массива JS-объектов
  function createPicturesArray(length) {
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

  window.randomPicturesArray = createPicturesArray(25);

})();

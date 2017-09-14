'use strict';

(function () {
  // функция создания DOM-элемента на основе шаблона и JS-объекта
  window.createPicture = function (picture) {
    var pictureTemplate = document.querySelector('#picture-template').content;
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').setAttribute('src', picture.url);
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
    return pictureElement;
  };
})();

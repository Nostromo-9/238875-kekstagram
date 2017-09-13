'use strict';
(function () {
  // функция заполнения блока DOM-элементами на основе массива JS-объектов
  function fillPicturesFragment(picturesArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < picturesArray.length; i++) {
      fragment.appendChild(window.createPicture(picturesArray[i]));
    }
    return fragment;
  }

  window.pictureElementsBlock = document.body.querySelector('.pictures');  // место отрисовки сгенерированных DOM-элементов

  window.pictureElementsBlock.appendChild(fillPicturesFragment(window.randomPicturesArray));
})();

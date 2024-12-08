/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/add-preview.js":
/*!*******************************!*\
  !*** ./src/js/add-preview.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderPictureList: () => (/* binding */ renderPictureList)\n/* harmony export */ });\n/* harmony import */ var _big_picture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./big-picture.js */ \"./src/js/big-picture.js\");\n\r\n\r\nconst pictureTemplate = document.querySelector(\"#picture\").content.querySelector('.picture');\r\nconst picturesContainer = document.querySelector('.pictures');\r\n\r\nconst pictureSample = (message) => {\r\n    const pictureItem = pictureTemplate.cloneNode(true);\r\n    pictureItem.querySelector('.picture__img').src = message.url;\r\n    pictureItem.querySelector('.picture__likes').textContent = message.likes;\r\n    pictureItem.querySelector('.picture__comments').textContent = message.comments.length;\r\n\r\n    pictureItem.addEventListener('click', (evt) => {\r\n        evt.preventDefault();\r\n        (0,_big_picture_js__WEBPACK_IMPORTED_MODULE_0__.bigPhotoPreview)(message);\r\n    })\r\n        return pictureItem; \r\n}\r\n\r\nconst renderPictureList = (pictures) => {\r\n\r\n    const picturesFragment = document.createDocumentFragment();\r\n\r\n    pictures.forEach((item) => {    \r\n        picturesFragment.appendChild(pictureSample(item));        \r\n    })\r\n\r\n    picturesContainer.appendChild(picturesFragment);   \r\n}\r\n\r\n\n\n//# sourceURL=webpack://kekstagram/./src/js/add-preview.js?");

/***/ }),

/***/ "./src/js/api.js":
/*!***********************!*\
  !*** ./src/js/api.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getData: () => (/* binding */ getData),\n/* harmony export */   sendData: () => (/* binding */ sendData)\n/* harmony export */ });\nconst getData = (onSuccess) => {\r\n    fetch('https://23.javascript.pages.academy/kekstagram/data',\r\n)\r\n        .then((response) => response.json())\r\n        .then((comments) => { onSuccess(comments)})\r\n        .catch((err) => console.error(err))\r\n}\r\n\r\nconst sendData = (onSuccess, onFail, body) => {\r\n    fetch(\r\n      'https://23.javascript.pages.academy/kekstagram',\r\n      {\r\n        method: 'POST',\r\n        body,\r\n      },\r\n    )\r\n      .then((response) => {\r\n        if (response.ok) {\r\n          onSuccess();          \r\n        } else {\r\n            onFail();\r\n        }\r\n      })\r\n      .catch(() => {\r\n        onFail();\r\n      });\r\n  };\r\n\r\n\n\n//# sourceURL=webpack://kekstagram/./src/js/api.js?");

/***/ }),

/***/ "./src/js/avatar.js":
/*!**************************!*\
  !*** ./src/js/avatar.js ***!
  \**************************/
/***/ (() => {

eval("const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];\r\n\r\nconst fileChooser = document.querySelector('.img-upload__start input[type=\"file\"]');\r\nconst preview = document.querySelector('.img-upload__preview img');\r\n\r\nfileChooser.addEventListener(\"change\", () => {\r\n    const file = fileChooser.files[0]; //У DOM-узла поля для выбора файла есть свойство files — это структура, похожая на массив.\r\n    const fileName = file.name.toLowerCase(); //чтобы не думать о том, выбрал пользователь image.JPG или image.jpg, приведём название файла к строчным буквам\r\n    \r\n    //нужно проверить, оканчивается ли имя файла одним из допустимых расширений\r\n    const matches = FILE_TYPES.some((it) => {\r\n        return fileName.endsWith(it); //В этом нам поможет метод строки endsWith.\r\n    })\r\n    \r\n    if (matches) {\r\n        const reader = new FileReader();\r\n\r\n        reader.addEventListener(\"load\", () => {\r\n            preview.src = reader.result; //бработчик события load, которое можно читать как «чтение завершено»\r\n        })\r\n\r\n        reader.readAsDataURL(file); //\r\n    }\r\n})\r\n\n\n//# sourceURL=webpack://kekstagram/./src/js/avatar.js?");

/***/ }),

/***/ "./src/js/big-picture.js":
/*!*******************************!*\
  !*** ./src/js/big-picture.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   bigPhotoPreview: () => (/* binding */ bigPhotoPreview)\n/* harmony export */ });\n/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comments.js */ \"./src/js/comments.js\");\n\r\n\r\nconst bigPicture = document.querySelector('.big-picture');\r\nconst body = document.querySelector(\"body\");\r\nconst bigPictureClosed = bigPicture.querySelector('.big-picture__cancel');\r\nconst addNewCommentButton = bigPicture.querySelector('.social__footer-btn');\r\nconst commentsLoader = bigPicture.querySelector('.social__comments-loader');\r\nconst commentsCountBase = 5;\r\nconst socialCommentsList = bigPicture.querySelector('.social__comments');\r\n\r\n\r\nconst onBigPictureCloseClick = () => {\r\n    bigPicture.classList.add(\"hidden\");\r\n    body.classList.remove(\"modal-open\");\r\n    bigPictureClosed.removeEventListener(\"click\", onBigPictureCloseClick);\r\n    socialCommentsList.innerHTML = '';\r\n}\r\n\r\nconst bigPhotoPreview = (sample) => {\r\n    body.classList.add(\"modal-open\");\r\n    bigPicture.classList.remove(\"hidden\");\r\n\r\n    let bigPhoto = bigPicture.querySelector('.big-picture__preview');\r\n    bigPhoto.querySelector('.big-picture__img > img').src = sample.url;\r\n    bigPhoto.querySelector('.likes-count').textContent = sample.likes;\r\n    bigPhoto.querySelector('.social__caption').textContent = sample.description;\r\n    bigPhoto.querySelector('.comments-count').textContent = sample.comments.length;\r\n    \r\n    bigPictureClosed.addEventListener(\"click\", onBigPictureCloseClick);\r\n    \r\n    (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.renderCommentsList)(sample.comments);\r\n\r\n    if (sample.comments.length > commentsCountBase) { \r\n        (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.commentsCountShow)(commentsCountBase);\r\n        commentsLoader.classList.remove(\"visually-hidden\");\r\n    } else {\r\n        (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.commentsCountShow)(sample.comments.length);\r\n        commentsLoader.classList.add(\"visually-hidden\");\r\n    }\r\n\r\n    addNewCommentButton.addEventListener(\"click\", _comments_js__WEBPACK_IMPORTED_MODULE_0__.addNewComment);\r\n    commentsLoader.addEventListener(\"click\", _comments_js__WEBPACK_IMPORTED_MODULE_0__.openComments);   \r\n}\r\n\r\n\n\n//# sourceURL=webpack://kekstagram/./src/js/big-picture.js?");

/***/ }),

/***/ "./src/js/comments.js":
/*!****************************!*\
  !*** ./src/js/comments.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addNewComment: () => (/* binding */ addNewComment),\n/* harmony export */   commentsCountShow: () => (/* binding */ commentsCountShow),\n/* harmony export */   openComments: () => (/* binding */ openComments),\n/* harmony export */   renderCommentsList: () => (/* binding */ renderCommentsList)\n/* harmony export */ });\n/*Comments template*/\r\n\r\nconst bigPicture = document.querySelector('.big-picture');\r\nconst commentsList = document.querySelector('.social__comments');\r\nconst commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');\r\nconst pictureCommentLength = document.querySelector('.social__comment-count');\r\nconst commentsCountBase = 5;\r\n\r\nconst commentsCountShow = (num) => {\r\n    pictureCommentLength.innerHTML = pictureCommentLength.innerHTML.replace(/\\d+/, num);\r\n}\r\n\r\nconst renderCommentsList = (comments) => {\r\n    const commentsListFragment = document.createDocumentFragment();\r\n\r\n    comments.forEach((comment, index) => {\r\n        const commentItem = commentTemplate.cloneNode(true);\r\n\r\n        commentItem.querySelector('.social__picture').src = comment.avatar;\r\n        commentItem.querySelector('.social__picture').alt = comment.name;\r\n        commentItem.querySelector('.social__text').textContent = comment.message;\r\n\r\n            if (index > commentsCountBase - 1) {\r\n                commentItem.classList.add(\"visually-hidden\");\r\n            } \r\n\r\n    commentsListFragment.appendChild(commentItem);\r\n    });\r\n\r\n    return commentsList.appendChild(commentsListFragment);  \r\n}\r\n\r\nconst addNewComment = () => {\r\n    const newCommentText = bigPicture.querySelector(\".social__footer-text\");\r\n    let pictureCommentLength = bigPicture.querySelector('.social__comment-count');\r\n    let allComments = bigPicture.querySelectorAll(\".social__comment\");\r\n\r\n    const commentItem = commentTemplate.cloneNode(true);\r\n    commentItem.querySelector('.social__text').textContent = newCommentText.value;\r\n    commentsCountShow(allComments.length);\r\n    newCommentText.value = '';\r\n    commentsList.appendChild(commentItem);\r\n    pictureCommentLength.innerHTML = pictureCommentLength.innerHTML.replace(/\\d+/g, allComments.length + 1);\r\n}\r\n\r\nconst openComments = () => {\r\n    let hiddenComments = bigPicture.querySelectorAll(\".social__comment.visually-hidden\");\r\n    let allComments = bigPicture.querySelectorAll(\".social__comment\");\r\n    let commentsLoader = bigPicture.querySelector('.social__comments-loader');\r\n\r\n        if (hiddenComments.length > commentsCountBase) {\r\n            commentsCountShow(allComments.length - hiddenComments.length + commentsCountBase);\r\n\r\n            hiddenComments.forEach((item, index) => {\r\n                if (index < commentsCountBase) {\r\n                    item.classList.remove(\"visually-hidden\");\r\n                }\r\n            })\r\n        } else {\r\n            hiddenComments.forEach((item) => {\r\n                item.classList.remove(\"visually-hidden\"); \r\n            })\r\n            commentsCountShow(allComments.length);\r\n            commentsLoader.classList.add(\"visually-hidden\");\r\n        }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://kekstagram/./src/js/comments.js?");

/***/ }),

/***/ "./src/js/data.js":
/*!************************!*\
  !*** ./src/js/data.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCollection: () => (/* binding */ createCollection)\n/* harmony export */ });\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ \"./src/js/util.js\");\n\n\nconst PHOTO_COUNTER = 25;\n\nconst DESCRIPTION = [\n  'Это круто',\n  'Мне понавилось',\n  'Так себе',\n  'Ужасно'\n]\n\nconst MESSAGE = [\n  'Всё отлично!',\n  'В целом всё неплохо. Но не всё.',\n  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',\n  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',\n  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',\n  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'\n]\n\nconst NAME = ['Kate', 'Helen', 'Ann', 'Alex','Anabel']\n\n const createCommentsCollection = () => {\n  let comments = [];\n\n  const createComment = () => {\n    return { id : (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(1,2000),\n     avatar : `img/avatar-${(0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(1,6)}.svg`,\n     message : (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomStr)(MESSAGE),\n     name : (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomStr)(NAME)\n   };\n  };\n\n  for (let i = 0; i < (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(1,4); i++) {\n    comments.push(createComment());\n  }\n\n  return comments;\n}\n\nconst createSample = (int) => {\n  return {\n    id : int,\n    url : `photos/${int}.jpg`,\n    description : (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomStr)(DESCRIPTION),\n    likes : (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(15,200),\n    comments : createCommentsCollection()\n  }\n}\n\nconst createCollection = () => {\n  const PHOTO_COLLECTION = new Array(PHOTO_COUNTER).fill(null).map((item, index) => {\n    return createSample(index+1);\n});\nreturn PHOTO_COLLECTION;\n}\n\n\n\n\n\n\n//# sourceURL=webpack://kekstagram/./src/js/data.js?");

/***/ }),

/***/ "./src/js/filter-comments.js":
/*!***********************************!*\
  !*** ./src/js/filter-comments.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   updateTextValue: () => (/* binding */ updateTextValue),\n/* harmony export */   updateValue: () => (/* binding */ updateValue)\n/* harmony export */ });\nfunction updateValue(hashtagArea) {  \r\n    let text = (hashtagArea.value).split(\" \");\r\n    text.forEach((item, index, Array) => {\r\n      const isRepeatingHashtag = text.some((item, i, arr) => {\r\n        return arr.indexOf(item, i + 1) >= i + 1;\r\n      });\r\n\r\n        if (item.match(/^[^\\#]/)) {\r\n            hashtagArea.setCustomValidity(\"Начинайте хэштег с решетки\");\r\n        }\r\n        else if (item.match(/#$/)) {\r\n            hashtagArea.setCustomValidity(\"Хэштег не может состоять только из решетки\");\r\n        } \r\n        else if (item.slice(1).match(/\\W+/)) {\r\n            hashtagArea.setCustomValidity(\"Используйте только буквы и цифры\"); \r\n        }\r\n        else if (item.length >= 20) {\r\n            hashtagArea.setCustomValidity(\"Длина хэштега не должна быть больше 20 символов\");\r\n        }\r\n        else if (isRepeatingHashtag) {\r\n                hashtagArea.setCustomValidity('Хэш-теги не должны повторяться');\r\n              }\r\n        else if (Array.length > 5) {\r\n            hashtagArea.setCustomValidity(\"Используйте не больше 5 хэштегов\");\r\n        }\r\n        else {\r\n            hashtagArea.setCustomValidity(\"\");\r\n        }\r\n        hashtagArea.reportValidity();\r\n    });\r\n    return hashtagArea.value = text.join(\" \");\r\n}\r\n\r\n//const textCommentArea = imgUpload.querySelector(\".text__description\");\r\n\r\nconst updateTextValue = (textCommentArea) => {\r\n  let text = textCommentArea.value;\r\n\r\n    if (text.length > 140) {\r\n      textCommentArea.setCustomValidity(\"Используйте не больше 140 символов\");\r\n    } else {\r\n      textCommentArea.setCustomValidity(\"\");\r\n    }\r\n  }\r\n\r\n\n\n//# sourceURL=webpack://kekstagram/./src/js/filter-comments.js?");

/***/ }),

/***/ "./src/js/filter-default.js":
/*!**********************************!*\
  !*** ./src/js/filter-default.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _filter_slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter-slider.js */ \"./src/js/filter-slider.js\");\n/* harmony import */ var _filter_comments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter-comments.js */ \"./src/js/filter-comments.js\");\n/* harmony import */ var _filter_scale_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter-scale.js */ \"./src/js/filter-scale.js\");\n/* harmony import */ var _filter_scale_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_filter_scale_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util.js */ \"./src/js/util.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api.js */ \"./src/js/api.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nlet count = 1;\r\n\r\nconst body = document.querySelector(\"body\");\r\nconst uploadForm = document.querySelector(\"#upload-select-image\");\r\nconst uploadInput = uploadForm.querySelector(\"#upload-file\");\r\nconst imgUploadOverlay = uploadForm.querySelector(\".img-upload__overlay\");\r\nconst imgUpload = document.querySelector(\".img-upload\");\r\nconst imgUploadPreview = imgUpload.querySelector(\".img-upload__preview img\");\r\nconst sliderElement = document.querySelector('.effect-level__slider');\r\nconst commentArea = imgUpload.querySelector(\".img-upload__text\");\r\nconst hashtagArea = commentArea.querySelector(\".text__hashtags\");\r\nconst textCommentArea = imgUpload.querySelector(\".text__description\");\r\n\r\n    uploadInput.addEventListener(\"change\", () => {\r\n        imgUploadOverlay.classList.remove(\"hidden\");\r\n        body.classList.add(\"modal-open\");\r\n        imgUploadPreview.style.transform = `scale(${count=1})`;\r\n    })\r\n\r\n\r\n\r\nconst buttonCancel = document.querySelector('#upload-cancel');\r\nbuttonCancel.addEventListener('click', _util_js__WEBPACK_IMPORTED_MODULE_3__.closeUserModal)\r\n\r\n;(0,_filter_slider_js__WEBPACK_IMPORTED_MODULE_0__.createSlider)(sliderElement);\r\nhashtagArea.addEventListener(\"input\", () => (0,_filter_comments_js__WEBPACK_IMPORTED_MODULE_1__.updateValue)(hashtagArea));\r\ntextCommentArea.addEventListener(\"input\", () => { (0,_filter_comments_js__WEBPACK_IMPORTED_MODULE_1__.updateTextValue) (textCommentArea)});\r\n\r\n\r\nconst setUserFormSubmit = (onSuccess) => {\r\n  uploadForm.addEventListener('submit', (evt) => {\r\n    evt.preventDefault();\r\n\r\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_4__.sendData)(\r\n      () => (0,_util_js__WEBPACK_IMPORTED_MODULE_3__.showSuccess)(),\r\n      () => (0,_util_js__WEBPACK_IMPORTED_MODULE_3__.showAlert)(),\r\n      new FormData(evt.target)\r\n    )\r\n  })\r\n}\r\n\r\n/*\r\nРАБОЧИЙ КОД\r\nconst setUserFormSubmit = (onSuccess) => {\r\nuploadForm.addEventListener('submit', (evt) => {\r\n  evt.preventDefault();\r\n  const formData = new FormData(evt.target);\r\n  fetch(\r\n    'https://23.javascript.pages.academy/kekstagram',\r\n    {\r\n      method: 'POST',\r\n      body: formData,\r\n    },\r\n    ).then((response) => {\r\n      if (response.ok) {\r\n        onSuccess(showSuccess());\r\n      } else {\r\n        showAlert();\r\n      }\r\n    })\r\n    .catch(() => {\r\n      showAlert();\r\n    });\r\n});\r\n}; */\r\n\r\nsetUserFormSubmit(_util_js__WEBPACK_IMPORTED_MODULE_3__.closeUserModal);\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://kekstagram/./src/js/filter-default.js?");

/***/ }),

/***/ "./src/js/filter-scale.js":
/*!********************************!*\
  !*** ./src/js/filter-scale.js ***!
  \********************************/
/***/ (() => {

eval("let count = 1;\r\nconst STEP_MAX = 1;\r\nconst STEP_MIN = 0.25;\r\nconst COUNT_STEP = 0.25;\r\n\r\nconst imgUpload = document.querySelector(\".img-upload\");\r\nconst imgUploadScale = imgUpload.querySelector(\".img-upload__scale\");\r\nconst imgUploadScaleBig = imgUploadScale.querySelector(\".scale__control--bigger\");\r\nconst imgUploadScaleSmall = imgUploadScale.querySelector(\".scale__control--smaller\");\r\nconst imgUploadPreview = imgUpload.querySelector(\".img-upload__preview img\");\r\nconst scaleValue = imgUploadScale.querySelector('.scale__control--value');\r\n\r\nimgUploadScale.addEventListener('click', (evt) => {\r\n    if (evt.target === imgUploadScaleBig) {\r\n        if (count < STEP_MAX) {\r\n           count += COUNT_STEP;\r\n        }               \r\n    } else if(evt.target === imgUploadScaleSmall) {\r\n        if (count > STEP_MIN) {\r\n          count -= COUNT_STEP;    \r\n        }              \r\n    }\r\n\r\n   imgUploadPreview.style.transform = `scale(${count})`;\r\n   scaleValue.value = scaleValue.value.replace(/\\d+\\b/, count*100);\r\n})\n\n//# sourceURL=webpack://kekstagram/./src/js/filter-scale.js?");

/***/ }),

/***/ "./src/js/filter-slider-effects.js":
/*!*****************************************!*\
  !*** ./src/js/filter-slider-effects.js ***!
  \*****************************************/
/***/ (() => {

eval("const imgUpload = document.querySelector(\".img-upload\");\r\nconst sliderElement = document.querySelector('.effect-level__slider');\r\nconst effectSamples = imgUpload.querySelectorAll(\".effects__item\");\r\nconst valueElement = imgUpload.querySelector('.effect-level__value');\r\nconst imgUploadPreview = imgUpload.querySelector(\".img-upload__preview img\");\r\nconst sliderElementContainer = document.querySelector('.img-upload__effect-level');\r\nconst effectChrome = document.querySelector(\"#effect-chrome\");\r\nconst effectSepia = document.querySelector('#effect-sepia');\r\nconst effectMarvin = document.querySelector('#effect-marvin');\r\nconst effectPhobos = document.querySelector('#effect-phobos');\r\nconst effectHeat = document.querySelector('#effect-heat');\r\n\r\nconst sliderHidden = () => {\r\n    sliderElementContainer.classList.add(\"visually-hidden\");\r\n}\r\n\r\nconst sliderOpen = () => {\r\n    sliderElementContainer.classList.remove(\"visually-hidden\");\r\n}\r\n\r\neffectSamples.forEach((sample) => {\r\n    sample.addEventListener('change', () => {\r\n        sliderElement.noUiSlider.on('update', (values, handle) => {  \r\n        valueElement.value = values[handle];\r\n        imgUploadPreview.classList.add(\"effects__preview--none\");\r\n        sliderHidden();\r\n    if (sample.querySelector('#effect-chrome')) {\r\n        sliderOpen();\r\n        imgUploadPreview.className = \"effects__preview--chrome\";\r\n        imgUploadPreview.style.filter = `grayscale(${(valueElement.value)})`;\r\n    } else if (sample.querySelector('#effect-sepia')) {\r\n        sliderOpen();\r\n        imgUploadPreview.className = \"effects__preview--sepia\";\r\n        imgUploadPreview.style.filter = `sepia(${valueElement.value})`;\r\n    } else if (sample.querySelector('#effect-marvin')) {\r\n        sliderOpen();\r\n        imgUploadPreview.className = \"effects__preview--marvin\";\r\n        imgUploadPreview.style.filter = `invert(${valueElement.value}%)`;\r\n    } else if (sample.querySelector('#effect-phobos')) {\r\n        sliderOpen();\r\n        imgUploadPreview.className = \"effects__preview--phobos\";\r\n        imgUploadPreview.style.filter = `blur(${valueElement.value}px)`;\r\n    } else if (sample.querySelector('#effect-heat')) {\r\n        sliderOpen();\r\n        imgUploadPreview.className = \"effects__preview--heat\";\r\n        imgUploadPreview.style.filter = `brightness(${valueElement.value})`;\r\n    } else {\r\n        sliderHidden();\r\n        imgUploadPreview.className = \"effects__preview--none\";\r\n        imgUploadPreview.style.filter = `none`;       \r\n    }\r\n    })\r\n  })  \r\n})\r\n\r\neffectSamples.forEach((sample) => {\r\n    sample.addEventListener('change', (evt) => {\r\n    if (evt.target === effectMarvin) {\r\n        sliderElement.noUiSlider.updateOptions({\r\n            range: {\r\n                min: 1,\r\n                max: 100\r\n            },\r\n            start: 0,\r\n            step: 1\r\n        });\r\n    } else if (evt.target === effectPhobos) {\r\n        sliderElement.noUiSlider.updateOptions({\r\n            range: {\r\n                min: 0,\r\n                max: 3,\r\n            },\r\n            step: 0.1,\r\n            start: 0           \r\n        });\r\n    }  else if (evt.target === effectHeat) {\r\n        sliderElement.noUiSlider.updateOptions({\r\n            range: {\r\n                min: 1,\r\n                max: 3,\r\n            },\r\n            step: 0.1,\r\n            start: 1           \r\n        });\r\n    } else {\r\n        sliderElement.noUiSlider.updateOptions({\r\n            range: {\r\n                min: 0,\r\n                max: 1,\r\n            },\r\n            step: 0.1\r\n        });\r\n        sliderElement.noUiSlider.set(0);\r\n        }\r\n    });\r\n});\n\n//# sourceURL=webpack://kekstagram/./src/js/filter-slider-effects.js?");

/***/ }),

/***/ "./src/js/filter-slider.js":
/*!*********************************!*\
  !*** ./src/js/filter-slider.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createSlider: () => (/* binding */ createSlider)\n/* harmony export */ });\n/* harmony import */ var _filter_slider_effects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter-slider-effects.js */ \"./src/js/filter-slider-effects.js\");\n/* harmony import */ var _filter_slider_effects_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_filter_slider_effects_js__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst createSlider = (sliderContainer) => {\r\n    noUiSlider.create(sliderContainer, {\r\n    range: {\r\n        min: 0,\r\n        max: 1,\r\n    },\r\n    start: 0,\r\n    step: 0.1,\r\n    connect: 'lower',\r\n    format: {\r\n        to: function (value) {\r\n            //если значение слайдера целое число, то нужно вывести его без дробной части; если значение дробное — с одним знаком после запятой.\r\n            if (Number.isInteger(value)) {\r\n                return value = value.toFixed(0);\r\n            } else {\r\n                value.toFixed(1)\r\n                return value ; //С помощью toFixed оставим нужное количество знаков после запятой.\r\n            }\r\n        },\r\n        from: function (value) {\r\n            return parseFloat(value);\r\n        },\r\n    }\r\n    });\r\n}\r\n\r\n\n\n//# sourceURL=webpack://kekstagram/./src/js/filter-slider.js?");

/***/ }),

/***/ "./src/js/sort.js":
/*!************************!*\
  !*** ./src/js/sort.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   filterPannel: () => (/* binding */ filterPannel)\n/* harmony export */ });\n/* harmony import */ var _add_preview_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-preview.js */ \"./src/js/add-preview.js\");\n/* global _:readonly */ \r\n//Добавим лишь комментарий, чтобы ESLint не ругался на неизвестную глобальную переменную _.\r\n\r\n\r\nconst RERENDER_DELAY = 500;\r\n\r\nconst picturesContainer = document.querySelector('.pictures');\r\nconst imgFilters = document.querySelector('.img-filters');\r\n\r\nconst defaultFilter = imgFilters.querySelector('#filter-default');\r\nconst randomFilter = imgFilters.querySelector('#filter-random');\r\nconst discussedFilter = imgFilters.querySelector('#filter-discussed');\r\n\r\nconst imgFilterButtons = imgFilters.querySelector(\".img-filters__form\");\r\nconst filterButtons = imgFilters.querySelectorAll(\".img-filters__button\")\r\n\r\nconst defaultImg = _.debounce((pictureListItems) => {\r\n    picturesContainer.innerHTML = '';\r\n    (0,_add_preview_js__WEBPACK_IMPORTED_MODULE_0__.renderPictureList)(pictureListItems)\r\n}, RERENDER_DELAY);\r\n\r\nconst discussedImg = _.debounce((pictureListItems) => {\r\n    picturesContainer.innerHTML = '';\r\n        let discussedItems = pictureListItems\r\n            .slice()\r\n            .sort((pic1, pic2) => pic2.comments.length - pic1.comments.length)\r\n            .slice(0, 10);\r\n    (0,_add_preview_js__WEBPACK_IMPORTED_MODULE_0__.renderPictureList)(discussedItems)\r\n}, RERENDER_DELAY);\r\n\r\nconst randomImg = _.debounce((pictureListItems) => {\r\npicturesContainer.innerHTML = '';\r\n    let randomItems = pictureListItems\r\n    .map(() => pictureListItems[_.random(0, pictureListItems.length-1)])\r\n    .slice(0, 10); \r\n    (0,_add_preview_js__WEBPACK_IMPORTED_MODULE_0__.renderPictureList)(randomItems) \r\n}, RERENDER_DELAY);\r\n    \r\nconst filterPannel = (pictures) => {\r\n    imgFilters.classList.remove('img-filters--inactive'); \r\n\r\n    imgFilterButtons.addEventListener(\"click\", (evt) => {\r\n        filterButtons.forEach((button) => button.classList.remove(\"img-filters__button--active\"));\r\n        evt.target.classList.add(\"img-filters__button--active\");\r\n        if (evt.target === defaultFilter) {\r\n            defaultImg(pictures);\r\n        } else if (evt.target === randomFilter) {\r\n            //randomImg(pictures);\r\n            randomImg(pictures);\r\n            //(_.debounce(() => randomImg(pictures),RERENDER_DELAY));\r\n        } else if ((evt.target === discussedFilter)){\r\n            discussedImg(pictures);\r\n        }\r\n})\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://kekstagram/./src/js/sort.js?");

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeUserModal: () => (/* binding */ closeUserModal),\n/* harmony export */   getRandomNumber: () => (/* binding */ getRandomNumber),\n/* harmony export */   getRandomStr: () => (/* binding */ getRandomStr),\n/* harmony export */   randomFun: () => (/* binding */ randomFun),\n/* harmony export */   showAlert: () => (/* binding */ showAlert),\n/* harmony export */   showSuccess: () => (/* binding */ showSuccess)\n/* harmony export */ });\nconst ALERT_SHOW_TIME = 5000;\n\nconst randomFun = (min, max) => {\n    return Math.floor(Math.random() * max) + min;\n}\n\nconst uploadForm = document.querySelector(\"#upload-select-image\");\nconst imgUploadOverlay = uploadForm.querySelector(\".img-upload__overlay\");\nconst imgUploadPreview = uploadForm.querySelector(\".img-upload__preview img\");\nconst sliderContainer = document.querySelector('.effect-level');\nconst uploadInput = uploadForm.querySelector(\"#upload-file\");\n\nconst closeUserModal = () => {\n    imgUploadOverlay.classList.add(\"hidden\");\n    document.body.classList.remove(\"modal-open\");\n    imgUploadPreview.style.filter = `none`;\n    sliderContainer.classList.add(\"visually-hidden\");\n    uploadInput.value = '';\n}\n\nconst alertMessageTemplate = document.querySelector(\"#error\").content.querySelector(\".error\");\n\nconst showAlert = () => {\n    const alertContainer = alertMessageTemplate.cloneNode(true);\n    alertContainer.style.zIndex = 100;\n    alertContainer.style.position = 'absolute';\n    alertContainer.style.left = 0;\n    alertContainer.style.top = 0;\n    alertContainer.style.right = 0;\n    alertContainer.style.padding = '10px 3px';\n    alertContainer.style.fontSize = '30px';\n    alertContainer.style.textAlign = 'center';\n    alertContainer.style.backgroundColor = 'red';\n\n    const alertContainerButton = alertContainer.querySelector('.error__button');\n    alertContainerButton.addEventListener(\"click\", () => {\n      alertContainer.remove();\n    })\n\n    document.body.append(alertContainer);\n\n    setTimeout(() => {\n        alertContainer.remove();\n      }, ALERT_SHOW_TIME);\n}\n\nconst showSuccessTemplate = document.querySelector(\"#success\").content.querySelector(\".success\");\nconst showSuccess = () => {\n  const successMessage = showSuccessTemplate.cloneNode(true);\n  successMessage.style.zIndex = 100;\n  successMessage.style.position = 'absolute';\n  successMessage.style.left = 0;\n  successMessage.style.top = 0;\n  successMessage.style.right = 0;\n  successMessage.style.padding = '10px 3px';\n  successMessage.style.fontSize = '30px';\n  successMessage.style.textAlign = 'center';\n  successMessage.style.backgroundColor = 'green';\n\n   const successMessageButton = successMessage.querySelector(\".success__button\");\n   successMessageButton.addEventListener(\"click\", ()=> {\n    successMessage.remove();\n    closeUserModal();\n   });\n\n  document.body.append( successMessage );\n\n\n  setTimeout(() => {\n    successMessage.remove();\n  }, ALERT_SHOW_TIME);\n}\n\nconst getRandomNumber = (min, max) => {\n  if (min < 0 || max < 0) {\n    return -1;\n  }\n\n  if (min < max) {\n    [min,max] = [max,min];\n  }\n\n  return Math.floor(Math.random() * (max - min + 1))  + min;\n}\n\nconst getRandomStr = (arr) => {\n  return arr[Math.floor(Math.random() * arr.length)]\n}\n\n\n\n\n\n//# sourceURL=webpack://kekstagram/./src/js/util.js?");

/***/ }),

/***/ "./src/main-assync.js":
/*!****************************!*\
  !*** ./src/main-assync.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_add_preview_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/add-preview.js */ \"./src/js/add-preview.js\");\n/* harmony import */ var _js_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/api.js */ \"./src/js/api.js\");\n/* harmony import */ var _js_sort_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/sort.js */ \"./src/js/sort.js\");\n/* harmony import */ var _js_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/data.js */ \"./src/js/data.js\");\n/* harmony import */ var _js_filter_default_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/filter-default.js */ \"./src/js/filter-default.js\");\n/* harmony import */ var _js_avatar_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/avatar.js */ \"./src/js/avatar.js\");\n/* harmony import */ var _js_avatar_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_avatar_js__WEBPACK_IMPORTED_MODULE_5__);\n/* global _:readonly */\n\n\n\n\n\n\n\n/*getData((photos) => {\n    renderPictureList(photos);\n    //renderPictureList(photos.slice(0, MAGIC_NUMBER)) обрезание количества данных\n    filterPannel(photos)\n});*/\n\n(0,_js_add_preview_js__WEBPACK_IMPORTED_MODULE_0__.renderPictureList)((0,_js_data_js__WEBPACK_IMPORTED_MODULE_3__.createCollection)());\n(0,_js_sort_js__WEBPACK_IMPORTED_MODULE_2__.filterPannel)((0,_js_data_js__WEBPACK_IMPORTED_MODULE_3__.createCollection)());\n\n\n\n\n//# sourceURL=webpack://kekstagram/./src/main-assync.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main-assync.js");
/******/ 	
/******/ })()
;
/* global _:readonly */

const NAMES = [
    'Ella',
    'Max',
    'Neo',
    'Kate',
    'Maria',
    'Xiao',
    'Kirito',
    'Maya'
]

const MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]

const TEXT_MESSAGE = [
    'Да',
    'Даа',
    'Дааа',
    'Даааа',
    'Дааааа',
    'Даааааа',
    'Дааааааа',
]

const ID_RANGE = {
    min : 1,
    max : 1000
};

const LIKES_RANGE = {
    min : 1,
    max : 200
};

const COMMENTS_RANGE = {
    min : 1,
    max : 7
};

//util.js
const randomFun = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}

const createComment = (comment, name) => {
    return {
        id: randomFun(ID_RANGE.min,ID_RANGE.max),
        avatar: `img/avatar-${randomFun(ID_RANGE.min,ID_RANGE.max)}.svg`,
        message: comment[randomFun(0,comment.length-1)],
        name: name[randomFun(0,name.length-1)]
    }
}

const createCommentList = (num) => {
    return new Array(num).fill(null).map(() => createComment(MESSAGES, NAMES));
}

const createMessage = (index) => {
    return {
        id: +index+1,
        url: `photos/${+index+1}.jpg`,
        description: TEXT_MESSAGE[randomFun(0,TEXT_MESSAGE.length-1)],
        likes: randomFun(LIKES_RANGE.min,LIKES_RANGE.max),
        comments: createCommentList(randomFun(COMMENTS_RANGE.min,COMMENTS_RANGE.max))
    }
}

const createMessageList = () => {
    return new Array(25).fill(null).map((item,index) => createMessage(index));
}

const similarMessages = createMessageList();
console.log(similarMessages);

const body = document.querySelector("body");

const onBigPictureCloseClick = () => {
    bigPicture.classList.add("hidden");
    body.classList.remove("modal-open");
    bigPictureClosed.removeEventListener("click", onBigPictureCloseClick);
    commentsList.innerHTML = "";
};

/*Comments template*/

const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

/* рабочий вариант
const renderComment = (comment) => {
    const commentItem = commentTemplate.cloneNode(true);

    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__picture').alt = comment.name;
    commentItem.querySelector('.social__text').textContent = comment.message;

    commentItem.style.display = "none";

    
    return commentItem;
}

const renderCommentsList = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

    comments.forEach((item) => {
        commentsListFragment.appendChild(renderComment(item));
    })

  commentsList.appendChild(commentsListFragment);
}*/

const renderCommentsList = (comments) => {
    const commentsListFragment = document.createDocumentFragment();

    comments.forEach((comment, index) => {
        const commentItem = commentTemplate.cloneNode(true);

        commentItem.querySelector('.social__picture').src = comment.avatar;
        commentItem.querySelector('.social__picture').alt = comment.name;
        commentItem.querySelector('.social__text').textContent = comment.message;

            if (index > 4) {
                commentItem.classList.add("visually-hidden");
            } 

    commentsListFragment.appendChild(commentItem);
    });

    return commentsList.appendChild(commentsListFragment);  
}

let commentsCountBase = 5;
let pictureCommentLength = document.querySelector('.social__comment-count');

const commentsCountShow = (num) => {
    pictureCommentLength.innerHTML = pictureCommentLength.innerHTML.replace(/\d+/, num);
}

const openComments = () => {
    let hiddenComments = bigPicture.querySelectorAll(".social__comment.visually-hidden");
    let allComments = bigPicture.querySelectorAll(".social__comment");
    let commentsLoader = bigPicture.querySelector('.social__comments-loader');

        if (hiddenComments.length > commentsCountBase) {
            //pictureCommentLength.innerHTML = `${allComments.length - hiddenComments.length + 5} из <span class="comments-count">${allComments.length}</span> комментариев`;
            //pictureCommentLength.innerHTML = pictureCommentLength.innerHTML.replace(/\d+/, allComments.length - hiddenComments.length + commentsCountBase);
            commentsCountShow(allComments.length - hiddenComments.length + commentsCountBase);

            hiddenComments.forEach((item, index) => {
                if (index < commentsCountBase - 1) {
                    item.classList.remove("visually-hidden");
                }
            })
        } else {
            hiddenComments.forEach((item) => {
                item.classList.remove("visually-hidden"); 
            })
            //pictureCommentLength.innerHTML = `${allComments.length} из <span class="comments-count">${allComments.length}</span> комментариев`;
            //pictureCommentLength.innerHTML = pictureCommentLength.innerHTML.replace(/\d+/, allComments.length);
            commentsCountShow(allComments.length);
            commentsLoader.classList.add("visually-hidden");
        }
}

const addNewComment = () => {
    const newCommentText = bigPicture.querySelector(".social__footer-text");
    let pictureCommentLength = bigPicture.querySelector('.social__comment-count');
    let allComments = bigPicture.querySelectorAll(".social__comment");

    const commentItem = commentTemplate.cloneNode(true);
    commentItem.querySelector('.social__text').textContent = newCommentText.value;
    //pictureCommentLength.innerHTML = `${allComments.length} из <span class="comments-count">${allComments.length}</span> комментариев`;
    //pictureCommentLength.innerHTML = pictureCommentLength.innerHTML.replace(/\d+/, allComments.length);
    commentsCountShow(allComments.length);
    newCommentText.value = '';
    commentsList.appendChild(commentItem);
    //pictureCommentLength.innerHTML = `${allComments.length + 1} из <span class="comments-count">${allComments.length + 1}</span> комментариев`; 
    pictureCommentLength.innerHTML = pictureCommentLength.innerHTML.replace(/\d+/g, allComments.length + 1);
}

const bigPicture = document.querySelector('.big-picture');
const bigPictureClosed = bigPicture.querySelector('.big-picture__cancel');
const addNewCommentButton = bigPicture.querySelector('.social__footer-btn');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');

const show = (picture) => {
  body.classList.add("modal-open");

  bigPicture.querySelector('.big-picture__img > img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
     
  bigPictureClosed.addEventListener("click", onBigPictureCloseClick);
  bigPicture.classList.remove("hidden");
  renderCommentsList(picture.comments);

    if (picture.comments.length > commentsCountBase) {      
        //pictureCommentLength.innerHTML = `5 из <span class="comments-count">${picture.comments.length}</span> комментариев`;
        //pictureCommentLength.innerHTML = pictureCommentLength.innerHTML.replace(/\d+/, commentsCountBase);
        commentsCountShow(commentsCountBase);
        commentsLoader.classList.remove("visually-hidden");
    } else {   
        //pictureCommentLength.innerHTML = `${picture.comments.length} из <span class="comments-count">${picture.comments.length}</span> комментариев`;
        //pictureCommentLength.innerHTML = pictureCommentLength.innerHTML.replace(/\d+/, picture.comments.length);
        commentsCountShow(picture.comments.length);
        commentsLoader.classList.add("visually-hidden");
    }

  addNewCommentButton.addEventListener("click", addNewComment);
  commentsLoader.addEventListener("click", openComments);
}

/*sort*/
const defaultImg = () => {
    picturesContainer.innerHTML = '';
    return similarMessages;
};

const discussedImg = () => {
    picturesContainer.innerHTML = '';
        return similarMessages
        .slice()
        .sort((pic1, pic2) => pic2.comments.length - pic1.comments.length)
        .slice(0, 10) 
}

const randomImg = () => {
picturesContainer.innerHTML = '';
    return similarMessages
    .map(() => similarMessages[_.random(0, similarMessages.length-1)])
    .slice(0, 10);   
}

/*picture template*/
const pictureTemplate = document.querySelector("#picture").content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const pictureSample = (picture) => {
    const pictureItem = pictureTemplate.cloneNode(true);
    
    picture
    pictureItem.querySelector('.picture__img').src = picture.url;
    pictureItem.querySelector('.picture__likes').textContent = picture.likes;
    pictureItem.querySelector('.picture__comments').textContent = picture.comments.length;

    pictureItem.addEventListener("click", (evt) => {
      evt.preventDefault();
      show(picture)
    });
    
    return pictureItem;
}

const createPictureList = (similarMessages) => {
    const picturesFragment = document.createDocumentFragment();

    similarMessages.forEach((item) => {
        let picturePreview = pictureSample(item);
        picturesFragment.appendChild(picturePreview);
    })

    //picturesContainer.innerHTML = '';
    picturesContainer.appendChild(picturesFragment);
}

/*рабочий код (picture template)
const pictureSample = (picture) => {
    const pictureItem = pictureTemplate.cloneNode(true);
    
    pictureItem.querySelector('.picture__img').src = picture.url;
    pictureItem.querySelector('.picture__likes').textContent = picture.likes;
    pictureItem.querySelector('.picture__comments').textContent = picture.comments.length;

    pictureItem.addEventListener("click", (evt) => {
      evt.preventDefault();
      show(picture)
    });
    
    return pictureItem;
}


const createPictureList = () => {
    const picturesFragment = document.createDocumentFragment();

    similarMessages.forEach((item) => {
        let picturePreview = pictureSample(item);
        picturesFragment.appendChild(picturePreview);
    })

    picturesContainer.appendChild(picturesFragment);
}*/

createPictureList(similarMessages); 

const imgFilters = document.querySelector('.img-filters');

const defaultFilter = imgFilters.querySelector('#filter-default');
const randomFilter = imgFilters.querySelector('#filter-random');
const discussedFilter = imgFilters.querySelector('#filter-discussed');

const imgFilterButtons = imgFilters.querySelector(".img-filters__form");
const filterButtons = imgFilters.querySelectorAll(".img-filters__button");

imgFilters.classList.remove('img-filters--inactive');
imgFilterButtons.addEventListener("click", (evt) => {
    filterButtons.forEach((button) => button.classList.remove("img-filters__button--active"));
    evt.target.classList.add("img-filters__button--active");
    if (evt.target === defaultFilter) {
        createPictureList(defaultImg()); 
    } else if (evt.target === randomFilter) {
        createPictureList(randomImg());
    } else if ((evt.target === discussedFilter)){
       createPictureList(discussedImg()); 
    }
})

const uploadForm = document.querySelector("#upload-select-image");
const uploadInput = uploadForm.querySelector("#upload-file");
const imgUploadOverlay = uploadForm.querySelector(".img-upload__overlay");

uploadInput.addEventListener("change", () => {
    imgUploadOverlay.classList.remove("hidden");
    body.classList.add("modal-open");
    imgUploadPreview.style.transform = `scale(${count=1})`;
})

const buttonCancel = document.querySelector('#upload-cancel');

buttonCancel.addEventListener('click', () => {
    imgUploadOverlay.classList.add("hidden");
    body.classList.remove("modal-open");
    uploadInput.value = '';   
})

const imgUpload = document.querySelector(".img-upload");
const imgUploadScale = imgUpload.querySelector(".img-upload__scale");
const imgUploadScaleBig = imgUploadScale.querySelector(".scale__control--bigger");
const imgUploadScaleSmall = imgUploadScale.querySelector(".scale__control--smaller");
const imgUploadPreview = imgUpload.querySelector(".img-upload__preview img");
const scaleValue = imgUploadScale.querySelector('.scale__control--value');

let count = 1;
const STEP_MAX = 1;
const STEP_MIN = 0.25;
const COUNT_STEP = 0.25;

imgUploadScale.addEventListener('click', (evt) => {
    if (evt.target === imgUploadScaleBig) {
        if (count < STEP_MAX) {
           count += COUNT_STEP;
        }               
    } else if(evt.target === imgUploadScaleSmall) {
        if (count > STEP_MIN) {
          count -= COUNT_STEP;    
        }              
    }

   imgUploadPreview.style.transform = `scale(${count})`;
   scaleValue.value = scaleValue.value.replace(/\d+\b/, count*100);
})

const sliderElement = document.querySelector('.effect-level__slider');
const sliderElementContainer = document.querySelector('.img-upload__effect-level');
const valueElement = imgUpload.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
    range: {
        min: 0,
        max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
    format: {
        to: function (value) {
            //если значение слайдера целое число, то нужно вывести его без дробной части; если значение дробное — с одним знаком после запятой.
            if (Number.isInteger(value)) {
                return value.toFixed(0);
            }
            return value.toFixed(1); //С помощью toFixed оставим нужное количество знаков после запятой.
        },
        from: function (value) {
            return parseFloat(value);
        },
    }
});

const effectSamples = imgUpload.querySelectorAll(".effects__item")
const effectChrome = document.querySelector("#effect-chrome");
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');

const sliderHidden = () => {
    sliderElementContainer.classList.add("visually-hidden");
}

const sliderOpen = () => {
    sliderElementContainer.classList.remove("visually-hidden");
}

effectSamples.forEach((sample) => {
    sample.addEventListener('change', () => {
        sliderElement.noUiSlider.on('update', (values, handle) => {  
        valueElement.value = values[handle];
        imgUploadPreview.classList.add("effects__preview--none");
        sliderHidden();
    if (sample.querySelector('#effect-chrome')) {
        sliderOpen();
        imgUploadPreview.className = "effects__preview--chrome";
        imgUploadPreview.style.filter = `grayscale(${(valueElement.value)})`;
    } else if (sample.querySelector('#effect-sepia')) {
        sliderOpen();
        imgUploadPreview.className = "effects__preview--sepia";
        imgUploadPreview.style.filter = `sepia(${valueElement.value})`;
    } else if (sample.querySelector('#effect-marvin')) {
        sliderOpen();
        imgUploadPreview.className = "effects__preview--marvin";
        imgUploadPreview.style.filter = `invert(${valueElement.value}%)`;
    } else if (sample.querySelector('#effect-phobos')) {
        sliderOpen();
        imgUploadPreview.className = "effects__preview--phobos";
        imgUploadPreview.style.filter = `blur(${valueElement.value}px)`;
    } else if (sample.querySelector('#effect-heat')) {
        sliderOpen();
        imgUploadPreview.className = "effects__preview--heat";
        imgUploadPreview.style.filter = `brightness(${valueElement.value})`;
    } else {
        sliderHidden();
        imgUploadPreview.className = "effects__preview--none";
        imgUploadPreview.style.filter = `none`;       
    }
    })
  })  
})

effectSamples.forEach((sample) => {
    sample.addEventListener('change', (evt) => {
    if (evt.target === effectMarvin) {
        sliderElement.noUiSlider.updateOptions({
            range: {
                min: 1,
                max: 100
            },
            start: 0,
            step: 1
        });
    } else if (evt.target === effectPhobos) {
        sliderElement.noUiSlider.updateOptions({
            range: {
                min: 0,
                max: 3,
            },
            step: 0.1,
            start: 0           
        });
    }  else if (evt.target === effectHeat) {
        sliderElement.noUiSlider.updateOptions({
            range: {
                min: 1,
                max: 3,
            },
            step: 0.1,
            start: 1           
        });
    } else {
        sliderElement.noUiSlider.updateOptions({
            range: {
                min: 0,
                max: 1,
            },
            step: 0.1
        });
        sliderElement.noUiSlider.set(0);
        }
    });
});

const commentArea = imgUpload.querySelector(".img-upload__text");
const hashtagArea = commentArea.querySelector(".text__hashtags");

hashtagArea.addEventListener("input", updateValue);

function updateValue(e) {  
    let text = (e.target.value).split(" ");
    text.forEach((item, index, Array) => {
    let matchingItem = new RegExp(`${item}`, 'gi');

        if (item.match(/^[^\#]/)) {
            hashtagArea.setCustomValidity("Начинайте хэштег с решетки");
        }
        else if (item.match(/#$/)) {
            hashtagArea.setCustomValidity("Хэштег не может состоять только из решетки");
        } 
        else if (item.slice(1).match(/\W+/)) {
            hashtagArea.setCustomValidity("Используйте только буквы и цифры"); 
        }
        else if (item.length >= 20) {
            hashtagArea.setCustomValidity("Длина хэштега не должна быть больше 20 символов");
        }
        else if (Array.length > 2) {
            const isRepeatingHashtag = text.some((item, i, arr) => {
                return arr.indexOf(item, i + 1) >= i + 1;
              });
              if (isRepeatingHashtag) {
                hashtagArea.setCustomValidity('Хэш-теги не должны повторяться');
              }
        }
        else if (Array.length > 5) {
            hashtagArea.setCustomValidity("Используйте не больше 5 хэштегов");
        }
        else {
            hashtagArea.setCustomValidity("");
        }
        hashtagArea.reportValidity();
    });
    return hashtagArea.value = text.join(" ");
}

let textCommentArea = imgUpload.querySelector(".text__description");

const updateTextValue = (comment) => {
  let text = comment.target.value;

    if (text.length > 140) {
      textCommentArea.setCustomValidity("Используйте не больше 140 символов");
    } else {
      textCommentArea.setCustomValidity("");
    }
  }

textCommentArea.addEventListener("input", updateTextValue);

//let hashtagArea = document.querySelector(".text__hashtags");













import {addNewComment, commentsCountShow, renderCommentsList, openComments} from "./comments.js";

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector("body");
const bigPictureClosed = bigPicture.querySelector('.big-picture__cancel');
const addNewCommentButton = bigPicture.querySelector('.social__footer-btn');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const commentsCountBase = 5;
const socialCommentsList = bigPicture.querySelector('.social__comments');


const onBigPictureCloseClick = () => {
    bigPicture.classList.add("hidden");
    body.classList.remove("modal-open");
    bigPictureClosed.removeEventListener("click", onBigPictureCloseClick);
    socialCommentsList.innerHTML = '';
}

const bigPhotoPreview = (sample) => {
    body.classList.add("modal-open");
    bigPicture.classList.remove("hidden");

    let bigPhoto = bigPicture.querySelector('.big-picture__preview');
    bigPhoto.querySelector('.big-picture__img > img').src = sample.url;
    bigPhoto.querySelector('.likes-count').textContent = sample.likes;
    bigPhoto.querySelector('.social__caption').textContent = sample.description;
    bigPhoto.querySelector('.comments-count').textContent = sample.comments.length;
    
    bigPictureClosed.addEventListener("click", onBigPictureCloseClick);
    
    renderCommentsList(sample.comments);

    if (sample.comments.length > commentsCountBase) { 
        commentsCountShow(commentsCountBase);
        commentsLoader.classList.remove("visually-hidden");
    } else {
        commentsCountShow(sample.comments.length);
        commentsLoader.classList.add("visually-hidden");
    }

    addNewCommentButton.addEventListener("click", addNewComment);
    commentsLoader.addEventListener("click", openComments);   
}

export {bigPhotoPreview}
import {createSlider} from "./filter-slider.js"
import {updateValue, updateTextValue} from "./filter-comments.js"
import "./filter-scale.js";
import { showAlert, showSuccess, closeUserModal } from "./util.js";
import { sendData } from "./api.js";

let count = 1;

const body = document.querySelector("body");
const uploadForm = document.querySelector("#upload-select-image");
const uploadInput = uploadForm.querySelector("#upload-file");
const imgUploadOverlay = uploadForm.querySelector(".img-upload__overlay");
const imgUpload = document.querySelector(".img-upload");
const imgUploadPreview = imgUpload.querySelector(".img-upload__preview img");
const sliderElement = document.querySelector('.effect-level__slider');
const commentArea = imgUpload.querySelector(".img-upload__text");
const hashtagArea = commentArea.querySelector(".text__hashtags");
const textCommentArea = imgUpload.querySelector(".text__description");

    uploadInput.addEventListener("change", () => {
        imgUploadOverlay.classList.remove("hidden");
        body.classList.add("modal-open");
        imgUploadPreview.style.transform = `scale(${count=1})`;
    })



const buttonCancel = document.querySelector('#upload-cancel');
buttonCancel.addEventListener('click', closeUserModal)

createSlider(sliderElement);
hashtagArea.addEventListener("input", () => updateValue(hashtagArea));
textCommentArea.addEventListener("input", () => { updateTextValue (textCommentArea)});


const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => showSuccess(),
      () => showAlert(),
      new FormData(evt.target)
    )
  })
}

/*
РАБОЧИЙ КОД
const setUserFormSubmit = (onSuccess) => {
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
    ).then((response) => {
      if (response.ok) {
        onSuccess(showSuccess());
      } else {
        showAlert();
      }
    })
    .catch(() => {
      showAlert();
    });
});
}; */

setUserFormSubmit(closeUserModal);




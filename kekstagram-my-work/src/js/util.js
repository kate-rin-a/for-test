const ALERT_SHOW_TIME = 5000;

const randomFun = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}

const uploadForm = document.querySelector("#upload-select-image");
const imgUploadOverlay = uploadForm.querySelector(".img-upload__overlay");
const imgUploadPreview = uploadForm.querySelector(".img-upload__preview img");
const sliderContainer = document.querySelector('.effect-level');
const uploadInput = uploadForm.querySelector("#upload-file");

const closeUserModal = () => {
    imgUploadOverlay.classList.add("hidden");
    document.body.classList.remove("modal-open");
    imgUploadPreview.style.filter = `none`;
    sliderContainer.classList.add("visually-hidden");
    uploadInput.value = '';
}

const alertMessageTemplate = document.querySelector("#error").content.querySelector(".error");

const showAlert = () => {
    const alertContainer = alertMessageTemplate.cloneNode(true);
    alertContainer.style.zIndex = 100;
    alertContainer.style.position = 'absolute';
    alertContainer.style.left = 0;
    alertContainer.style.top = 0;
    alertContainer.style.right = 0;
    alertContainer.style.padding = '10px 3px';
    alertContainer.style.fontSize = '30px';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.backgroundColor = 'red';

    const alertContainerButton = alertContainer.querySelector('.error__button');
    alertContainerButton.addEventListener("click", () => {
      alertContainer.remove();
    })

    document.body.append(alertContainer);

    setTimeout(() => {
        alertContainer.remove();
      }, ALERT_SHOW_TIME);
}

const showSuccessTemplate = document.querySelector("#success").content.querySelector(".success");
const showSuccess = () => {
  const successMessage = showSuccessTemplate.cloneNode(true);
  successMessage.style.zIndex = 100;
  successMessage.style.position = 'absolute';
  successMessage.style.left = 0;
  successMessage.style.top = 0;
  successMessage.style.right = 0;
  successMessage.style.padding = '10px 3px';
  successMessage.style.fontSize = '30px';
  successMessage.style.textAlign = 'center';
  successMessage.style.backgroundColor = 'green';

   const successMessageButton = successMessage.querySelector(".success__button");
   successMessageButton.addEventListener("click", ()=> {
    successMessage.remove();
    closeUserModal();
   });

  document.body.append( successMessage );


  setTimeout(() => {
    successMessage.remove();
  }, ALERT_SHOW_TIME);
}

const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min < max) {
    [min,max] = [max,min];
  }

  return Math.floor(Math.random() * (max - min + 1))  + min;
}

const getRandomStr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}


export {randomFun, showAlert, showSuccess, closeUserModal, getRandomNumber, getRandomStr}

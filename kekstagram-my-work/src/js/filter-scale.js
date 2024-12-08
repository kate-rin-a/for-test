let count = 1;
const STEP_MAX = 1;
const STEP_MIN = 0.25;
const COUNT_STEP = 0.25;

const imgUpload = document.querySelector(".img-upload");
const imgUploadScale = imgUpload.querySelector(".img-upload__scale");
const imgUploadScaleBig = imgUploadScale.querySelector(".scale__control--bigger");
const imgUploadScaleSmall = imgUploadScale.querySelector(".scale__control--smaller");
const imgUploadPreview = imgUpload.querySelector(".img-upload__preview img");
const scaleValue = imgUploadScale.querySelector('.scale__control--value');

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
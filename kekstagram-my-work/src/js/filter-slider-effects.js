const imgUpload = document.querySelector(".img-upload");
const sliderElement = document.querySelector('.effect-level__slider');
const effectSamples = imgUpload.querySelectorAll(".effects__item");
const valueElement = imgUpload.querySelector('.effect-level__value');
const imgUploadPreview = imgUpload.querySelector(".img-upload__preview img");
const sliderElementContainer = document.querySelector('.img-upload__effect-level');
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
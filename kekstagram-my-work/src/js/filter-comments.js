function updateValue(hashtagArea) {  
    let text = (hashtagArea.value).split(" ");
    text.forEach((item, index, Array) => {
      const isRepeatingHashtag = text.some((item, i, arr) => {
        return arr.indexOf(item, i + 1) >= i + 1;
      });

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
        else if (isRepeatingHashtag) {
                hashtagArea.setCustomValidity('Хэш-теги не должны повторяться');
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

//const textCommentArea = imgUpload.querySelector(".text__description");

const updateTextValue = (textCommentArea) => {
  let text = textCommentArea.value;

    if (text.length > 140) {
      textCommentArea.setCustomValidity("Используйте не больше 140 символов");
    } else {
      textCommentArea.setCustomValidity("");
    }
  }

export {updateValue, updateTextValue}
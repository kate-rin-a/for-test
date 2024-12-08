const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__start input[type="file"]');
const preview = document.querySelector('.img-upload__preview img');

fileChooser.addEventListener("change", () => {
    const file = fileChooser.files[0]; //У DOM-узла поля для выбора файла есть свойство files — это структура, похожая на массив.
    const fileName = file.name.toLowerCase(); //чтобы не думать о том, выбрал пользователь image.JPG или image.jpg, приведём название файла к строчным буквам
    
    //нужно проверить, оканчивается ли имя файла одним из допустимых расширений
    const matches = FILE_TYPES.some((it) => {
        return fileName.endsWith(it); //В этом нам поможет метод строки endsWith.
    })
    
    if (matches) {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            preview.src = reader.result; //бработчик события load, которое можно читать как «чтение завершено»
        })

        reader.readAsDataURL(file); //
    }
})

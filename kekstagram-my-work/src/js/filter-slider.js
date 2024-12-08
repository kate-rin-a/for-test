import "./filter-slider-effects.js"

const createSlider = (sliderContainer) => {
    noUiSlider.create(sliderContainer, {
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
                return value = value.toFixed(0);
            } else {
                value.toFixed(1)
                return value ; //С помощью toFixed оставим нужное количество знаков после запятой.
            }
        },
        from: function (value) {
            return parseFloat(value);
        },
    }
    });
}

export {createSlider}
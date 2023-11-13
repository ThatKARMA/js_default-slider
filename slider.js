let slider = document.querySelector('.slider');

//Создаем иконку загрузки
let loadIcon = document.createElement('i');
loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
slider.insertAdjacentElement("afterbegin", loadIcon);

//Левая стрелка
let leftArrow = document.createElement('i');
leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
slider.insertAdjacentElement("beforeend", leftArrow);

//Правая стрелка
let rightArrow = document.createElement('i');
rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
slider.insertAdjacentElement("beforeend", rightArrow);

//Ждем когда весь контент загрузится
window.addEventListener('load', function() {

    leftArrow.addEventListener('click', function () {
        images.setNextLeftImage();
    });

    rightArrow.addEventListener('click', function () {
        images.setNextRightImage();
    });

    //Инициализация слайдера
    images.Init();
    //Скрываем иконку загрузки
    hideloadIcon(loadIcon);
});

/**
 * Функция скрывает иконку загрузки
 * @param {HTMLElement} loadIcon
 */
function hideloadIcon(loadIcon) {
    loadIcon.style.display = "none";
}



/**
 * Функция берет у элемента слайдера его data-атрибуты размеров,
 * и если они определены, то самому слайдеру меняет размеры.
 * @param {HTMLDivElement} slider
 */
function setSizes(slider) {
    let width = slider.getAttribute("data-width");
    let height = slider.getAttribute("data-height");
    if (width !== null && width !== "") {
        slider.style.width = width;
    }
    if (height !== null && height !== "") {
        slider.style.height = height;
    }
}
setSizes(slider);

//Объект слайдера
let images = {
    /*{int} Номер текущего изображения*/
    currentIdx: 0,

    /*{HTMLDivElement[]} slides элементы слайдов*/
    slides: [],

    /** Получаем все слайды и показываем первый слайд. */
    Init() {
        this.slides = document.querySelectorAll('.slider-item');
        this.showImageWithCurrentIdx();
    },

    /** Берем слайд с текущим индексом и убираем у него класс
     * hiddenslide
     */
    showImageWithCurrentIdx() {
        this.slides[this.currentIdx].classList.remove('hiddenslide');
    },

    //Всем слайдам добавляем класс hiddenslide
    hideVisibleImages() {
        this.slides.forEach(function(slide) {
            slide.classList.add('hiddenslide')
        });
    },

    //Переключиться на предыдущее изображение
    setNextLeftImage() {
        this.hideVisibleImages();
        if (this.currentIdx == 0) {
            this.currentIdx = this.slides.length - 1;
        } else {
            this.currentIdx--;
        }
        this.showImageWithCurrentIdx();
    },

    //Переключиться на следующее изображение
    setNextRightImage() {
        this.hideVisibleImages();
        if (this.currentIdx == this.slides.length - 1   ) {
            this.currentIdx = 0;
        } else {
            this.currentIdx++;
        }
        this.showImageWithCurrentIdx();
    },
};
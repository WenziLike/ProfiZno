const $ = {};

; // общий файл
//JS - ФУНКЦИЯ ОПРЕДЕЛЕНИЯ ПОДДЕРЖКИ WEBP
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});; // проверка на поддержку изображений  WebP
//=================================================================================
//скрипт для  анимации страницы свойства анимации в файлике scss с сайта https://animista.net
const AnimetedElements = document.querySelectorAll('.__anime-elem');// ищим у всех элементов класс (_anime-elem)
// проверяем все элементы на существование класса
if (AnimetedElements.length > 0) {
    window.addEventListener('scroll', animetedScroll);
    function animetedScroll() {
        for (let i = 0; i < AnimetedElements.length; i++) {
            const AnimetedElement = AnimetedElements[i];
            const AnimetedElementHeight = AnimetedElement.offsetHeight; //получаю высоту обьекта
            const AnimetedElementOffset = offset(AnimetedElement).top; //получаю позицию обьекта относительно верха
            const AnimetedStart = 4; // момент старта анимации

            let AnimetedElementPoint = window.innerHeight - AnimetedElementHeight / AnimetedStart; //высчитываем высоту браузер

            if (AnimetedElementHeight > window.innerHeight) {
                AnimetedElementPoint = window.innerHeight - window.innerHeight / AnimetedStart;
            }

            if ((pageYOffset > AnimetedElementOffset - AnimetedElementPoint) && pageYOffset < (AnimetedElementOffset + AnimetedElementHeight)) {
                AnimetedElement.classList.add('_active');
            } else {
                AnimetedElement.classList.remove('_active');
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }
    setTimeout(() => {
        animetedScroll();
    }, 300);
}
//=================================================================================
; // скриптик анимаций
//=================================================================================
//COD для  кнопки в модальном окне (улетает конверт)
const ModalBtn = () => {
    function mailBtn() {
        let mail = document.querySelector('.mail-btn');
        let send = document.querySelector('.send');
        mail.classList.add('fly');

        setTimeout(function () {
            mail.classList.remove('fly');
        }, 5400);
        // очистка полей формы  (инпутовб и  текстерия)
        // let clearFormsText = document.querySelectorAll("input, textarea");
        // for (let i = 0; i < clearFormsText.length; i++) {
        //     clearFormsText[i].value = '';
        // }
    }
    document.querySelector('.mail-btn').onclick = mailBtn;
};; // файлик к модальному окну
//=================================================================
//https://github.com/PHPMailer ссылка на  архив Php mailer 
//=================================================================

"use strict";

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('form'); //  взял весь обьект формы
    const send = document.getElementById('send');// получаю по ID, 2 модальное окно 
    let sendText = document.querySelector('.send__text');
    //=================================================================
    const sendInfo = ({
        MessageSent: 'Дякуємо за Вашу заявку, ми сконтактуємось з Вами найближчим часом!!!', //message sent
        ErrorSending: 'Ошибка при отправке!!!Проверьте  интернет соединение...',   //Error sending !!! Check your internet connection ...
        FillInRequiredFields: 'Заполните обязательные поля!!!', //Fill in required fields!!!
        EnterYourPhoneNumber: "Введите номер телефона!!!",   // Enter your phone number !!!
        IncorrectNumber: "Не корректный номер телефона!!!", //Incorrect number !!!
    });
    //=================================================================




    form.addEventListener('submit', formSend);

    //функция formSend
    async function formSend(e) {
        e.preventDefault(); // запретил стандартную отправку формы
        //=================================================================
        let error = formValidedate(form); // функция валидация перешла  в переменную error
        let formData = new FormData(form);
        //=================================================================
        if (error === 0) {
            form.classList.add('__sending'); // если нет ошибок  добавляется класс 

            let response = await fetch('../../send.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                // alert(result.message);
                form.reset(); // очистка формы
                form.classList.remove('__sending');
                sendText.textContent = `${sendInfo.MessageSent}`;
                checkAndDelClass();
                // alert('Сообщение отправленно)))');
            } else {
                form.classList.remove('__sending');
            }
        } else {
            // alert('Пожалуйста заполните обязательные поля!!!*');
            // sendText.textContent = `${sendInfo.FillInRequiredFields}`;
            // checkAndDelClass();
        }
    }
    //===================================================================================
    // функция  проверки наличие класса send__active и удаление класса send
    function checkAndDelClass() {
        send.classList.add('send');
        if (send.getAttribute("class") === "send") {
            setTimeout(function () {
                send.classList.add('send__active');
                setTimeout(function () {
                    send.classList.remove('send__active');
                    setTimeout(() => {
                        send.removeAttribute("class");
                    }, 1500);
                }, 2800);
            }, 200);
        } else {
            // alert("Ошибка при отправке!!! Проверьте интернет соединение...");
            sendText.textContent = `${sendInfo.ErrorSending}`;
            checkAndDelClass();
        }
    }
    //===================================================================================
    //функция валидации
    function formValidedate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.__req'); // взял все классы  __req в переменную

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            console.log(formReq[i]);
            formRemoveError(input);// изначально убрал класс __error

            // проверка
            if (input.classList.contains('__email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "tel") {
                //===========================
                //проверка теллефона
                if (phoneTest(input) && input.value !== '') {
                    formAddError(input);
                    error++;
                    // !'Не корректный номер!!!
                    sendText.textContent = `${sendInfo.IncorrectNumber}`;
                    checkAndDelClass();


                    // setTimeout(() => {

                    // }, 2000);
                } else {
                    // TODO  //при проверке формы 
                    // TODO // с незаполненными полями выводит введите номер  должно ыводить заполните обязательные поля


                    if (input.value === "") {
                        formAddError(input);
                        error++;

                        setTimeout(() => {
                            //!Введите номер телефона!!!
                            sendText.textContent = `${sendInfo.EnterYourPhoneNumber}`;
                            checkAndDelClass();
                        }, 10);
                    }
                }
                //===========================
            } else {
                //===========================
                // общая проверка пустых инпутов
                if (input.value === "") {
                    // !Заполните обязательные поля!!!
                    formAddError(input);
                    error++;
                    sendText.textContent = `${sendInfo.FillInRequiredFields}`;
                    checkAndDelClass();
                }
            }
        }
        return error;
    }
    //===================================================================================
    // функция добавление класса самому  обьекту и родительскому  обьекту класс __error
    function formAddError(input) {
        input.parentElement.classList.add('__error');
        input.classList.add('__error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('__error');
        input.classList.remove('__error');
    }
    //===================================================================================
    //==============================================================
    //Функция дополнительная регулярного выражения для проверки текста email
    function emailTest(input) {
        return !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(input.value);
    }
    //==============================================================
    //==============================================================
    //Функция дополнительная регулярного выражения для проверки номера телефона
    function phoneTest(input) {
        return !/^([+]?[0-9]{3,12})*$/i.test(input.value);

    }
    //==============================================================
});; // файлик отправки заявки  на почту
//=================================================================================
// FOOTER функция для добавления в определенном месте футер после основного контента
Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
};

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {// проверили на пустоту кнопок
        return document.createElement('div');
    }
    // создаем обертку Wrap
    const wrap = document.createElement('div');
    wrap.classList.add('modal__footer');
    // создали кнопки и повесили событие клик в  футере
    buttons.forEach(btn => {
        const $btn = document.createElement('button');
        $btn.textContent = btn.text;
        $btn.classList.add('btn');
        $btn.classList.add(`btn-${btn.type || 'secondary'}`);
        $btn.onclick = btn.handler || noop;

        wrap.appendChild($btn);
    })
    return wrap;
}

//=================================================================================
//MODAL создаем модальное окно
function _createModal(options) {
    const DEFAULT_WIDTH = '600px'; // значение по умолчанию ширина контента
    const modal = document.createElement('div');
    modal.classList.add('modal');
    // Шаблон формы который  заполняем контентом...
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal__overlay" data-close="true">
        <div class="modal__window" style="max-width: ${options.maxWidth || DEFAULT_WIDTH}">
            <div class="modal__header">
                <span class="modal__title">${options.ModalTitle || ''}</span>
                ${options.closable ? `<span class="modal__close" data-close="true">&times;</span>` : ''}
            </div>
            <div class="modal__body" data-content>
                ${options.content || 'Встаь контент'}
            </div>
        </div>
    </div>
`);
    const footer = _createModalFooter(options.FooterButtons);//создали массив который указали
    footer.appendAfter(modal.querySelector('[data-content]'));
    document.body.appendChild(modal);
    return modal;
}
//=================================================================================
$.modal = function (options) {
    const ANIMATION_SPEED = 200; // скорость исчизновении анимации
    const $modal = _createModal(options);
    let closing = false; // привязка анимации к новому классу
    let destroyed = false;

    // создаем и удаляем класс OPEN модального окна
    const modal = {
        open() {
            if (destroyed) {
                return console.log(('Modal is destroyed'));
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true;
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout(() => {
                $modal.classList.remove('hide');
                closing = false;
            }, ANIMATION_SPEED);
        },
    }



    /* 
        Функция которая  проверяет  наличие атрибута  и его значения 
        в нашем случаии это крестик  закрытия  окна
        и затемненного фона;
    */
    const listener = event => {
        // console.log('clicked', event.target.dataset.close)
        if (event.target.dataset.close) {
            modal.close();
        }
    }
    $modal.addEventListener('click', listener);

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal);
            /*удаляем слушателя  клик
            так как  он остался  после удаляния модального окна для  избежания  утечки памяти
            */
            $modal.removeEventListener('click', listener);
            destroyed = true;
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        }
    });
};

; // модальное окно
//=================================================================================
//функция  добавления  класса  Active
//получаю меню
//TIMELINE 
const allTitleP = document.querySelectorAll('.timeline__menu-contents');
const allTitle = document.querySelectorAll('.timeline ul li div');

allTitle.forEach(item => {
    item.addEventListener('click', function (elem) {
        for (let i = 0; i < allTitle.length; i++) {
            allTitle[i].classList.remove("active");
        }
        this.classList.add("active");
    });
});

allTitleP.forEach(item => {
    item.addEventListener('click', function (elem) {
        for (let i = 0; i < allTitleP.length; i++) {
            allTitleP[i].classList.remove("is-open");
        }
        this.classList.toggle("is-open");

    });
});
//=================================================================================
/*
    функция для отображения контента
    переключаемые вертикальные вкладки с правой стороны с контентом
*/
function openInfo(evt, sectionsTitle) {
    // Объявил все переменные
    let i, contentsItem, TimelineMenuContents;

    // Получить все элементы с class="contents-item" и скрыл их
    contentsItem = document.getElementsByClassName("contents-item");
    for (i = 0; i < contentsItem.length; i++) {
        contentsItem[i].style.display = "none";
    }

    // Получить все элементы с class="tablinks" и удалить class "active"
    TimelineMenuContents = document.getElementsByClassName("timeline__menu-contents");
    for (i = 0; i < TimelineMenuContents.length; i++) {
        TimelineMenuContents[i].className = TimelineMenuContents[i].className.replace(" active", "");
    }

    // Показать текущую вкладку и добавить "active" класс по ссылке, открывшей вкладку
    document.getElementById(sectionsTitle).style.display = "block";
    evt.currentTarget.className += " active";
}
// получил элемент по умолчанию (при перезагрузке открывается  окно по умолчанию)
document.getElementById("defaultOpen").click();


//=======================================================================================;
var multiItemSlider = (function () {

    function _isElementVisible(element) {
        var rect = element.getBoundingClientRect(),
            vWidth = window.innerWidth || doc.documentElement.clientWidth,
            vHeight = window.innerHeight || doc.documentElement.clientHeight,
            elemFromPoint = function (x, y) { return document.elementFromPoint(x, y) };
        if (rect.right < 0 || rect.bottom < 0
            || rect.left > vWidth || rect.top > vHeight)
            return false;
        return (
            element.contains(elemFromPoint(rect.left, rect.top))
            || element.contains(elemFromPoint(rect.right, rect.top))
            || element.contains(elemFromPoint(rect.right, rect.bottom))
            || element.contains(elemFromPoint(rect.left, rect.bottom))
        );
    }

    return function (selector, config) {
        var
            _mainElement = document.querySelector(selector),
            _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
            _sliderItems = _mainElement.querySelectorAll('.slider__item'),// элементы (.slider-item)
            _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
            _sliderControlLeft = _mainElement.querySelector('.slider__control-left'),// кнопка "LEFT"
            _sliderControlRight = _mainElement.querySelector('.slider__control-right'),// кнопка "RIGHT"
            _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width),// ширина обёртки
            _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),// ширина одного элемента
            _html = _mainElement.innerHTML,
            _indexIndicator = 0,
            _maxIndexIndicator = _sliderItems.length - 1,
            _indicatorItems,
            _positionLeftItem = 0,
            _transform = 0, // значение транфсофрмации .slider_wrapper
            _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
            _items = [], // массив элементов
            _interval = 0,
            _states = [
                { active: false, minWidth: 0, count: 1 },
                { active: false, minWidth: 576, count: 2 },
                { active: false, minWidth: 992, count: 3 },
                { active: false, minWidth: 1200, count: 4 },
            ],
            _config = {
                isCycling: false, // автоматическая смена слайдов
                direction: 'right',// направление смены слайдов
                interval: 5000, // интервал между автоматической сменой слайдов
                pause: true // устанавливать ли паузу при поднесении курсора к слайдеру
            };

        for (var key in config) {
            if (key in _config) {
                _config[key] = config[key];
            }
        }
        // наполнение массива _items
        _sliderItems.forEach(function (item, index) {
            _items.push({ item: item, position: index, transform: 0 });
        });

        var _setActive = function () {
            var _index = 0;
            var width = parseFloat(document.body.clientWidth);
            _states.forEach(function (item, index, arr) {
                _states[index].active = false;
                if (width >= _states[index].minWidth)
                    _index = index;
            });
            _states[_index].active = true;
        }

        var _getActive = function () {
            var _index;
            _states.forEach(function (item, index, arr) {
                if (_states[index].active) {
                    _index = index;
                }
            });
            return _index;
        }

        var position = {
            getItemMin: function () {
                var indexItem = 0;
                _items.forEach(function (item, index) {
                    if (item.position < _items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getItemMax: function () {
                var indexItem = 0;
                _items.forEach(function (item, index) {
                    if (item.position > _items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getMin: function () {
                return _items[position.getItemMin()].position;
            },
            getMax: function () {
                return _items[position.getItemMax()].position;
            }
        }

        var _transformItem = function (direction) {
            var nextItem, currentIndicator = _indexIndicator;
            if (!_isElementVisible(_mainElement)) {
                return;
            }
            if (direction === 'right') {
                _positionLeftItem++;
                if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
                    nextItem = position.getItemMin();
                    _items[nextItem].position = position.getMax() + 1;
                    _items[nextItem].transform += _items.length * 100;
                    _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
                }
                _transform -= _step;
                _indexIndicator = _indexIndicator + 1;
                if (_indexIndicator > _maxIndexIndicator) {
                    _indexIndicator = 0;
                }
            }
            if (direction === 'left') {
                _positionLeftItem--;
                if (_positionLeftItem < position.getMin()) {
                    nextItem = position.getItemMax();
                    _items[nextItem].position = position.getMin() - 1;
                    _items[nextItem].transform -= _items.length * 100;
                    _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
                }
                _transform += _step;
                _indexIndicator = _indexIndicator - 1;
                if (_indexIndicator < 0) {
                    _indexIndicator = _maxIndexIndicator;
                }
            }
            _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
            _indicatorItems[currentIndicator].classList.remove('active');
            _indicatorItems[_indexIndicator].classList.add('active');
        }

        var _slideTo = function (to) {
            var i = 0, direction = (to > _indexIndicator) ? 'right' : 'left';
            while (to !== _indexIndicator && i <= _maxIndexIndicator) {
                _transformItem(direction);
                i++;
            }
        }

        var _cycle = function (direction) {
            if (!_config.isCycling) {
                return;
            }
            _interval = setInterval(function () {
                _transformItem(direction);
            }, _config.interval);
        }
        // обработчик события click для кнопок "назад" и "вперед"

        var _controlClick = function (e) {
            if (e.target.classList.contains('slider__control')) {
                e.preventDefault();
                var direction = e.target.classList.contains('slider__control-right') ? 'right' : 'left';
                _transformItem(direction);
                clearInterval(_interval);
                _cycle(_config.direction);
            }
            if (e.target.getAttribute('data-slide-to')) {
                e.preventDefault();
                _slideTo(parseInt(e.target.getAttribute('data-slide-to')));
                clearInterval(_interval);
                _cycle(_config.direction);
            }
        };

        var _handleVisibilityChange = function () {
            if (document.visibilityState === "hidden") {
                clearInterval(_interval);
            } else {
                clearInterval(_interval);
                _cycle(_config.direction);
            }
        }

        var _refresh = function () {
            clearInterval(_interval);
            _mainElement.innerHTML = _html;
            _sliderWrapper = _mainElement.querySelector('.slider__wrapper');
            _sliderItems = _mainElement.querySelectorAll('.slider__item');
            _sliderControls = _mainElement.querySelectorAll('.slider__control');
            _sliderControlLeft = _mainElement.querySelector('.slider__control-left');
            _sliderControlRight = _mainElement.querySelector('.slider__control-right');
            _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width);
            _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width);
            _positionLeftItem = 0;
            _transform = 0;
            _indexIndicator = 0;
            _maxIndexIndicator = _sliderItems.length - 1;
            _step = _itemWidth / _wrapperWidth * 100;
            _items = [];
            _sliderItems.forEach(function (item, index) {
                _items.push({ item: item, position: index, transform: 0 });
            });
            _addIndicators();
        }

        var _setUpListeners = function () {
            _mainElement.addEventListener('click', _controlClick);
            if (_config.pause && _config.isCycling) {
                _mainElement.addEventListener('mouseenter', function () {
                    clearInterval(_interval);
                });
                _mainElement.addEventListener('mouseleave', function () {
                    clearInterval(_interval);
                    _cycle(_config.direction);
                });
            }

            document.addEventListener('visibilitychange', _handleVisibilityChange, false);
            window.addEventListener('resize', function () {
                var
                    _index = 0,
                    width = parseFloat(document.body.clientWidth);
                _states.forEach(function (item, index, arr) {
                    if (width >= _states[index].minWidth)
                        _index = index;
                });
                if (_index !== _getActive()) {
                    _setActive();
                    _refresh();
                }
            });
        }

        var _addIndicators = function () {
            var sliderIndicators = document.createElement('ol');
            sliderIndicators.classList.add('slider__indicators');
            for (var i = 0; i < _sliderItems.length; i++) {
                var sliderIndicatorsItem = document.createElement('li');
                if (i === 0) {
                    sliderIndicatorsItem.classList.add('active');
                }
                sliderIndicatorsItem.setAttribute("data-slide-to", i);
                sliderIndicators.appendChild(sliderIndicatorsItem);
            }
            _mainElement.appendChild(sliderIndicators);
            _indicatorItems = _mainElement.querySelectorAll('.slider__indicators > li')
        }

        // добавляем индикаторы
        _addIndicators();
        // инициализация
        _setUpListeners();

        if (document.visibilityState === "visible") {
            _cycle(_config.direction);
        }
        _setActive();

        return {
            right: function () { // метод right
                _transformItem('right');
            },
            left: function () { // метод left
                _transformItem('left');
            },
            stop: function () { // метод stop
                _config.isCycling = false;
                clearInterval(_interval);
            },
            cycle: function () { // метод cycle
                _config.isCycling = true;
                clearInterval(_interval);
                _cycle();
            }
        }

    }
}());

var slider = multiItemSlider('.slider', {
    isCycling: true
});; // файлик слайдера
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu__nav'),
        menuList = document.querySelectorAll('.menu__nav-link'),
        burger = document.querySelector('.menu__burger');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('lock');
    });

    menuList.forEach(item => {
        item.addEventListener('click', () => {
            burger.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.classList.toggle('lock');
        });
    });
});; // файлик бургер меню




//=================================================================================
//NOTES ! передача параметров в  модальное окно с контентом в  данном случаи это форма
const modal = $.modal({
    maxWidth: '900px',
    ModalTitle: 'Форма заявки курсу',
    closable: true,
    content: `
               <div class="modal__form">
    <form action="#" method="POST" id="form" class="form__body form__contacts">
        <h2 class="form__title">Відправити повідомлення</h2>

        <div class="form__item">
            <input type="text" name="first_name" class="form__input __req" placeholder="Ім'я *:" autocomplete="off" >
        </div>

        <div class="form__item">
            <input type="text" name="last_name" class="form__input __req" placeholder="Прізвище *:" autocomplete="off" >
        </div>

        <div class="form__item">
            <input type="text" name="email-address" class="form__input __req __email" placeholder="Пошта *:" autocomplete="off">
        </div>

        <div class="form__item">
            <input type="tel" name="phone" class="form__input __req"  placeholder="Номер телефону *:" autocomplete="off">
        </div>

        <div class="form__item">
            <div class="select">Підготовка з якого предмету Вас цікавить?</div>
            <select name="courses" class="form__input">
                <option selected>Біологія</option>
                <option>Українська мова</option>
                <option>Математика</option>
            </select>
            <div class="select">Як Ви хочете щоб ми з Вами звязались: телефон/пошта?</div>
            <select name="connection" class="form__input">
                <option selected>Телефон</option>
                <option>Пошта</option>
            </select>
            <div class="select">В якому Ви (Ваша дитина) класі?</div>
            <select name="SchoolClass" class="form__input">
                <option selected>5-9 клас</option>
                <option>10 клас</option>
                <option>11 клас</option>
            </select>
        </div>

        <div class="form__item">
            <textarea name="comment" placeholder="Ваші запитання ..." class="form__comments"></textarea>
        </div>

        <button type="submit" name="button" class="form__btn mail-btn">
            Відправити
        </button>
        <div id="send">
            <div class="send__overlay">
                <div class="send__window">
                    <div class="send__content">
                        <span class="send__text"></span>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
     `,
    FooterButtons: [
        {
            text: 'Ok', type: 'primary', handler() {
                console.log('Primary btn clicked');
                modal.close();
            }
        },
        {
            text: 'Cancel', type: 'danger', handler() {
                console.log('Danger btn clicked');
                modal.close();
            }
        },
    ]
});
//=================================================================================
// const sendInfo = $.modal({
//     MessageSent: 'Дякуємо за Вашу заявку, ми сконтактуємось з Вами найближчим часом!!!',
//     ErrorSending: 'Ошибка при отправке!!!',
//     FillInRequiredFields: 'Заполните обязательные поля!!!',


// });
//=================================================================================
// вызов модального окна по кнопке в Header
// const buttModals = document.querySelector('.btn');
const buttModals = document.querySelector('[data-modal]'); //получил кнопку по атрибуту

const fu = buttModals.addEventListener('click', () => {
    modal.open();// открытие модального окна
    // ModalBtn();// вызывается функция кнопки в модальном окне
});
//=================================================================================
// autocomplete="off"


//=================================================================================
// функция  открытия  и закрытие карточек
let cards = document.querySelectorAll('.card');

function clickCard() {
    this.classList.toggle('is-flipped');
}

for (let i = 0; i < cards.length; i++) {
    cards[i].onclick = clickCard;
    // if (cards[i] === 'click') {
    //     setTimeout(clickCard(), 1000);
    // }
    // cards[i].onmouseout = clickCard;
}



$('.projects__slider').slick({
    dots: true,
    slidesToShow: 4,
    slidesToScroll:4,
    prevArrow: '<img class="projects__slider-arrow projects__slider-arrow-left" src="img/arrow-left.svg" alt="arrow"></img>',
    nextArrow: '<img class="projects__slider-arrow slider-arrows projects__slider-arrow-right" src="img/arrow-right.svg" alt="arrow"></img>',
    responsive: [
        {
          breakpoint: 1250,
          settings: {
            dots: true,
            slidesToShow: 3,
            slidesToScroll:3,
            prevArrow: '<img class="projects__slider-arrow projects__slider-arrow-left" src="img/arrow-left.svg" alt="arrow"></img>',
            nextArrow: '<img class="projects__slider-arrow slider-arrows projects__slider-arrow-right" src="img/arrow-right.svg" alt="arrow"></img>',
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            prevArrow: false,
            nextArrow: false,
            slidesToScroll: 3,
            dots: true,
          }
        },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 2,
            prevArrow: false,
            nextArrow: false,
            slidesToScroll: 2,
            dots: true,
          }
        },
        {
            breakpoint: 520,
            settings: {
              slidesToShow: 1,
              prevArrow: false,
              nextArrow: false,
              slidesToScroll: 1,
              dots: true,
            }
          },
          {
            breakpoint: 375,
            settings: {
              slidesToShow: 1,
              prevArrow: false,
              nextArrow: false,
              slidesToScroll: 1,
              dots: false,
            }
          }
      ]
});
/////////// modal
$modal = function (options) {
    var
      _elemModal,
      _eventShowModal,
      _eventHideModal,
      _hiding = false,
      _destroyed = false,
      _animationSpeed = 200;

    function _createModal(options) {
      var
        elemModal = document.createElement('div'),
        modalTemplate = '<div class="modal__backdrop" data-dismiss="modal"><div class="modal__content"><div class="modal__header"><div class="modal__title" data-modal="title">{{title}}</div><span class="modal__btn-close" data-dismiss="modal" title="Закрыть">×</span></div><div class="modal__body" data-modal="content">{{content}}</div>{{footer}}</div></div>',
        modalFooterTemplate = '<div class="modal__footer">{{buttons}}</div>',
        modalButtonTemplate = '<button type="button" class="{{button_class}}" data-handler={{button_handler}}>{{button_text}}</button>',
        modalHTML,
        modalFooterHTML = '';

      elemModal.classList.add('modal');
      modalHTML = modalTemplate.replace('{{title}}', options.title || 'Новое окно');
      modalHTML = modalHTML.replace('{{content}}', options.content || '');
      if (options.footerButtons) {
        for (var i = 0, length = options.footerButtons.length; i < length; i++) {
          var modalFooterButton = modalButtonTemplate.replace('{{button_class}}', options.footerButtons[i].class);
          modalFooterButton = modalFooterButton.replace('{{button_handler}}', options.footerButtons[i].handler);
          modalFooterButton = modalFooterButton.replace('{{button_text}}', options.footerButtons[i].text);
          modalFooterHTML += modalFooterButton;
        }
        modalFooterHTML = modalFooterTemplate.replace('{{buttons}}', modalFooterHTML);
      }
      modalHTML = modalHTML.replace('{{footer}}', modalFooterHTML);
      elemModal.innerHTML = modalHTML;
      document.body.appendChild(elemModal);
      return elemModal;
    }

    function _showModal() {
      if (!_destroyed && !_hiding) {
        _elemModal.classList.add('modal__show');
        document.dispatchEvent(_eventShowModal);
      }
    }

    function _hideModal() {
      _hiding = true;
      _elemModal.classList.remove('modal__show');
      _elemModal.classList.add('modal__hiding');
      setTimeout(function () {
        _elemModal.classList.remove('modal__hiding');
        _hiding = false;
      }, _animationSpeed);
      document.dispatchEvent(_eventHideModal);
    }

    function _handlerCloseModal(e) {
      if (e.target.dataset.dismiss === 'modal') {
        _hideModal();
      }
    }

    _elemModal = _createModal(options || {});


    _elemModal.addEventListener('click', _handlerCloseModal);
    _eventShowModal = new CustomEvent('show.modal', { detail: _elemModal });
    _eventHideModal = new CustomEvent('hide.modal', { detail: _elemModal });

    return {
      show: _showModal,
      hide: _hideModal,
      destroy: function () {
        _elemModal.parentElement.removeChild(_elemModal),
          _elemModal.removeEventListener('click', _handlerCloseModal),
          destroyed = true;
      },
      setContent: function (html) {
        _elemModal.querySelector('[data-modal="content"]').innerHTML = html;
      },
      setTitle: function (text) {
        _elemModal.querySelector('[data-modal="title"]').innerHTML = text;
      }
    }
  };

  //SHOW ELEMENTS 

  function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
        change.target.classList.add('element-show');
      }
    });
  }
  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.services__item');
  for (let elm of elements) {
    observer.observe(elm);
  }

//Form
var modal = $modal({
    title: 'Подписка оформлена!',
    content: '<p>Теперь вам будут приходить наши обновления!</p>',
  });

async function handleFormSubmit(event) {
    // Просим форму не отправлять данные самостоятельно
    await event.preventDefault()
    await modal.show();
  }

  const applicantForm = document.querySelector('.mailing__form')
  applicantForm.addEventListener('submit', handleFormSubmit)


const burger = document.querySelector('#burger')
const menu = document.querySelector('#burger-menu')
const list = document.querySelector('.header__list')

//.header__list-item

const handleShowMenu = (event) => {
  burger.classList.toggle('active')
  menu.classList.toggle('active')
  list.classList.toggle('active')


}

const handleClikToLinks = (event) => {
  if (event.target.closest('.header__list-item')) {
    burger.classList.toggle('active')
    menu.classList.toggle('active')
    list.classList.toggle('active')

  }
}
burger.addEventListener("click", handleShowMenu)
list.addEventListener("click", handleClikToLinks)


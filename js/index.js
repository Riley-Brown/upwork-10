if (document.querySelectorAll('.hover-carousel').length > 0) {

  let hoverElements = document.querySelectorAll('.hover-carousel span');

  hoverElements.forEach(item => {
    item.addEventListener('mouseenter', function () {
      let hoverChildren = document.querySelector(`.test[data-hover="${item.dataset.hover}"]`).children;
      let hoverSpeed = item.dataset.speed;

      let hoverArr = []
      Array.from(hoverChildren).forEach(child => hoverArr.push(child.src))

      let index = 0;
      let randomNumber = Math.floor(Math.random() * 50);
      let hoverParent = document.querySelector('.hover-carousel-content');
      let hoverVideoDiv = document.querySelector('.hover-carousel-content-video video');
      let hoverCarousel = document.querySelector('.hover-carousel'); // hover elements parent container

      if (window.location.pathname == '/upwork-10/' || window.location.pathname == '/' || window.location.pathname == '/index.html') { // needs to be changed for production
        hoverParent.style.zIndex = '-1'
      } else {
        hoverParent.style.zIndex = '1000'
      }
      console.log(window.location)
      hoverParent.style.display = 'block';

      // checks if video or img
      if (hoverArr[0].includes('/video/')) {
        // hoverVideoDiv.style.display = 'block';
        $('.hover-carousel-content-video video').fadeIn();
        hoverVideoDiv.src = hoverArr[index]
      } else {
        hoverParent.style.display = 'block'
        hoverParent.style.background = `url('${hoverArr[index]}') 50% ${randomNumber}% / cover`;
        hoverParent.style.transition = 'linear 400ms';
      }

      // interval to change index
      let int = setInterval(function () {
        index++
        randomNumber = Math.floor(Math.random() * 50);
        console.log(randomNumber)
        if (index >= hoverChildren.length) {
          index = 0
        }

        // checks if video or img
        if (hoverArr[0].includes('/video/')) {
          hoverVideoDiv.src = hoverArr[index]
        } else {
          hoverParent.style.background = `url('${hoverArr[index]}') 50% ${randomNumber}% / cover`;
        }
      }, hoverSpeed)

      hoverCarousel.addEventListener('mouseleave', function () {
        hoverParent.style.transition = null
        hoverParent.style.background = null
        $('.hover-carousel-content-video video').fadeOut();
        clearInterval(int)
      })

      item.addEventListener('mouseleave', function () {
        clearInterval(int)
        $('.hover-carousel-content-video video').fadeOut();
        hoverParent.style.zIndex = '-1';
      })
    });
  });

  function onHover(element, imgArr, type, length) {
    let index = 0;

    // checks element type passed into function
    if (type == 'img') {
      // $('.hover-carousel-content').html(
      //   `<img src=${imgArr[index]} alt="portfolio" class="image-array">`
      // );
      $('#test img').attr('src', imgArr[index])
    } else if (type == 'video') {
      // Fades in image carousel with jQuery
      // $('.hover-carousel-content').fadeIn(400);
      $('.hover-carousel-content').html(
        `<video src=${
          imgArr[index]
        } class="image-array" autoplay muted loop></video>`
      );
    }

    // interval to increase array index
    let int = setInterval(function () {
      // increase value every interval
      index++;

      // resets index to 0 if longer than array length
      if (index >= imgArr.length) {
        index = 0;
      }

      // sets new src every interval
      document.querySelector('#test img').src = imgArr[index];
    }, length); // dynamic length based on value passed in

    // mouse leave event to clear interval and hide carousel
    element.addEventListener('mouseleave', function () {
      index = 0;
      clearInterval(int);

      // Fade out carousel with jQuery
      $('.hover-carousel-content').fadeOut(10);
    });
  }

  // event to open menu on Work span click
  hoverElements[1].addEventListener('click', openMenu);

  // event to close menu on emoji click
  $('.gesture-emoji').click(function () {
    $('.menu-popup').fadeOut();

    if (document.querySelectorAll('.fullscreen-landing').length > 0) {
      $('.fullscreen-landing').removeClass('fullscreen-landing-blur');
    }

  });

  // handles menu open
  function openMenu(e) {
    // fades in menu
    $('.menu-popup')
      .css('display', 'flex')
      .hide()
      .fadeIn();

    // adds class to blur landing content
    if (document.querySelectorAll('.fullscreen-landing').length > 0) {
      $('.fullscreen-landing').addClass('fullscreen-landing-blur');
    }

    // adds click to body to close menu
    e.stopPropagation();
    $('body').on('click', function () {
      $('.menu-popup').fadeOut();

      if (document.querySelectorAll('.fullscreen-landing').length > 0) {
        $('.fullscreen-landing').removeClass('fullscreen-landing-blur');
      }

    });
  }
}

// event to open menu on emoji click for pages other than landing page
if (document.querySelectorAll('.emoji-open').length > 0) {
  $('.emoji-open').on('click', function (e) {
    $('.menu-popup')
      .css('display', 'flex')
      .hide()
      .fadeIn();

    $('header').addClass('fullscreen-landing-blur');
    $('section').addClass('fullscreen-landing-blur');

    e.stopPropagation();
    $('body').on('click', function () {
      $('.menu-popup').fadeOut();
      $('header').removeClass('fullscreen-landing-blur');
      $('section').removeClass('fullscreen-landing-blur');
    });
  });

  $('.menu-popup .gesture-emoji').on('click', function () {
    $('.menu-popup').fadeOut();

    $('header').removeClass('fullscreen-landing-blur');
    $('section').removeClass('fullscreen-landing-blur');
  });
}

/* ===== Custom NON-Hover Carousel ===== */
if (document.querySelectorAll('.carousel').length > 0) {

  let carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => newCarousel(carousel))

  function newCarousel(carousel) {
    let carouselChildren = document.querySelector(`.carousel[data-carousel="${carousel.dataset.carousel}"]`).children;
    let speed = carousel.dataset.speed
    let carouselContent = document.querySelectorAll(`.carousel-content`)[carousel.dataset.carousel - 1];
    const carouselLength = carouselContent.children.length;
    let width = window.innerWidth;
    let count = width;
    let counterIncrement = width;
    let int = setInterval(timer, speed)

    if (window.innerWidth > 800) {
      window.addEventListener('resize', function () {
        width = window.innerWidth;
        count = width
        counterIncrement = width
        carouselContent.style.transform = `translateX(-${width}px)`;
        clearInterval(int)
        int = setInterval(timer, speed);
      })
    }

    // fixes mobile resizing 
    if (window.innerWidth < 800) {
      window.addEventListener('resize', function () {
        if (width < window.innerWidth || window.innerWidth < width - 150) {
          width = window.innerWidth;
          count = width
          counterIncrement = width
          carouselContent.style.transform = `translateX(-${width}px)`;
          clearInterval(int)
          int = setInterval(timer, speed);
        }
      })
    }

    // initial transform to start at index 1
    carouselContent.style.transform = `translateX(-${width}px)`

    function timer() {
      if (count >= (counterIncrement - 2) * (carouselLength - 2)) {
        count = 0
        carouselContent.style.transform = `translateX(-${count}px)`;
      }
      count = count + counterIncrement
      carouselContent.style.transform = `translateX(-${count}px)`;
    }

    function carouselClick() {
      // left click
      carouselChildren[0].addEventListener('click', function () {
        count = count - width

        // turns off hover after click for small screens
        if (width < 992) {
          carouselContent.style.transform = `translateX(-${count}px)`;
        } else {
          carouselContent.style.transform = `translateX(-${count - 100}px)`;
        }
        if (count < counterIncrement) {
          count = counterIncrement * (carouselLength - 2);
          if (width < 992) {
            carouselContent.style.transform = `translateX(-${count}px)`;
          } else {
            carouselContent.style.transform = `translateX(-${count - 100}px)`;
          }
        }
      })
      // right click
      carouselChildren[1].addEventListener('click', function () {
        count = count + width
        if (width < 992) {
          carouselContent.style.transform = `translateX(-${count}px)`;
        } else {
          carouselContent.style.transform = `translateX(-${count + 100}px)`;
        }
        if (count >= counterIncrement * (carouselLength - 1)) {
          count = counterIncrement;
          carouselContent.style.transform = `translateX(-${count + 100}px)`;
        }
      })
    }

    function carouselHoverEffect() {
      // left hover effect events
      carouselChildren[0].addEventListener('mouseenter', function () {
        carouselContent.style.transform = `translateX(-${count - 100}px)`;
        clearInterval(int)
      });
      carouselChildren[0].addEventListener('mouseleave', function () {
        carouselContent.style.transform = `translateX(-${count}px)`;
        int = setInterval(timer, speed)
      });

      // right hover effect events
      carouselChildren[1].addEventListener('mouseenter', function () {
        carouselContent.style.transform = `translateX(-${count + 100}px)`;
        clearInterval(int)
      });
      carouselChildren[1].addEventListener('mouseleave', function () {
        carouselContent.style.transform = `translateX(-${count}px)`;
        int = setInterval(timer, speed)
      });
    }

    carouselHoverEffect()
    carouselClick()
  }

}

// nav popup menu items hover carousel
function navItemsHover() {
  let navItems = document.querySelectorAll('.menu-popup-content a')

  navItems.forEach(item => {

    item.addEventListener('mouseenter', function () {
      let test = document.querySelector(`.test[data-nav="${item.dataset.nav}"]`).children
      let testArray = []
      Array.from(test).forEach(child => testArray.push(child.src))

      let index = 0;
      let menuPopup = document.querySelector('.menu-popup');
      let randomNumber = Math.floor(Math.random() * 50);

      menuPopup.style.background = `url('${testArray[index]}') 50% ${randomNumber}% / cover`;
      menuPopup.style.transition = 'linear 400ms';

      let int = setInterval(function () {
        index++
        randomNumber = Math.floor(Math.random() * 50);

        if (index >= test.length) {
          index = 0
        }
        menuPopup.style.background = `url('${testArray[index]}') 50% ${randomNumber}% / cover`
      }, 1000)

      item.addEventListener('mouseleave', function () {
        menuPopup.style.background = null
        menuPopup.style.transition = null
        clearInterval(int)
      })
    })
  })
}

navItemsHover()
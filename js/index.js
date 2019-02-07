if (document.querySelectorAll('.hover-carousel').length > 0) {

  let hoverElements = document.querySelectorAll('.hover-carousel span');

  hoverElements.forEach(item => {
    item.addEventListener('mouseenter', function () {
      let hoverChildren = document.querySelector(`.test[data-hover="${item.dataset.hover}"]`).children;
      let hoverSpeed = item.dataset.speed;

      let hoverArr = []
      Array.from(hoverChildren).forEach(child => hoverArr.push(child.src))

      let index = 0;
      let hoverParent = document.querySelector('.hover-carousel-content');
      let hoverVideoDiv = document.querySelector('.hover-carousel-content-video video');
      let hoverCarousel = document.querySelector('.hover-carousel'); // hover elements parent container

      if (window.location.pathname == '/upwork-10/') { // needs to be changed for production
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
        hoverParent.style.background = `url('${hoverArr[index]}') center center / cover`;
        hoverParent.style.transition = 'linear 400ms';
      }

      // interval to change index
      let int = setInterval(function () {
        index++

        if (index >= hoverChildren.length) {
          index = 0
        }

        // checks if video or img
        if (hoverArr[0].includes('/video/')) {
          hoverVideoDiv.src = hoverArr[index]
        } else {
          hoverParent.style.background = `url('${hoverArr[index]}') center center / cover`;
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
  let carouselLength = document.querySelectorAll('.carousel .carousel-content img').length;

  // carousel content element
  let carouselContent = document.querySelector('.carousel .carousel-content')

  // handles normal carousel transition inverval calculation
  let count = window.innerWidth;
  let counterIncrement = window.innerWidth;
  let counter = setInterval(timer, 3000);

  window.addEventListener('DOMContentLoaded', function () {
    initialCarouselWidth = window.innerWidth * (carouselLength - 2);

    // sets initial width for carousel 
    document.querySelector('.carousel-content').style.width = `${initialCarouselWidth}px`;

    // sets initial transform of carousel to start at index 1
    document.querySelector('.carousel-content').style.transform = `translateX(${-window.innerWidth}px)`;
  });

  // prevents mobile bugs
  if (window.innerWidth > 800) {
    window.addEventListener('resize', function () {
      // updates variable values based on window width
      counterIncrement = window.innerWidth;
      count = window.innerWidth
      carouselContent.style.width = `${counterIncrement * carouselLength}px`;
      carouselContent.style.transform = `translateX(${-counterIncrement}px)`;
    });

  }

  // change image width for smaller screens
  if (window.innerWidth < 800) {
    window.addEventListener('resize', function () {
      document.querySelectorAll('.carousel-content img').forEach(img => {
        img.style.height = window.innerHeight + 200 + 'px';
        img.style.width = window.innerHeight + 'px';
      })
    })
  }


  function timer() {
    count = count + counterIncrement;
    carouselContent.style.transform = `translateX(-${count}px)`;
    if (count >= (counterIncrement - 2) * (carouselLength - 1)) {
      count = counterIncrement;
      carouselContent.style.transform = `translateX(${-counterIncrement}px)`;
    }
  }

  /* ===== Carousel Control Left ===== */
  $('.carousel-control-left').mouseenter(function () {
    $('.carousel .carousel-content').css(
      'transform',
      `translateX(-${count - 100}px)`
    );

    clearInterval(counter);
  });

  $('.carousel-control-left').mouseleave(function () {
    $('.carousel .carousel-content').css('transform', `translateX(-${count}px)`);
    counter = setInterval(timer, 3000);
  });

  // carousel left click
  $('.carousel-control-left').on('click', function () {
    count = count - counterIncrement;
    $('.carousel .carousel-content').css('transform', `translateX(${-count}px)`);
    if (count < counterIncrement) {
      count = counterIncrement * (carouselLength - 2);
      $('.carousel .carousel-content').css(
        'transform',
        `translateX(-${count}px)`
      );
    }

    clearInterval(counter);
  });


  /* ===== Carousel Control Right ===== */

  // mouse enter effect
  $('.carousel-control-right').mouseenter(function () {
    $('.carousel .carousel-content').css(
      'transform',
      `translateX(-${count + 100}px)`
    );

    clearInterval(counter);
  });

  // mouse leave effect
  $('.carousel-control-right').mouseleave(function () {
    $('.carousel .carousel-content').css('transform', `translateX(-${count}px)`);
    counter = setInterval(timer, 3000);
  });

  // click to next img
  $('.carousel-control-right').on('click', function () {
    count = count + counterIncrement;
    $('.carousel .carousel-content').css('transform', `translateX(-${count}px)`);
    if (count >= counterIncrement * (carouselLength - 1)) {
      count = counterIncrement;
      $('.carousel .carousel-content').css(
        'transform',
        `translateX(-${count}px)`
      );
    }

    clearInterval(counter);
  });
}


// nav popup menu items hover carousel

function navItemsHover() {
  let navItems = document.querySelectorAll('.menu-popup-content a')

  navItems.forEach(item => {

    item.addEventListener('mouseenter', function () {
      let test = document.querySelector(`.test[data-nav="${item.dataset.nav}"]`).children

      let testArray = []
      Array.from(test).forEach(child => testArray.push(child.src))
      console.log(testArray)

      let index = 0;
      let menuPopup = document.querySelector('.menu-popup');

      menuPopup.style.background = `url('${testArray[index]}') center center / cover`;
      menuPopup.style.transition = 'linear 400ms';

      let int = setInterval(function () {
        index++
        console.log(index)
        if (index >= test.length) {
          index = 0
        }
        menuPopup.style.background = `url('${testArray[index]}') center center / cover`
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
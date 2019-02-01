// image array for Work hover
const images = ['img/img-1.jpeg', 'img/img-2.jpeg', 'img/img-3.jpeg'];

// video array for About hover
const textVidArr = ['video/placeholder-vid.mp4', 'video/placeholder-vid-2.mp4'];

// all span tags on landing for hover event
if (document.querySelectorAll('.fullscreen-landing div span').length > 0) {
  let hoverElements = document.querySelectorAll('.fullscreen-landing div span');

  // event for 1st span
  hoverElements[0].addEventListener('mouseover', function () {
    onHover(hoverElements[0], textVidArr, 'video', 3000);
  });

  // adds event for 2nd span
  hoverElements[1].addEventListener('mouseover', function () {
    onHover(hoverElements[1], images, 'img', 700);
  });

  function onHover(element, imgArr, type, length) {
    let index = 0;

    // Fades in image carousel with jQuery
    $('.image-carousel').fadeIn(400);

    // checks element type passed into function
    if (type == 'img') {
      $('.image-carousel').html(
        `<img src=${imgArr[index]} alt="portfolio" class="image-array">`
      );
    } else if (type == 'video') {
      $('.image-carousel').html(
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
      document.querySelector('.image-array').src = imgArr[index];
    }, length); // dynamic length based on value passed in

    // mouse leave event to clear interval and hide carousel
    element.addEventListener('mouseleave', function () {
      index = 0;
      clearInterval(int);

      // Fade out carousel with jQuery
      $('.image-carousel').fadeOut(10);
    });
  }

  // event to open menu on Work span click
  hoverElements[1].addEventListener('click', openMenu);

  // event to close menu on emoji click
  $('.gesture-emoji').click(function () {
    $('.menu-popup').fadeOut();
    $('.fullscreen-landing').removeClass('fullscreen-landing-blur');
  });

  // handles menu open
  function openMenu(e) {
    // fades in menu
    $('.menu-popup')
      .css('display', 'flex')
      .hide()
      .fadeIn();

    // adds class to blur landing content
    $('.fullscreen-landing').addClass('fullscreen-landing-blur');

    // adds click to body to close menu
    e.stopPropagation();
    $('body').on('click', function () {
      $('.menu-popup').fadeOut();
      $('.fullscreen-landing').removeClass('fullscreen-landing-blur');
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

  // hide body overflow for carousel
  document.querySelector('body').style.overflowX = 'hidden';

  // sets initial transform of carousel to start at index 1
  document.querySelector('.carousel-content').style.transform = `translateX(${-window.innerWidth}px)`;
});

window.addEventListener('resize', function () {
  // updates variable values based on window width
  counterIncrement = window.innerWidth;
  count = window.innerWidth
  carouselContent.style.width = `${counterIncrement * carouselLength}px`;
  carouselContent.style.transform = `translateX(${-counterIncrement}px)`;
});

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
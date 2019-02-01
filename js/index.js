// image array for Work hover
const images = ['img/img-1.jpeg', 'img/img-2.jpeg', 'img/img-3.jpeg'];

// video array for About hover
const textVidArr = ['video/placeholder-vid.mp4', 'video/placeholder-vid-2.mp4'];

// all span tags on landing for hover event

if (document.querySelectorAll('.fullscreen-landing div span').length > 0) {
  let hoverElements = document.querySelectorAll('.fullscreen-landing div span');

  // adds event for 2nd span
  hoverElements[1].addEventListener('mouseover', function() {
    onHover(hoverElements[1], images, 'img', 700);
  });

  // event for 1st span
  hoverElements[0].addEventListener('mouseover', function() {
    onHover(hoverElements[0], textVidArr, 'video', 3000);
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
    let int = setInterval(function() {
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
    element.addEventListener('mouseleave', function() {
      index = 0;
      clearInterval(int);

      // Fade out carousel with jQuery
      $('.image-carousel').fadeOut(10);
    });
  }

  // event to open menu on Work span click
  hoverElements[1].addEventListener('click', openMenu);

  // event to close menu on emoji click
  $('.gesture-emoji').click(function() {
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
    $('body').on('click', function() {
      $('.menu-popup').fadeOut();
      $('.fullscreen-landing').removeClass('fullscreen-landing-blur');
    });
  }
}

// event to open menu on emoji click for pages other than landing page
if (document.querySelectorAll('.emoji-open').length > 0) {
  $('.emoji-open').on('click', function(e) {
    $('.menu-popup')
      .css('display', 'flex')
      .hide()
      .fadeIn();

    $('header').addClass('fullscreen-landing-blur');
    $('section').addClass('fullscreen-landing-blur');

    e.stopPropagation();
    $('body').on('click', function() {
      $('.menu-popup').fadeOut();
      $('header').removeClass('fullscreen-landing-blur');
      $('section').removeClass('fullscreen-landing-blur');
    });
  });

  $('.menu-popup .gesture-emoji').on('click', function() {
    $('.menu-popup').fadeOut();

    $('header').removeClass('fullscreen-landing-blur');
    $('section').removeClass('fullscreen-landing-blur');
  });
}

/* ===== Custom NON-Hover Carousel ===== */
let carouselLength = document.querySelectorAll(
  '.carousel .carousel-content img'
).length;

window.addEventListener('DOMContentLoaded', function() {
  initialCarouselWidth = window.innerWidth * (carouselLength - 2);
  document.querySelector(
    '.carousel-content'
  ).style.width = `${initialCarouselWidth}px`;
  document.querySelector('body').style.overflowX = 'hidden';
  console.log(initialCarouselWidth);

  document.querySelector(
    '.carousel-content'
  ).style.transform = `translateX(${-window.innerWidth}px)`;
});

// window.addEventListener('resize', function() {
//   // window width multiplied by number of photos - 2
//   // let carouselWidth = window.innerWidth * 3;
//   document.querySelector(
//     '.carousel-content'
//   ).style.width = `${carouselWidth}px`;

//   console.log(carouselWidth);
// });

// handles normal carousel transition inverval calculation
var count = window.innerWidth;
var counterIncrement = window.innerWidth;
var counter = setInterval(timer, 3000);

function timer() {
  count = count + counterIncrement;
  console.log('this is the count interval', count);
  document.querySelector(
    '.carousel-content'
  ).style.transform = `translateX(-${count}px)`;

  if (count >= (window.innerWidth - 2) * (carouselLength - 1)) {
    count = window.innerWidth;
    // return count;
    document.querySelector(
      '.carousel-content'
    ).style.transform = `translateX(${-window.innerWidth}px)`;
  }
}

/* ===== Carousel Control Left ===== */
$('.carousel-control-left').mouseenter(function() {
  $('.carousel .carousel-content').css(
    'transform',
    `translateX(-${count - 100}px)`
  );

  clearInterval(counter);
  // console.log('this is the count hover', count);
});

$('.carousel-control-left').mouseleave(function() {
  $('.carousel .carousel-content').css('transform', `translateX(-${count}px)`);

  counter = setInterval(timer, 3000);
  // console.log('this is the count hover mouse leave', count);
});

// carousel left click

$('.carousel-control-left').on('click', function() {
  count = count - counterIncrement;
  $('.carousel .carousel-content').css('transform', `translateX(${-count}px)`);
  if (count < window.innerWidth) {
    count = counterIncrement * (carouselLength - 2);
    $('.carousel .carousel-content').css(
      'transform',
      `translateX(-${count}px)`
    );
    console.log(
      'left count is over',
      count,
      window.innerWidth,
      counterIncrement * (carouselLength - 3)
    );
  }
  // console.log(-count, -window.innerWidth * (carouselLength - 1));
  clearInterval(counter);
});

/* ===== Carousel Control Right ===== */
$('.carousel-control-right').mouseenter(function() {
  $('.carousel .carousel-content').css(
    'transform',
    `translateX(-${count + 100}px)`
  );

  clearInterval(counter);

  // console.log('this is the count hover', count);
});

$('.carousel-control-right').mouseleave(function() {
  $('.carousel .carousel-content').css('transform', `translateX(-${count}px)`);

  counter = setInterval(timer, 3000);
  // console.log('this is the count hover mouse leave', count);
});

// carousel right click
$('.carousel-control-right').on('click', function() {
  count = count + counterIncrement;
  $('.carousel .carousel-content').css('transform', `translateX(-${count}px)`);
  if (count >= window.innerWidth * (carouselLength - 1)) {
    count = window.innerWidth;
    $('.carousel .carousel-content').css(
      'transform',
      `translateX(-${count}px)`
    );
  }
  // console.log(count);

  clearInterval(counter);
});

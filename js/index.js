// // h2 on main landing
// const landingH2 = document.querySelector('.fullscreen-landing h2');

// image array for Work hover
const images = ['img/img-1.jpeg', 'img/img-2.jpeg', 'img/img-3.jpeg'];

// video array for About hover
const textVidArr = ['video/placeholder-vid.mp4', 'video/placeholder-vid-2.mp4'];

// div that holds content on hover
let imgDiv = document.querySelector('.image-carousel');

// all span tags on landing for hover event
let hoverElements = document.querySelectorAll('.fullscreen-landing div span');

// adds event for 2nd span
hoverElements[1].addEventListener('mouseover', function () {
  onHover(hoverElements[1], images, 'img', 700);
});

// event for 1st span
hoverElements[0].addEventListener('mouseover', function () {
  onHover(hoverElements[0], textVidArr, 'video', 3000);
});

function onHover(element, imgArr, type, length) {

  let index = 0;

  // Fades in image carousel with jQuery
  $('.image-carousel').fadeIn(400);

  // checks element type passed into function
  if (type == 'img') {
    $('.image-carousel')
      .html(`<img src=${imgArr[index]} alt="portfolio" class="image-array">`);
  } else if (type == 'video') {
    $('.image-carousel')
      .html(`<video src=${imgArr[index]} class="image-array" autoplay muted loop></video>`);
  }

  // interval to increase array index 
  let int = setInterval(function () {

    // increase value every interval
    index++

    // resets index to 0 if longer than array length
    if (index >= imgArr.length) {
      index = 0
    }

    // sets new src every interval
    document.querySelector('.image-array').src = imgArr[index]

  }, length) // dynamic length based on value passed in

  // mouse leave event to clear interval and hide carousel
  element.addEventListener('mouseleave', function () {

    index = 0;
    clearInterval(int)

    // Fade out carousel with jQuery 
    $('.image-carousel').fadeOut(10);
  })

}


// event to open menu on Work span click
hoverElements[1].addEventListener('click', openMenu);

// event to close menu on emoji click
$('.gesture-emoji').click(function () {
  $('.menu-popup').fadeOut();
  $('.fullscreen-landing').removeClass('fullscreen-landing-blur');
})

// handles menu open
function openMenu() {
  // fades in menu
  $('.menu-popup')
    .css("display", "flex")
    .hide()
    .fadeIn();

  // adds class to blur landing content
  $('.fullscreen-landing').addClass('fullscreen-landing-blur');
}
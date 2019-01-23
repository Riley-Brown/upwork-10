// h2 on main landing
const landingH2 = document.querySelector('.fullscreen-landing h2');

// image carousel array
const images = ['img/img-1.jpeg', 'img/img-2.jpeg', 'img/img-3.jpeg'];

// image tag inside image carousel div
let imgDiv = document.querySelector('.image-array')

// event for mouse over on main landing 
landingH2.addEventListener('mouseover', carouselOnHover)


let index = 0;


function carouselOnHover() {

  // Fades in image carousel with jQuery
  $('.image-array').fadeIn();

  // sets first initial image on hover
  document.querySelector('.image-array').src = images[index]

  // interval to increase image index 
  let int = setInterval(function () {

    // increase value every interval
    index++

    // resets index to 0 if longer than image array
    if (index >= images.length) {
      index = 0
    }

    // sets new image every interval
    imgDiv.src = images[index]

  }, 700)
  // Interval end

  // mouse leave event to clear interval and hide image carousel
  landingH2.addEventListener('mouseleave', function () {

    index = 0;
    clearInterval(int)

    // Fade out image carousel with jQuery 
    $('.image-array').fadeOut();
  })

}


// event to open menu on landing h2 click
landingH2.addEventListener('click', openMenu);

// event to close menu on emoji click
$('.gesture-emoji').click(function () {
  $('.menu-popup').fadeOut();
})

// handles menu open
function openMenu() {
  $('.menu-popup')
    .css("display", "flex")
    .hide()
    .fadeIn();
}
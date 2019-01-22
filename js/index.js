// image carousel on hover
const landingH2 = document.querySelector('.fullscreen-landing h2');

// image carousel array
const images = ['../img/img-1.jpeg', '../img/img-2.jpeg', '../img/img-3.jpeg']

// image tag inside image carousel div
let imgDiv = document.querySelector('.image-array')

// event for mouse over on main landing 
landingH2.addEventListener('mouseover', carouselOnHover)


let index = 0;


function carouselOnHover() {

  // sets img tag in carousel div to block
  imgDiv.style.display = 'block';

  // sets first initial image on hover
  document.querySelector('.image-array').src = images[index]

  /* ===== interval to increase image index ===== */
  let int = setInterval(function () {
    console.log(index)
    index++

    if (index >= images.length) {
      index = 0
    }

    imgDiv.src = images[index]

  }, 1000)
  /* ===== END OF INTERVAL ===== */

  // event leave event to clear interval and hide image carousel
  landingH2.addEventListener('mouseleave', function () {
    index = 0;
    clearInterval(int)
    imgDiv.style.display = 'none';
  })

}
// image carousel on hover
const landingH2 = document.querySelector('.fullscreen-landing h2');

// image carousel array
const images = ['../img/img-1.jpeg', '../img/img-2.jpeg', '../img/img-3.jpeg']

// event for mouse over on main landing 
landingH2.addEventListener('mouseover', function (e) {
  console.log(123)
})



// images.forEach(image => {
//   document.querySelector('.image-array').src = image
// })

// loop over images array
for (let i = 0; i < images.length; i++) {
  let index = 0;
  document.querySelector('.image-array').src = images[index]

  setInterval(function () {
    if (index >= images.length - 1) {
      index = 0
    }

    index++
    console.log(index)
    document.querySelector('.image-array').src = images[index]


  }, 3000)

}
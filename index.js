

function w3_open() {
    document.getElementsByClassName("w3-sidenav")[0].style.display = "block";
    document.getElementsByClassName("w3-overlay")[0].style.display = "block";
  }
  
  function w3_close() {
    document.getElementsByClassName("w3-sidenav")[0].style.display = "none";
    document.getElementsByClassName("w3-overlay")[0].style.display = "none";
  }


  // Add the fade-out effect on window load or on some event
window.onload = function() {
    document.querySelector("header").classList.add("fade-out");
};

function goToAbout() {
    // Redirect to the about page or section
    window.location.href = 'artistbio.html'; // Replace '#about' with your actual URL or section ID
  }
  
  function viewFullGallery() {
    window.location.href = '2020.html'; // Replace '#gallery' with your actual URL or section ID
  }

  function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
  }

  function exploreGallery() {
    // Redirect to the gallery page or section
    window.location.href = '2020.html'; // Replace '#gallery' with your actual URL or section ID
  }
  
  function toggleMenu() {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  // Wrap around slides if the index goes out of bounds
  if (index >= slides.length) {
    currentSlideIndex = 0;
  } else if (index < 0) {
    currentSlideIndex = slides.length - 1;
  }

  // Hide all slides
  slides.forEach(slide => (slide.style.display = 'none'));

  // Show the current slide
  slides[currentSlideIndex].style.display = 'block';
}

function changeSlide(step) {
  currentSlideIndex += step;
  showSlide(currentSlideIndex);
}

// Automatically change slides every 5 seconds
// setInterval(() => {
//   changeSlide(1);
// }, 5000);

// Initialize the slideshow
showSlide(currentSlideIndex);

function scrollToContent() {
  document.querySelector('slideshow-container').scrollIntoView({ behavior: 'smooth' });
}

  
 
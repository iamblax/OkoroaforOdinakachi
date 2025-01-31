
// Open modal and display selected image with caption from the alt attribute
function openModal(index) {
  // JavaScript for handling the modal functionality
  // moved this into the function scope so it gets refetched whenever the function is called --somtee 
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title'); // Reference to the title element
  let images = Array.from(document.querySelectorAll('.gallery-item img'));

  modal.style.display = 'flex'; // Show the modal
  modalImg.src = images[index].src; // Set the modal image source
  modalTitle.textContent = images[index].alt; // Set the modal caption from the alt attribute
}

// Close modal
function closeModal() {
  modal.style.display = 'none';
}

// Close modal when clicking outside the image or on the close button
modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.classList.contains('close')) {
    closeModal();
  }
});
function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}


function toggleMenu() {
  const menu = document.querySelector('.menu');
  const hamburger = document.querySelector('.hamburger');
  menu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

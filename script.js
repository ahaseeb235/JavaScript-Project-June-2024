//  navbar constants

const burger = document.querySelector('.burger');
const navLink = document.querySelector('.navlink');

burger.addEventListener('click', () => {
  navLink.classList.toggle('hide');
});


// slider

const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const intervalTime = 9000;
let slideInterval;

const nextSlide = () => {
  const current = document.querySelector(".current");
  current.classList.remove("current");
  if (current.nextElementSibling) {
    current.nextElementSibling.classList.add("current");
  } else {
    slides[0].classList.add("current");
  }
  updateSlidePosition();
};

const prevSlide = () => {
  const current = document.querySelector(".current");
  current.classList.remove("current");
  if (current.previousElementSibling) {
    current.previousElementSibling.classList.add("current");
  } else {
    slides[slides.length - 1].classList.add("current");
  }
  updateSlidePosition();
};

const updateSlidePosition = () => {
  const current = document.querySelector(".current");
  const index = Array.from(slides).indexOf(current);
  const offset = -index * 100;
  document.querySelector(".slide").style.transform = `translateX(${offset}%)`;
};

next.addEventListener("click", () => {
  nextSlide();
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, intervalTime);
});

prev.addEventListener("click", () => {
  prevSlide();
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, intervalTime);
});

slideInterval = setInterval(nextSlide, intervalTime);

document.addEventListener('DOMContentLoaded', updateSlidePosition);


// Animated numbers

let seats = 14;
let constituencies = 3;
let turnout = 49.48;

let seatsCounter = document.getElementById('seats');
let constituenciesCounter = document.getElementById('constituencies');
let turnoutCounter = document.getElementById('turnout');

let interval = 100; // interval in milliseconds

let seatsIncrement = Math.ceil(seats / (9000 / interval));
let constituenciesIncrement = Math.ceil(constituencies / (9000 / interval));
let turnoutIncrement = Math.ceil(turnout / (5000 / interval));

let currentSeats = 0;
let currentConstituencies = 0;
let currentTurnout = 0;

setInterval(() => {
  if (currentSeats < seats) {
    currentSeats += seatsIncrement;
    seatsCounter.textContent = Math.min(currentSeats, seats);
  }
  
  if (currentConstituencies < constituencies) {
    currentConstituencies += constituenciesIncrement;
    constituenciesCounter.textContent = Math.min(currentConstituencies) + '/3';
  }
  
  if (currentTurnout < turnout) {
    currentTurnout += turnoutIncrement;
    turnoutCounter.textContent = Math.min(currentTurnout).toFixed(0) + '%';
  }
}, interval);


//  form validation

function validateForm() {
  let valid = true;

  const name = document.getElementById('name').value;
  const subject = document.getElementById('subject').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Clear previous error messages
  document.getElementById('nameError').textContent = '';
  document.getElementById('subjectError').textContent = '';
  document.getElementById('phoneError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('messageError').textContent = '';

  if (!name) {
      document.getElementById('nameError').textContent = 'Name is required.';
      valid = false;
  }

  if (!subject) {
      document.getElementById('subjectError').textContent = 'Subject is required.';
      valid = false;
  }

  if (!phone) {
      document.getElementById('phoneError').textContent = 'Phone is required.';
      valid = false;
  } else {
      const phonePattern = /^[0-9]{10}$/;
      if (!phone.match(phonePattern)) {
          document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number.';
          valid = false;
      }
  }

  if (!email) {
      document.getElementById('emailError').textContent = 'Email is required.';
      valid = false;
  } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.match(emailPattern)) {
          document.getElementById('emailError').textContent = 'Please enter a valid email address.';
          valid = false;
      }
  }

  if (!message) {
      document.getElementById('messageError').textContent = 'Message is required.';
      valid = false;
  }

  return valid;
}


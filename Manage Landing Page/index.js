const sliderIndicator = document.querySelector(".slider-indicators");
const row = document.querySelector(".row");
const newsLetter = document.querySelector(".newsletter");
const header = document.querySelector("header");

// SLIDER FUNCTIONALITY WITH THE INDICATOR
const indicatorState = {};

sliderIndicator.addEventListener("click", function (e) {
  if (e.target.matches(".indicator")) {
    const indicators = Array.from(this.children);
    const testimonials = Array.from(row.children);
    const index = indicators.findIndex((indicator) => indicator === e.target);

    indicatorState.clickedIndicator = e.target;
    indicatorState.clickedIndicatorIndex = index;
    indicatorState.currentTestimonial = testimonials[index];

    indicators.forEach((el) => el.classList.remove("active"));
    indicatorState.clickedIndicator.classList.add("active");

    testimonials.forEach((el) => el.classList.remove("active"));
    indicatorState.currentTestimonial.classList.add("active");

    const testimonialIndex = testimonials.findIndex(
      (t, i) => i === indicatorState.clickedIndicatorIndex
    );

    let left = testimonials[testimonialIndex].getBoundingClientRect().width;
    let skip = left * indicatorState.clickedIndicatorIndex;
    row.scrollTo(skip, 0);
  }
});

window.addEventListener("load", sliderIndicator.children[0].click());
// window.addEventListener("resize", sliderIndicator.children[0].click());

// NEWSLETTER FUNCTIONALITY
newsLetter.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const value = this.querySelector("input").value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value)) {
    this.nextElementSibling.classList.add("active");
    this.querySelector("input").value = "";
    setTimeout(() => {
      this.nextElementSibling.classList.remove("active");
    }, 3000);
  } else {
    this.nextElementSibling.classList.add("success");
    this.nextElementSibling.innerHTML = "";
    this.nextElementSibling.innerHTML = `<p>HEY SUBMITTED! 😊</p>`;
    this.querySelector("input").value = "";
    setTimeout(() => {
      this.nextElementSibling.classList.remove("success");
    }, 3000);
  }
});

// HAMBURGER MENU FUNCTIONALITY
header.addEventListener("click", function (e) {
  if (e.target.matches("img.hamburger")) {
    document.body.classList.add("nav-open");
  } else if (e.target.matches("img.close") || e.target.matches("nav.mobile")) {
    document.body.classList.remove("nav-open");
  }
});

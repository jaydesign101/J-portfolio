var swiper = new Swiper(".swiper.mainbanner", {
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,
  // loop: true,
  pagination: {
    el: ".mainbanner.swiper-pagination",
    // type: "fraction",
    clickable: true,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
});

var swiper = new Swiper(".news-right", {
  slidesPerView: 3,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
// <a> 클릭시 알럿
function showAlert() {
    alert("클릭했습니다!");
}


// 브라우저 초기 뷰포트 높이 값 구하기
const backBigBgEl = document.querySelector(".mainbanner-back");
const bigBgEl = document.querySelector(".mainbanner.swiper-wrapper");
const mainbannerEl = document.querySelector(".mainbanner.swiper");
let initialViewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);


initialViewportHeight = initialViewportHeight-36;
backBigBgEl.style.height = initialViewportHeight + "px";
bigBgEl.style.height = initialViewportHeight + "px";
mainbannerEl.style.height = initialViewportHeight + "px";


console.log("Initial viewport height: " + initialViewportHeight);




// 애니메이션 반복
// var mySwiper = new Swiper('.swiper-container', {
//     // 옵션 설정
//   });
  
//   mySwiper.on('slideChange', function () {
//     var prevSlide = this.previousIndex;
//     var currSlide = this.activeIndex;
//     var prevText = document.querySelector('.swiper-slide:nth-child(' + (prevSlide + 1) + ') .text');
//     var currText = document.querySelector('.swiper-slide:nth-child(' + (currSlide + 1) + ') .text');
  
//     if (prevText) {
//       prevText.classList.remove('animate');
//     }
  
//     currText.classList.add('animate');
//   });





// 대소문자 >> 소문자 바꿈 [.h3]
const h3Els = document.querySelectorAll(".h3");
h3Els.forEach(function(h3el){
    const h3change = h3el.textContent.toUpperCase();
    h3el.textContent = h3change;
})



// 스크롤시 헤더 변경 및 고정
const headerEl = document.querySelector(".header");
const onTopEl = document.querySelector(".on-top");


window.addEventListener("scroll", _.throttle(function() {
    if (window.scrollY > 35) {  // 스크롤이 발생한 경우
        headerEl.classList.add("fixed");
        onTopEl.style.display="none";
    } else {  // 스크롤이 발생하지 않은 경우
        headerEl.classList.remove("fixed");
        onTopEl.style.display="flex";
    }
    console.log(window.scrollY);
}, 300));





// 이미지 반복 처리
const skillImgEls = document.querySelectorAll("ul.skill > li");
for(let i=0; i <skillImgEls.length; i++){
    skillImgEls[i].style.backgroundImage="url('./img/s5-skill0" + (i+1)+".png')"; 
}

const businessImgEls = document.querySelectorAll(".business-img");
for(let i=0; i <businessImgEls.length; i++){
    businessImgEls[i].style.backgroundImage="url('./img/s6-business0" + (i+1)+".png')"; 
}

const bulidImgEls = document.querySelectorAll(".bulid-img");
for(let i=0; i <bulidImgEls.length; i++){
    bulidImgEls[i].style.backgroundImage="url('./img/s7-bulid0" + (i+1)+".png')"; 
}

// ul.skill > li:hover > a .text > p 애니메이션
// const skillTextEls = document.querySelectorAll("ul.skill > li > a .text > p");
// for(let i=0; i <skillTextEls.length; i++){
//     skillTextEls[i].style.height=skillTextEls[i].getBoundingClientRect().height+"px";
//     alert(skillTextEls[i].getBoundingClientRect().height);
// }



// design-text dt-wemake 무한 슬라이드
//https://blogpack.tistory.com/1120
//롤링 배너 복제본 생성
let weMakeEl = document.querySelector(".dt-wemake");
weMakeEl.id = "roller1";
let clone = weMakeEl.cloneNode(true);
clone.id = 'roller2';
document.querySelector('.bulid').appendChild(clone); //부착

//원본, 복제본 배너 위치 지정
document.querySelector('#roller1').style.left = '0px';
document.querySelector('#roller2').style.left = weMakeEl.offsetWidth + 'px';//roller 위치 조정
// alert(document.querySelector('.bulid').offsetWidth);

//클래스 할당
weMakeEl.classList.add('original');
clone.classList.add('clone');






// 스크롤 애니메이션
// 관리할 요소들 검색
const spyEls = document.querySelectorAll('.scroll-spy')
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
})

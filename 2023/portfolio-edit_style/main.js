

document.addEventListener("DOMContentLoaded", function() {
  const headerItem = document.querySelector("header");
  const homeSection = document.querySelector("#home");
  let homeSectionHeight = homeSection.offsetHeight;
  
  window.addEventListener('resize', function(){
    homeSectionHeight = homeSection.offsetHeight;
  })
  
   /* header 스타일 함수 */
   function headerShow(colorBG, colorTl){
    if(this.window.scrollY > homeSectionHeight/3){
      headerItem.style.backgroundColor = colorBG,
      headerItem.style.width = '100%',
      headerItem.style.margin = '0'
      headerItem.style.borderTop = '1px solid' + colorTl;
    }else(
      headerItem.style.backgroundColor = 'transparent',
      headerItem.style.width = 'calc(100% - 40px)',
      headerItem.style.margin = '20px',
      headerItem.style.borderTop = '2px solid' + colorTl
    )
  }

  // header 스타일 표현
  window.addEventListener('scroll', function(){
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // 다크 모드 일때
      headerShow('#292929', '#fff')
    }
    else {
      // 라이트 모드 일때
      headerShow('#fff', '#000')
    }
  })


  /* header 메뉴 - 화면 이동 함수 >> 라이브러리 제작하장*/
  function headerMenuGoToScreen(menuLinks){
    menuLinks.forEach(function(link) {
      link.addEventListener("click", function(e) {
        // 브라우저 기본 이벤트 무력화
        e.preventDefault();

        let linkLocation = this.getAttribute('href');
        var targetElement = document.querySelector(linkLocation);
        
        if (linkLocation) {
          var targetOffsetTop = targetElement.offsetTop;
          window.scrollTo({
            // 부드럽게 스크롤
            top: targetOffsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // header 메뉴 - 화면 이동 표현
  var menuLinks = document.querySelectorAll("header ul.mega-menu li a");
  headerMenuGoToScreen(menuLinks)

})
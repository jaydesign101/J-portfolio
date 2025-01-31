class jllslider {
  constructor(selector, options) {
    /* DOM 설정 */
    this.container = document.querySelector(selector);
    this.btnPrevEl = this.container.querySelector(".btn-prev"); 
    this.btnNextEl = this.container.querySelector(".btn-next");
    this.sliderEl = this.container.querySelector(".slider");
    this.itemWrapEl = this.container.querySelector(".item-wrap");
    this.itemEls = this.container.querySelectorAll(".item");
    this.paginationEl = this.container.querySelector(".pagination");
    this.timebarEl = this.container.querySelector(".timebar");
    this.pageCountEl = this.container.querySelector(".page-count");

    this.options = this.init(options);

    /* 관련 변수 */
    // 현재 슬라이드 인덱스
    this.currentIndex = 0;
    // 슬라이드 개수
    this.itemElsLength = Math.ceil(this.itemEls.length / this.options.itemPerView -1);

    // 페이징네이션 및 불렛 태그 추가
    this.paginationItems = null;
    // 애미메이션 동작여부 확인
    this.isAnimating = false;
    this.itemWrapEl.addEventListener('transitionend', () => {
      this.isAnimating = false; // 애니메이션이 끝남을 표시
      // console.log("transitionend 종료 : " + this.isAnimating)
    });    
    

    /* 화면 초기 설정 */
    this.setupSlider();
    /* 페이징네이션 */
    if(this.paginationEl){
      this.setupPagination()
      this.clickPagination()
    }

    /* 이전 및 다음 버튼 */
    if(this.btnPrevEl){
      this.changeBtn()
      this.clickBtnPrev();
    }
    if(this.btnNextEl){
      this.changeBtn()
      this.clickBtnNext();
    }

    /* 스와이프 */
    if(this.options.swipe){
      this.startPos = 0; // 시작 좌표
      this.offset = 0; // 이동 좌표
      this.changePoint = Math.round(this.sliderEl.offsetWidth * this.options.swipeChangePoint); // 스와이프 이동 기준 값 25%
      this.isSwiping = false;

      // 데스크탑 스와이프
      this.sliderEl.addEventListener("mousedown", this.handleSwipeStart.bind(this));
      this.sliderEl.addEventListener("mousemove", this.handleSwipeMove.bind(this));
      this.sliderEl.addEventListener("mouseup", this.handleSwipeEnd.bind(this));
      this.sliderEl.addEventListener("mouseleave", this.handleSwipeEnd.bind(this));
      
      // 모바일 스와이프
      this.sliderEl.addEventListener("touchstart", this.handleSwipeStart.bind(this));
      this.sliderEl.addEventListener("touchmove", this.handleSwipeMove.bind(this));
      this.sliderEl.addEventListener("touchend", this.handleSwipeEnd.bind(this));    
    }

    /* 페이지 카운트 */
    if(this.pageCountEl){
      this.setupPageCount(this.currentIndex)
    }

  }

  
  init(options) {
    // 기본 옵션과 사용자 정의 옵션 병합
    return Object.assign(
      {
        itemPerView: 1,     // slider에 보여질 item 수
        spaceBetween: 0,    // item 간격 (px)
        moveTransition: .3, // 이동할 시간
        swipe : true,
        swipeChangePoint : 1/4, // 스와이프 넘길 크기
        paginationNumShow : false,
      },
      options
    );
  }


  setupSlider() {
    // item 간격 설정
    this.itemWrapEl.style.gap = `${this.options.spaceBetween}px`;
    // item 너비 설정
    let itemWidthPerscent = 100 / this.options.itemPerView;
    // 빼꼼이 슬라이드 너비
    this.itemEls.forEach(element => {
      element.style.width = `calc(${itemWidthPerscent}% - ${this.options.spaceBetween}px + ${this.options.spaceBetween/this.options.itemPerView}px)`;

    });
  }

  setupPagination(){
    let paginationItem;
    for (let i = 0; i <= this.itemElsLength; i++ ){
      let pageNumber = i + 1; // 현재 슬라이더 인덱스를 Pagination에 넣음
      paginationItem = document.createElement('div');
      paginationItem.classList.add('pagination-item');
      if(this.options.paginationNumShow){
        paginationItem.textContent = pageNumber;
      }
      this.paginationEl.appendChild(paginationItem);
    }
    this.paginationItems = this.container.querySelectorAll('.pagination-item');
    this.paginationItems[0].classList.add('active');
  }

  setupPageCount(currentIndex){
    this.pageCountEl.textContent = `${currentIndex+1}/${this.itemElsLength + 1}`
  }

  changePagination(now, next){
    this.paginationItems[now].classList.remove('active');
    this.paginationItems[next].classList.add('active');
  }

  changeBtn(){
    if(this.currentIndex == 0){
      this.btnPrevEl.classList.remove("active")
    }else{
      this.btnPrevEl.classList.add("active")
    }
    if(this.currentIndex == this.itemElsLength){
      this.btnNextEl.classList.remove("active")
    }else{
      this.btnNextEl.classList.add("active")
    }
  }

  sliderMove(currentIndex) {
    this.itemWrapEl.style.transition = `${this.options.moveTransition}s`;
    this.itemWrapEl.style.transform = `translateX( ${-currentIndex * (this.sliderEl.clientWidth + this.options.spaceBetween)}px)`;
  }
  sliderMoveCustom(transition, transform){
    this.itemWrapEl.style.transition = transition;
    this.itemWrapEl.style.transform = transform;
  }

  handleSwipeStart(e) {
    this.isSwiping = true;
    this.startPos = e.clientX || e.touches[0].clientX;
    // console.log("스와이프 시작 isAnimating : " + this.isSwiping)
  }

  handleSwipeMove(e) {
    if(this.isSwiping){
      this.offset = (e.clientX || e.targetTouches[0].clientX) - this.startPos;
      let limitOffset = this.offset;
      if(Math.abs(limitOffset) > (this.sliderEl.offsetWidth / 4)){
        if(limitOffset > 0){
          limitOffset = (this.sliderEl.offsetWidth / 4)
        }else{
          limitOffset = -(this.sliderEl.offsetWidth / 4)
        }
      }
      if(this.currentIndex == 0 && this.offset > 0){
        this.offset = 0;
        this.sliderMoveCustom("none", `translateX(${-this.currentIndex * this.sliderEl.clientWidth + limitOffset}px)`)
        
      }else if(this.currentIndex == this.itemElsLength && this.offset < 0){
        this.offset = 0;
        this.sliderMoveCustom("none", `translateX(${-this.currentIndex * this.sliderEl.clientWidth + limitOffset}px)`)
        
      }else{
        this.sliderMoveCustom("none", `translateX(${-this.currentIndex * this.sliderEl.clientWidth + this.offset}px)`)
      }
    }
  }
  
  handleSwipeEnd() {
    this.isSwiping = false;
    if (this.changePoint < Math.abs(this.offset)) {
      if (this.offset < 0 && !this.isAnimating) {
        if(this.paginationEl){
          this.changePagination(this.currentIndex, this.currentIndex+1)
        }
        this.currentIndex++;
      } else if (this.offset > 0 && !this.isAnimating) {
        if(this.paginationEl){
          this.changePagination(this.currentIndex, this.currentIndex-1)
        }
        this.currentIndex--;
      }
      if(this.btnNextEl && this.btnNextEl){
        this.changeBtn()
      }
      this.offset = 0;
      this.isAnimating = true;
      this.sliderMove(this.currentIndex)
      setTimeout(() => {
        this.isAnimating = false;
      }, this.options.moveTransition * 1000);
      // console.log( " 스와이프 엔드 : " + this.isAnimating)
      if(this.pageCountEl){
        this.setupPageCount(this.currentIndex)
      }
    } else {
      this.sliderMove(this.currentIndex)
    }

  }

  /* 페이징네이션 버튼 */
  clickPagination(){
    this.paginationItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        // console.log( " 페이징 클릭 : " + this.isAnimating)
        if(!this.isAnimating){
          this.isAnimating = true;
          this.changePagination(this.currentIndex, index)
          this.currentIndex = index;
          this.sliderMove(this.currentIndex);
        }
        this.isAnimating = false;
        if(this.btnNextEl && this.btnNextEl){
          this.changeBtn()
        }
      })
    })
  }

  /* 이전 및 다음 버튼 */
  clickBtnPrev(){
    this.btnPrevEl.addEventListener("click", () => {
      if(!this.isAnimating && this.currentIndex > 0 && this.currentIndex <= this.itemElsLength){
        this.isAnimating = true
        if(this.paginationEl){
          this.changePagination(this.currentIndex, this.currentIndex-1)
        }
        this.changeBtn()
        this.currentIndex--;
        this.changeBtn()
        if(this.pageCountEl){
          this.setupPageCount(this.currentIndex)
        }
        this.sliderMove(this.currentIndex);
      }
      // console.log(this.currentIndex + ", " + this.itemElsLength)
    });
  }

  clickBtnNext(){
    this.btnNextEl.addEventListener("click", () => {
      if(!this.isAnimating && this.currentIndex >= 0 && this.currentIndex < this.itemElsLength){
        this.isAnimating = true;
        if(this.paginationEl){
          this.changePagination(this.currentIndex, this.currentIndex+1)
        }
        
        this.changeBtn()
        this.currentIndex++;
        this.changeBtn()
        if(this.pageCountEl){
          this.setupPageCount(this.currentIndex)
        }
        this.sliderMove(this.currentIndex);
      }
      // console.log(this.currentIndex + ", " + this.itemElsLength)
    });
  }

}



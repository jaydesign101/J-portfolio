$(window).on('load', function() {
    wheelNone = false;
    setTimeout(function() {
        $("#loading-screen").fadeOut(500);
      }, 1000); // 5초 후에 이동
      
      $("#s1 .double-box-top").css("animation", "nameUp  ease-out 1s 1.5s forwards");
      $("#s1 .name").css("animation", "nameShow  ease-out 1s 1.6s forwards");
      $("#s1 .double-box-bottom").css("animation", "nameDown ease-out 1s 1.5s forwards");

})
$(document).ready(function () {

    /* Variable */
    //header
    let nowTop = $(window).scrollTop();
    let sectionID = 0;
    let sectionOffset = 0;
    const sections = $("section");
    let sectionsCount = sections.length -1;
    const sectionArr = [];
    sectionsOffsetSet();
    const btnActive = $(".gnb-btn");
    let wheelNone = false;


    // 브레이크포인트 구하기 17px
    // 1. 스크롤바 너비 (scrollbarWidth)
    function getScrollbarWidth() {
        // Create a div element with a fixed width and height and add scrollbars
        const scrollDiv = document.createElement("div");
        scrollDiv.style.width = "100px";
        scrollDiv.style.height = "100px";
        scrollDiv.style.overflow = "scroll";
        scrollDiv.style.position = "absolute";
        scrollDiv.style.top = "-9999px"; // Hide the div off-screen
      
        document.body.appendChild(scrollDiv);
      
        // Calculate the scrollbar width
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      
        // Remove the div from the DOM
        document.body.removeChild(scrollDiv);
      
        return scrollbarWidth;
      }
    const scrollbarWidth = getScrollbarWidth();

    // 2. 브레이크 포인트 설정하기
    let pcbreakPoint;
    function pcBreakPoint(){
        if($("body").css("overflow") == "auto"){
            pcbreakPoint = 1280 - scrollbarWidth;
        }else if($("body").css("overflow") == "hidden"){
            pcbreakPoint = 1280;
        }
        console.log( "PC 브레이크 포인트 : " + pcbreakPoint)
    }
    pcBreakPoint();
    
   


    /* HEADER **********************************************/
    function sectionsOffsetSet(){
        sections.each(function (index) {
            sectionArr[index] = sections.eq(index).offset().top;
        });
    }
    
    function scollMove(sectionOffset){
        $("html, body, .wrap").stop();
        $("html, body, .wrap").animate({
            scrollTop: sectionOffset}, 500
        ) 
    }
    function offsetMove(sectionOffset){
        $("html, body, .wrap").scrollTop(sectionOffset);
    }
    function gnbFocus(sectionID){
        btnActive.removeClass("active");
        btnActive.eq(sectionID).addClass("active");
    }

    function pcViewHeader(sectionID){
        if(sectionID==0 || sectionID == sectionsCount){
            btnActive.parents(".header").removeClass("top-fixed");
        }else{
            btnActive.parents(".header").addClass("top-fixed");
        }
    }
    function mobileHeader(nowTop){
            if ( nowTop >=  0 && nowTop < sectionArr[1]) {
                gnbFocus(0)
            } else if( nowTop >=  sectionArr[1] && nowTop < sectionArr[2] ) {
                gnbFocus(1)
            } else if( nowTop >=  sectionArr[2] && nowTop < sectionArr[3] ) {
                gnbFocus(2)
            } else if( nowTop >=  sectionArr[3] && nowTop < sectionArr[4] ) {
                gnbFocus(3)
            } else if( nowTop >=  sectionArr[4] && nowTop < sectionArr[5] ) {
                gnbFocus(4)
            } else if( nowTop >=  sectionArr[5]) {
                gnbFocus(5)
            }
    }
    
    $(window).on("resize",function(){
        // header
        nowTop = $(window).scrollTop();

        // #s5
        sliderWrapItem.stop().animate({ left: 0 }, 100);
        currentIndex = 0;
        slideCount = $('#s5 .exp-items').length;

        // PC 브레이크 포인트 계산하기
        pcBreakPoint();
        // 이전에 추가된 .exp-items 컨테이너를 모두 제거
        $("#s5 .slider-wrap").empty();
        if( $(window).width() >= pcbreakPoint ){
            console.log("1280 이상")
            bodyHidden();
            // #s3
            $(".s3-card-item .item").show();
            $(".s3-tab-menu > div").removeClass("active");
            $(".s3-tab-menu > div:nth-child(1)").addClass("active")
            // #s4
            $(".cc-items .cc-item").removeClass("active");
            $(".cc-main .cc-item:nth-child(2)").addClass("active");
            $(".cc-second .cc-item:nth-child(3)").addClass("active");
            // #s5
            s5LayoutTab(items);
        }else if( $(window).width() >= 700 ){
            console.log("700 이상")
            bodyAuto();
            // #s5
            s5LayoutTab(items);
            expItemCount();
            mobileMenuClose();


        }else{
            $("body").css("overflow", "auto");
            btnActive.parents(".header").removeClass("top-fixed");
            // #s5
            s5LayoutMo(items);
            expItemCount();

            

        }
        console.log( "PC 브레이크 포인트 : " + pcbreakPoint)
        
    })
   
    $(".gnb-btn").click(function(){
        sectionID = $(this).data("gnb-index");
        sectionOffset = $("section").eq(sectionID).offset().top;
        nowTop = sectionOffset;
        if( $(window).width() >= pcbreakPoint){
            pcViewHeader(sectionID);
            scollMove(sectionOffset);
            gnbFocus(sectionID);
            
        }else{
            offsetMove(sectionOffset);
            gnbFocus(sectionID);
            nowTop = $(window).scrollTop();
            mobileHeader(nowTop); 
            
        }        
        })
    
    $(window).on("wheel" , function(e){
        if( ($(window).width() >= pcbreakPoint)&&(wheelNone==false) ){
            if (e.originalEvent.deltaY > 0 && sectionID >= 0  && sectionID < sectionsCount) {
                sectionID++;
            } else if(e.originalEvent.deltaY < 0 && sectionID > 0) {
                sectionID--;
            }
            sectionOffset = $("section").eq(sectionID).offset().top;
            nowTop = sectionOffset;
            scollMove(sectionOffset);
            gnbFocus(sectionID);
            pcViewHeader(sectionID);
            
        }
    })
    $(window).on("scroll" , function(e){
        if( $(window).width() < pcbreakPoint){
            nowTop = $(window).scrollTop();
            mobileHeader(nowTop);            
            //console.log(nowTop)
        }
    })


    /* COMMON */
    function bodyAuto(){
        if( ($("body").css("overflow") == "hidden")&&($(window).width() < pcbreakPoint)){
            $("body").css("overflow", "auto");
        }
    }
    function bodyHidden(){
        if( ($("body").css("overflow") == "auto")){
            $("body").css("overflow", "hidden");
        }
    }


    /* HEADER MENU AREA *******************************/
    function mobileMenuClose(){
        $(".gnb-menu").css("transform", "translateX(0)");
        bodyAuto();
    }
    $(".icon-menu").click(function(){
        $(".gnb-menu").css("transform", "translateX(-100%)");
        bodyHidden();
    })
    $(".icon-close").click(function(){
        mobileMenuClose()
    })
    $(".gnb-menu > .gnb-btn").click(function(){
        mobileMenuClose();
    })


    /* #s2 *******************************/
    $("#s2 .picture > .tablet-text").html($(".info > .info-head").html());

    /* #s3 *******************************/
    $("#s3 .category.etc").text("Etc");
    $("#s3 .category.develope").text("Develope");
    $("#s3 .category.design").text("Design");

    $("#s3 .s3-tab-menu .all-sum").text($(".s3-card-item .item").length)
    $("#s3 .s3-tab-menu .design-sum").text($(".s3-card-item .item .design").length)
    $("#s3 .s3-tab-menu .develope-sum").text($(".s3-card-item .item .develope").length)
    $("#s3 .s3-tab-menu .etc-sum").text($(".s3-card-item .item .etc").length)

    $(".s3-tab-menu > div").click(function() {
        $(".s3-tab-menu > div").removeClass("active");
        $(this).addClass("active")
        
        var category = $(this).attr("class").split(' ')[0];
        $(".s3-card-item .item").hide();
        if (category == 'all') {
            $(".s3-card-item .item").show();
        }else{
            $(".s3-card-item .item .category." + category).parents(".s3-card-item .item").show();
        }
        sectionsOffsetSet();
    });

    /* #s4 *******************************/
    $(".cc-item .cc-item-top").click(function(){
        if( $(window).width() >= pcbreakPoint ){
            $(this).parents(".cc-item").addClass("active");
            $(this).parents(".cc-item").siblings().removeClass("active");
        }else{
            $(this).closest(".cc-item").toggleClass("active");
        }
    })

    $("#s4 .tablet-title .cc-main-title").html($("#s4 .cc-main > .title").html());
    $("#s4 .tablet-title .cc-second-title").html($("#s4 .cc-second > .title").html());
    
    // 태블릿 메뉴 클릭
    $("#s4 .tablet-title > div").click(function(){
        if( $(window).width() < pcbreakPoint ){
            $(this).addClass("active");
            $("#s4 .tablet-title > div").not($(this)).removeClass("active");
            if($(this).attr("class") == "cc-main-title active" ){
                $("#s4 .cc-items.cc-main").addClass("active");
                $("#s4 .cc-items.cc-second").removeClass("active");
            }else{
                $("#s4 .cc-items.cc-main").removeClass("active");
                $("#s4 .cc-items.cc-second").addClass("active");
            }
        }
    })


    /* #s5 *******************************/
    let items = $("#s5 .slider-wrap .item");
    let itemsLength = items.length;
    // 크기에 따라 exp-items 요소 생성 (PC 8개, Mo 4개)
    function s5LayoutMo(itemsMo){
        let itemsMod4Num = Math.ceil(itemsLength / 4);
        // 새로운 .exp-items 컨테이너를 담을 배열
        let newExpItems = [];
        for (var i = 0; i < itemsMod4Num; i++) {
            // 각각의 .exp-items 컨테이너 생성
            let expContainer = $("<div class='exp-items'></div>");
            // .item 요소를 4개씩 추가
            expContainer.append(itemsMo.slice(i * 4, (i * 4) + 4));
            // 생성된 .exp-items 컨테이너를 배열에 추가
            newExpItems.push(expContainer);
        }
        // 배열에 있는 .exp-items 컨테이너를 .slider-wrap에 추가
        $(".slider-wrap").append(newExpItems);
        $("#s5 .exp-items").css({
            "grid-template-columns": "1fr 1fr",
            "grid-template-rows": "1fr 1fr"
          });
    }
    function s5LayoutTab(itemsPC){
        let itemsMod4Num = Math.ceil(itemsLength / 8);
        // 새로운 .exp-items 컨테이너를 담을 배열
        let newExpItems = [];
        for (var i = 0; i < itemsMod4Num; i++) {
            // 각각의 .exp-items 컨테이너 생성
            let expContainer = $("<div class='exp-items'></div>");
            // .item 요소를 4개씩 추가
            expContainer.append(itemsPC.slice(i * 8, (i * 8) + 8));
            // 생성된 .exp-items 컨테이너를 배열에 추가
            newExpItems.push(expContainer);
        }
        // 배열에 있는 .exp-items 컨테이너를 .slider-wrap에 추가
        $(".slider-wrap").append(newExpItems);
    }

    // item 레이아웃
    if( $(window).width() >= 700 ){
        s5LayoutTab(items);
    }else{
        s5LayoutMo(items);
    }

    let sliderWrapItem = $('#s5 .slider-wrap');
    let currentIndex = 0;
    let slideCount = $('#s5 .exp-items').length;
    // 페이지 구하기
    function expItemCount(){
        $("#s5 .cur-page-num").text(currentIndex+1);
        $("#s5 .all-page-num").text(slideCount);
    }
    expItemCount();

    // 다음 슬라이드 표시
    $('.btn-move .next').click(function() {
        let slideCount = $('#s5 .exp-items').length;
        let slideWidth = $('#s5 .exp-items').width();
        if (currentIndex < slideCount - 1){
            currentIndex++;
            sliderWrapItem.animate({ left: -currentIndex * slideWidth  - 10 }, 100);
            // slider.css("transform", "translateX(-100%)");
            // console.log("currentIndex : " + currentIndex + " slideCount : " + slideCount + ", left : " + -currentIndex * slideWidth)
            console.log(currentIndex)
            expItemCount();
        }     
    });

    // 이전 슬라이드 표시
    $('.btn-move .prev').click(function() {
        let slideCount = $('#s5 .exp-items').length;
        let slideWidth = $('#s5 .exp-items').width();
        if (currentIndex > 0) {
            currentIndex--;
            // slider.css("transform", "translateX(0)");
            sliderWrapItem.animate({ left: -currentIndex * slideWidth - 10 }, 100);
            // console.log("currentIndex : " + currentIndex + ", slideCount : " + slideCount + ", left : " + -currentIndex * slideWidth)
            console.log(currentIndex)
            expItemCount();            
        }
        
    });


    // 여러 이미지 넣기
    items.each(function(index, element) {
        $(this).children("img").attr("src", "./img/s5-img-" + itemsLength + ".png");
        itemsLength--;
    });
    itemsLength = items.length;
    
    // 이미지 확대
    $("#s5 .slider-wrap").on("click", ".item img", function(){
        let imgURL = $(this).attr("src");
        $("#s5 .s5dim").show();
        $("#s5 .s5dim img").attr("src", imgURL);
        bodyHidden();
        pcBreakPoint();
        wheelNone = true;
         
    })
    $("#s5 .s5dim").click(function(){
        $("#s5 .s5dim").hide();
        bodyAuto();
        pcBreakPoint();
        wheelNone = false;
    })


     /* #s6 *******************************/
    $("#s6 .name").hover(
    function(){
        $("#s6 .line").css("filter", "brightness(80%)" )
    }, 
    function(){
        $("#s6 .line").css("filter", "brightness(50%)" )
    })

})
    


    

    


    

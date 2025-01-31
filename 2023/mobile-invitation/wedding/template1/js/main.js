
document.addEventListener('DOMContentLoaded', () => {
    // 스와이퍼
    var swiper = new Swiper(".gallery-1-slide", {
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // 계좌 모달
    const dimEl = document.getElementById("dim");
    
    const groomSendBtnEl = document.querySelector('.account-1 .groom .send-btn');
    const groomAccModalEl = document.querySelector('.account-modal-1#groom-acc-mo');
    
    const brideSendBtnEl = document.querySelector('.account-1 .bride .send-btn');
    const brideAccModalEl = document.querySelector('.account-modal-1#bride-acc-mo');
    
    groomSendBtnEl.addEventListener('click', ()=>{
        dimEl.style.display='block';
        groomAccModalEl.style.display='block';
    })
    brideSendBtnEl.addEventListener('click', ()=>{
        dimEl.style.display='block';
        brideAccModalEl.style.display='block';
    })
    groomAccModalEl.querySelector(".ic--close").addEventListener('click', ()=>{
        dimEl.style.display='none';
        groomAccModalEl.style.display='none';
    })
    brideAccModalEl.querySelector(".ic--close").addEventListener('click', ()=>{
        dimEl.style.display='none';
        brideAccModalEl.style.display='none';
    })
    dimEl.addEventListener('click', ()=>{
        dimEl.style.display='none';
        groomAccModalEl.style.display='none';
        brideAccModalEl.style.display='none';
    })
});
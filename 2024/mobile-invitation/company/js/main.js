
document.addEventListener('DOMContentLoaded', () => {
    const gotobtnEl = document.getElementById("gototop-btn");
    gotobtnEl.addEventListener("click", ()=> {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });        
})
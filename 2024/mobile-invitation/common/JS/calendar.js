
document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    // const date = new Date();

    const year = parseInt(calendarEl.getAttribute('data-year'));
    const month = parseInt(calendarEl.getAttribute('data-month'))-1;
    const day = parseInt(calendarEl.getAttribute('date-day'));


    // 월 텍스트 넣기
    if(document.getElementById('title-month')){
        const weddingMonthEl = document.getElementById('title-month');
        weddingMonthEl.textContent = month+1 + "월";
    }
    if(document.getElementById('title-date')){
        const weddingMonthEl = document.getElementById('title-date');
        weddingMonthEl.textContent = year +"." + (month+1) + "." + day;
    }


    // 월과 요일 이름 배열
    // const monthNames = ["January", "February", "March", "April", "May", "June",
    //                     "July", "August", "September", "October", "November", "December"];
    // const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

    // 달력의 헤더 만들기
    const header = document.createElement('div');
    header.className = 'week--group';
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'week--item';
        dayHeader.textContent = day;
        header.appendChild(dayHeader);
    });
    calendarEl.appendChild(header);

    // 첫 날과 마지막 날 계산
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 날짜 채우기
    const daysGrid = document.createElement('div');
    daysGrid.className = 'day--group';

    // 첫 주 앞의 빈 칸 채우기
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day--item';
        daysGrid.appendChild(emptyCell);
    }

    // 날짜 채우기
    for (let date = 1; date <= lastDate; date++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day--item';
        dayCell.textContent = date;
        daysGrid.appendChild(dayCell);
        if (date === day){
            dayCell.classList.add('focus')
        }
    }

    calendarEl.appendChild(daysGrid);
});
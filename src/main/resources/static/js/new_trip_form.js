//.:: Явка
let p_attendance = document.getElementById('p_attendance');
let s_attendance = document.getElementById('s_attendance');

s_attendance.onclick = function() {
    s_attendance.hidden = true;

    let input_time = document.createElement('input');
    input_time.type = 'datetime-local';
    input_time.value = sessionStorage.getItem('attendance') === null ?
        '2025-01-01T00:00' : sessionStorage.getItem('attendance');
    input_time.autofocus = true;

    input_time.onblur = async function() {
        await convertToParagraph(input_time);
    }
    input_time.onkeydown = async function(e) {
        if (e.key === 'Enter') {
            await convertToParagraph(input_time);
        }
    }

    p_attendance.appendChild(input_time);
}

async function formatDate(dateString, format = 'dd.mm.yy HH:MM') {
    const date = new Date(dateString);
    const result = {
        'dd': String(date.getDate()).padStart(2, '0'),
        'mm': String(date.getMonth() + 1).padStart(2, '0'),
        'yyyy': String(date.getFullYear()),
        'yy': String(date.getFullYear()).slice(-2),
        'HH': String(date.getHours()).padStart(2, '0'),
        'MM': String(date.getMinutes()).padStart(2, '0'),
        'ss': String(date.getSeconds()).padStart(2, '0')
    };

    return format.replace(/dd|mm|yyyy|yy|HH|MM|ss/g, match => result[match]);
}

async function convertToParagraph(input_time) {
    const date = new Date(input_time.value);
    let attendance_date = await formatDate(date);
    s_attendance.innerText = attendance_date;
    sessionStorage.setItem('attendance', input_time.value);
    sessionStorage.setItem('attendance_date', attendance_date);

    input_time.hidden = true;
    s_attendance.hidden = false;
    s_attendance.style.color = '#33cd9e';
}

//.:: Серия
let p_series = document.getElementById('p_series');
let s_series = document.getElementById('s_series');

s_series.onclick = function() {
    s_series.hidden = true;
    let select = document.createElement('select');
    let series = [ 'серия', 'ВЛ10', 'ВЛ10у', '2ЭС6', '2ЭС10' ];
    for (let i = 0; i < series.length; i++) {
        let option = document.createElement('option');
        option.value = series[i];
        option.innerText = series[i];
        select.appendChild(option);
    }

    select.onchange = async function() {
        select.hidden = true;
        let series = select.options[select.selectedIndex].innerText;
        sessionStorage.setItem('series', series);
        s_series.innerText = series;
        s_series.style.color = '#33cd9e';
        s_series.hidden = false;
    }

    p_series.appendChild(select);
}

//.:: Номер
let p_loconumber = document.getElementById('p_loconumber');
let s_loconumber = document.getElementById('s_loconumber');

s_loconumber.onclick = function() {
    s_loconumber.hidden = true;
    let input = document.createElement('input');
    input.value = sessionStorage.getItem('loconumber') === null ?
        '' : sessionStorage.getItem('loconumber');
    input.placeholder = 'номер';
    input.autofocus = true;

    input.addEventListener('keydown', function(event) {
        let allowedInput = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'];
        if (!allowedInput.includes(event.key) || input.value.length > 3) {
            if (event.key !== 'Backspace')
                event.preventDefault();
        }
    });

    p_loconumber.appendChild(input);


    input.onblur = async function() {
        await getLocoNumber(input);
    }
    input.onkeydown = async function(e) {
        if (e.key === 'Enter') {
            await getLocoNumber(input);
        }
    }

}

async function getLocoNumber(input) {
    sessionStorage.setItem('loconumber', input.value);
    s_loconumber.innerText = input.value;
    s_loconumber.style.color = '#33cd9e';
    input.hidden = true;
    s_loconumber.hidden = false;
}

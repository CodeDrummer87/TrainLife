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
    s_attendance.innerText = await formatDate(date);
    sessionStorage.setItem('attendance', input_time.value);

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
        option.innerHTML = series[i];
        select.appendChild(option);
    }

    select.onchange = async function() {
        select.hidden = true;
        s_series.innerHTML = select.options[select.selectedIndex].innerText;
        s_series.hidden = false;
    }

    p_series.appendChild(select);
}

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

    input_time.onblur = function() {
        convertToParagraph(input_time);
    }
    input_time.onkeydown = function(e) {
        if (e.key === 'Enter') {
            convertToParagraph(input_time);
        }
    }

    p_attendance.appendChild(input_time);
}

function formatDate(dateString, format = 'dd.mm.yy HH:MM') {
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

function convertToParagraph(input_time) {
    const date = new Date(input_time.value);
    let attendance_date = formatDate(date);
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

    select.onchange = function() {
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
    input.value = sessionStorage.getItem('loconumber') === null || sessionStorage.getItem('loconumber') === 'номер' ?
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


    input.onblur = function() {
        getLocoNumber(input);
    }
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            getLocoNumber(input);
        }
    }
}

function getLocoNumber(input) {
    let value = input.value.trim().length === 0 ? 'номер' : input.value.trim();
    value = validateLocoNumber(value);
    sessionStorage.setItem('loconumber', value);
    s_loconumber.innerText = value;
    input.hidden = true;
    setValueAndColor(s_loconumber, 'loconumber', 'номер');
    s_loconumber.hidden = false;
}

function validateLocoNumber(value) {
    if (value === '0' || value === 'номер')
        return 'номер';

    return value.length === 1 ? '00' + value :
        value.length === 2 ? '0' + value : value;
}

//.:: Депо приписки
let p_allocation = document.getElementById('p_allocation');
let s_allocation = document.getElementById('s_allocation');

s_allocation.onclick = function() {
    s_allocation.hidden = true;

    let select = document.createElement('select');
    let allocations = [
        'установить',
        'Омск',
        'Свердловск-сорт.',
        'Курган',
        'Петропавловск',
        'Белово',
        'Тайга'
    ];
    for (let i = 0; i < allocations.length; i++) {
        let option = document.createElement('option');
        option.value = allocations[i];
        option.innerText = allocations[i];
        select.appendChild(option);
    }
    p_allocation.appendChild(select);

    select.onchange = function() {
        select.hidden = true;
        let allocation = select.options[select.selectedIndex].innerText;
        sessionStorage.setItem('allocation', allocation);
        s_allocation.innerText = allocation;
        s_allocation.style.color = '#33cd9e';
        s_allocation.hidden = false;
    }
}

//.:: Количество тормозных башмаков
let p_brakeshoes = document.getElementById('p_brakeshoes');
let s_brakeshoes = document.getElementById('s_brakeshoes');

s_brakeshoes.onclick = function() {
    s_brakeshoes.hidden = true;
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'кол-во';
    input.value = '';
    input.autofocus = true;

    input.addEventListener('keydown', function(event) {
        let allowedInput = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'];
        if (!allowedInput.includes(event.key) || input.value.length > 1) {
            if (event.key !== 'Backspace')
                event.preventDefault();
        }
    });

    input.onblur = function() {
        getNumberOfBrakeShoes(input);
    }

    input.onkeydown = function(e) {
        if (e.key === 'Enter')
            getNumberOfBrakeShoes(input);
    }

    p_brakeshoes.appendChild(input);
}

function getNumberOfBrakeShoes(input) {
    let value = input.value.trim().length === 0 ? 'количество' : input.value.trim();
    sessionStorage.setItem('brakeshoes', value);
    s_brakeshoes.innerText = value;
    input.hidden = true;
    setValueAndColor(s_brakeshoes, 'brakeshoes', 'количество');
    s_brakeshoes.hidden = false;
}

//.:: Станция отправления
let p_departure_station = document.getElementById('p_departure_station');
let s_departure_station = document.getElementById('s_departure_station');

s_departure_station.onclick = function() {
    s_departure_station.hidden = true;

    s_turnout_point.hidden = false;
    i_checkbox.hidden = false;

    let select = createStationSelect();
    p_departure_station.appendChild(select);

    i_checkbox.onchange = async function() {
        await initStations();

        select.remove();
        select = createStationSelect();
        p_departure_station.appendChild(select);
    }
}

function createStationSelect() {
    let select = document.createElement('select');

    const defaultOption = document.createElement('option');
    defaultOption.value = 0;
    defaultOption.innerText = 'станция отправления';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    for (station of allStations) {
        let option = document.createElement('option');
        option.value = station.id;
        option.innerText = station.title;
        select.appendChild(option);
    }

    select.onchange = function() {
        s_turnout_point.hidden = true;
        i_checkbox.hidden = true;

        select.hidden = true;
        let departureStation = select.options[select.selectedIndex].innerText;
        sessionStorage.setItem('departureStation', departureStation);
        s_departure_station.innerText = departureStation;
        s_departure_station.style.color = '#33cd9e';
        s_departure_station.hidden = false;
    }

    return select;
}

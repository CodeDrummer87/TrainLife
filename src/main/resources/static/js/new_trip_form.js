//region Attendance
const p_attendance = document.getElementById('p_attendance');
const s_attendance = document.getElementById('s_attendance');

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
//endregion

//region Series
const p_series = document.getElementById('p_series');
const s_series = document.getElementById('s_series');

s_series.onclick = function() {
    s_series.hidden = true;
    const select = document.createElement('select');
    const series = [ 'серия', 'ВЛ10', 'ВЛ10у', '2ЭС6', '2ЭС10' ];
    for (let i = 0; i < series.length; i++) {
        let option = document.createElement('option');
        option.value = series[i];
        option.innerText = series[i];
        select.appendChild(option);
    }

    select.onchange = function() {
        select.hidden = true;
        const series = select.options[select.selectedIndex].innerText;
        sessionStorage.setItem('series', series);
        s_series.innerText = series;
        s_series.style.color = '#33cd9e';
        s_series.hidden = false;
    }

    p_series.appendChild(select);
}
//endregion

//region Locomotive Number
const p_loconumber = document.getElementById('p_loconumber');
const s_loconumber = document.getElementById('s_loconumber');

s_loconumber.onclick = function() {
    s_loconumber.hidden = true;
    const input = document.createElement('input');
    input.value = sessionStorage.getItem('loconumber') === null || sessionStorage.getItem('loconumber') === 'номер' ?
        '' : sessionStorage.getItem('loconumber');
    input.placeholder = 'номер';
    input.autofocus = true;

    checkAvailableInput(input, 3);
    p_loconumber.appendChild(input);

    input.onblur = function() {
        getNumber(input, 'loconumber', s_loconumber);
    }
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            getNumber(input, 'loconumber', s_loconumber);
        }
    }
}

function validateLocoNumber(value) {
    if (value === '0' || value === 'номер')
        return 'номер';

    return value.length === 1 ? '00' + value :
        value.length === 2 ? '0' + value : value;
}
//endregion

//region Allocation
const p_allocation = document.getElementById('p_allocation');
const s_allocation = document.getElementById('s_allocation');

s_allocation.onclick = function() {
    s_allocation.hidden = true;

    const select = document.createElement('select');
    const allocations = [
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
//endregion

//region Number of Brakeshoes
const p_brakeshoes = document.getElementById('p_brakeshoes');
const s_brakeshoes = document.getElementById('s_brakeshoes');

s_brakeshoes.onclick = function() {
    s_brakeshoes.hidden = true;
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'кол-во';
    input.value = '';
    input.autofocus = true;

    input.addEventListener('keydown', function(event) {
        const allowedInput = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'];
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
//endregion

//region Departure and Arrival stations
const p_departure_station = document.getElementById('p_departure_station');
const s_departure_station = document.getElementById('s_departure_station');
const p_arrival_station = document.getElementById('p_arrival_station');
const s_arrival_station = document.getElementById('s_arrival_station');
const p_turnout_point = document.getElementById('p_turnout_point');
const i_checkbox = document.getElementById('i_checkbox');

s_departure_station.onclick = function() {
    selectStation(p_departure_station, s_departure_station, 'станция отправления', true);
}
s_arrival_station.onclick = function() {
    selectStation(p_arrival_station, s_arrival_station, 'станция прибытия', false);
}

function createStationSelect(span_station, default_text, isDeparture) {

    const select = document.createElement('select');
    const defaultOption = document.createElement('option');
    defaultOption.value = 0;
    defaultOption.innerText = default_text;
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    for (station of allStations) {
        const option = document.createElement('option');
        option.value = station.id;
        option.innerText = station.title;
        select.appendChild(option);
    }

    select.onchange = function() {

        p_turnout_point.style.visibility = 'hidden';
        select.hidden = true;
        let station = select.options[select.selectedIndex].innerText;

        const itemName = isDeparture ? 'departure_station' : 'arrival_station';
        sessionStorage.setItem(itemName, station);
        span_station.innerText = station;
        span_station.style.color = '#33cd9e';
        span_station.hidden = false;
    }

    return select;
}

function selectStation(paragraphEl, spanEl, defaultText, isDeparture) {
    spanEl.hidden = true;
    p_turnout_point.style.visibility = 'visible';

    let select = createStationSelect(spanEl, defaultText, isDeparture);
    paragraphEl.appendChild(select);

    i_checkbox.onchange = async function() {
        await initStations();

        select.remove();
        select = createStationSelect(spanEl, defaultText, isDeparture);
        paragraphEl.appendChild(select);
    }
}
//endregion

//region Train Number
const p_train_number = document.getElementById('p_train_number');
const s_train_number = document.getElementById('s_train_number');

s_train_number.onclick = function() {
    s_train_number.hidden = true;
    const input = document.createElement('input');
    input.classList.add('short-input');
    input.value = sessionStorage.getItem('train_number') === null || sessionStorage.getItem('train_number') === 'номер' ?
        '' : sessionStorage.getItem('train_number');
    input.placeholder = 'номер';
    input.autofocus = true;

    checkAvailableInput(input, 3);
    p_train_number.appendChild(input);

    input.onblur = function() {
        getNumber(input, 'номер', 'train_number', s_train_number);
    }
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            getNumber(input, 'номер', 'train_number', s_train_number);
        }
    }
}
//endregion

//region Train Weight
const p_train_weight = document.getElementById('p_train_weight');
const s_train_weight = document.getElementById('s_train_weight');

s_train_weight.onclick = function() {
    s_train_weight.hidden = true;
    const input = document.createElement('input');
    input.classList.add('short-input');
    input.value = sessionStorage.getItem('train_weight') === null ||
            sessionStorage.getItem('train_weight') === 'масса поезда' ?
        '' : sessionStorage.getItem('train_weight');
    input.placeholder = 'масса поезда';
    input.autofocus = true;

    checkAvailableInput(input, 3);
    p_train_weight.appendChild(input);

    input.onblur = function() {
        getNumber(input, 'масса поезда', 'train_weight', s_train_weight);
    }
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            getNumber(input, 'масса поезда', 'train_weight', s_train_weight);
        }
    }
}
//endregion

//region Number of Axis
const p_number_of_axis = document.getElementById('p_number_of_axis');
const s_number_of_axis = document.getElementById('s_number_of_axis');

s_number_of_axis.onclick = function() {
    s_number_of_axis.hidden = true;
    const input = document.createElement('input');
    input.classList.add('short-input');
    input.value = sessionStorage.getItem('number_of_axis') === null ||
                    sessionStorage.getItem('number_of_axis') === 'количество осей' ?
        '' : sessionStorage.getItem('number_of_axis');
    input.placeholder = 'кол-во осей';
    input.autofocus = true;

    checkAvailableInput(input, 2);
    p_number_of_axis.appendChild(input);

    input.onblur = function() {
        getNumber(input, 'количество осей', 'number_of_axis', s_number_of_axis);
    }
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            getNumber(input, 'количество осей','number_of_axis', s_number_of_axis);
        }
    }
}
//endregion

//region Conditional Length
const p_conditional_length = document.getElementById('p_conditional_length');
const s_conditional_length = document.getElementById('s_conditional_length');

s_conditional_length.onclick = function() {
    s_conditional_length.hidden = true;
    const input = document.createElement('input');
    input.classList.add('short-input');
    input.value = sessionStorage.getItem('conditional_length') === null ||
    sessionStorage.getItem('conditional_length') === 'условная длина' ?
        '' : sessionStorage.getItem('conditional_length');
    input.placeholder = 'усл. длина';
    input.autofocus = true;

    checkAvailableInput(input, 2);
    p_conditional_length.appendChild(input);

    input.onblur = function() {
        getNumber(input, 'условная длина', 'conditional_length', s_conditional_length);
    }
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            getNumber(input, 'условная длина', 'conditional_length', s_conditional_length);
        }
    }
}
//endregion

//region A Tailcar Number
const p_tailcar_number = document.getElementById('p_tailcar_number');
const s_tailcar_number = document.getElementById('s_tailcar_number');

s_tailcar_number.onclick = function() {
    s_tailcar_number.hidden = true;
    const input = document.createElement('input');
    input.classList.add('short-input');
    input.value = sessionStorage.getItem('tailcar_number') === null ||
    sessionStorage.getItem('tailcar_number') === 'номер хвостового вагона' ?
        '' : sessionStorage.getItem('tailcar_number');
    input.placeholder = 'N вагона';
    input.autofocus = true;

    checkAvailableInput(input, 7);
    p_tailcar_number.appendChild(input);

    input.onblur = function() {
        getNumber(input, 'номер хвостового вагона', 'tailcar_number', s_tailcar_number);
    }
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            getNumber(input, 'номер хвостового вагона', 'tailcar_number', s_tailcar_number);
        }
    }
}
//endregion

//.::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function getNumber(input, defaultRecord, itemName, span) {
    let value = input.value.trim().length === 0 ? defaultRecord : input.value.trim();
    value = validateLocoNumber(value);
    sessionStorage.setItem(itemName, value);
    span.innerText = value;
    input.hidden = true;
    setValueAndColor(span, itemName, defaultRecord);
    span.hidden = false;
}

function checkAvailableInput(input, digits) {
    input.addEventListener('keydown', function(event) {
        const allowedInput = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'];
        if (!allowedInput.includes(event.key) || input.value.length > digits) {
            if (event.key !== 'Backspace')
                event.preventDefault();
        }
    });
}

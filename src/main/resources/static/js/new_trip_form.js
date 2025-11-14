//region .:: Attendance
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
    input_time.focus();
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

//region .:: Series
const p_series = document.getElementById('p_series');
const s_series = document.getElementById('s_series');

s_series.onclick = function() {
    s_series.hidden = true;
    const select = document.createElement('select');
    const defaultOption = document.createElement('option');
    defaultOption.value = '0';
    defaultOption.innerText = 'серия';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    const series = [ 'ВЛ10', 'ВЛ10у', '2ЭС6', '2ЭС10' ];
    for (let i = 0; i < series.length; i++) {
        let option = document.createElement('option');
        option.value = (i + 1).toString();
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

    select.onblur = function() {
        if (select.value === '0') {
            select.hidden = true;
            s_series.hidden = false;
        }
    }

    p_series.appendChild(select);
    select.focus();
}
//endregion

//region .:: Locomotive Number
const p_loconumber = document.getElementById('p_loconumber');
const s_loconumber = document.getElementById('s_loconumber');

s_loconumber.onclick = function() {
    s_loconumber.hidden = true;
    const input = document.createElement('input');
    input.value = sessionStorage.getItem('loconumber') === null || sessionStorage.getItem('loconumber') === 'номер' ?
        '' : sessionStorage.getItem('loconumber');
    input.placeholder = 'номер';
    input.autofocus = true;

    input.onblur = function() {
        getNumber(input, 'номер', 'loconumber', s_loconumber);
    }
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            getNumber(input, 'номер', 'loconumber', s_loconumber);
        }
    }

    checkAvailableInput(input, 3);
    p_loconumber.appendChild(input);
    input.focus();
}

function validateLocoNumber(value) {
    if (value === '0' || value === 'номер')
        return 'номер';

    return value.length === 1 ? '00' + value :
        value.length === 2 ? '0' + value : value;
}
//endregion

//region .:: Allocation
const p_allocation = document.getElementById('p_allocation');
const s_allocation = document.getElementById('s_allocation');

s_allocation.onclick = function() {
    s_allocation.hidden = true;

    const select = document.createElement('select');
    const defaultOption = document.createElement('option');
    defaultOption.value = '0';
    defaultOption.innerText = 'установить';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    const allocations = [
        'Омск',
        'Свердловск-сорт.',
        'Курган',
        'Петропавловск',
        'Белово',
        'Тайга'
    ];
    for (let i = 0; i < allocations.length; i++) {
        let option = document.createElement('option');
        option.value =  (i + 1).toString();
        option.innerText = allocations[i];
        select.appendChild(option);
    }

    select.onchange = function() {
        select.hidden = true;
        let allocation = select.options[select.selectedIndex].innerText;
        sessionStorage.setItem('allocation', allocation);
        s_allocation.innerText = allocation;
        s_allocation.style.color = '#33cd9e';
        s_allocation.hidden = false;
    }

    select.onblur = function() {
        if (select.value === '0') {
            select.hidden = true;
            s_allocation.hidden = false;
        }
    }

    p_allocation.appendChild(select);
    select.focus();
}
//endregion

//region .:: Number of Brakeshoes
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
    input.focus();
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

//region .:: Departure and Arrival stations
const p_departure_station = document.getElementById('p_departure_station');
const s_departure_station = document.getElementById('s_departure_station');
const p_arrival_station = document.getElementById('p_arrival_station');
const s_arrival_station = document.getElementById('s_arrival_station');
const p_turnout_point = document.getElementById('p_turnout_point');
const i_checkbox = document.getElementById('i_checkbox');

const p_departure_traffic_light = document.getElementById('p_departure_traffic_light');
const s_departure_traffic_light = document.getElementById('s_departure_traffic_light');
const p_arrival_traffic_light = document.getElementById('p_arrival_traffic_light');
const s_arrival_traffic_light = document.getElementById('s_arrival_traffic_light');

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

    select.onchange = async function() {

        p_turnout_point.style.visibility = 'hidden';
        select.hidden = true;
        let station = select.options[select.selectedIndex].innerText;
        span_station.dataset.id = select.value;

        const itemName = isDeparture ? 'departure_station' : 'arrival_station';
        sessionStorage.setItem(itemName, station);
        span_station.innerText = station;
        span_station.style.color = '#33cd9e';
        span_station.hidden = false;
        activateTrafficLightElement();

        departureTrafficLightList = await fetchTrafficLights(s_departure_station, 'станция отправления');
        arrivalTrafficLightList = await fetchTrafficLights(s_arrival_station, 'станция прибытия');
    }

    select.onblur = function() {
        if (select.value === '0') {
            p_turnout_point.style.visibility = 'hidden';
            select.hidden = true;
            span_station.hidden = false;
        }
    }

    return select;
}

function selectStation(paragraphEl, spanEl, defaultText, isDeparture) {
    spanEl.hidden = true;
    p_turnout_point.style.visibility = 'visible';

    let select = createStationSelect(spanEl, defaultText, isDeparture);
    paragraphEl.appendChild(select);
    select.focus();

    i_checkbox.onchange = async function() {
        await initStations();

        select.remove();
        select = createStationSelect(spanEl, defaultText, isDeparture);
        paragraphEl.appendChild(select);
    }
}
//endregion

//region .:: Train Number
const p_train_number = document.getElementById('p_train_number');
const s_train_number = document.getElementById('s_train_number');

s_train_number.onclick = function() {
    s_train_number.hidden = true;
    const input = document.createElement('input');
    input.classList.add('short-field');
    input.value = sessionStorage.getItem('train_number') === null || sessionStorage.getItem('train_number') === 'номер' ?
        '' : sessionStorage.getItem('train_number');
    input.placeholder = 'номер';
    input.autofocus = true;

    input.onblur = async function() {
        getNumber(input, 'номер', 'train_number', s_train_number);
        activateTrafficLightElement();

        departureTrafficLightList = await fetchTrafficLights(s_departure_station, 'станция отправления');
        arrivalTrafficLightList = await fetchTrafficLights(s_arrival_station, 'станция прибытия');
    }
    input.onkeydown = async function(e) {
        if (e.key === 'Enter') {
            getNumber(input, 'номер', 'train_number', s_train_number);
            activateTrafficLightElement();

            departureTrafficLightList = await fetchTrafficLights(s_departure_station, 'станция отправления');
            arrivalTrafficLightList = await fetchTrafficLights(s_arrival_station, 'станция прибытия');
        }
    }

    checkAvailableInput(input, 3);
    p_train_number.appendChild(input);
    input.focus();
}
//endregion

//region .:: Train Weight
const p_train_weight = document.getElementById('p_train_weight');
const s_train_weight = document.getElementById('s_train_weight');

s_train_weight.onclick = function() {
    s_train_weight.hidden = true;
    const input = document.createElement('input');
    input.classList.add('short-field');
    input.value = sessionStorage.getItem('train_weight') === null ||
            sessionStorage.getItem('train_weight') === 'масса поезда' ?
        '' : sessionStorage.getItem('train_weight');
    input.placeholder = 'масса поезда';
    input.autofocus = true;

    input.onblur = function() {
        getNumber(input, 'масса поезда', 'train_weight', s_train_weight);
    }
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            getNumber(input, 'масса поезда', 'train_weight', s_train_weight);
        }
    }

    checkAvailableInput(input, 3);
    p_train_weight.appendChild(input);
    input.focus();
}
//endregion

//region .:: Number of Axis
const p_number_of_axis = document.getElementById('p_number_of_axis');
const s_number_of_axis = document.getElementById('s_number_of_axis');

s_number_of_axis.onclick = function() {
    s_number_of_axis.hidden = true;
    const input = document.createElement('input');
    input.classList.add('short-field');
    input.value = sessionStorage.getItem('number_of_axis') === null ||
                    sessionStorage.getItem('number_of_axis') === 'количество осей' ?
        '' : sessionStorage.getItem('number_of_axis');
    input.placeholder = 'кол-во осей';
    input.autofocus = true;

    input.onblur = function() {
        getNumber(input, 'количество осей', 'number_of_axis', s_number_of_axis);
    }
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            getNumber(input, 'количество осей','number_of_axis', s_number_of_axis);
        }
    }

    checkAvailableInput(input, 2);
    p_number_of_axis.appendChild(input);
    input.focus();
}
//endregion

//region .:: Conditional Length
const p_conditional_length = document.getElementById('p_conditional_length');
const s_conditional_length = document.getElementById('s_conditional_length');

s_conditional_length.onclick = function() {
    s_conditional_length.hidden = true;
    const input = document.createElement('input');
    input.classList.add('short-field');
    input.value = sessionStorage.getItem('conditional_length') === null ||
    sessionStorage.getItem('conditional_length') === 'условная длина' ?
        '' : sessionStorage.getItem('conditional_length');
    input.placeholder = 'усл. длина';
    input.autofocus = true;

    input.onblur = function() {
        getNumber(input, 'условная длина', 'conditional_length', s_conditional_length);
    }
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            getNumber(input, 'условная длина', 'conditional_length', s_conditional_length);
        }
    }

    checkAvailableInput(input, 2);
    p_conditional_length.appendChild(input);
    input.focus();
}
//endregion

//region .:: A Tailcar Number
const p_tailcar_number = document.getElementById('p_tailcar_number');
const s_tailcar_number = document.getElementById('s_tailcar_number');

s_tailcar_number.onclick = function() {
    s_tailcar_number.hidden = true;
    const input = document.createElement('input');
    input.classList.add('short-field');
    input.value = sessionStorage.getItem('tailcar_number') === null ||
    sessionStorage.getItem('tailcar_number') === 'номер хвостового вагона' ?
        '' : sessionStorage.getItem('tailcar_number');
    input.placeholder = 'N вагона';
    input.autofocus = true;

    input.onblur = function() {
        getNumber(input, 'номер хвостового вагона', 'tailcar_number', s_tailcar_number);
    }
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            getNumber(input, 'номер хвостового вагона', 'tailcar_number', s_tailcar_number);
        }
    }

    checkAvailableInput(input, 7);
    p_tailcar_number.appendChild(input);
    input.focus();
}
//endregion

//region .:: A Departure Traffic Light
s_departure_traffic_light.onclick = function() {
    s_departure_traffic_light.hidden = true;

    const select = document.createElement('select');
    select.classList.add('short-field');
    const defaultOption = document.createElement('option');
    defaultOption.value = 0;
    defaultOption.innerText = 'выбрать';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    for (traffic_light of departureTrafficLightList) {
        const option = document.createElement('option');
        option.value = traffic_light.id;
        option.innerText = traffic_light.title;
        select.appendChild(option);
    }

    select.onchange = function() {
        select.hidden = true;
        let traffic_light = select.options[select.selectedIndex].innerText;

        sessionStorage.setItem('departure_traffic_light', `( ${traffic_light} )`);
        s_departure_traffic_light.innerText = `( ${traffic_light} )`;
        s_departure_traffic_light.style.color = '#33cd9e';
        s_departure_traffic_light.hidden = false;
    }

    select.onblur = function() {
        if (select.value === '0') {
            select.hidden = true;
            s_departure_traffic_light.hidden = false;
        }
    }

    p_departure_traffic_light.appendChild(select);
    select.focus();
}
//endregion

//region .:: An Arrival Traffic Light
s_arrival_traffic_light.onclick = function() {
    s_arrival_traffic_light.hidden = true;

    const select = document.createElement('select');
    select.classList.add('short-field');
    const defaultOption = document.createElement('option');
    defaultOption.value = 0;
    defaultOption.innerText = 'выбрать';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    for (traffic_light of arrivalTrafficLightList) {
        const option = document.createElement('option');
        option.value = traffic_light.id;
        option.innerText = traffic_light.title;
        select.appendChild(option);
    }

    select.onchange = function() {
        select.hidden = true;
        let traffic_light = select.options[select.selectedIndex].innerText;

        sessionStorage.setItem('arrival_traffic_light', `( ${traffic_light} )`);
        s_arrival_traffic_light.innerText = `( ${traffic_light} )`;
        s_arrival_traffic_light.style.color = '#33cd9e';
        s_arrival_traffic_light.hidden = false;
    }

    select.onblur = function() {
        if (select.value === '0') {
            select.hidden = true;
            s_arrival_traffic_light.hidden = false;
        }
    }

    p_arrival_traffic_light.appendChild(select);
    select.focus();
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

function activateTrafficLightElement() {
    if (s_train_number.innerText !== 'номер') {
        removeClass(s_departure_station, p_departure_traffic_light, 'станция отправления');
        removeClass(s_arrival_station, p_arrival_traffic_light, 'станция прибытия');
    }
    else {
        p_departure_traffic_light.classList.add('inactive');
        p_arrival_traffic_light.classList.add('inactive');
    }
}

function removeClass(span, element, defaultRecord) {
    if (span.innerText !== defaultRecord) {
        element.classList.remove('inactive');
    }
}

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

    for (series of locomotiveSeries) {
        const option = document.createElement('option');
        option.value = series.id;
        option.innerText = series.title;
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

//region .:: A Home Depot
const p_home_depot = document.getElementById('p_home_depot');
const s_home_depot = document.getElementById('s_home_depot');

s_home_depot.onclick = function() {
    s_home_depot.hidden = true;

    const select = document.createElement('select');
    const defaultOption = document.createElement('option');
    defaultOption.value = '0';
    defaultOption.innerText = 'установить';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    for (depot of depots) {
        const option = document.createElement('option');
        option.value = depot.id;
        option.innerText = `${depot.abbreviation}, ${depot.railwayAbbreviation}`
        select.appendChild(option);
    }

    select.onchange = function() {
        select.hidden = true;
        let home_depot = select.options[select.selectedIndex].innerText;
        sessionStorage.setItem('home_depot', home_depot);
        s_home_depot.innerText = home_depot;
        s_home_depot.style.color = '#33cd9e';
        s_home_depot.hidden = false;
    }

    select.onblur = function() {
        if (select.value === '0') {
            select.hidden = true;
            s_home_depot.hidden = false;
        }
    }

    p_home_depot.appendChild(select);
    select.focus();
}
//endregion

//region .:: Number of Brakeshoes
const p_brakeshoes = document.getElementById('p_brakeshoes');
const s_brakeshoes = document.getElementById('s_brakeshoes');
let brakeshoes = { serviceable: 0, broken: 0 };

s_brakeshoes.onclick = function() {
    s_brakeshoes.hidden = true;
    const input = document.createElement('input');
    input.type = 'text';
    input.pattern = '\d{1,2}-\d{1,2}';
    input.placeholder = 'чч-чч';
    input.title = 'исправные ТБ - неисправные ТБ';
    input.maxLength = 5;
    input.autofocus = true;

    input.addEventListener('keydown', function(e) {
        const allowedInput = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', 'Backspace'];
        if (!allowedInput.includes(e.key) || input.value.length > 4) {
            if (e.key !== 'Backspace')
                e.preventDefault();
        }
        let value = e.target.value;
        const incorrectInput = ['1', '2', '3'];
        if (e.key === '-' && incorrectInput.includes(value)) {
            e.preventDefault();
            displayMessage('Количество исправных ТБ не может быть меньше 4-х', false);
        }
        if (e.key === '0' && value.length === 0) {
            e.preventDefault();
            displayMessage('Количество исправных ТБ не может начинаться с нуля', false);
        }
        if (value.length === 0 && e.key === '-') {
            e.preventDefault();
            displayMessage('Некорректный ввод количества исправных ТБ', false);
        }
        if (e.key === '-' && value.includes('-')) {
            e.preventDefault();
            displayMessage('Символ вычитания неисправных ТБ может быть в единственном числе', false);
        }
        if (e.key === '0' && (value[value.length - 1] === '-' || value.length === 2)) {
            e.preventDefault();
            displayMessage('Количество неисправных ТБ не может начинаться с нуля', false);
        }
        if (value.length === 2 && e.key !== 'Enter' && e.key !== '-' && !value.includes('-')) {
            if (e.key !== 'Backspace')
                input.value += '-';
        }
        if (e.key === 'Backspace' && input.value[input.value.length - 2] === '-') {
            input.value = input.value.substring(0, input.value.indexOf('-') + 1);
        }
    });

    input.onblur = async function() {
        if (validateRecord(input)) {
            await getNumberOfBrakeShoes(input);
        }
    }
    input.onkeydown = async function(e) {
        if (e.key === 'Enter')
            if (validateRecord(input)) {
                await getNumberOfBrakeShoes(input);
            }
    }

    p_brakeshoes.appendChild(input);
    input.focus();
}

function getBrakeshoes(record) {
    if (record.includes('-')) {
        const splitRecord = record.split('-');
        brakeshoes.serviceable = parseInt(splitRecord[0]);
        brakeshoes.broken = parseInt(splitRecord[1]);
    } else {
        brakeshoes.serviceable = record.trim().length === 0 ? 0 : parseInt(record);
        brakeshoes.broken = 0;
    }
}

function validateRecord(input) {
    let value = input.value;
    let record = value[value.length - 1] === '-' ? value.replace('-', '') : value;
    input.value = record;
    getBrakeshoes(record);
    if (record.includes('-')) {
        if (brakeshoes.broken > brakeshoes.serviceable) {
            displayMessage('Ошибка: число неисправных ТБ превосходит число исправных', false);
            return false;
        }
    }
    if (brakeshoes.serviceable > 40) {
        displayMessage('Ошибка: на борту локомотива не может быть более 40 ТБ', false);
        return false;
    }
    return true;
}

async function getNumberOfBrakeShoes(input) {
    getBrakeshoes(input.value);

    try {
        const response = await fetch('/api/calculate-securing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(brakeshoes)
        });

        if (!response.ok) {
            displayMessage('HTTP ошибка выполнения запроса: закрепление поезда', false);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.text();
        displayMessage(result, true);
        //.:: разместить ответ в закреплении состава
    } catch(error) {
        displayMessage('Сетевая ошибка запроса: закрепление поезда', false);
        console.error(`Сетевая ошибка запроса: закрепление поезда: ` + error);
    }

    let value;
    if (input.value.includes('-')) {
        value = brakeshoes.broken === 0 ? brakeshoes.serviceable : brakeshoes.serviceable + '-' + brakeshoes.broken;
    } else {
        value = brakeshoes.serviceable === 0 ? 'количество' : brakeshoes.serviceable;
    }
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
let unfocusedElement = { select: null, span: null }

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
        const stationId = select.value;
        span_station.dataset.id = stationId;
        const item = isDeparture ? 'departure_station_id' : 'arrival_station_id';
        sessionStorage.setItem(item, stationId);

        const itemName = isDeparture ? 'departure_station' : 'arrival_station';
        sessionStorage.setItem(itemName, station);
        span_station.innerText = station;
        span_station.style.color = '#33cd9e';
        span_station.hidden = false;
        activateTrafficLightElement();

        const list = isDeparture ?
            await fetchTrafficLights(s_departure_station,'станция отправления') :
            await fetchTrafficLights(s_arrival_station, 'станция прибытия');
        if (isDeparture) {
            departureTrafficLightList = list;
        } else arrivalTrafficLightList = list;
    }

    select.onblur = function() {
        setTimeout(() => {
            if (document.activeElement.id !== i_checkbox.id) {
                if (select.value === '0') {
                    p_turnout_point.style.visibility = 'hidden';
                    displaySpan(select, span_station);
                }
            }
        }, 0);
    }

    return select;
}

function displaySpan(select, span) {
    select.remove();
    span.hidden = false;
    hideCheckbox();
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
        unfocusedElement = { select: select, span: spanEl };
    }

    i_checkbox.onblur = function() {
        if (unfocusedElement.select !== null) {
            displaySpan(unfocusedElement.select, unfocusedElement.span);
            unfocusedElement.select = null;
        }
    }
}

function hideCheckbox() {
    if (p_turnout_point.style.visibility === 'visible') {
        p_turnout_point.style.visibility = 'hidden';
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
    input.focus();
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

    select.onchange = function () {
        select.hidden = true;
        let traffic_light = select.options[select.selectedIndex].innerText;

        sessionStorage.setItem('departure_traffic_light', `( ${traffic_light} )`);
        s_departure_traffic_light.innerText = `( ${traffic_light} )`;
        s_departure_traffic_light.style.color = '#33cd9e';
        s_departure_traffic_light.hidden = false;
    }

    select.onblur = function () {
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

//region .:: Departure and Arrival Time
const p_departure_time = document.getElementById('p_departure_time');
const s_departure_time = document.getElementById('s_departure_time');
const p_arrival_time = document.getElementById('p_arrival_time');
const s_arrival_time = document.getElementById('s_arrival_time');

s_departure_time.onclick = function() {
    setTime(s_departure_time, 'departure_time', p_departure_time);
}
s_arrival_time.onclick = function() {
    setTime(s_arrival_time, 'arrival_time', p_arrival_time);
}

function setTime(span, item, element) {
    span.hidden = true;
    let input = document.createElement('input');
    input.type = 'time';
    input.classList.add('short-field');
    input.value = sessionStorage.getItem(item) === null ?
        '00:00' : sessionStorage.getItem(item);
    input.autofocus = true;

    input.onblur = function() {
        convertToTimeParagraph(input, span, item);
    }
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            convertToTimeParagraph(input, span, item);
        }
    }

    element.appendChild(input);
    input.focus();
}

function convertToTimeParagraph(input, span, item) {
    const value = input.value;
    span.innerText = value;
    sessionStorage.setItem(item, value);
    input.remove();
    span.style.color = '#e8c273';
    span.hidden = false;
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

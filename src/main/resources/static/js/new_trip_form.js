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

    input_time?.parentNode?.removeChild(input_time);
    s_attendance.hidden = false;
    s_attendance.style.color = '#33cd9e';
}
//endregion

//region .:: Series
const p_series = document.getElementById('p_series');
const s_series = document.getElementById('s_series');

s_series.onclick = function() {
    s_series.hidden = true;
    const select = createEmptySelect('серия');
    for (let series of locomotiveSeries) {
        const option = document.createElement('option');
        option.value = series.id;
        option.innerText = series.title;
        select.appendChild(option);
    }

    select.onchange = function() {
        const series = select.options[select.selectedIndex].innerText;
        select.parentNode.removeChild(select);
        sessionStorage.setItem('series', series);
        s_series.innerText = series;
        s_series.style.color = '#33cd9e';
        s_series.hidden = false;
    }

    select.onblur = function() {
        if (select.value === '0') {
            select?.parentNode?.removeChild(select);
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

function convertLocoNumber(value) {
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

    const select = createEmptySelect('установить');
    for (let depot of depots) {
        const option = document.createElement('option');
        option.value = depot.id;
        option.innerText = `${depot.abbreviation}, ${depot.railwayAbbreviation}`
        select.appendChild(option);
    }

    select.onchange = function() {
        let home_depot = select.options[select.selectedIndex].innerText;
        select.parentNode.removeChild(select);
        sessionStorage.setItem('home_depot', home_depot);
        s_home_depot.innerText = home_depot;
        s_home_depot.style.color = '#33cd9e';
        s_home_depot.hidden = false;
    }

    select.onblur = function() {
        if (select.value === '0') {
            select?.parentNode?.removeChild(select);
            s_home_depot.hidden = false;
        }
    }

    p_home_depot.appendChild(select);
    select.focus();
}
//endregion

//region .:: Number of Brakeshoes
const p_train_weight = document.getElementById('p_train_weight');
const s_train_weight = document.getElementById('s_train_weight');

const p_brakeshoes = document.getElementById('p_brakeshoes');
const s_brakeshoes = document.getElementById('s_brakeshoes');
const i_loaded_train = document.getElementById('i_loaded_train');
const i_selective_braking = document.getElementById('i_selective_braking');
let isEnterPressed = false;
let defaultModel = {
    weight: 0,
    brakeShoes: { serviceable: 0, broken: 0 },
    isLoadedTrain: false,
    isSelectiveBraking: false
};
let trainSecuring = sessionStorage.getItem('trainSecuringData') === null ?
    defaultModel : JSON.parse(sessionStorage.getItem('trainSecuringData'));


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
        const allowedInput = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-',
            'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Backspace', 'Enter'];
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
        if ((e.key === 'ArrowUp' || e.key === 'ArrowRight') && !value.includes('-')) {
            const result = parseInt(input.value);
            let val = Number.isFinite(result) ? result : 0;
            input.value = (val + 1 < 41 ? ++val : val).toString();
            setTimeout(() => {
                this.setSelectionRange(this.value.length, this.value.length);
            }, 0);
        }
        if ((e.key === 'ArrowDown' || e.key === 'ArrowLeft') && !value.includes('-')) {
            const result = parseInt(input.value);
            let val = Number.isFinite(result) ? result : 0;
            input.value = (val - 1 > 3 ? --val : val).toString();
            setTimeout(() => {
                this.setSelectionRange(this.value.length, this.value.length);
            }, 0);
        }
    });

    input.onblur = async function() {
        if (isEnterPressed) {
            isEnterPressed = false;
            return;
        }
        if (validateRecord(input)) {
            await getTrainSecuringRecord(input);
        } else {
            input.focus();
        }
    }
    input.onkeydown = async function(e) {
        if (e.key === 'Enter') {
            isEnterPressed = true;
            if (validateRecord(input)) {
                await getTrainSecuringRecord(input);
            }
        }
    }

    p_brakeshoes.appendChild(input);
    input.focus();
}

function getTrainSecuringData(record) {
    if (record.includes('-')) {
        const splitRecord = record.split('-');
        trainSecuring.brakeShoes.serviceable = parseInt(splitRecord[0]);
        trainSecuring.brakeShoes.broken = parseInt(splitRecord[1]);
    } else {
        trainSecuring.brakeShoes.serviceable = record.trim().length === 0 ? 0 : parseInt(record);
        trainSecuring.brakeShoes.broken = 0;
    }

    saveFieldsValue();
}

function validateRecord(input) {
    let value = input.value;
    let record = value[value.length - 1] === '-' ? value.replace('-', '') : value;
    input.value = record;
    getTrainSecuringData(record);
    if (record.includes('-')) {
        if (trainSecuring.brakeShoes.broken > trainSecuring.brakeShoes.serviceable) {
            displayMessage('Ошибка: число неисправных ТБ превосходит число исправных', false);
            return false;
        }
    }
    if (trainSecuring.brakeShoes.serviceable < 4) {
        displayMessage('Количество исправных ТБ не может быть меньше 4-х', false);
        return false;
    }
    if (trainSecuring.brakeShoes.serviceable > 40) {
        displayMessage('Ошибка: на борту локомотива не может быть более 40 ТБ', false);
        return false;
    }
    return true;
}

async function getTrainSecuringRecord(input) {
    let value;
    if (input.value.includes('-')) {
        value = trainSecuring.brakeShoes.broken === 0 ?
            trainSecuring.brakeShoes.serviceable : trainSecuring.brakeShoes.serviceable + '-' + trainSecuring.brakeShoes.broken;
    } else {
        value = trainSecuring.brakeShoes.serviceable === 0 ? 'количество' : trainSecuring.brakeShoes.serviceable;
    }
    sessionStorage.setItem('brakeshoes', value);
    s_brakeshoes.innerText = value;
    input?.parentNode?.removeChild(input);
    setValueAndColor(s_brakeshoes, 'brakeshoes', 'количество');
    s_brakeshoes.hidden = false;

    await fetchSecuringRecord();
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

    const select = createEmptySelect(default_text);
    for (let station of allStations) {
        const option = document.createElement('option');
        option.value = station.id;
        option.innerText = station.title;
        select.appendChild(option);
    }

    select.onchange = async function() {

        p_turnout_point.style.visibility = 'hidden';
        let station = select.options[select.selectedIndex].innerText;
        const stationId = select.value;
        select?.parentNode?.removeChild(select);
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
    select?.parentNode?.removeChild(select);
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
s_train_weight.onclick = function() {
    s_train_weight.hidden = true;
    const input = document.createElement('input');
    input.classList.add('short-field');
    input.value = sessionStorage.getItem('train_weight') === null ||
            sessionStorage.getItem('train_weight') === 'масса поезда' ?
        '' : sessionStorage.getItem('train_weight');
    input.placeholder = 'масса поезда';
    input.autofocus = true;

    input.onblur = async function() {
        getNumber(input, 'масса поезда', 'train_weight', s_train_weight);
        saveFieldsValue();
        await fetchSecuringRecord();
    }
    input.onkeydown = async function(e) {
        if (e.key === 'Enter') {
            getNumber(input, 'масса поезда', 'train_weight', s_train_weight);
            saveFieldsValue();
            await fetchSecuringRecord();
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
    const select = createEmptySelect('выбрать');
    select.classList.add('short-field');
    for (let traffic_light of departureTrafficLightList) {
        const option = document.createElement('option');
        option.value = traffic_light.id;
        option.innerText = traffic_light.title;
        select.appendChild(option);
    }

    select.onchange = function () {
        let traffic_light = select.options[select.selectedIndex].innerText;
        select?.parentNode?.removeChild(select);
        sessionStorage.setItem('departure_traffic_light', `( ${traffic_light} )`);
        s_departure_traffic_light.innerText = `( ${traffic_light} )`;
        s_departure_traffic_light.style.color = '#33cd9e';
        s_departure_traffic_light.hidden = false;
    }

    select.onblur = function () {
        if (select.value === '0') {
            select?.parentNode?.removeChild(select);
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

    const select = createEmptySelect('выбрать');
    select.classList.add('short-field');
    for (let traffic_light of arrivalTrafficLightList) {
        const option = document.createElement('option');
        option.value = traffic_light.id;
        option.innerText = traffic_light.title;
        select.appendChild(option);
    }

    select.onchange = function() {
        let traffic_light = select.options[select.selectedIndex].innerText;
        select?.parentNode?.removeChild(select);

        sessionStorage.setItem('arrival_traffic_light', `( ${traffic_light} )`);
        s_arrival_traffic_light.innerText = `( ${traffic_light} )`;
        s_arrival_traffic_light.style.color = '#33cd9e';
        s_arrival_traffic_light.hidden = false;
    }

    select.onblur = function() {
        if (select.value === '0') {
            select?.parentNode?.removeChild(select);
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

//region .:: Train Securing
const s_train_securing = document.getElementById('s_train_securing');

i_loaded_train.onchange = async function() {
    saveFieldsValue();
    await fetchSecuringRecord();
    sessionStorage.setItem('checkbox_loaded_train', JSON.stringify(i_loaded_train.checked));
}
i_selective_braking.onchange = async function() {
    saveFieldsValue();
    await fetchSecuringRecord();
    sessionStorage.setItem('checkbox_selective_braking', JSON.stringify(i_selective_braking.checked));
}

function saveFieldsValue() {
    trainSecuring.weight = s_train_weight.innerText === 'масса поезда' ? 0 : parseInt(s_train_weight.innerText);
    trainSecuring.isLoadedTrain = !!i_loaded_train.checked;
    trainSecuring.isSelectiveBraking = !!i_selective_braking.checked;
}

async function fetchSecuringRecord() {
    if (s_train_weight.innerText === 'масса поезда') {
        displayMessage('Для расчёта закрепления поезда укажите его массу', false);
        return;
    }
    if (s_brakeshoes.innerText === 'количество') {
        displayMessage('Для расчёта закрепления поезда укажите количество ТБ', false);
        return;
    }

    try {
        const response = await fetch('/api/v1/calculate-securing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trainSecuring)
        });
        if (!response.ok) {
            displayMessage('HTTP ошибка выполнения запроса: закрепление поезда', false);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.text();
        s_train_securing.innerText = result;
        s_train_securing.style.color = '#e8c273';
        sessionStorage.setItem('trainSecuring', result);
        sessionStorage.setItem('trainSecuringData', JSON.stringify(trainSecuring));
        displayMessage('Произведён автоматический расчёт закрепления поезда', true);
    } catch(error) {
        displayMessage('Сетевая ошибка запроса: закрепление поезда', false);
        console.error(`Сетевая ошибка запроса: закрепление поезда: ` + error);
    }
}
//endregion

//region .:: Brake Test
const p_brake_test = document.getElementById('p_brake_test');
const s_brake_test = document.getElementById('s_brake_test');
const div_brake_test = document.getElementById('div_brake_test');

s_brake_test.onclick = async function() {

    const trainNumberString = s_train_number.innerText;
    if (trainNumberString === 'номер') {
        displayMessage('Введите номер поезда', false);
        return;
    }

    s_brake_test.hidden = true;

    const depot_id = 1; //.:: temporary code ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const isEvenDirection = parseInt(trainNumberString, 10) % 2 === 0;
    const brakeTestList = await fetchBrakeTests(depot_id, isEvenDirection);

    const select = createEmptySelect('выбрать');
    for (let brakeTest of brakeTestList) {
        const option = document.createElement('option');
        option.value = brakeTest.id;
        option.innerText = `(${brakeTest.requiredSpeed} км/ч) ${brakeTest.section}    - ${brakeTest.point} -  `;
        select.appendChild(option);
    }

    select.onchange = function() {
        select.hidden = true;
        let brakeTest = select.options[select.selectedIndex].innerText;
        ++brakeTestCounter;
        sessionStorage.setItem('brakeTestCounter', brakeTestCounter);
        sessionStorage.setItem('brakeTest_' + brakeTestCounter, brakeTest);

        const p = createRecord(brakeTest, brakeTestCounter, 'brakeTest_');
        div_brake_test.appendChild(p);
        s_brake_test.hidden = false;
    }

    select.onblur = function() {
        if (select.value === '0') {
            select?.parentNode?.removeChild(select);
            s_brake_test.hidden = false;
        }
    }

    p_brake_test.appendChild(select);
    select.focus();
}
//endregion

//region .:: Stations Passed
const div_stations_passed = document.getElementById('div_stations_passed');
const s_stations_passed = document.getElementById('s_stations_passed');
let isTabPressed = false;
let arrowNavigationHandler = false;
let numberInputHandler = false;
let currentLength = 0;
let isCreated = false;

s_stations_passed.onclick = async function() {
    const depotId = 1;  //.:: temporary code :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const stations = await fetchObservedStations(depotId);
    if (stations.length === 0) {
        displayMessage('Список станций проследования пуст / Отсутствует интернет', false);
        return;
    }

    isCreated = false;
    s_stations_passed.hidden = true;
    const outerDiv = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Введите станцию'
    input.classList.add('thin-input');
    input.autofocus = true;
    outerDiv.appendChild(input);

    input.oninput = function() {
        clearTips();

        if (input.value.trim().length === 0) {
            isTabPressed = false;
        }
        if(isTabPressed) {
            input.removeEventListener('keydown', arrowNavigationHandler);
        }

        if (!isTabPressed) {
            const invalidInput = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            let length = 0;
            const val = input.value;
            if (invalidInput.includes(val)) {
                input.value = input.value.replace(val, '');
                return;
            }
            const tipList = stations.filter(s => s.toLowerCase().startsWith(val.toLowerCase()));
            if (tipList.length !== 0) {

                const tips_div = document.createElement('div');
                tips_div.classList.add('tips');
                for (let tip of tipList) {
                    const div = document.createElement('div');
                    div.innerText = tip;
                    div.classList.add('tip');
                    tips_div.appendChild(div);
                }
                const tips = tips_div.getElementsByClassName('tip');
                if (tips !== undefined) {
                    let selectedIndex = 0;
                    tips?.[selectedIndex].classList.add('selected-tip');

                    arrowNavigationHandler = function(e) {
                        if (selectedIndex < tips.length - 1 && e.key === 'ArrowDown') {
                            e.preventDefault();
                            tips?.[selectedIndex++].classList.remove('selected-tip');
                            tips?.[selectedIndex].classList.add('selected-tip');
                        }
                        if (selectedIndex > 0 && e.key === 'ArrowUp') {
                            e.preventDefault();
                            tips?.[selectedIndex--].classList.remove('selected-tip');
                            tips?.[selectedIndex].classList.add('selected-tip');
                        }
                        if (e.key === 'Tab') {
                            e.preventDefault();
                            isTabPressed = true;
                            const value = `${tips?.[selectedIndex].innerText}\u00A0-\u00A0`;
                            input.value = value;
                            length = value.length;
                            clearTips();
                            input.focus();
                            input.setSelectionRange(length, length);
                            input.removeEventListener('keydown', arrowNavigationHandler);
                        }
                    }

                    input.addEventListener('keydown', arrowNavigationHandler);
                }
                outerDiv.appendChild(tips_div);
            }
        } else {
            const allowedInput = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Enter'];
            if (currentLength === 0) {
                currentLength = input.value.length;
            }
            numberInputHandler = function(e) {
                if (e.key !== 'Backspace') {
                    if (input.value.length < currentLength + 4) {
                        if(!allowedInput.includes(e.key)) {
                            e.preventDefault();
                        } else {
                            if (input.value.length === currentLength + 1 && !input.value.includes(':')) {
                                input.value += ':';
                            }
                        }
                    } else {
                        e.preventDefault();
                        if (e.key === 'Enter') {
                            if (!isCreated) {
                                isCreated = true;
                                isTabPressed = false;
                                currentLength = 0;
                                arrowNavigationHandler = false;
                                e.preventDefault();
                                ++observedStationCounter;
                                const text = input.value;
                                sessionStorage.setItem('observedStationCounter', observedStationCounter);
                                sessionStorage.setItem('observedStation_' + observedStationCounter, text);
                                const p = createRecord(text, observedStationCounter, 'observedStation_');
                                div_stations_passed.appendChild(p);

                                outerDiv.hidden = true;
                                s_stations_passed.hidden = false;
                                input.remove();
                                outerDiv.remove();
                            }
                        }
                    }
                } else {
                    if (input.value.length === currentLength - 1) {
                        e.preventDefault();
                    }
                }
            }

            input.addEventListener('keydown', numberInputHandler);
        }
    }

    div_stations_passed.appendChild(outerDiv);
}

function clearTips() {
    const div = document.getElementsByClassName('tips')[0];
    div?.parentNode.removeChild(div);
}

//.::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function getNumber(input, defaultRecord, itemName, span) {
    let value = input.value.trim().length === 0 ? defaultRecord : input.value.trim();
    if (itemName.includes('loconumber')) {
        value = convertLocoNumber(value);
    } else {
        value = parseInt(value) === 0 ? defaultRecord : value;
    }
    sessionStorage.setItem(itemName, value);
    span.innerText = value;
    input?.parentNode?.removeChild(input);
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

function createEmptySelect(default_text) {
    let select = document.createElement('select');
    const defaultOption = document.createElement('option');
    defaultOption.value = '0';
    defaultOption.innerText = default_text;
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);
    return select;
}

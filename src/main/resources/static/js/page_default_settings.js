const url = 'http://localhost:8080/api/v1';

let copyright = document.getElementById('copyright');
copyright.innerText = `\u00A9\u00A0Поездная жизнь\u00A0-\u00A0${new Date().getFullYear()}.\u00A0Все права защищены`
let currentMessage = document.getElementById('currentMessage');
let currentMessageTimerId;

let locomotiveSeries = [];
let depots = [];
let allStations = [];
let departureTrafficLightList = [];
let arrivalTrafficLightList = [];

let isCreated = false;
let brakeTestCounter = setCounterDefault('brakeTestCounter');
let observedStationCounter = setCounterDefault('observedStationCounter');
let limitCounter = setCounterDefault('limitCounter');
let stopCounter = setCounterDefault('stopCounter');

async function fetchLocomotiveSeries() {
    try {
        const response = await fetch(url + '/locomotive-series/list');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const locomotiveSeries = await response.json();
        return Array.isArray(locomotiveSeries) ? locomotiveSeries : [];
    } catch(error) {
        console.error("Ошибка выполнения запроса на извлечение серий локомотивов: " + error);
        return [];
    }
}

async function fetchLocomotiveDepots() {
    try {
        const response = await fetch(url + '/locomotive-depots/list');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const depots = await response.json();
        return Array.isArray(depots) ? depots : [];
    } catch(error) {
        console.error("Ошибка выполнения запроса на извлечение списка локомотивных депо: " + error);
        return [];
    }
}

async function initLocomotiveSeries() {
    try {
        locomotiveSeries = await fetchLocomotiveSeries();
    } catch(error) {
        console.error('Ошибка при инициализации серий локомотивов: ' + error);
    }
}

async function initLocomotiveDepots() {
    try {
        depots = await fetchLocomotiveDepots();
    } catch(error) {
        console.error('Ошибка при инициализации локомотивных депо: ' + error);
    }
}

async function initStations() {
    try {
        allStations = await fetchStations();
    } catch(error) {
        console.error('Ошибка при инициализации станций: ' + error);
    }
}

(() => initLocomotiveSeries())();
(() => initLocomotiveDepots())();
(() => initStations())();

async function fetchStations() {
    let depotId = 1;    //.:: TODO: temporary code ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    try {
        const uri = i_checkbox.checked ? `/base-list` : `/list`;
        const response = await fetch(url + `/stations/depot/${depotId}` + uri);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const stations = await response.json();
        return Array.isArray(stations) ? stations : [];
    } catch(error) {
        console.error("Ошибка выполнения запроса на извлечение станций: " + error);
        return [];
    }
}

async function fetchTrafficLights(span_station, defaultRecord) {
    if (span_station.innerText !== defaultRecord && s_train_number.innerText !== 'номер') {
        const stationId = span_station.dataset.id;
        const isEven = parseInt(s_train_number.innerText) % 2 === 0;
        try {
            const uri = `/station/${stationId}?isEven=${isEven}`;
            const response = await fetch(url + '/traffic-lights' + uri);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            const key = defaultRecord === 'станция отправления' ?
                'departure_traffic_light_list' : 'arrival_traffic_light_list';
            sessionStorage.setItem(key, JSON.stringify(result));

            return result;
        } catch(error) {
            console.error("Ошибка выполнения запроса на извлечение светофоров: " + error);
            return [];
        }
    }
}

async function fetchBrakeTests(depot_id, isEvenDirection) {
    try {
        const uri = `/brake-tests?depot-id=${depot_id}&is-even-direction=${isEvenDirection}`;
        const response = await fetch(url + uri);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const brakeTests = await response.json();
        return Array.isArray(brakeTests) ? brakeTests : [];
    } catch(error) {
        const dir = isEvenDirection ? "чётного" : "нечётного";
        console.error(`Ошибка выполнения запроса на извлечение списка проб тормозов ${dir} направления: ` + error.message);
        return [];
    }
}

async function fetchObservedStations(depot_id) {
    try {
        const uri = `/stations/depot/${depot_id}/observed`;
        const response = await fetch(url + uri);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const stations = await response.json();
        return Array.isArray(stations) ? stations.map(s => s.title) : [];
    } catch(error) {
        console.error(`Ошибка выполнения запроса на извлечение списка проследуемых станций: ` + error.message);
        return [];
    }
}
//.::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
setValueAndColor(s_attendance, 'attendance_date', 'установить');
setValueAndColor(s_series, 'series', 'серия');
setValueAndColor(s_loconumber, 'loconumber', 'номер');
setValueAndColor(s_home_depot, 'home_depot', 'установить');
setValueAndColor(s_brakeshoes, 'brakeshoes', 'количество');
setValueAndColor(s_departure_station, 'departure_station', 'станция отправления');
setValueAndColor(s_arrival_station, 'arrival_station', 'станция прибытия');
setValueAndColor(s_train_number, 'train_number', 'номер');
checkValueStation(s_departure_station, s_train_number, p_departure_traffic_light, 'станция отправления', 'номер');
checkValueStation(s_arrival_station, s_train_number, p_arrival_traffic_light, 'станция прибытия', 'номер');
setValueAndColor(s_train_weight, 'train_weight', 'масса поезда');
setValueAndColor(s_number_of_axis, 'number_of_axis', 'количество осей');
setValueAndColor(s_conditional_length, 'conditional_length', 'условная длина');
setValueAndColor(s_tailcar_number, 'tailcar_number', 'номер хвостового вагона');
setValueAndColor(s_departure_traffic_light, 'departure_traffic_light', '(светофор)');
setValueAndColor(s_arrival_traffic_light, 'arrival_traffic_light', '(светофор)');
setValueAndColor(s_departure_time, 'departure_time', 'время');
setValueAndColor(s_arrival_time, 'arrival_time', 'время');
setValueAndColor(s_train_securing, 'trainSecuring', 'расчёт закрепления');
checkTrafficLightList();
setCheckbox(i_loaded_train, 'checkbox_loaded_train');
setCheckbox(i_selective_braking, 'checkbox_selective_braking');
setRecords(div_brake_test, 'brakeTest_');
setRecords(div_stations_passed, 'observedStation_');
setRecords(div_limits, 'o_limit_');
setRecords(div_stops, 'y_stop_');

function setValueAndColor(element, item, value) {
    element.innerText = sessionStorage.getItem(item) === null ?
        value : sessionStorage.getItem(item);

    element.style.color = element.innerText === value ? 'darkkhaki' :
        (item.includes('time') || item.includes('trainSecuring')) ? '#e8c273' : '#33cd9e';
}

function checkValueStation(stationElement, trainElement, trafficLightElement, defaultStation, defaultTrainNumber) {
    if ((defaultStation !== stationElement.innerText) && (defaultTrainNumber !== trainElement.innerText)) {
        trafficLightElement.classList.toggle('inactive');
    }
}

function checkTrafficLightList() {
    s_departure_station.dataset.id = sessionStorage.getItem('departure_station_id');
    s_arrival_station.dataset.id = sessionStorage.getItem('arrival_station_id');
    departureTrafficLightList = JSON.parse(sessionStorage.getItem('departure_traffic_light_list'));
    arrivalTrafficLightList = JSON.parse(sessionStorage.getItem('arrival_traffic_light_list'));
}

function setCheckbox(element, item) {
    element.checked = JSON.parse(sessionStorage.getItem(item));
}

function setRecords(parent, substring) {
    let keys = Object.keys(sessionStorage);
    for (let key of keys) {
        if (key.includes(substring)) {
            const number = key.slice(substring.length);
            const item = key.replace(number, '');
            const p = createRecord(sessionStorage.getItem(key), number, item);
            const className = substring.substring(0, 2).includes('o_') ?
                'orange-record' : substring.substring(0, 2).includes('y_') ?
                    'yellow-record' : undefined;
            if (className !== undefined) {
                p.classList.add(className);
            }
            parent.appendChild(p);
        }
    }
}

function createRecord(text, counter, item) {
    const p = document.createElement('p');
    p.innerText = text;
    p.classList.add('pre-element');
    p.dataset.id = item + counter;

    const span = document.createElement('span');
    span.classList.add('red-span');
    span.innerText = ' x ';
    span.title = 'удалить';
    span.onclick = async function() {
        const parent = span.parentNode;
        sessionStorage.removeItem(p.dataset.id);
        parent?.remove();
    }
    p.appendChild(span);
    return p;
}

function displayMessage(message, success) {
    if (currentMessageTimerId) {
        clearTimeout(currentMessageTimerId);
    }
    success ? currentMessage.style.color = '#5fa619' : currentMessage.style.color = '#ef3346';
    currentMessage.innerText = message;
    currentMessageTimerId = setTimeout(function() {
        currentMessage.innerText = '\u00A0';
    }, 5000);
}

function setCounterDefault(item) {
    return sessionStorage.getItem(item) === null ?
        0 : sessionStorage.getItem(item);
}

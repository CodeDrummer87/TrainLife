const url = 'http://localhost:8080/api/v1';
let currentMessage = document.getElementById('currentMessage');
let currentMessageTimerId;

let locomotiveSeries = [];
let depots = [];
let allStations = [];
let departureTrafficLightList = [];
let arrivalTrafficLightList = [];

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
    let allocationId = 1;
    try {
        const uri = i_checkbox.checked ? `/${allocationId}/base-station-list` : `/${allocationId}/station-list`;
        const response = await fetch(url + '/stations/allocations' + uri);

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
checkTrafficLightList();

function setValueAndColor(element, item, value) {
    element.innerText = sessionStorage.getItem(item) === null ?
        value : sessionStorage.getItem(item);

    element.style.color = element.innerText === value ? 'darkkhaki' :
        item.includes('time') ? '#e8c273': '#33cd9e';
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

function displayMessage(message, success) {
    if (currentMessageTimerId) {
        clearTimeout(currentMessageTimerId);
    }
    success ? currentMessage.style.color = '#5fa619' : currentMessage.style.color = '#ef3346';
    currentMessage.innerText = message;
    currentMessageTimerId = setTimeout(function() {
        currentMessage.innerHTML = '&nbsp';
    }, 5000);
}

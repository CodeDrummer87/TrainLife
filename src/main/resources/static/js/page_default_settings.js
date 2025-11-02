const stationUrl = 'http://localhost:8080/api/v1/stations/allocations';
let allStations = [];

async function initStations() {
    try {
        allStations = await fetchStations();
    } catch(error) {
        console.error('Ошибка при инициализации станций: ' + error);
    }
}

(() => initStations())();

async function fetchStations() {
    let allocationId = 1;
    try {
        const uri = i_checkbox.checked ? `/${allocationId}/base-station-list` : `/${allocationId}/station-list`;
        const response = await fetch(stationUrl + uri);

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
//.::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
setValueAndColor(s_attendance, 'attendance_date', 'установить');
setValueAndColor(s_series, 'series', 'серия');
setValueAndColor(s_loconumber, 'loconumber', 'номер');
setValueAndColor(s_allocation, 'allocation', 'установить');
setValueAndColor(s_brakeshoes, 'brakeshoes', 'количество');
setValueAndColor(s_departure_station, 'departureStation', 'станция отправления');
setValueAndColor(s_arrival_station, 'arrivalStation', 'станция прибытия');

function setValueAndColor(element, item, value) {
    element.innerText = sessionStorage.getItem(item) === null ?
        value : sessionStorage.getItem(item);

    element.style.color = element.innerText === value ? 'darkkhaki' : '#33cd9e';
}

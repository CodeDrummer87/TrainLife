setValueAndColor(s_attendance, 'attendance_date', 'установить');
setValueAndColor(s_series, 'series', 'серия');
setValueAndColor(s_loconumber, 'loconumber', 'номер');
setValueAndColor(s_allocation, 'allocation', 'установить');
setValueAndColor(s_brakeshoes, 'brakeshoes', 'количество');

//.::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function setValueAndColor(element, item, value) {
    element.innerText = sessionStorage.getItem(item) === null ?
        value : sessionStorage.getItem(item);

    element.style.color = element.innerText === value ? 'burlywood' : '#33cd9e';
}

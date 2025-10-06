setValueAndColor(s_attendance, 'attendance_date', 'установить');
setValueAndColor(s_series, 'series', 'серия');
setValueAndColor(s_loconumber, 'loconumber', 'номер');
setValueAndColor(s_allocation, 'allocation', 'установить');

//.::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function setValueAndColor(element, item, value) {
    element.innerText = sessionStorage.getItem(item) === null ?
        value : sessionStorage.getItem(item);

    if (element.innerText !== value) {
        element.style.color = '#33cd9e';
    }
}

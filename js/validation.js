var activeX = null; // Переменная для активной кнопки X
var activeR = null; // Переменная для активной кнопки R

function setXValue(button) {
    // Проверяем, активна ли уже эта кнопка
    var isActive = button.classList.contains("active");

    // Убираем класс "active" со всех кнопок X
    var xButtons = document.querySelectorAll(".x-button");
    for (var i = 0; i < xButtons.length; i++) {
        xButtons[i].classList.remove("active");
    }

    // Если кнопка была активной, убираем ей класс "active" и завершаем выполнение
    if (isActive) {
        activeX = null;
        specialButton.setAttribute('disabled', 'disabled');
        return;
    }

    // Установите активную кнопку X
    activeX = button;
    activeX.classList.add("active");

    var yValue = document.getElementById('y_param').value;
    isValidData(activeX, activeR, yValue);
}


function setRValue(button) {
    // Проверяем, активна ли уже эта кнопка
    var isActive = button.classList.contains("active");

    // Убираем класс "active" со всех кнопок R
    var rButtons = document.querySelectorAll(".r-button");
    for (var i = 0; i < rButtons.length; i++) {
        rButtons[i].classList.remove("active");
    }

    // Если кнопка была активной, убираем ей класс "active" и завершаем выполнение
    if (isActive) {
        activeR = null;
        specialButton.setAttribute('disabled', 'disabled');
        return;
    }

    // Установите активную кнопку R
    activeR = button;
    activeR.classList.add("active");


    var yValue = document.getElementById('y_param').value;
    isValidData(activeX, activeR, yValue);
}

// Найдите элемент поля Y и кнопку "Ввод параметров"
var yInput = document.getElementById('y_param');
var specialButton = document.getElementById('special-button');

// Добавьте обработчик события input для поля Y
    yInput.addEventListener('input', function() {
    var yValue = yInput.value.replace(',', '.');
    if (isValidY(yValue)) {
        if (isValidData(activeX, activeR, yValue)){
        specialButton.removeAttribute('disabled');}
        yInput.setCustomValidity("");
        yInput.reportValidity();
    } else {
        lengthY(yValue) ? yInput.setCustomValidity("Введите число от -3 до 3")
            : yInput.setCustomValidity("Максимум 15 символов");
        yInput.reportValidity();
        specialButton.setAttribute('disabled', 'disabled');
    }
});



function isValidY(y) {
    // Y должен быть числовым значением и находиться в диапазоне от -3 до 3
    return (!isNaN(y) && isFinite(y) && y >= -3 && y <= 3 && lengthY(y));
}
function lengthY(y){
    return (y.length <= 15);
}

function isValidData(xButton, rButton, y) {
    var xValue = xButton ? parseFloat(xButton.value) : null;
    var rValue = rButton ? parseFloat(rButton.value) : null;

    if (y !== '' && !isNaN(y) && isFinite(y) && y >= -3 && y <= 3 && activeX && activeR) {
        // Валидные данные, активируем кнопку
        document.getElementById('special-button').removeAttribute('disabled');
        return true;
    } else {
        // Невалидные данные, делаем кнопку недоступной
        document.getElementById('special-button').setAttribute('disabled', 'disabled');
        return false;
    }
}

function sendDataToServer() {
    var xValue = activeX ? parseFloat(activeX.value) : null;
    var rValue = activeR ? parseFloat(activeR.value) : null;
    var yValue = document.getElementById('y_param').value.replace(',', '.');

    if (isValidData(activeX, activeR, yValue)) {
        var xhr = new XMLHttpRequest();
        var url = 'php/main.php';
        var params = 'x=' + xValue + '&r=' + rValue + '&y=' + yValue;
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');


        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                // Обновление таблицы на странице
                var data = response.data;
                var table = document.getElementById('table_out');
                for (var i = 0; i < data.length; i++) {
                    var row = table.insertRow(table.rows.length);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);

                    cell1.innerHTML = data[i].x;
                    cell2.innerHTML = data[i].y;
                    cell3.innerHTML = data[i].r;
                    cell4.innerHTML = data[i].result;
                    drawPoint(cell1.innerHTML, cell2.innerHTML, cell3.innerHTML, cell4.innerHTML)
                    cell5.innerHTML = data[i].start_time;
                    cell6.innerHTML = data[i].execution_time;

                }
            }
        };


        xhr.onerror = function() {
            console.error('Ошибка при отправке данных на сервер.');
        };

        xhr.send(params);
    } else {
        console.log('Данные невалидны, отправка отменена.');
    }
}
function drawPoint(x, y, r, result) {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d'); // Получаем контекст canvas

        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;

        // Масштабируем координаты в зависимости от r
        var scaledX = x * 20 * 8 / r;
        var scaledY = - y * 20 * 8 / r;

        result === "Попадание" ? ctx.fillStyle = 'green' : ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(centerX + scaledX, centerY + scaledY, 5, 0, 2 * Math.PI, false); // Радиус точки и координаты (x, y)
        ctx.fill();
    } else {
        console.error('HTML5 Canvas не поддерживается вашим браузером.');
    }
}
function reset() {
    drawGraph()
    var table = document.getElementById('table_out');
    table.innerHTML = ''; // Очистить содержимое таблицы
}

window.onload = function() {
    drawGraph();
};
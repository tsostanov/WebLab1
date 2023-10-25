function drawGraph() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        // Очистим холст
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Нарисуем горизонтальную ось
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        // Нарисуем вертикальную ось
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        ctx.fillStyle = "black";
        // Добавим надписи "X" и "Y" к осям
        ctx.font = "16px Arial"; // Задаем шрифт и размер шрифта
        ctx.textAlign = "end"; // Установим выравнивание текста по концу
        ctx.fillText("X", canvas.width - 10, canvas.height / 2 + 20);
        ctx.textAlign = "start"; // Установим выравнивание текста по началу
        ctx.fillText("Y", canvas.width / 2 + 10, 20);

        // Стрелка по оси X
        ctx.beginPath();
        ctx.moveTo(canvas.width - 10, canvas.height / 2 + 15); // Начальная точка
        ctx.lineTo(canvas.width, canvas.height / 2); // Середина стрелки
        ctx.lineTo(canvas.width - 10, canvas.height / 2 - 15); // Конечная точка
        ctx.stroke();

        // Стрелка по оси Y
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + 15, 10); // Начальная точка
        ctx.lineTo(canvas.width / 2, 0); // Середина стрелки
        ctx.lineTo(canvas.width / 2 - 15, 10); // Конечная точка
        ctx.stroke();

        // Радиус
        var r = 4; // Измените радиус по своему желанию

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);  // Переходим в центр координат
        ctx.lineTo(canvas.width / 2, canvas.height / 2 - 2 * r * 20);  // Верхняя точка (0, 2r)
        ctx.lineTo(canvas.width / 2 + r * 20, canvas.height / 2);  // Правая точка (r, 0)
        ctx.lineTo(canvas.width / 2, canvas.height / 2);  // Замыкаем треугольник
        ctx.fillStyle = "blue";  // Устанавливаем цвет заливки
        ctx.fill();  // Заливаем треугольник
        ctx.stroke();  // Рисуем контур треугольника

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 2 * r * 20, 0.5 * Math.PI, -Math.PI); // Четверть круга
        ctx.lineTo(canvas.width / 2, canvas.height / 2); // Соединяем с центром (0, 0)
        ctx.closePath();
        ctx.fill(); // Закрашиваем
        ctx.stroke(); // Рисуем обводку

        ctx.beginPath(); // Начало новой фигуры (прямоугольника)
        ctx.moveTo(canvas.width / 2, canvas.height / 2); // Перемещение в точку (0, 0)
        ctx.lineTo(canvas.width / 2, canvas.height / 2 - r * 20); // Создание линии до точки (0, r)
        ctx.lineTo(canvas.width / 2 - 2 * r * 20, canvas.height / 2 - r * 20); // Создание линии до точки (-2r, r)
        ctx.lineTo(canvas.width / 2 - 2 * r * 20, canvas.height / 2); //Создание линии до точки (-2r, 0)
        ctx.lineTo(canvas.width / 2, canvas.height / 2); // Замыкание фигуры, возвращение к начальной точке
        ctx.closePath(); // Закрытие фигуры
        ctx.fill();
        ctx.stroke(); // Рисование контура прямоугольника


        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        // Отметки и подписи на горизонтальной оси
        for (var i = 1; i <= 5; i++) {
            var x = (canvas.width / 2) + i * (r * 20); // Шаг в 20 раз больше r
            ctx.beginPath();
            ctx.moveTo(x, canvas.height / 2 - 5);
            ctx.lineTo(x, canvas.height / 2 + 5);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(canvas.width - x, canvas.height / 2 - 5);
            ctx.lineTo(canvas.width - x, canvas.height / 2 + 5);
            ctx.stroke();

            // Подписи для каждого деления
            ctx.fillText(i / 2 + "R", x - 10, canvas.height / 2 + 20);
            ctx.fillText(-i / 2 + "R", canvas.width - x - 10, canvas.height / 2 + 20);
        }

        // Отметки и подписи на вертикальной оси
        for (var i = 1; i <= 5; i++) {
            var y = (canvas.height / 2) - i * (r * 20); // Шаг в 20 раз больше r
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 5, y);
            ctx.lineTo(canvas.width / 2 + 5, y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 5, canvas.height - y);
            ctx.lineTo(canvas.width / 2 + 5, canvas.height - y);
            ctx.stroke();

            // Подписи для каждого деления
            ctx.fillText(i / 2 + "R", canvas.width / 2 - 30, y + 5);
            ctx.fillText(-i / 2 + "R", canvas.width / 2 - 30, canvas.height - y + 5);
        }
    }
}
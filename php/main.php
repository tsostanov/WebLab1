<?php
date_default_timezone_set('Europe/Moscow');

$session_start_time = microtime(true);
// Получите данные, отправленные клиентом
$x = isset($_POST['x']) ? floatval($_POST['x']) : null;
$r = isset($_POST['r']) ? floatval($_POST['r']) : null;
$y = isset($_POST['y']) ? floatval($_POST['y']) : null;

// Проведите ваши проверки данных, валидацию и вычисления
$valid = isValidData($x, $r, $y);
$data = array();

// Если данные прошли валидацию, выполните необходимые вычисления
if ($valid) {
    // Добавьте данные в массив
    $data[] = array(
        'x' => $x,
        'y' => $y,
        'r' => $r,
        'result' => isHit($x, $y, $r) ? 'Попадание' : 'Промах',
        'start_time' => date('Y-m-d H:i:s'),
        'execution_time' => round(microtime(true) - $session_start_time, 7)
    );
} else {
    // Если данные не прошли валидацию, отправьте JSON-ответ с ошибкой
    $response = array(
        'valid' => false,
        'error' => 'Неверные данные'
    );
}
$response['data'] = $data;

// Отправьте JSON-ответ
header('Content-Type: application/json');
echo json_encode($response);

// Завершите выполнение скрипта
exit();

// Функция для валидации данных
function isValidData($x, $r, $y) {
    // Проверка на пустые значения
    if ($x === null || $r === null || $y === null) {
        return false; // Данные не валидны, если хотя бы одно поле не заполнено
    }
    // Проверка на допустимые значения X, R и Y
    if (!isValidX($x) || !isValidR($r) || !isValidY($y)) {
        return false; // Данные не валидны, если не соответствуют допустимым значениям
    }
    return true; // Данные прошли все проверки и валидны
}

function isValidX($x) {
    // Проверка на допустимые значения X
    return is_numeric($x) && $x >= -5 && in_array($x, [-5, -4, -3, -2, -1, 0, 1, 2, 3]); // X должен быть числом и находиться в диапазоне [-5, 5]
}

function isValidR($r) {
    // Проверка на допустимые значения R
    return is_numeric($r) && $r > 0 && in_array($r, [1, 1.5, 2, 2.5, 3]); // R должен быть положительным числом из указанного списка
}

function isValidY($y) {
    // Проверка на допустимые значения Y
    return is_numeric($y) && $y >= -3 && $y <= 3; // Пример: Y должен быть числом и находиться в диапазоне [-3, 3]
}
function isHit($x, $y, $r) {
    if ($x / $r >= 0){
        if ($y / $r >= 0){
            return ($y / $r  <= 1 - 2 *$x / $r);
        }
        else {
            return ($y / $r >= -1 && $x == 0);
        }
    }
    else {
        if ($y / $r >= 0) {
            return ($y / $r <= 0.5 && $x / $r >= -1);
        }
        else {
            return ((pow($y / $r, 2) + pow($x / $r,  2)) <= 1);
        }
    }
}


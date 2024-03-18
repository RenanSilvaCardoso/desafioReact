<?php 
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');
include_once('config.php');
    $rawData = file_get_contents('php://input');
    $data = (array) json_decode($rawData);
    error_log(print_r($data, true));
    $product = $data[0];
    error_log($product);

    $stmt = $myPDO->prepare("DELETE FROM cart WHERE product_name =?")->execute([$product]);
?>
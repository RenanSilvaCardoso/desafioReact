<?php 
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');
include_once('config.php');

    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData);
    $categoryName = $data->category_name;
    $tax = $data->category_tax;
    $query = $myPDO->prepare("INSERT INTO categories VALUES (DEFAULT, :category_name, :tax)");
    $query->bindParam(':category_name', $categoryName, PDO::PARAM_STR);
    $query->bindParam(':tax', $tax, PDO::PARAM_INT);
    $query->execute();
?>
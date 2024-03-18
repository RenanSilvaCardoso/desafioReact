<?php 
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');
include_once('config.php');
    $code = 1;
    $stmt = $myPDO->query("SELECT product_name FROM products WHERE products.code = $code");
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    $productName = $data['product_name'];
    print_r($data);
    print_r($productName);
?>
<?php 
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');
include_once('config.php');
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData);
    $productName = $data->product_name;
    $amount = $data->product_amount;
    $price = $data->product_price;
    $categoryCode = $data->product_category;
    $stmt = $myPDO->prepare("SELECT tax FROM categories WHERE code = ?");
    $stmt->execute([$categoryCode]);
    $tax = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $query = $myPDO->prepare("INSERT INTO products VALUES (DEFAULT, :product_name, :amount, :price, :tax, :category_code)");
    $query->bindParam(':product_name', $productName, PDO::PARAM_STR);
    $query->bindParam(':amount', $amount, PDO::PARAM_INT);
    $query->bindParam(':price', $price, PDO::PARAM_INT);
    $query->bindParam(':tax', $tax['tax'], PDO::PARAM_INT);
    $query->bindParam(':category_code', $categoryCode, PDO::PARAM_INT);
    $query->execute();
?>
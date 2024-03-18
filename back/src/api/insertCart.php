<?php 
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');
include_once('config.php');
    $rawData = file_get_contents('php://input');
    $data = (array) json_decode($rawData);
    $code = $data['product_code'];
    $amount = $data['product_amount'];
    $price = $data['product_price'];
    $tax = $data['product_tax'];
    $total = $data['total'];
    
    $stmt = $myPDO->prepare("SELECT product_name, code FROM products WHERE code=?");
    $stmt->execute([$code]);
    $dados = $stmt->fetch();
    $productName = $dados['product_name'];
    $productCode = $dados['code'];

    $insert = $myPDO->prepare("INSERT INTO cart VALUES (DEFAULT, :code, :product_name, :amount, :price, :tax, :total)");

    $insert->bindParam(':code', $productCode, PDO::PARAM_INT);
    $insert->bindParam(':product_name', $productName, PDO::PARAM_STR);
    $insert->bindParam(':amount', $amount, PDO::PARAM_INT);
    $insert->bindParam(':price', $price, PDO::PARAM_INT);
    $insert->bindParam(':tax', $tax, PDO::PARAM_INT);
    $insert->bindParam(':total', $total, PDO::PARAM_INT);
    $insert->execute();
?>
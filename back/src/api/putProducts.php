<?php 
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');
include_once('config.php');
    $stmt = $myPDO->query("SELECT product_name, amount FROM cart");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach($data as $d){
        include_once('config.php');
        $product = $d['product_name'];
        $amount = $d['amount'];
        $stmt = $myPDO->prepare("SELECT amount FROM products WHERE product_name=?");
        $stmt->execute([$product]);
        $data = $stmt->fetch();
        $newAmount = $data['amount'] - $amount;
        $put = $myPDO->prepare("UPDATE products SET amount=? WHERE product_name=?");
        $put->execute([$newAmount, $product]);
    }
?>
<?php 
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');
include_once('config.php');
    $stmt = $myPDO->query("SELECT * FROM cart");
    $cart = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $tax = 0;
    $total = 0;
    foreach($cart as $c){
        $tax += $c['tax'];
        $total += $c['total'];
    }
    error_log($tax);
    error_log($total);
    $sql = $myPDO->prepare("INSERT INTO orders VALUES (DEFAULT, ?, ?)")->execute([$tax, $total]);
?>
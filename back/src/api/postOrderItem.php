<?php 
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');
include_once('config.php');
    $dt = date("Y-m-d");
    $stmt = $myPDO->query("SELECT COUNT(code), SUM(total) FROM cart");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $items = $data[0]['count'];
    $total = $data[0]['sum'];

    $insert = $myPDO->prepare("INSERT INTO order_item VALUES (DEFAULT, ?,?,?)");
    $insert->execute([$dt, $items, $total]);
?>
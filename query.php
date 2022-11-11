<?php
include "db.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header("Content-type:application/json;utf-charset-8");
    if(isset($_POST['submit'])){
        $date = $_POST['date'];
        $stmt = $pdo->prepare("SELECT * FROM activities INNER JOIN days on activities.id=days.id WHERE days.date=:date");
        $stmt->bindParam(":date",$date);
        $stmt->execute();
        $result = $stmt->fetchAll();
        if($result){
            echo json_encode($result);
        }else{
            echo json_encode("No results");
        }
    }
    
    // $product_name = $decoded['product_name'];
    // $stmt->bindParams(":product_name",$product_name);
    // $stmt = $pdo->query("SELECT * FROM products WHERE product_name = :product_name");
    // $stmt->execute();
    // $results = $stmt->fetch();
    // foreach($results as $result){
    //     echo json_encode($result);
    // }

?>
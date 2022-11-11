<?php
    $host = "localhost";
    $db = "time_tracking";
    $dsn = "mysql:host=$host" . ";dbname=$db";
    $pdo = new PDO($dsn,'root','');
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
?>
<?php 
    class Data {
        public function __construct() {
            $host = "localhost";
            $dbname = "projectdb";
            $username = "root";
            $password = "";

            $dsn = "mysql:host={$host}; dbname={$dbname}";
            $pdo = new PDO($dsn, $username, $password);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
            $this->pdo = $pdo;
        }

        public function getAlbum() {
            $sql = "SELECT * FROM album k ORDER BY year";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        }
    }
?>
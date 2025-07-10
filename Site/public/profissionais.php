<?php
$conn = new mysqli("sql10.freesqldatabase.com", "sql10785803", "841dAKRziR", "sql10785803");
$result = $conn->query("SELECT * FROM profissionais");

$lista = [];
while ($row = $result->fetch_assoc()) {
  $row["imagens"] = json_decode($row["imagens"]);
  $lista[] = $row;
}

echo json_encode($lista);
?>
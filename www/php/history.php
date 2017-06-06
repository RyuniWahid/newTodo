<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "hypermanagerdb");

  $till=10;
  
  if(isset($_GET["till"]) && !empty($_GET["till"]) ){
    $till = $_GET["till"];
    $till = $conn->real_escape_string($till);
  }

  $query="SELECT BPid,BPdate,BPDia,BPpulse FROM bpressure where BPid<=".$till." ";
  
  

$result = $conn->query($query);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"BPid":"'  . $rs["BPid"] . '",';
    $outp .= '"BPdate":"'   . $rs["BPdate"]        . '",';
    $outp .= '"BPDia":"'   . $rs["BPDia"]        . '",';
    $outp .= '"BPpulse":"'   . $rs["BPpulse"]        . '""}';
}


// Adding has more
$result=$conn->query("SELECT count(*) as total from bpressure");
$data=$result->fetch_array(MYSQLI_ASSOC);
$total = $data['total'];

if(($total-$till)>0){$has_more=$total-$till;}
          else{$has_more=0;}
      
        
  $outp ='{"has_more":'.$has_more.',"records":['.$outp.']}';

  
$conn->close();

echo($outp);
?> 
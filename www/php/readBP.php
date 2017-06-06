<?php
	
	//http://stackoverflow.com/questions/18382740/cors-not-working-php
	if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

    $postdata = file_get_contents("php://input");
	if (isset($postdata)) {
		$request = json_decode($postdata);
		$myDate = $request->myDate;
		$systolic = $request->systolic;
		$diastolic = $request->diastolic;
		$pulse = $request->pulse;


$conn = new mysqli("localhost", "root", "", "hypermanagerdb");
		
		// To protect MySQL injection for Security purpose
		/*$name = stripslashes($name);
		$today = stripslashes($today);
		$systolic = stripslashes($systolic);
		$diastolic = stripslashes($diastolic);
		$pulse = stripslashes($pulse);*/
		
		
		$myDate = $conn->real_escape_string($myDate);
		$systolic = $conn->real_escape_string($systolic);
		$diastolic = $conn->real_escape_string($diastolic);
		$pulse = $conn->real_escape_string($pulse);


		$check="SELECT count(*) FROM bpressure WHERE BPid = '$BPid'";
		$rs = mysqli_query($conn,$check);
		$data = mysqli_fetch_array($rs, MYSQLI_NUM);
		//print_r($data);
		if($data[0] > 0) {
			$outp='{"result":{"created": "0" , "exists": "1" } }';
		}
		else{	
			//$sql = "INSERT INTO users VALUES ('', '$username', '$phone', '$password')";	
			$sql = "INSERT INTO bpressure VALUES ('$BPid', '$myDate', '$diastolic', '$systolic', '', '$pulse')";	

			if ($conn->query($sql) === TRUE) {
				$outp='{"result":{"created": "1", "exists": "0" } }';
			} 
		}
		
		//echo $outp;
		echo "success";
		
		$conn->close();	
	
}
?>		
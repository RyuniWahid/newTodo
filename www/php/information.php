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

    //open connection to mysql db
    $connection = mysqli_connect("localhost","username","password","hypermanagerdb") or die("Error " . mysqli_error($connection));

    //fetch table rows from mysql db
    $sql = "select * from detail";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }

    echo json_encode($emparray);

    /*require_once '../includes/information.php'; // The mysql database connection script
	$detailId = '%';
	if(isset($_GET['detailId'])){
	$detailId = $_GET['detailId'];
	}
	$query="select detailId, age from detail where detailId like '$detailId' order by detailId desc";
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
	$arr = array();
	if($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$arr[] = $row;	
		}
	}
	# JSON-encode the response
	echo $json_response = json_encode($arr);

		
		//echo $outp;
		echo "success";
		
		$conn->close();	
	*/
}
?>		
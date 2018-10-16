<?php

$arr = json_decode($_POST['arr']);
$email = $_POST['email'];

$mysqli = mysqli_connect('h809048679.mysql', 'h809048679_mysql', 'j4E/MBHj', 'h809048679_users');

$userdata = mysqli_fetch_assoc(mysqli_query($mysqli, "SELECT * FROM onlifeUsers WHERE email = '$email' LIMIT 1"));

$userdata2 = mysqli_fetch_assoc(mysqli_query($mysqli, "select * from bountyRates "));

$tokens = floatval($userdata['bountyTokens']);

$tk = $tokens;

foreach($arr as $key=>$value) {
    $id1 = explode(',', $key);
    $id2 = $id1[0];
    $id3 = $id1[1];
    mysqli_query($mysqli,"
    	UPDATE `bountyProgram` SET `statusSend` = '$value' WHERE `bountyId` = '$id2' 
    ");
    
    switch($id2) {
        case 'translation':
            $tk = $tk + floatval($userdata2['translation']);
            break;
        case 'ambassador' : 
            $tk = $tk + floatval($userdata2['ambassador']);
            break;
        case 'twitterRT' : 
            $tk = $tk + floatval($userdata2['twitterRT']);
            break;
        case 'facebookFS' : 
            $tk = $tk + floatval($userdata2['facebookFS']);
            break;
        case 'facebookFP' : 
            $tk = $tk + floatval($userdata2['facebookFP']);
            break;
        case 'twitterTW' : 
            $tk = $tk + floatval($userdata2['twitterTW']); 
            break;
        case 'signature' : 
            $tk = $tk + floatval($userdata2['signature']); 
            break;
            
            
    }
    mysqli_query($mysqli,"
    	UPDATE `bountyProgram` SET `statusSend` = '$value' WHERE `bountyId` = '$id2' 
    ");	
    $dtri = date('Y-m-d');
    mysqli_query($mysqli,"
    	UPDATE `bountyProgram` SET `dateAccepted` = '$dtri' WHERE `bountyId` = '$id2' 
    ");	
    
    if ($value === 'accept') {
        $tokens = intval($userdata['bountyTokens']);
      
     
        
        mysqli_query($mysqli,"
        	UPDATE `onlifeUsers` SET `bountyTokens` = '$tk' WHERE `email` = '$email' 
        ");	
        mysqli_query($mysqli,"
        	UPDATE `onlifeUsers` SET `bountyTokens` = '$tk' WHERE `email` = '$email' 
        ");	
    }
}

$response = array(
    'error' => 'ok'
);

echo json_encode($response);
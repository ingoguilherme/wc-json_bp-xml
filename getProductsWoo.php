<?php

	$url = $_POST['url'];
	$ck = $_POST['ck'];
	$cs = $_POST['cs']; 
	$cmd = $_POST['cmd'];

	//=====================================================================

	$httpMethod = "GET";
	$requestURL = $url; //"http://newexportec.com.br/wp-json/wc/v2/products";
	$date = new DateTime();
	$timestamp = $date->getTimestamp();
	$consumerKey = $ck; //"ck_c9ecaf187b04d41d88e4f0abeac7887a63cb2a90";
	$consumerSecretKey = $cs; //"cs_e59bf3bc088ebc65fc7e0206652361007d338a7a";
	$signatureMethod = "HMAC-SHA1";
	$version = "1.0";

	$params = array(
		"oauth_consumer_key" => $consumerKey,
		"oauth_timestamp" => $timestamp,
		"oauth_signature_method" => $signatureMethod,
		"oauth_nonce" => substr(md5($timestamp), 0, 6),
		"oauth_version" => $version
	);

	if($cmd != ""){
		$cmd = trim($cmd);
		$cmds = explode('&', $cmd);

		foreach ($cmds as $key) {
			$key = explode('=', $key);
			$params[ $key[0] ] = $key[1];
		}
	}

	foreach ($params as $key => $value) {
		$key = rawurlencode($key);
		$value = rawurlencode($value);
	}

	uksort($params, 'strcmp');

	$parameterString = "";

	$counter = 0;
	foreach ($params as $key => $value) {
		$parameterString .= $key . "=" . $value;

		if($counter < (count($params) - 1)){
			$parameterString .= "&"; 
		}

		$counter++;
	}	

	$signatureBaseString = $httpMethod . "&" . rawurlencode($requestURL) . "&" . rawurlencode($parameterString);
	
	$hashAlgorithm = strtolower(str_replace('HMAC-', '', $signatureMethod));
	$secret = $consumerSecretKey . '&';
	$signature = base64_encode( hash_hmac($hashAlgorithm, $signatureBaseString, $secret, true));

	ini_set("allow_url_fopen", 1);

	$productsJsonURL = $requestURL . "?" . $parameterString . "&oauth_signature=" . $signature;

	$json = file_get_contents($productsJsonURL);
	$obj = json_decode($json);
	
	echo $json;
?>
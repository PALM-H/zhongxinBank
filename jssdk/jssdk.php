<?php
/*************************************************
==================================================

	data/jssdk.php?url=提交页面的路径
	注意提交的路径，路径是调用JS-SDK的页面路径，包括？后面的参数，但不包括hash的内容
	return {appid,timestamp,nonecStr,signature}
==================================================
**************************************************/

//在这里设置你的APPID，AppSecret
$appid = "wx260971a15ae00050";
$secret ="bea7d4b21ddacbe7e7c036be3d5ac85d";

//设置APPID和APPSecret常量
define("APPID",$appid);
define('SECRET', $secret);
//获取参数url
$url = $_GET["url"];
//调用自定义函数，返回含所需参数的json对象
echo sendJson($url);

function sendJson($url){
	//调用自定义函数getTicket，获取ticket
	$ticketTokenApi = getTicket();
    $timestamp = time();
	//调用自定义函数getHttp，获取nonceStr
    $nonceStr = createNonceStr();
    $string = "jsapi_ticket=$ticketTokenApi&noncestr=$nonceStr&timestamp=$timestamp&url=$url";
    $signature = sha1($string);
	$data = array(
		"appId"=> APPID,
		"timestamp"=>$timestamp,
		"nonceStr"=>$nonceStr,
		"signature"=>$signature
	);
	return json_encode($data);
}

function getTicket(){
	//读取ticket.json文件，获取ticket信息
	$data = json_decode(file_get_contents("ticket.json"));
	//判断ticket是否过期
	if($data->time < time()){
		//调用自定义函数getAccess，获取access
		$accessToken = getAccess();
		$url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
		//获取ticket
		$res = json_decode(getHttp($url));
		$ticket = $res->ticket;
		if($ticket){
			$data->ticket = $ticket;
			$data->time = time()+7000;
//			chmod("ticket.json",0755);
			$fp = fopen("ticket.json","w");
			fwrite($fp, json_encode($data));
			fclose($fp);
		}
	}else{
		$ticket = $data->ticket;
	}
	return $ticket;
}

function getAccess(){
	$data = json_decode(file_get_contents("access.json"));
	if($data->time < time()){
		$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".APPID."&secret=".SECRET;
		//调用自定义函数getHttp，获取access
		$res = json_decode(getHttp($url));
		$access = $res->access_token;
		if($access){
			$data->access = $access;
			$data->time = time()+7000;
//			chmod("access.json",0755);
			$fp = fopen("access.json","w");
			fwrite($fp, json_encode($data));
			fclose($fp);
		}
	}else{
			$access = $data->access;
	}
	return $access;
}

function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
      $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
  }

function getHttp($url) {
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_TIMEOUT, 500);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($curl, CURLOPT_URL, $url);
	$res = curl_exec($curl);
	curl_close($curl);
	return $res;
}

?>
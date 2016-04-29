<?php
$key = '595c4eb9bf3cd1c3f3f8c0e936158acf';
$id  = $_GET['id'];

$url = 'https://api.uwaterloo.ca/v2/blogs/waterloo-innovation-summit/'.$id.'.json?key='.$key;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPGET, 1);

$response = curl_exec($ch);

$data = json_decode($response);
$data->data->title = htmlspecialchars($data->data->title);
$data->data->description = htmlspecialchars($data->data->description);

echo json_encode($data);

die();

<?php
$key = '7781d9959b0c3633c13355196f391062';
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

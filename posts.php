<?php
$key = '595c4eb9bf3cd1c3f3f8c0e936158acf';
$url = 'https://api.uwaterloo.ca/v2/blogs/waterloo-innovation-summit.json?key='.$key;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPGET, 1);

$response = curl_exec($ch);

$data = json_decode($response);

for ($i = 0; $i < count($data->data); $i++) {
  $data->data[$i]->title = htmlspecialchars($data->data[$i]->title);
  $data->data[$i]->teaser = htmlspecialchars($data->data[$i]->teaser);
}

echo json_encode($data);

die();

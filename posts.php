<?php
$key = '7781d9959b0c3633c13355196f391062';
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

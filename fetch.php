<?php

if(isset($_POST['request'])){

    $user = "alext123";
    $pass = "hsltest";

    $request = $_POST['request'];
    $format = $_POST['format'];
    $code = $_POST['code'];

    $url = "http://api.reittiopas.fi/hsl/prod/?request=" . $request . "&user=" . $user . "&pass=" . $pass . "&format=" . $format . "&code=" . $code;

    $data = file_get_contents($url);

    echo $data;
}else{
  die();
}

?>

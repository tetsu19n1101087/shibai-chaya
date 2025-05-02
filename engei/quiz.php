<?php
$host     = 'mysql12012.xserver.jp'; // データベースのホスト名又はIPアドレス
$username = 'xs516593_blockb';  // MySQLのユーザ名
$passwd   = 'C6wsYdzH';    // MySQLのパスワード
$dbname   = 'xs516593_blockb';    // データベース名

$link = mysqli_connect($host, $username, $passwd, $dbname);

if (isset($_POST['questionNumber'])) {
  $questionNumber = $_POST['questionNumber'];
  $answer = $_POST['answer'];
  if ($link) {
    // 文字化け防止
    mysqli_set_charset($link, 'utf8');
  
    $query = "UPDATE answers SET btn{$answer} = btn{$answer} + 1 WHERE question = {$questionNumber}";
  
    // クエリを実行します
     if (mysqli_query($link, $query) === TRUE) {
        print '成功';
    } else {
        print '失敗';
    }
  
    // 接続を閉じます
    mysqli_close($link);
  
  // 接続失敗した場合
  } else {
    print 'DB接続失敗';
  }
}
if (isset($_POST['value'])) {
  $value = $_POST['value'];

  if ($link) {
    // 文字化け防止
    mysqli_set_charset($link, 'utf8');
  
    $query = "SELECT * FROM answers";
  
    // クエリを実行します
    $result = mysqli_query($link, $query);

    header('Content-Type: application/json');
    
    $num = 1;
    $array = [];
    while ($row = mysqli_fetch_array($result)) {
      $obj = (["q{$num}" => ['btn1' => intval($row['btn1']), 'btn2' => intval($row['btn2']), 'btn3' => intval($row['btn3'])]]);
      //echo json_encode($obj);
      $num += 1;
      $array = $array + $obj;
    }
    //var_dump($array);
    echo json_encode($array);

    // 結果セットを開放します
    mysqli_free_result($result);

    // 接続を閉じます
    mysqli_close($link);
  
  // 接続失敗した場合
  } else {
    print 'DB接続失敗';
  }
};

?>
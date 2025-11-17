<?php
// セッションから送信されたデータを取得
$name = $_SESSION['name'];
$gender = $_SESSION['gender'];
$organization = $_SESSION['organization'];
$address = $_SESSION['address'];
$phone = $_SESSION['phone'];
$email = $_SESSION['email'];
$category = $_SESSION['category'];
$message = $_SESSION['message'];

// 完了メッセージの生成
$message = <<<EOT
お問い合わせありがとうございました。<br>
人工知能フォーラムへのお問い合わせを受け付けました。<br>
返信していただいたメールアドレス宛に、<br>
内容確認のメールを送信しましたので、ご確認ください。

EOT;

// 完了ページの表示
echo <<<EOT
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>AIサンプル</title>
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <title>人工知能フォーラム || 完了ページ</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/form.js"></script>

</head>

<div id="particles-js"></div>
<!-- Include header.ssi -->
<!--#include virtual="header.ssi"-->
<div id="wrapper">

    <div class="contact-form">
        <div class="form-main-block">
            <h1>お問い合わせ完了</h1>
        </div>
<div class="form-complete">
<p>{$message}</p>


    </div>
    <div class="form-confirm-button">
    <button type="button" onclick="location.href='../index.html'">戻る</button>
        </div>
</div>
<!-- Include footer.ssi -->
<!--#include virtual="footer.ssi"-->
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script src="js/particle.js"></script>
</body>

</html>

EOT;
?>

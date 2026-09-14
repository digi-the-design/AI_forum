<?php
session_start();

// セッションからデータを取得
$furigana = $_SESSION['furigana'];
$name = $_SESSION['name'];
$gender = $_SESSION['gender'];
$organization = $_SESSION['organization'];
$full_address = $_SESSION['full_address'];
$phone = $_SESSION['phone'];
$email = $_SESSION['email'];
$category = $_SESSION['category'];
$message = $_SESSION['message'];
$upload_file = isset($_SESSION['upload_file']) ? $_SESSION['upload_file'] : null;
$upload_error = isset($_SESSION['upload_error']) ? $_SESSION['upload_error'] : null;

// 性別テキストの生成
$gender_text = ($gender === 'male') ? '男性' : '女性';

// お問い合わせ分類をカンマ区切りの文字列に変換
if (is_array($category)) {
    $category_text = implode(', ', $category);
} else {
    $category_text = '';
}

// データ表示
echo <<<EOT
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>人工知能フォーラム || お問い合わせフォーム</title>
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/form.js"></script>
</head>
<body>
<div id="particles-js"></div>
<!-- Include header.ssi -->
<!--#include virtual="header.ssi"-->
<div id="wrapper">
    <div class="contact-form">
        <div class="form-main-block">
            <h1>お問い合わせ内容確認</h1>
        </div>
        <div class="form-confirm">
         <div class="form-confirm-block">
                <p>フリガナ:</p>
                <p>{$furigana}</p>
            </div>
            <div class="form-confirm-block">
                <p>お名前:</p>
                <p>{$name}</p>
            </div>
            <div class="form-confirm-block">
                <p>性別:</p>
                <p>{$gender_text}</p>
            </div>
            <div class="form-confirm-block">
                <p>団体・会社名:</p>
                <p>{$organization}</p>
            </div>
            <div class="form-confirm-block">
                <p>住所:</p>
                <p>{$full_address}</p>
            </div>
            <div class="form-confirm-block">
                <p>電話番号:</p>
                <p>{$phone}</p>
            </div>
            <div class="form-confirm-block">
                <p>メールアドレス:</p>
                <p>{$email}</p>
            </div>
            <div class="form-confirm-block">
                <p>お問い合わせ分類:</p>
                <p>{$category_text}</p>
            </div>
            <div class="form-confirm-block">
                <p>お問い合わせ内容:</p>
                <p>{$message}</p>
            </div>
EOT;

if ($upload_file) {
    echo <<<EOT
            <div class="form-confirm-block">
                <p>アップロードファイル:</p>
                <p><a href="{$upload_file}" target="_blank">{$upload_file}</a></p>
            </div>
EOT;
} elseif ($upload_error) {
    echo <<<EOT
            <div class="form-confirm-block">
                <p>エラー:</p>
                <p>{$upload_error}</p>
            </div>
EOT;
}

echo <<<EOT
            <div class="form-confirm-button">
                <form action="complete.php" method="post" class="confirm">
                    <button type="submit">送信</button>
                    <button type="button" onclick="history.back()">戻る</button>
                </form>
            </div>
        </div>
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
<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = $_FILES['file']; // ファイルアップロード

    // ファイルアップロードのエラーチェック
    if ($file['error'] === UPLOAD_ERR_OK) {
        // ファイルを一時的に保存
        $upload_dir = 'uploads/';
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }
        $upload_file = $upload_dir . basename($file['name']);
        if (move_uploaded_file($file['tmp_name'], $upload_file)) {
            // ファイルパスをセッションに保存
            $_SESSION['upload_file'] = $upload_file;
        } else {
            $_SESSION['upload_error'] = "ファイルのアップロードに失敗しました。";
        }
    } else {
        $_SESSION['upload_error'] = "ファイルのアップロード中にエラーが発生しました。";
    }

    // 他のフォームデータもセッションに保存
    $_SESSION['furigana'] = $_POST['furigana'];
    $_SESSION['name'] = $_POST['name'];
    $_SESSION['gender'] = $_POST['gender'];
    $_SESSION['organization'] = $_POST['organization'];
    $_SESSION['full_address'] = $_POST['full_address'];
    $_SESSION['phone'] = $_POST['phone'];
    $_SESSION['email'] = $_POST['email'];
    $_SESSION['category'] = $_POST['category'];
    $_SESSION['message'] = $_POST['message'];

    // confirm.phpにリダイレクト
    header('Location: confirm.php');
    exit;
}
?>
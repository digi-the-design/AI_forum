"use server"; // ServerActionsを使用するための宣言

<<<<<<< HEAD
// ⬛︎ 全体の流れ
// ①interface ContactFormDataで先にプロパティ名とデータ型定義を作成
// ②createContactData()関数処理
// 実際に送られて来るプロパティ名とデータ型をContactFormData変数（データルール）と照合
// ③rawFormData変数に照合済みデータが格納されhubspotに送信

// データが渡る順番
// createContactData　クライアント側からformData()を受け取る
// rawFormData　受け取ったデータ型・プロパティ名を照合チェック
// JSON.stringify　HubSpot用のフォームに合わせてデータを変換（シリアライズ）
// result HubSpotサーバーへリクエストを送信し、応答を待つ（await fetch()）
// try catch　エラーチェック
// await result.json();でfetchリクエストの結果をjson形式で解析（パース）する
// return　tryがtrueでうまく送信できたら成功メッセージstatus: "success"をクライアント側に返す

// ⬛︎ rawFormDataの型定義
// interfaceでContactFormData変数のプロパティとデータ型をルール化
interface ContactFormData {
  furigana: string;
  lastname: string;
  seibetsu: string;
  company: string;
  zip: string;
  juusho: string;
  tatemonomei: string;
  heyabangou: string;
  phone: string;
  email: string;
  category: string[];
  message: string;
}

// ⬛︎ createContactData()関数は、formDataを受け取り、HubSpotに送信するサーバーアクション関数
// _prevState変数: any（型チェック無効化:どんな型でも可能）
// formData変数: FormData（JS/TS標準のFormDataクラス型）
// ⬛︎ confirmから受け取ったFormDataはブラウザ等標準装備の型（BuildIn Type）引数として使用
export async function createContactData(_prevState: any, formData: FormData) {
  // rawFormData変数にContactFormDataでルール化したデータ型・プロパティと照合
  const rawFormData: ContactFormData = {
    // formのname属性から受け取った値をformData.get()で取り出し
    // それぞれのキーに値として設定しさらに型定義
    furigana: (formData.get("furigana") as string) || "",
    lastname: (formData.get("lastname") as string) || "",
    seibetsu: (formData.get("seibetsu") as string) || "",
    company: (formData.get("company") as string) || "",
    zip: (formData.get("zip") as string) || "",
    juusho: (formData.get("juusho") as string) || "",
    tatemonomei: (formData.get("tatemonomei") as string) || "",
    heyabangou: (formData.get("heyabangou") as string) || "",
    phone: (formData.get("phone") as string) || "",
    email: (formData.get("email") as string) || "",
    category: formData.getAll("category") as string[],
    message: (formData.get("message") as string) || "",
  };

  // ⬛︎ HubSpotのフォームに送信するためのfetchリクエストを作成
  const result = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`,
    {
      method: "POST",
=======
// ⬛︎ メールアドレスの形式が有効かどうかを検証する関数
// 受け取ったemailが正しい形式である場合はtrueを返し、そうでない場合はfalseを返す
// 正規表現を変数patternに格納し、test(引数)メソッドを使用して、emailが正規表現に一致するかどうかを判定する
// 引数① email: stringは、検証するメールアドレスを受け取るための引数で、string型で定義されている
function validateEmail(email: string) {
  // 正規表現: ユーザー名 + @ドメイン名 + .(ドメイン種類)
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // test()メソッドで、メールアドレスが正規表現に一致するかどうか判定を行い、結果を返す
  return pattern.test(email);
}
// ⬛︎ createContactData()関数は、formDataを受け取り、HubSpotに送信するサーバーアクション関数
export async function createContactData(_prevState: any, formData: FormData) {
  // 引数① _prevState: anyは、前回の状態を受け取るための引数で、（不使用アンダースコア）any型で定義
  // 引数② formData: FormDataは、フォームのデータを受け取るための引数で、FormData型で定義されている

  // formのname属性ごとにformData.get()で値を取り出すことができる
  const rawFormData = {
    lastname: formData.get("lastname") as string,
    firstname: formData.get("firstname") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  // ⬛︎ if(!rawFormData.name属性)で値が空かどうかを判定  値が空の場合、エラーメッセージを返す
  // name属性:lastname
  if (!rawFormData.lastname) {
    return {
      status: "error",
      message: "姓を入力してください",
    };
  }
  // name属性:firstname
  if (!rawFormData.firstname) {
    return {
      status: "error",
      message: "名を入力してください",
    };
  }
  // name属性:company
  if (!rawFormData.company) {
    return {
      status: "error",
      message: "会社名を入力してください",
    };
  }
  // name属性:email
  if (!rawFormData.email) {
    return {
      status: "error",
      message: "メールアドレスを入力してください",
    };
  }
  // validateEmail関数を使用して、メールアドレスの形式が正しいかどうかを判定する
  if (!validateEmail(rawFormData.email)) {
    return {
      status: "error",
      message: "メールアドレスの形式が誤っています",
    };
  }
  // name属性:message
  if (!rawFormData.message) {
    return {
      status: "error",
      message: "メッセージを入力してください",
    };
  }

  // ⬛︎ HubSpotのフォームに送信するためのfetchリクエストを作成
  // HubSpotのフォームに送信するためのURLを作成し、fetchメソッドでPOSTリクエストを送信する
  const result = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`,

    // ⬛︎ fetchオプション設定
    // method: リクエストメソッド設定
    // headers: HTTPヘッダープロパティ：送信データタイプ設定
    // body: HubSpotに送信するデータ設定

    {
      // methodをPOSTに設定
      method: "POST",
      // headersにContent-Typeを設定
>>>>>>> 40c3be1403b976f1fb3415aeb900f6c88a98bf4a
      headers: {
        "Content-Type": "application/json",
      },

      // ⬛︎ HubSpotのフォームに送信するためのデータを設定
<<<<<<< HEAD
      body: JSON.stringify({
        fields: [
          {
            objectTypeId: "0-1",
            name: "furigana",
            // rawFormDataから値を取得
            value: rawFormData.furigana,
          },
          {
            objectTypeId: "0-1",
            name: "lastname",
            value: rawFormData.lastname,
          },
          {
            objectTypeId: "0-1",
            name: "seibetsu",
            value: rawFormData.seibetsu,
          },
=======
      // body（fetchメソッドの持つプロパティ名）の値にJSON形式で送信するデータを設定
      // stringify()メソッドでJavaScriptオブジェクトをJSON文字列に変換
      body: JSON.stringify({
        // fields配列内に各フォーム項目（姓、名、会社名、メールアドレス、メッセージ）とその値を設定
        fields: [
          // 以下javaScriptオブジェクト{}で各フォーム項目の情報を設定
          // 姓
          {
            // HubSpotフォームの各項目のIDを設定
            objectTypeId: "0-1",
            // HubSpotフォームの各項目のname属性を設定
            name: "lastname",
            // HubSpotフォームの各項目の値を設定
            value: rawFormData.lastname,
          },
          // 名
          {
            objectTypeId: "0-1",
            name: "firstname",
            value: rawFormData.firstname,
          },
          // 会社名
>>>>>>> 40c3be1403b976f1fb3415aeb900f6c88a98bf4a
          {
            objectTypeId: "0-1",
            name: "company",
            value: rawFormData.company,
          },
<<<<<<< HEAD
          {
            objectTypeId: "0-1",
            name: "zip",
            value: rawFormData.zip,
          },
          {
            objectTypeId: "0-1",
            name: "juusho",
            value: rawFormData.juusho,
          },
          {
            objectTypeId: "0-1",
            name: "tatemonomei",
            value: rawFormData.tatemonomei,
          },
          {
            objectTypeId: "0-1",
            name: "heyabangou",
            value: rawFormData.heyabangou,
          },
          {
            objectTypeId: "0-1",
            name: "phone",
            value: rawFormData.phone,
          },
=======
          // メールアドレス
>>>>>>> 40c3be1403b976f1fb3415aeb900f6c88a98bf4a
          {
            objectTypeId: "0-1",
            name: "email",
            value: rawFormData.email,
          },
<<<<<<< HEAD
          {
            objectTypeId: "0-1",
            name: "category",
            value: rawFormData.category.join(";"),
          },
=======
          // メッセージ
>>>>>>> 40c3be1403b976f1fb3415aeb900f6c88a98bf4a
          {
            objectTypeId: "0-1",
            name: "message",
            value: rawFormData.message,
          },
        ],
      }),
    },
  );

<<<<<<< HEAD
  // ⬛︎ try-catch文を使用して、エラーチェック
  try {
    // fetchリクエストの結果をjson形式で取得
    await result.json();
  } catch (e) {
    // エラーが発生した場合はエラーメッセージを返す
    console.log(e);
=======
  // ⬛︎ try-catch文を使用して、fetchリクエストの結果をjson形式で取得し、エラーが発生した場合はエラーメッセージを返す
  try {
    // result.json()で、fetchリクエストの結果をjson形式で取得する
    await result.json();
    // catch文でエラーが発生した場合、console.log(e)でエラー内容を出力し、エラーメッセージを返す
  } catch (e) {
    // コンソールに出力
    console.log(e);
    // エラーメッセージを返す
>>>>>>> 40c3be1403b976f1fb3415aeb900f6c88a98bf4a
    return {
      status: "error",
      message: "お問い合わせに失敗しました",
    };
  }

  // ⬛︎ 正常に送信できた場合、ステータスとメッセージを返す
  return { status: "success", message: "OK" };
}

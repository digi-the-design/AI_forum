"use server"; // ServerActionsを使用するための宣言

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
      headers: {
        "Content-Type": "application/json",
      },

      // ⬛︎ HubSpotのフォームに送信するためのデータを設定
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
          {
            objectTypeId: "0-1",
            name: "company",
            value: rawFormData.company,
          },
          // メールアドレス
          {
            objectTypeId: "0-1",
            name: "email",
            value: rawFormData.email,
          },
          // メッセージ
          {
            objectTypeId: "0-1",
            name: "message",
            value: rawFormData.message,
          },
        ],
      }),
    },
  );

  // ⬛︎ try-catch文を使用して、fetchリクエストの結果をjson形式で取得し、エラーが発生した場合はエラーメッセージを返す
  try {
    // result.json()で、fetchリクエストの結果をjson形式で取得する
    await result.json();
    // catch文でエラーが発生した場合、console.log(e)でエラー内容を出力し、エラーメッセージを返す
  } catch (e) {
    // コンソールに出力
    console.log(e);
    // エラーメッセージを返す
    return {
      status: "error",
      message: "お問い合わせに失敗しました",
    };
  }

  // ⬛︎ 正常に送信できた場合、ステータスとメッセージを返す
  return { status: "success", message: "OK" };
}

"use server"; // ServerActionsを使用するための宣言

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
      headers: {
        "Content-Type": "application/json",
      },

      // ⬛︎ HubSpotのフォームに送信するためのデータを設定
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
          {
            objectTypeId: "0-1",
            name: "company",
            value: rawFormData.company,
          },
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
          {
            objectTypeId: "0-1",
            name: "email",
            value: rawFormData.email,
          },
          {
            objectTypeId: "0-1",
            name: "category",
            value: rawFormData.category.join(";"),
          },
          {
            objectTypeId: "0-1",
            name: "message",
            value: rawFormData.message,
          },
        ],
      }),
    },
  );

  // ⬛︎ try-catch文を使用して、エラーチェック
  try {
    // fetchリクエストの結果をjson形式で取得
    await result.json();
  } catch (e) {
    // エラーが発生した場合はエラーメッセージを返す
    console.log(e);
    return {
      status: "error",
      message: "お問い合わせに失敗しました",
    };
  }

  // ⬛︎ 正常に送信できた場合、ステータスとメッセージを返す
  return { status: "success", message: "OK" };
}

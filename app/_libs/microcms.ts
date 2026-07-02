// ⬛︎ microCMS SDKを使用して、APIからデータを取得するcreateClient関数を定義
import { createClient } from "microcms-js-sdk";
// MicroCMSQueries, MicroCMSImage, MicroCMSListContentは、microcms-js-sdkからインポートした型定義
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

// ⬛︎ TypeScript型定義
// Member型定義
export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent; // Member型は、name, position, profile, imageプロパティを持ち、さらにMicroCMSListContent型のプロパティも含む

// Category型定義
export type Category = {
  name: string;
} & MicroCMSListContent; // Category型は、nameプロパティを持ち、さらにMicroCMSListContent型のプロパティも含む

// News型定義
export type News = {
  //id: string;
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent; // News型は、title, description, content, categoryプロパティを持ち、さらにMicroCMSListContent型のプロパティも含む
//　以下NewList/index.tsxで使用している引数名articleと各キープロパティ
// article.id
// article.title
// article.description
// article.content
// article.thumbnail
// article.category

// .env.localファイルから環境変数DOMAINを取得し、必要な環境変数が存在しない場合はエラーをスロー
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}
// .env.localファイルから環境変数API_KEYを取得し、必要な環境変数が存在しない場合はエラーをスロー
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}
// createClient関数を使用して、microCMSクライアント（ドメイン/APIキー）を作成し格納
const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "gamnmsnxo6",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

// ⬛︎ APIからメンバーのリストを取得する関数を定義
// asyncで非同期関数を定義し、引数queriesはMicroCMSQueries型でオプション
export const getMembersList = async (queries?: MicroCMSQueries) => {
  // awaitで非同期処理を待ち、取得したデータをlistDataに格納
  // microCMS SDKのgetListメソッドで、microCMSのAPIからデータを非同期通信で取得
  // <Member>は、取得するデータの型を指定している：上段で型定義したMember型を使用
  const listData = await client.getList<Member>({
    // APIのエンドポイントを指定
    endpoint: "members",
    // クエリパラメータを指定
    queries: {
      fields: "id,position,profile,image,name", //取得するフィールドを指定
      ...queries, //呼び出し側の条件を反映(limit, offset, orders, filtersなど)
      // customRequestInit: { cache: "no-store",},
    },
  });
  return listData;
  // ⬛︎ APIからデータを取得する一連の流れを説明
  // ① 外部（呼び出し元：アプリ側）10件だけください」という注文を出す(members.tsxファイル記述)
  // ② getMembersList（アプリ側）注文（queries）を呼び出し元①から受け取る
  // ③ client.getList<Member>（アプリ側）endpoint:members 条件:queries　→ 注文（queries）をAPIに届ける
  // ④ microCMS（API 側）queriesを解釈・データベースを検索・条件に合うデータをJSONで返す
  // ⑤ client.getList<Member>（アプリ側）返ってきた JSONにMember型を適用・型安全なlistDataを作る
  // ⑥ 呼び出し元（アプリ側）listData を使って画面表示など

  // ⬛︎ async/awaitに対する説明
  // async API側（外部）に注文を出す非同期処理を含む関数を定義
  // await 返信を待つ(Promiseに結果が入るまで)　その間に他の処理が作動（非同期処理）
  // await client.getList<Member>()　microCMSから返信が届いたら、次の処理をする
};

// ⬛︎ APIからニュースのリストを取得する関数を定義
export const getNewsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<News>({
    endpoint: "news",
    queries: {
      //APIのクエリパラメータを追加取得（fields, draftKey...）
      fields: "id,title,thumbnail,category,name,publishedAt", //取得するフィールドを指定
      ...queries, //呼び出し側の条件を反映(limit, offset, orders, filtersなど)
    },
  });
  return listData;
};

// ⬛︎ APIからニュース記事の「詳細1件」を取得する関数
export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const detailData = await client.getListDetail<News>({
    endpoint: "news", //microcmsからどのデータを取るか
    contentId, //取得する記事のID
    queries: {
      fields: "id,title,content,thumbnail,category,name,publishedAt", //取得するフィールドを指定
    },
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });
  return detailData;
};

// ⬛︎ microcmsから記事データを取得する関数一覧
// getList リスト型コンテンツの「一覧（複数件）」を取得
// getListDetail リスト型コンテンツの「詳細1件」を取得
// get シングル型コンテンツを取得

// ⬛︎ params.idに不正な値が入った場合のエラー処理
export const getCategoryList = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const listData = await client.getListDetail<Category>({
    endpoint: "categories", //microcmsからどのデータを取るか
    contentId, //取得する記事のID
    queries: {
      fields: "name", //取得するフィールドを指定
      ...queries, //呼び出し側の条件を反映(limit, offset, orders, filtersなど)
    },
    //customRequestInit: {cache: "no-store", //詳細ページ側にもこれを適用},
  });
  return listData;
};

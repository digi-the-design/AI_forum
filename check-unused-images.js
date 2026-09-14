// check-unused-images.js (CommonJS版)
const fs = require("fs");
const path = require("path");

const IMG_DIR = "./public/img";
const SRC_DIRS = ["./app", "./components", "./src"]; // 必要に応じて追加

function searchInDir(dir, keyword) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (searchInDir(fullPath, keyword)) return true;
    } else {
      const content = fs.readFileSync(fullPath, "utf8");
      if (content.includes(keyword)) return true;
    }
  }

  return false;
}

function checkUnusedImages() {
  const images = fs.readdirSync(IMG_DIR);

  console.log("🔍 Checking unused images...\n");

  images.forEach((img) => {
    let used = false;

    for (const dir of SRC_DIRS) {
      if (fs.existsSync(dir) && searchInDir(dir, img)) {
        used = true;
        break;
      }
    }

    if (!used) {
      console.log(`❌ 未使用: ${img}`);
    } else {
      console.log(`✔ 使用中: ${img}`);
    }
  });
}

checkUnusedImages();

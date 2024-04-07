import * as fs from "node:fs";
import { marked } from "marked";
// node MdtoHTML markdown inputfile outputfile

//process.argv[i]でコマンドライン引数を取得することができる。

if(process.argv.length < 5){
    console.error("コマンドラインの引数の数が違います。");
    process.exit(1);
} else if(process.argv[2] != "markdown"){
    console.warn("このプログラムのコマンドは\"markdown\"しか対応していません。");
    process.exit(1);
}

const markdownFileName = process.argv[3];
let html;

try{
    let markdownFile = fs.readFileSync(markdownFileName, { encoding : "utf8" });
    html = marked.parse(markdownFile);
}catch(err) {
    console.error(err.message);
    process.exit(1);
};

const htmlFile = process.argv[4];

fs.writeFile(htmlFile, html, (err) => {
    if(err){
        console.error("書き込みに失敗しました。");
        process.exit(1);
    } else {
        console.log("HTMLへの変換が成功しました。");
    }
});


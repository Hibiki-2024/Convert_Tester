// Unicode エスケープ変換関数 ChatGPT製
function CTE16(input) {
    // 入力文字列全体をループして文字コードを変換
    return input.split('').map(char => {
        const codePoint = char.codePointAt(0);
        return '\\u' + ('0000' + codePoint.toString(16)).slice(-4);
    }).join('');
}

// 暗号鍵生成関数 ChatGPT製
function getFairRandomNumber() {
    const maxValid = 4294967296 - (4294967296 % 9794); // 4294967296 は 2^32
    let num;
    do {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        num = array[0]; // 0 ~ 4294967295
    } while (num >= maxValid); // 不公平な範囲を再抽選
    return num % 9794; // 0 ~ 9793
}

const ConvKey = getFairRandomNumber();

const TestText = "あいうえ音楽\nこんこんきーつね\n\nステラsteller⭐️";

//メイン処理を非同期関数として定義
async function main(input, key) {
    // ユニコード変換
    const Intext = CTE16(input);
    //入力を2文字ごとに分割
    const splitText = Intext.match(/.{1,2}/g);

    //配列を展開
    let splitconvert = splitText.map(item => {
        if (item === '\\u') {
            return 256; // \\uは256に置き換え
        } else {
            // \\u以外は16進数→10進数に変換
            return parseInt(item, 16);
        }
    });
    console.log(Intext);
    console.log(splitText);
    console.log(splitconvert);

    // 変換表のロード完了を待ってから実行
    await window.convLoaderReady;
    let result = await ConversionLoader.convertMultiple(splitconvert, key);
    console.log(result);
    console.log(result.join(''));
    console.log(key);
    return result.join('');
}

// メイン処理を実行
main(TestText, ConvKey).catch(error => console.error('処理エラー:', error));
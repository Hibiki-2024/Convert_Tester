// Unicode エスケープ変換関数（修正版）
// - サロゲートペアを正しく扱うために code point ごとに反復します
// - 情報欠落を防ぐため、16進は最大 6 桁でゼロ埋め（例: U+1F60A -> "\\u01f60a"）
// - 出力は各文字ごとに固定長 ("\\u" + 6 hex) になるため、後続の2文字ずつ分割ロジックと互換を保ちます
function ConvToUniEs16(input) {
    if (!input) return '';
    // Array.from または for..of は文字列を Unicode の code point 単位で反復します
    return Array.from(input).map(char => {
        const codePoint = char.codePointAt(0);
        // 最大 U+10FFFF に対応するため 6 桁でゼロ埋め
        const hex = codePoint.toString(16);
        const padded = ('000000' + hex).slice(-6);
        return '\\u' + padded;
    }).join('');
}

// 暗号鍵生成関数
function generateRandomKey() {
    const maxValid = 4294967296 - (4294967296 % 9794); // 4294967296 は 2^32
    let num;
    do {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        num = array[0]; // 0 ~ 4294967295
    } while (num >= maxValid); // 不公平な範囲を再抽選
    return num % 9794; // 0 ~ 9793
}

// 入力を2文字ごとに分割し、変換する関数
function splitAndConvert(input) {
    const splitText = input.match(/.{1,2}/g);
    return splitText.map(item => {
        if (item === '\\u') return 256;
        // \\u以外は16進数→10進数に変換
        return parseInt(item, 16);
    });
}

// メイン処理を非同期関数として定義
async function main(input, key) {
    console.log('処理開始:', input);
    console.log('暗号鍵:', key);
    // ユニコード変換
    const Intext = ConvToUniEs16(input);
    const splitconvert = splitAndConvert(Intext);
    // 変換表のロード完了を待ってから実行
    await window.convLoaderReady;
    let result = await ConversionLoader.convertMultiple(splitconvert, key);
    console.log(result.join(''));
    return result.join('');
}

const ConvKey = generateRandomKey();

const TestText = "あいうえ音楽\nこんこんきーつね\n\nステラsteller⭐️";

// メイン処理を実行
main(TestText, ConvKey).catch(error => console.error('処理エラー:', error));
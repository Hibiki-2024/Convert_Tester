// Unicode エスケープ変換関数（修正版）
// - サロゲートペアを正しく扱うために code point ごとに反復します
// - 情報欠落を防ぐため、16進は最大 6 桁でゼロ埋め（例: U+1F60A -> "\\u01f60a"）
// - 出力は各文字ごとに固定長 ("\\u" + 6 hex) になるため、後続の2文字ずつ分割ロジックと互換を保ちます
const ConvToUniEs16 = (input) => {
    if (!input) return '';
    return Array.from(input).map(char => {
        const codePoint = char.codePointAt(0);
        const hex = codePoint.toString(16);
        const padded = ('000000' + hex).slice(-6);
        return '\\u' + padded;
    }).join('');
};

// 暗号鍵生成関数
const generateRandomKey = () => {
    const maxValid = 4294967296 - (4294967296 % 9794);
    let num;
    do {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        num = array[0];
    } while (num >= maxValid);
    return num % 9794;
};

// 入力を2文字ごとに分割し、変換する関数
const splitAndConvert = (input) => {
    const splitText = input.match(/.{1,2}/g);
    return splitText.map(item => {
        if (item === '\\u') return 256;
        return parseInt(item, 16);
    });
};

// メイン処理を非同期関数として定義
const main = async (input, key) => {
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
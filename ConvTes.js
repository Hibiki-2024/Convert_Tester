// Unicode エスケープ変換関数（修正版）
// - サロゲートペアを正しく扱うために CodePoint ごとに反復します
// - 情報欠落を防ぐため、16進は最大 6 桁でゼロ埋め（例: U+1F60A -> "\\u01f60a"）
// - 出力は各文字ごとに固定長 ("\\u" + 6 hex) になるため、後続の2文字ずつ分割ロジックと互換を保ちます
const convertToUnicodeEscape16 = (input) => {
    if (!input) return '';
    return Array.from(input).map(character => {
        const codePoint = character.codePointAt(0);
        const hex = codePoint.toString(16);
        const padded = ('000000' + hex).slice(-6);
        return '\\u' + padded;
    }).join('');
};

// 暗号鍵生成関数
const generateRandomKey = () => {
    const maxValid = 4294967296 - (4294967296 % 9794);
    let number;
    do {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        number = array[0];
    } while (number >= maxValid);
    return number % 9794;
};

// 入力を2文字ごとに分割し、変換する関数
const splitAndConvertInput = (input) => {
    const result = [];
    for (let i = 0; i < input.length; i += 2) {
        const item = input.slice(i, i + 2);
        if (item === '\\u') {
            result.push(256);
        } else {
            result.push(parseInt(item, 16));
        }
    }
    return result;
};

// メイン処理を非同期関数として定義
const mainProcessing = async (input, key) => {
    console.log('処理開始:', input);
    console.log('暗号鍵:', key);
    // ユニコード変換
    const inputText = convertToUnicodeEscape16(input);
    const splitConverted = splitAndConvertInput(inputText);
    // ConversionData.js の CONVERSION_TABLE を直接使用して変換
    // 変換ルックアップ関数（同期）
    const convertValue = (num) => {
        return (CONVERSION_TABLE[String(num)] || '不明');
    };
    const result = splitConverted.map(n => convertValue(n + key));
    console.log(result.join(''));
    return result.join('');
}

const conversionKey = generateRandomKey();

const testText = "あいうえ音楽\nこんこんきーつね\n\nステラsteller⭐️";

// メイン処理を実行
mainProcessing(testText, conversionKey).catch(error => console.error('処理エラー:', error));
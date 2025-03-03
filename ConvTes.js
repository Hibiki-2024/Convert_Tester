// Unicode エスケープ変換関数 ChatGPT製
function CTE16(input) {
  // 入力文字列全体をループして文字コードを変換
  return input.split('').map(char => {
    const codePoint = char.codePointAt(0);
    return '\\u' + ('0000' + codePoint.toString(16)).slice(-4);
  }).join('');
}

//テスト用の文章
const TestText = "あいうえ音楽\nこんこんきーつね\n\nステラsteller⭐️";
const Intext = CTE16(TestText);
//入力を2文字ごとに分割
const splitText = Intext.match(/.{1,2}/g);

//配列を展開
let splitconvert = splitText.map(item => {
  if (item === '\\u') {
    return '256'; // \\uは256に置き換え
  } else {
    // \\u以外は16進数→10進数に変換
    return ('0000' + parseInt(item, 16)).slice(-3);
  }
});
console.log(Intext);
console.log(splitText);
console.log(splitconvert);
let result = ConversionLoader.convert();
console.log(result);
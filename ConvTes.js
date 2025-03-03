//変換表を読み込むクラス
//変換表はNumToKanjiConvTable.txtに記述
const ConversionLoader = (() => {
  let conversionTable = {};  //変換表（内部管理）
  let isLoaded = false;      //ロード済みフラグ
  let loadPromise = null;    // `.txt` ロードの Promise を管理

  //'.txt'を取得し、変換表をセットする
  async function loadTable(url) {
      if (isLoaded) return; //既にロード済みならスキップ
      if (loadPromise) return loadPromise; // 読み込み中ならその Promise を返す

      loadPromise = new Promise(async (resolve, reject) => {
          try {
              const response = await fetch(url);
              if (!response.ok) throw new Error(`Failed to load: ${url}`);

              const text = await response.text();
              text.trim().split('\n').forEach(line => {
                  const [num, kanji] = line.split(/\s+/);
                  conversionTable[num] = kanji;
              });

              isLoaded = true;
              console.log('変換表ロード完了:', conversionTable);
              resolve(); // 読み込み完了
          } catch (error) {
              console.error('変換表のロード失敗:', error);
              reject(error);
          }
      });

      return loadPromise;
  }

  //数値を変換（ロード完了を待機）
  async function convert(input) {
      await loadTable('conversionTable.txt'); //読み込みが完了するまで待機
      return conversionTable[String(input)] || '不明';
  }

  //配列の数値を一括変換（ロード完了を待機）
  async function convertMultiple(inputs) {
      await loadTable('conversionTable.txt');
      return inputs.map(num => conversionTable[String(num)] || '不明');
  }

  return {
      loadTable,  //変換表をロード
      convert,     //単一の数値を漢字に変換（ロード完了を待機）
      convertMultiple,  //配列の数値を漢字に一括変換（ロード完了を待機）
  };
})();

ConversionLoader.loadTable('NumToKanjiConvTable.txt');

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
let result = ConversionLoader.convert(splitconvert);
console.log(result);
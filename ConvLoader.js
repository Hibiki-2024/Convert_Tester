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

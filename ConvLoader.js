const ConversionLoader = (() => {
  let conversionTable = {};  // 変換表（内部管理）
  let isLoaded = false;      // ロード済みフラグ
  let initPromise = null;    // 初期化Promise

  //'.txt'を取得し、変換表をセットする
  async function loadConversionTable(url) {
      if (isLoaded) return conversionTable;
      if (initPromise) return initPromise;

      initPromise = new Promise(async (resolve, reject) => {
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
              resolve(conversionTable);
          } catch (error) {
              console.error('変換表のロード失敗:', error);
              reject(error);
          }
      });

      return initPromise;
  }

  //数値を変換（ロード完了を待機）
  async function convert(input) {
      const table = await loadConversionTable('NumToKanjiConvTable.txt');
      return table[String(input)] || '不明';
  }

  //配列の数値を一括変換（ロード完了を待機）
  async function convertMultiple(inputs, key) {
      const table = await loadConversionTable('NumToKanjiConvTable.txt');
      return inputs.map(num => table[String(num + key)] || '不明');
  }

  return {
      loadConversionTable,
      convert,
      convertMultiple,
      isReady: () => isLoaded
  };
})();

// 初期ロードを待機してからエクスポート
// このPromiseが完了するまでモジュールを使用できないようにする
window.convLoaderReady = ConversionLoader.loadConversionTable('NumToKanjiConvTable.txt')
  .then(() => {
      console.log('変換ローダーの準備完了');
      return ConversionLoader;
  })
  .catch(error => {
      console.error('初期ロードエラー:', error);
      throw error;
  });
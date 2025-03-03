const ConversionLoader = (() => {
  let conversionTable = {}; //変換表(内部で管理)
  let isLoaded = false; //読み込み状態管理

  //'.txt`を取得し、変換表をセットする
  async function loadTable(url) {
      if (isLoaded) return; //既にロード済みならスキップ

      try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to load: ${url}`);

          const text = await response.text();
          text.trim().split('\n').forEach(line => {
              const [num, kanji] = line.split(/\s+/);
              conversionTable[num] = kanji;
          });

          isLoaded = true; //ロード完了フラグ
          console.log('変換表ロード完了:', conversionTable);
      } catch (error) {
          console.error('変換表のロード失敗:', error);
      }
  }

  //数値を変換する関数
  function convert(input) {
      return conversionTable[input] || '不明';
  }

  //外部に公開するメソッド
  return {
      loadTable,  //変換表をロード
      convert     //数値を漢字に変換
  };
})();
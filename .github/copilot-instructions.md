
# Copilot Instructions for Convert_Tester

## プロジェクト概要
Convert_Testerは、テキストをUnicodeエスケープシーケンスに変換し、独自の変換表（NumToKanjiConvTable.txtまたはConversionData.jsのCONVERSION_TABLE）を使って文字列を変換するWebアプリです。暗号鍵（ランダムな数値）で変換結果が変化します。

## 主要ファイルと役割
- `index.html`: エントリーポイント。`ConvLoader.js`・`ConvTes.js`・`ConversionData.js`を読み込む。
- `ConvLoader.js`: 変換表（CONVERSION_TABLE埋め込み or NumToKanjiConvTable.txt）をロードし、数値→漢字変換関数を提供。
- `ConvTes.js`: Unicodeエスケープ変換、2文字分割、数値化、暗号鍵生成、変換表による変換ロジック。
- `ConversionData.js`: 変換表データ（CONVERSION_TABLE）をJSオブジェクトとして埋め込み。
- `NumToKanjiConvTable.txt`: 数値と漢字のペア（テキスト形式）。

## アーキテクチャ・データフロー
1. 変換表（CONVERSION_TABLEまたはNumToKanjiConvTable.txt）をロードし、数値→漢字のマッピングを作成。
2. 入力テキストをUnicodeエスケープ（例: "あ"→"\u3042"）に変換。
3. エスケープ文字列を2文字ずつ分割し、"\u"は256、それ以外は16進数→10進数に変換。
4. 暗号鍵（generateRandomKey）を使い、数値配列を変換表で漢字等に変換。
5. 結果をコンソール出力。

## 主要関数例
- `convertToUnicodeEscape16(input)`（ConvTes.js）: Unicodeエスケープ変換（6桁ゼロ埋め）。
- `generateRandomKey()`（ConvTes.js）: 暗号鍵生成（9794未満の乱数）。
- `splitAndConvertInput(input)`（ConvTes.js）: 2文字分割・数値化。
- `ConversionLoader.convert(input)`（ConvLoader.js）: 数値→漢字変換。
- `ConversionLoader.convertMultiple(inputs, key)`（ConvLoader.js）: 配列変換（暗号鍵加算）。

## 開発・デバッグのポイント
- 主要ロジックは`ConvTes.js`に集中。関数名・処理順序を厳守。
- 変換表は`ConversionData.js`のCONVERSION_TABLE埋め込みが基本。NumToKanjiConvTable.txtは参照用。
- ブラウザで`index.html`を開き、コンソールで動作確認。
- 外部ライブラリ・ビルド工程不要。JS/HTMLのみ。

## プロジェクト固有のパターン・注意点
- 変換表の仕様変更時は`ConversionData.js`・`ConvLoader.js`・`ConvTes.js`を全て更新。
- 変換表は数値→漢字のペアで記述。CONVERSION_TABLEとNumToKanjiConvTable.txtの内容は一致させる。
- 変換結果は必ずコンソール出力で確認。
- 追加機能は`ConvTes.js`に実装し、`index.html`から呼び出す。

---
このガイドに従い、AIエージェントはConvert_Testerの開発・保守を効率的に行えます。
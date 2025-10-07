# Copilot Instructions for Convert_Tester

## プロジェクト概要
Convert_Testerは、テキストをUnicodeエスケープシーケンスに変換し、独自の変換表（NumToKanjiConvTable.txt）を使って文字列を変換するサンプルWebアプリです。暗号鍵（ランダムな数値）で変換結果が変化します。

## 主要ファイルと役割
- `index.html`: エントリーポイント。`ConvLoader.js`と`ConvTes.js`を読み込む。
- `ConvLoader.js`: 変換表（NumToKanjiConvTable.txt）のロードと、数値→漢字変換処理。
- `ConvTes.js`: テキストのUnicodeエスケープ変換、分割、数値化、暗号鍵による変換ロジック。
- `NumToKanjiConvTable.txt`: 数値と漢字の対応表。

## 重要な処理フロー
1. 変換表（NumToKanjiConvTable.txt）をロードし、数値→漢字のマッピングを作成。
2. 入力テキストをUnicodeエスケープ（例: "あ"→"\u3042"）に変換。
3. エスケープ文字列を2文字ずつ分割し、"\u"は256、それ以外は16進数→10進数に変換。
4. 暗号鍵を使い、数値配列を変換表で漢字等に変換。
5. 結果をコンソール出力。

## 開発・デバッグのポイント
- 主要なロジックは`ConvTes.js`に集中。関数名や処理順序を守ること。
- 変換表のフォーマット（NumToKanjiConvTable.txt）は厳守。数値と漢字のペアで記述。
- ブラウザで`index.html`を開き、コンソールで動作確認。
- 外部ライブラリやビルド工程は不要。JS/HTMLのみ。

## コーディング規約・パターン
- 変換処理は関数分割し、役割ごとに明確に記述。
- 変換表のロードは非同期処理（fetch等）を利用。
- 例外処理は最低限でOK。主に変換表のロード失敗時のみ。
- 追加機能は`ConvTes.js`に実装し、`index.html`から呼び出す。

## 参考例
- 変換表ロード例: `ConvLoader.js`のfetch処理
- 変換ロジック例: `ConvTes.js`のCTE16関数

## 注意事項
- 変換表の仕様変更時は`ConvLoader.js`と`ConvTes.js`両方を更新。
- 変換結果は必ずコンソール出力で確認。

---
このガイドに従い、AIエージェントはConvert_Testerの開発・保守を効率的に行えます。
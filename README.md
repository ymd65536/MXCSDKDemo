# TypeScript Quick Start

## 1. プロジェクトの初期化

プロジェクト用のディレクトリを作成し、package.jsonを生成します。 
ターミナルで以下のコマンドを実行してください。

```bash
mkdir my-ts-project
cd my-ts-project
npm init -y
```

## 2. 必要なパッケージのインストール

TypeScript本体と、型定義ファイル、およびNode.js上で直接TSファイルを解釈・実行できるts-nodeを開発時依存（devDependencies）としてインストールします。

```bash
npm install -D typescript ts-node @types/node
```

## 3. TypeScript設定ファイル（tsconfig.json）の生成

TypeScriptのコンパイル挙動を管理する設定ファイルを初期化します。

```bash
npx tsc --init
```

### おすすめの基本設定

生成された tsconfig.json の中身を以下のように調整すると、モダンなNode.js環境（ESModulesベース）に適合しやすくなります。

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```

## 4. ソースコードの作成と実行

ソースコードを管理する src ディレクトリを作成し、テスト用のファイルを用意します。

```bash
mkdir src
touch src/index.ts
```

```ts
const greeting: string = "Hello, TypeScript!";
console.log(greeting);
```

## 5.実行とビルドの方法

scriptに設定しておくとVSCodeから扱うときやターミナルで操作するときにとても楽です。設定しておきましょう。

```json
{
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

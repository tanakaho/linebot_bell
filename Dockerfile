# docker-hubからベースのdocker imageをpull
FROM node:14.5.0-alpine AS node

# コンテナ内で作業するディレクトリを指定
WORKDIR /app

# コンテナ内で必要なパッケージをインストール
COPY package.json .
RUN npm install

# ホスト側カレントディレクトリ内部をコンテナ側にコピー
COPY . .

# # 起動
CMD npm start
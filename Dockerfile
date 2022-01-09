# docker-hubからベースのdocker imageをpull
FROM node:14.5.0-alpine AS node

# コンテナ内で必要なパッケージをインストール
COPY package.json .
RUN npm install

FROM python:3

#python
RUN apt-get update
RUN apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm
RUN apt-get install -y vim less
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools


# コンテナ内で作業するディレクトリを指定
WORKDIR /app



# ホスト側カレントディレクトリ内部をコンテナ側にコピー
COPY . .

# 起動
CMD npm start 
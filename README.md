# MannaPayFront
構築手順
1.
#typescriptの場合
npx create-react-app react-app --template typescript
#jsvascriptの場合
npx create-react-app react-app

2.
Dockerfile, docker-compose.yaml作成

3.
Dockerfile, docker-compose.yamlをmanna-pay-appに移動後、directoryもmanna-pay-appに移動

4.
npm install

5.
docker compose up --build -d

6.
npm install react-router-dom
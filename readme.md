# Тестовое задание Effective Mobile
Проект реализован в виде Docker-контейнеров.
2 микросервиса, брокер сообщений RabbitMQ. Один микросервис на TypeScript, другой на JavaScript, фреймворк NestJS, бд PostgreSQL (TypeORM).

Для запуска необходимо установить Docker:
<a href="https://docs.docker.com/engine/install/" target="_blank">https://docs.docker.com/engine/install/</a>

После этого выполнить команду в корневой директории:
```
sudo docker compose up --build -V
```

## Эндпоинты проекта

### Создание пользователя:
```
POST http://localhost:3001/users
```
тело запроса (JSON):
```
{
  "password": "pass",

  "phone": "234234",

  "email": "mail@gmail.com"
}
```
### Изменение пользователя:
```
PUT http://localhost:3001/users
```
тело запроса (JSON):
```
{
  "password": "new_pass",

  "phone": "223232",

  "email": "new_mail@gmail.com"
}
```
### Получение всех пользователей:

```
GET http://localhost:3001/users
```
### Получение истории событий:
```
http://localhost:3002/events
```
тело запроса (JSON):
```
{
    "userId": 3,
    "take": 10,
    "skip": 0
}
```
## Прочее
Для изменения портов микросервисов в соответсвующих папках есть файл .docker.env, переменная PORT.

В случае необходимости запуска вне Docker требуется установка компонентов указанного стека, изменение параметров в файлах .dev.env в соответсвии с сервером БД и создание необходимых бд (по-умолчанию users, events). Используется паттерн "База данных на сервис".
После этого каждый микросервис может быть запущен следующим образом:
```
npm i
npm run start:dev
```
Выполнил Лоскутов Иван, группа РИС-20-1бз
Реализовано добавление пользователей, их удаление и редактирование, сохранение в кэше и валидация по API

Проведена интеграция Raspberry Pi в качестве СКУД с существующим мобильным приложением на React Native.
Ключевая идея — считать метку (RFID), зафиксировать событие на Raspberry Pi, отправить данные по REST-API на сервер, где они сохраняются, а затем отображаются в мобильном приложении.

Краткое резюме
Raspberry Pi с RFID-модулем RC522 будет выполнять Python-скрипт, считывающий метки и формирующий JSON-объект посещения.
При каждом чтении Python использует библиотеку MFRC522 для получения UID метки и отправляет POST-запрос методом requests.post(json=…) на REST-API сервера.
Серверная часть реализована на Node.js с Express.js, соблюдая REST API и аутентификацию JWT.
Мобильное приложение на React Native получает данные через Fetch API и отображает их в FlatList,
в качестве контейнера для локального тестирования используется Docker

# Запуск проекта

## Шаг 1: Клонирование

Сначала клонируйте репозиторий с кодом проекта:

```bash
git clone https://github.com/KJONDIVE/UserManagementTest.git
```

Перейдите в корневую папку проекта через терминал:

```bash
cd ./UserManagementTest
```

## Шаг 2: Установка зависимостей

Для установки всех необходимых зависимостей выполните команду:

```bash
npm install
```

## Шаг 3: Настройка iOS

Перейдите в папку ios и установите зависимости для проекта:

```bash
cd ios
pod install
cd ..
```

## Шаг 4: Запуск Metro Bundler

Для запуска Metro Bundler, который необходим для сборки приложения, выполните команду:

```bash
npx react-native start
```

## Шаг 5: Запуск на устройстве или эмуляторе
## Запуск на iOS:

Выполните следующую команду для запуска приложения на iOS (на устройстве или эмуляторе):

```bash
npx react-native run-ios
```

## Запуск на Android:

Выполните следующую команду для запуска приложения на Android:

```bash
npx react-native run-android
```

## Шаг 6: Создание apk файла (для Android)

Выполните следующую команду для создания apk файла для запуска на реальном телефоне:

```bash
cd android
./gradlew assembleRelease
cd ..
```
После успешного выполнения перейдите по следующему пути:

```bash
cd ./android/app/build/outputs/apk/release
```
В этой папке находится файл под названием app-release.apk

Его можно отправить через различные мессенджеры себе на телефон, после чего установить и использовать.

## Шаг 7: Сборка и запуск Docker

Клонируем / переходим в корень

```bash
git clone https://github.com/grodneng/UserManagement.git
cd UserManagement
```

Собираем образы и поднимаем контейнеры

```bash
docker-compose up --build -d
```
Проверяем логи

```bash
docker-compose logs -f api
docker-compose logs -f skud
```

Тестируем

* В браузере или Postman: GET http://localhost:3000/api/visits?uid=<любое_значение>
* В логах skud должно появиться сообщение об удачной отправке.

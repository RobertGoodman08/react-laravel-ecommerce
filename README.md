# react-laravel-ecommerce


## Руководство по развертыванию проекта Laravel и React 

## 1. Клонирование репозитория

- Откройте терминал и выполните следующие команды:

```
git clone https://github.com/RobertGoodman08/react-laravel-ecommerce.git
```

- После перейдите в директорию:
```
cd react-laravel-ecommerce
```

### 2. Установка и настройка Laravel

1. Перейдите в каталог Laravel:
```
cd backend
```
2. Установите зависимости с помощью Composer:
```
composer install
```
3. Создайте файл .env на основе .env.example:
4. Настройте параметры подключения к базе данных и другие переменные окружения в .env.
5. Создайте ключ приложения Laravel:
```
php artisan key:generate
```
6. Выполните миграции базы данных:
```
php artisan migrate
```
7. Запустите сервер разработки Laravel:
```
php artisan serve
```
## Сервер будет доступен по адресу http://localhost:8000.

### 3. Установка и настройка React
Перейдите в каталог React:
```
cd ../frontend 
```
[ next-checkout,  react-admin and react-influencer ]

1. Установите зависимости с помощью npm:
```
npm install
```
2. Запустите сервер разработки React:
```
npm start
```
## Сервер будет доступен по адресу http://localhost:3000.



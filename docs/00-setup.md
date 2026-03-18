# Установка, запуск и сборка

Для того чтобы установить и запустить веб-приложение, на вашем устройстве должны быть установлены:

- **[Git](https://git-scm.com/install)**
- **[Node.JS](https://nodejs.org/en) (v11+)**

## Установка

1. Склонируйте репозиторий в папку:

```bash
git clone https://github.com/levalyukov/chelyabinsk-history history

cd history
```

2. Перейдите в директорию `app/` и установить необходимые пакеты веб-приложения:

```bash
cd app

npm install
```

Для лендинговой страницы используйте директорию `landing/`:

```bash
cd landing

npm install
```

3. Запустите сервер разработчика:

```bash
npm run dev -- --host
```

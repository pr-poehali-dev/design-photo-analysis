# 🚀 Быстрая установка Admin Server

## Шаг 1: Подключитесь к серверу

```bash
ssh user@your-server.com
```

## Шаг 2: Перейдите в директорию проекта

```bash
cd /var/www/rusdev-landing
```

## Шаг 3: Установите зависимости

```bash
cd admin-server
npm install
```

## Шаг 4: Сгенерируйте токен

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Скопируйте полученный токен!

## Шаг 5: Настройте service файл

```bash
nano admin-server.service
```

Замените:
- `ADMIN_TOKEN=your-secret-token-here-change-this` на ваш токен
- `WORKING_DIR=/var/www/rusdev-landing` на вашу директорию
- `ALLOWED_ORIGINS=...` добавьте ваш домен

## Шаг 6: Установите systemd service

```bash
sudo cp admin-server.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable admin-server
sudo systemctl start admin-server
```

## Шаг 7: Проверьте запуск

```bash
sudo systemctl status admin-server
sudo journalctl -u admin-server -f
```

Вы должны увидеть:
```
✅ Admin Console Server running
🌐 Local: http://localhost:3001
🔑 Token: ваш-токен
```

## Шаг 8: Протестируйте API

```bash
curl http://localhost:3001/health
```

Должен вернуть: `{"status":"ok",...}`

## Шаг 9: В браузере откройте консоль

1. Откройте ваш лендинг
2. Нажмите кнопку "Консоль" внизу справа
3. Введите токен из Шага 4
4. Нажмите "Подключить"

✅ Готово! Теперь можете выполнять команды на сервере.

## 🔒 Важно!

1. **Сохраните токен** в безопасном месте
2. **Настройте firewall:**
   ```bash
   sudo ufw allow from YOUR.IP.ADDRESS to any port 3001
   ```
3. Используйте только через HTTPS в production

## 🆘 Проблемы?

### Сервер не запускается:
```bash
sudo journalctl -u admin-server -n 50
```

### Порт занят:
```bash
sudo lsof -i :3001
# Или измените PORT в service файле
```

### Ошибка прав доступа:
```bash
sudo chown -R www-data:www-data /var/www/rusdev-landing
```

# RusDev Admin Console Server

Отдельный Node.js сервер для выполнения shell команд через веб-консоль.

## 🚀 Установка на сервере

### 1. Установите Node.js (если ещё не установлен)

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверка
node --version
npm --version
```

### 2. Скопируйте файлы на сервер

```bash
# На вашем локальном компьютере
scp -r admin-server user@your-server.com:/var/www/rusdev-landing/

# Или используйте Git
cd /var/www/rusdev-landing
git pull origin main
```

### 3. Установите зависимости

```bash
cd /var/www/rusdev-landing/admin-server
npm install
```

### 4. Настройте переменные окружения

Отредактируйте файл `admin-server.service`:

```bash
nano admin-server.service
```

Измените:
- `ADMIN_TOKEN` — установите СВОЙ секретный токен
- `WORKING_DIR` — директория вашего проекта
- `ALLOWED_ORIGINS` — добавьте ваш домен

### 5. Установите systemd service

```bash
sudo cp admin-server.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable admin-server
sudo systemctl start admin-server
```

### 6. Проверьте статус

```bash
sudo systemctl status admin-server
sudo journalctl -u admin-server -f
```

Сервер должен запуститься на порту 3001.

### 7. Настройте Nginx (опционально)

Если хотите проксировать через Nginx:

```nginx
# /etc/nginx/sites-available/rusdev-admin
server {
    listen 443 ssl;
    server_name admin.ваш-домен.com;
    
    # Ограничьте доступ по IP (рекомендуется!)
    allow 127.0.0.1;
    allow ВАШ.IP.АДРЕС;
    deny all;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активируйте конфигурацию:

```bash
sudo ln -s /etc/nginx/sites-available/rusdev-admin /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 Безопасность

**КРИТИЧНО! Защитите ваш сервер:**

1. **Используйте сложный токен:**
   ```bash
   # Сгенерируйте токен
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Ограничьте доступ по IP** в Nginx или используйте VPN

3. **Используйте HTTPS** обязательно

4. **Firewall:**
   ```bash
   sudo ufw allow from ВАШ.IP.АДРЕС to any port 3001
   sudo ufw enable
   ```

## 📝 API Endpoints

### POST /api/execute
Выполнить команду

```bash
curl -X POST http://localhost:3001/api/execute \
  -H "Content-Type: application/json" \
  -H "X-Admin-Token: ваш-токен" \
  -d '{"command": "ls -la"}'
```

### GET /api/status
Статус системы

```bash
curl http://localhost:3001/api/status \
  -H "X-Admin-Token: ваш-токен"
```

### GET /api/logs
Логи системы

```bash
curl "http://localhost:3001/api/logs?file=syslog&lines=50" \
  -H "X-Admin-Token: ваш-токен"
```

### POST /api/deploy
Деплой проекта (git pull + npm install + build)

```bash
curl -X POST http://localhost:3001/api/deploy \
  -H "X-Admin-Token: ваш-токен"
```

## 🛠️ Управление сервисом

```bash
# Запуск
sudo systemctl start admin-server

# Остановка
sudo systemctl stop admin-server

# Перезапуск
sudo systemctl restart admin-server

# Статус
sudo systemctl status admin-server

# Логи
sudo journalctl -u admin-server -f

# Автозапуск
sudo systemctl enable admin-server
sudo systemctl disable admin-server
```

## 🐛 Отладка

### Проверка работы сервера

```bash
# Локально
curl http://localhost:3001/health

# С аутентификацией
curl http://localhost:3001/api/execute \
  -H "Content-Type: application/json" \
  -H "X-Admin-Token: ваш-токен" \
  -d '{"command": "pwd"}'
```

### Просмотр логов

```bash
# Последние 100 строк
sudo journalctl -u admin-server -n 100

# В реальном времени
sudo journalctl -u admin-server -f

# С определенной даты
sudo journalctl -u admin-server --since "2024-02-04 18:00"
```

## 🔄 Обновление

```bash
cd /var/www/rusdev-landing
git pull
cd admin-server
npm install
sudo systemctl restart admin-server
```

## ⚠️ Важные замечания

1. **НЕ ИСПОЛЬЗУЙТЕ В PRODUCTION** без должной защиты!
2. Всегда используйте HTTPS и сложный токен
3. Ограничьте доступ по IP адресам
4. Регулярно проверяйте логи на подозрительную активность
5. Используйте отдельного пользователя (не root)

## 📱 Использование с фронтендом

В `AdminConsole.tsx` укажите:

```typescript
const API_URL = 'http://localhost:3001'; // или ваш домен
const ADMIN_TOKEN = 'ваш-секретный-токен';
```

## 🆘 Проблемы?

1. **Сервер не запускается:**
   ```bash
   sudo journalctl -u admin-server -n 50
   ```

2. **Ошибки прав доступа:**
   ```bash
   sudo chown -R www-data:www-data /var/www/rusdev-landing
   ```

3. **Порт занят:**
   ```bash
   sudo lsof -i :3001
   sudo kill -9 PID
   ```

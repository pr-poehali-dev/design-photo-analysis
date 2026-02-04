const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_TOKEN = process.env.ADMIN_TOKEN || crypto.randomBytes(32).toString('hex');
const WORKING_DIR = process.env.WORKING_DIR || process.cwd();
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'https://preview--design-photo-analysis.poehali.dev'];

console.log('🚀 Admin Server Configuration:');
console.log(`📂 Working Directory: ${WORKING_DIR}`);
console.log(`🔑 Secret Token: ${SECRET_TOKEN}`);
console.log(`🌐 Allowed Origins: ${ALLOWED_ORIGINS.join(', ')}`);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ Blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

const authenticate = (req, res, next) => {
  const token = req.headers['x-admin-token'];
  
  if (token === SECRET_TOKEN) {
    next();
  } else {
    const clientIP = req.ip || req.connection.remoteAddress;
    console.log(`🚫 Unauthorized access attempt from IP: ${clientIP}`);
    res.status(403).json({ 
      success: false,
      error: 'Access denied: Invalid token' 
    });
  }
};

app.use(authenticate);

app.post('/api/execute', (req, res) => {
  const { command } = req.body;
  
  if (!command || typeof command !== 'string') {
    return res.status(400).json({ 
      success: false,
      error: 'Invalid command' 
    });
  }

  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Executing: ${command}`);
  
  exec(command, { 
    cwd: WORKING_DIR,
    encoding: 'utf8',
    timeout: 30000,
    maxBuffer: 1024 * 1024 * 10
  }, (error, stdout, stderr) => {
    const response = {
      success: !error,
      output: stdout || stderr || '',
      error: error ? error.message : null,
      returnCode: error ? error.code : 0,
      workingDirectory: WORKING_DIR,
      timestamp: new Date().toISOString()
    };
    
    console.log(`[${timestamp}] Result: ${response.success ? '✅ Success' : '❌ Error'}`);
    res.json(response);
  });
});

app.get('/api/status', (req, res) => {
  const commands = {
    disk: 'df -h',
    memory: 'free -m',
    uptime: 'uptime',
    directory: `ls -la ${WORKING_DIR}`
  };

  const results = {};
  const promises = Object.entries(commands).map(([key, cmd]) => 
    new Promise((resolve) => {
      exec(cmd, { cwd: WORKING_DIR }, (error, stdout, stderr) => {
        results[key] = {
          success: !error,
          output: stdout || stderr || '',
          error: error?.message
        };
        resolve();
      });
    })
  );
  
  Promise.all(promises).then(() => {
    res.json(results);
  });
});

app.get('/api/logs', (req, res) => {
  const { file = 'syslog', lines = 100 } = req.query;
  
  exec(`tail -n ${lines} /var/log/${file}`, 
    { cwd: WORKING_DIR },
    (error, stdout) => {
      res.json({ 
        success: !error,
        logs: stdout || 'No logs found',
        file: `/var/log/${file}`,
        error: error?.message
      });
    }
  );
});

app.post('/api/deploy', (req, res) => {
  const deployCommand = 'git pull && npm install && npm run build';
  
  console.log(`🚀 Starting deployment...`);
  
  exec(deployCommand, 
    { cwd: WORKING_DIR, timeout: 120000 },
    (error, stdout, stderr) => {
      const response = {
        success: !error,
        output: stdout || stderr || 'Deployment completed',
        error: error?.message,
        timestamp: new Date().toISOString()
      };
      
      console.log(`${response.success ? '✅' : '❌'} Deployment ${response.success ? 'completed' : 'failed'}`);
      res.json(response);
    }
  );
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    uptime: process.uptime(),
    workingDirectory: WORKING_DIR,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`\n✅ Admin Console Server running`);
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`📝 Logs: Check console output`);
  console.log(`\n⚠️  ВАЖНО: Сохраните токен: ${SECRET_TOKEN}\n`);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const analysisRouter = require('./routes/analysis');

const app = express();
const PORT = process.env.PORT || 6601;

// Security headers
app.use(helmet());

// CORS:
//   - 无 origin 请求（iOS 原生、curl 等）：始终放行
//   - 设置了 ALLOWED_ORIGINS 环境变量：仅允许白名单内的域名
//     （iOS Capacitor 需加入 capacitor://localhost）
//   - 未设置 ALLOWED_ORIGINS：允许所有来源（适合初期部署 + iOS App）
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',').map(s => s.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.length === 0) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('CORS blocked'));
  }
}));

// Body parser with size limit
app.use(express.json({ limit: '10kb' }));

// Rate limiting: 30 requests per minute per IP
app.use('/api', rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later' }
}));

// Routes
app.use('/api', analysisRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    provider: process.env.LLM_PROVIDER || 'local',
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`ZhenMing backend started on port ${PORT}`);
  console.log(`LLM provider: ${process.env.LLM_PROVIDER || 'local'}`);
});

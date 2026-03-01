// 贞明六爻解卦 - Vite 入口文件

// npm 包导入：替代 CDN
import { Solar, Lunar } from 'lunar-javascript';

// 将 lunar-javascript 暴露到全局（现有代码依赖 Solar/Lunar 全局变量）
window.Solar = Solar;
window.Lunar = Lunar;

// 导入样式
import '../styles.css';

// 按依赖顺序导入现有模块
// 每个文件已自行将实例挂到 window.*（如 window.authManager, window.storageManager 等）
import '../i18n.js';
import '../auth.js';
import '../storage-manager.js';
import '../divination-logic.js';
import '../ai-service.js';
import '../script.js';

// Apply i18n translations after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.i18n) window.i18n.applyToDOM();
});

// 注册 Service Worker (PWA) - 仅生产环境启用，开发环境自动注销避免缓存问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    } else {
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(reg => reg.unregister());
      });
    }
  });
}

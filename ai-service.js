// ==================== AI 解卦服务 ====================
// 前端只与自有后端通信，由后端代理调用 LLM，API Key 不暴露在前端

class AIService {
    constructor() {
        this._controller = null;
    }

    /** 取消正在进行的请求 */
    abort() {
        if (this._controller) {
            this._controller.abort();
            this._controller = null;
        }
    }

    /**
     * 调用后端 /api/analysis 解卦
     * @param {Object} divinationData  完整卦象数据
     * @returns {Promise<string>}  HTML 格式的解析文本
     */
    async analyzeWithAI(divinationData) {
        this.abort();
        this._controller = new AbortController();
        const timer = setTimeout(() => this.abort(), 60000);

        try {
            const body = {
                question:     divinationData.question     || '',
                originalName: divinationData.originalName || '',
                changedName:  divinationData.changedName  || '',
                lang:         (window.i18n?.getLanguage() || 'zh'),
                lineDetails:  divinationData.lineDetails  || [],
                lunarDate:    divinationData.lunarDate    || '',
                xuankong:     divinationData.xuankong     || '',
                dayGan:       divinationData.dayGan       || '',
                monthZhi:     divinationData.monthZhi     || '',
                paipan:       divinationData.paipan       || null
            };

            const apiBase = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE) || '';
            const response = await fetch(`${apiBase}/api/analysis`, {
                method: 'POST',
                signal: this._controller.signal,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            clearTimeout(timer);

            if (!response.ok) {
                throw new Error(`大师正在闭关，请稍后再试（HTTP ${response.status}）`);
            }

            const data = await response.json();
            if (!data.success || !data.analysis) {
                throw new Error('大师暂无回应，请稍后再试');
            }

            return data.analysis;

        } catch (err) {
            clearTimeout(timer);
            if (err.name === 'AbortError') {
                throw new Error('卦象推演超时，大师稍候片刻，请重试');
            }
            throw err;
        } finally {
            this._controller = null;
        }
    }
}

// 挂载到全局，供 script.js 调用
window.aiService = new AIService();

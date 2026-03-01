const path = require('path');

// 加载前端的 divination-logic.js 供 local 模式复用
// 需要模拟浏览器全局环境
const vm = require('vm');
const fs = require('fs');

let divinationLogic = null;

function loadDivinationLogic() {
    if (divinationLogic) return divinationLogic;

    const filePath = path.join(__dirname, '..', '..', 'divination-logic.js');
    const code = fs.readFileSync(filePath, 'utf-8');

    // 创建沙箱环境执行前端 JS
    // 注入 getFallbackAnalysis（原定义在 script.js 中，divination-logic.js 的 generateAnalysis 会调用它）
    const sandbox = {
        window: {},
        console,
        getFallbackAnalysis(question, originalName, changedName) {
            return `<div class="analysis-content"><p>根据卦象显示，从「${originalName}」到「${changedName}」的转变，预示着事物的发展趋势。建议保持耐心，顺应自然规律。</p></div>`;
        }
    };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);

    divinationLogic = {
        generateAnalysis: sandbox.window.generateAnalysis,
        getHexagramByName: sandbox.window.getHexagramByName,
        hexagramData: sandbox.window.hexagramData
    };

    return divinationLogic;
}

// 爻位名称
const _POSITIONS = ['初爻','二爻','三爻','四爻','五爻','上爻'];

const _SYSTEM_PROMPT_ZH = `# Role: 顶级六爻实战推演专家 & 决策顾问

## Profile:
你是一位精通传统六爻预测学的大师。你的解析风格是：结论先行、一针见血、通俗易懂、重在"天机与人事"的配合。你深知用户不需要看晦涩的算卦过程，只需要明确的结论和行动指导。

## 核心推演法则（The Master Rules - 仅作内部推演，严禁在输出中提及）：
1. 精准取用：求财看妻财；考试看父母；求安逸/避差事/测病看子孙（子孙旺为吉）。
2. 深挖隐蔽动线：内部排查是否有日冲暗动（暗箱操作）、贪生忘克（虚惊一场、先凶后吉）。
3. 时效进退：短期急事遇"月破/旬空化进"，断为"虚假繁荣、有心无力、必落空"。
4. 人事配合：若世爻化出用神/解药，绝不断"自动变好"，必须作为"行动指令"告诫用户去主动争取。

## Output Format（强制输出格式 - 极其重要）：
【格式铁律】
1. 必须使用绝对纯净的纯文本输出，严禁使用**、#、* 等任何 Markdown 格式符号。
2. 严禁输出任何易理推演过程（五行生克、六亲、动变、旬空等专业术语绝对不能出现在最终回复中）。

请严格按照以下三个模块直接向用户输出（模块标题保留方括号）：

【核心结论】
开门见山，用最通俗直白的大白话给出结论。是成是败？是虚惊一场还是情况凶险？字数控制在50字左右。

【关键时间点】
结合内部推演的旬空、逢冲、逢合等规律，直接告诉用户事情发生、转机或出结果的具体时间范围（如：大概在后天、下周二前后、或者明后天会有转机等）。如果不涉及具体时间，此项写"近期顺其自然"。

【行动指南】
针对结论给出现实的指导建议。明确告知用户需要如何"尽人事"（例如："建议立即吃药并卧床休息"、"大势已去，建议做好备用方案"、"当心有竞争者暗中使坏，注意防范"等）。`;

const _SYSTEM_PROMPT_EN = `You are a master of I Ching six-line (Liu Yao) divination. The user will provide a question along with the original hexagram and changed hexagram names. Based on the hexagram meanings, provide a detailed divination analysis tailored to their specific question.
Requirements:
1. Give direct analytical conclusions
2. Answer specifically to the question, avoid generic responses
3. Structure into five sections: "Conclusion", "Key Yao Analysis", "Dynamic Chain", "Symbolic Details", "Timing & Advice"
4. Use clear, accessible language`;

/** 将纯文本 LLM 输出转成 HTML（与 ai-service.js _parseToHTML 一致） */
function _parseToHTML(text) {
    if (!text) return '<p class="text-gray-500">大师暂无回应，请稍后再试。</p>';

    const esc = (s) => String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const TITLE_MAP = {
        '一句话断定': '【核心结论】',
        '核心结论': '【核心结论】',
        '卦象深度拆解': '【关键时间点】',
        '逻辑复盘': null,
        '应期推断': '【关键时间点】',
        '关键时间点': '【关键时间点】',
        '决策与行动指南': '【行动指南】',
        '行动指南': '【行动指南】',
        '人事配合': '【行动指南】',
    };

    const clean = text
        .replace(/\*\*/g, '')
        .replace(/^#{1,4}\s*/gm, '')
        .replace(/（逻辑复盘）/g, '')
        .replace(/[（(]?逻辑复盘[）)]?/g, '')
        .replace(/卦象深度拆解/g, '')
        .replace(/一句话断定/g, '')
        .replace(/应期推断/g, '')
        .replace(/决策与行动指南/g, '')
        .replace(/人事配合/g, '');

    const parts = clean.split('\n').map(l => l.trim()).filter(Boolean).map(line => {
        const titleMatch = line.match(/^【([^】]+)】/);
        if (titleMatch) {
            const key = Object.keys(TITLE_MAP).find(k => titleMatch[1].includes(k));
            if (key) {
                if (TITLE_MAP[key] === null) return '';
                return `<h4 class="font-semibold text-gray-800 mb-2 mt-5">${esc(TITLE_MAP[key])}</h4>`;
            }
            return `<h4 class="font-semibold text-gray-800 mb-2 mt-5">${esc(line)}</h4>`;
        }
        if (/^[-•·]\s/.test(line)) {
            return `<p class="text-sm text-gray-700 ml-4 mb-1">• ${esc(line.replace(/^[-•·]\s*/, ''))}</p>`;
        }
        return `<p class="text-sm text-gray-700 mb-2 leading-relaxed">${esc(line)}</p>`;
    }).filter(Boolean);

    return `<div class="analysis-content space-y-0.5">${parts.join('')}</div>`;
}

/** 构建用户 Prompt，支持完整排盘（纳甲/六亲/六神/世应）和简化格式 */
function _buildUserPrompt(question, originalName, changedName, lineDetails, lunarDate, xuankong, lang, dayGan, monthZhi, paipan) {
    if (!lineDetails || lineDetails.length === 0) {
        return lang === 'en'
            ? `Question: ${question}\nOriginal Hexagram: ${originalName}\nChanged Hexagram: ${changedName}\n\nPlease provide a detailed divination analysis.`
            : `问题：${question}\n本卦：${originalName}\n变卦：${changedName}\n\n请给出详细的解卦分析。`;
    }

    const hasRich = lineDetails[0] && lineDetails[0].zhi;

    if (!hasRich) {
        const rows = lineDetails.map((l, i) => {
            const yang = ['yang','laoyang','shaoyang'].includes(l.type);
            const sym  = yang ? '━━━━' : '━ ━━';
            const dyn  = l.changing ? (l.type==='laoyang' ? '○老阳动' : '×老阴动') : '静';
            return `${_POSITIONS[i]}  ${sym}  ${dyn}`;
        });
        const dynInfo = lineDetails.filter(l=>l.changing).map((_,i)=>_POSITIONS[i]).join('、') || '六爻皆静';
        return `【求测事由】${question}\n\n【占测时间】\n${lunarDate}　${xuankong}\n\n【本卦】${originalName}　→　【变卦】${changedName}\n\n【爻象（自下至上）】\n${rows.join('\n')}\n\n动爻：${dynInfo}\n\n请分析，严格输出【核心结论】【关键时间点】【行动指南】三个模块，纯文本，不使用任何Markdown符号。`;
    }

    // 完整排盘格式
    const tableRows = [];
    for (let i = 5; i >= 0; i--) {
        const ln   = lineDetails[i];
        const yang = ['yang','laoyang','shaoyang'].includes(ln.type);
        const sym  = yang ? '━━━━' : '━ ━━';
        let   dyn;
        if (ln.type === 'laoyang') dyn = '○(动→阴)';
        else if (ln.type === 'laoyin') dyn = '×(动→阳)';
        else dyn = '静';
        const sw = ln.isShi ? '〔世〕' : (ln.isYing ? '〔应〕' : '      ');
        tableRows.push(`${_POSITIONS[i]}  ${ln.spirit}  ${ln.relation}  ${ln.zhi}${ln.element}  ${sym}  ${dyn}  ${ln.strength}  ${sw}`);
    }

    const changingLines = lineDetails.map((l,i) => l.changing ? {i,...l} : null).filter(Boolean);
    const dynDetail = changingLines.length > 0
        ? changingLines.map(l => {
            const dir = l.type==='laoyang' ? '老阳动变阴' : '老阴动变阳';
            return `${_POSITIONS[l.i]}（${l.zhi}${l.element}/${l.relation}/${l.spirit}）${dir}`;
          }).join('；')
        : '六爻皆静（无动爻）';

    const palaceName = paipan?.palaceName || '';
    const palaceEl   = paipan?.palaceElement || '';
    const palaceSection = palaceName
        ? `\n【八宫归属】${palaceName}宫（${palaceEl}）　世爻：${_POSITIONS[(paipan.shiPos||6)-1]}　应爻：${_POSITIONS[(paipan.yingPos||3)-1]}\n`
        : '\n';
    const timeExtra = (dayGan || monthZhi) ? `　日干：${dayGan||''}　月建：${monthZhi||''}` : '';

    return `【求测事由】${question}

【占测时间】
${lunarDate}${timeExtra}　${xuankong}
${palaceSection}
【本卦】${originalName}　→　【变卦】${changedName}

【完整排盘（由上至下）】
（位置  六神  六亲  地支五行  爻象  动静  旺衰  世应）
${tableRows.join('\n')}

【动爻分析】
${dynDetail}

请运用以上推演法则深入分析，最终严格只输出【核心结论】【关键时间点】【行动指南】三个模块，纯文本，不使用任何Markdown符号，不使用拼音。`;
}

class LLMService {
    constructor() {
        this.provider = process.env.LLM_PROVIDER || 'local';
        this.apiKey = process.env.QIANWEN_API_KEY || '';
        this.model = process.env.QIANWEN_MODEL || 'qwen-plus';
        this.baseUrl = process.env.QIANWEN_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1';
    }

    async analyze(question, originalName, changedName, lang = 'zh', lineDetails = [], lunarDate = '', xuankong = '', dayGan = '', monthZhi = '', paipan = null) {
        if (this.provider === 'qianwen' && this.apiKey) {
            return this.callQianwen(question, originalName, changedName, lang, lineDetails, lunarDate, xuankong, dayGan, monthZhi, paipan);
        }
        return this.localAnalysis(question, originalName, changedName);
    }

    localAnalysis(question, originalName, changedName) {
        const logic = loadDivinationLogic();
        const analysis = logic.generateAnalysis(question, originalName, changedName);
        return { success: true, source: 'local', analysis };
    }

    async callQianwen(question, originalName, changedName, lang = 'zh', lineDetails = [], lunarDate = '', xuankong = '', dayGan = '', monthZhi = '', paipan = null) {
        const systemPrompt = lang === 'en' ? _SYSTEM_PROMPT_EN : _SYSTEM_PROMPT_ZH;
        const userPrompt = _buildUserPrompt(question, originalName, changedName, lineDetails, lunarDate, xuankong, lang, dayGan, monthZhi, paipan);

        try {
            const response = await fetch(`${this.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userPrompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 2000
                })
            });

            if (!response.ok) {
                const err = await response.text();
                console.error('千问 API 错误:', response.status, err);
                return this.localAnalysis(question, originalName, changedName);
            }

            const data = await response.json();
            const content = data.choices?.[0]?.message?.content || '';

            if (!content) {
                return this.localAnalysis(question, originalName, changedName);
            }

            return {
                success: true,
                source: 'qianwen',
                analysis: _parseToHTML(content)
            };
        } catch (error) {
            console.error('千问 API 调用失败:', error.message);
            return this.localAnalysis(question, originalName, changedName);
        }
    }
}

module.exports = LLMService;

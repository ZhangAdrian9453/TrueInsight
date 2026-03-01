// Lightweight i18n module for ZhenMing
// Usage: t('key') returns translated string for current language

const translations = {
  zh: {
    // App
    'app.title': '万事贞明',
    'app.subtitle': '日月之道，贞明者也',

    // Login
    'login.welcome': '欢迎来到贞明',
    'login.subtitle': '六爻解卦 · 洞察天机',
    'login.phone': '手机号登录',
    'login.phonePlaceholder': '请输入手机号',
    'login.sendCode': '发送验证码',
    'login.codePlaceholder': '请输入验证码',
    'login.login': '登录',
    'login.thirdParty': '第三方登录',
    'login.skip': '跳过登录',
    'login.desc': '登录后开始您的易经占卜之旅',
    'login.phoneLabel': '手机号',
    'login.codeLabel': '验证码',
    'login.google': '使用 Google 登录',
    'login.wechat': '使用 微信 登录',
    'login.facebook': '使用 Facebook 登录',
    'login.terms': '登录即表示您同意我们的服务条款和隐私政策',

    // Navigation
    'nav.home': '首页',
    'nav.divination': '起卦',
    'nav.history': '历史',
    'nav.profile': '我的',

    // Home
    'home.startDivination': '观象知己',
    'home.description': '六爻占卜，洞察天机，指引前行方向',
    'home.recentActivity': '最近活动',

    // Divination Input
    'input.method': '起卦方式',
    'input.manual': '手动输入',
    'input.time': '时间起卦',
    'input.number': '数字起卦',
    'input.manualDesc': '铜钱摇卦时，字面为阴，无字面为阳；现代钱币摇卦时，数字面为阳，图案面为阴',
    'input.numberDesc': '按照心里想到的数字输入，每组最多3个数字，共6组对应六爻',
    'input.timeDesc': '时间起卦以问卦人的问卦日期和时间为基础，若为公历则需换算成阴历。按传统规则生成六爻卦象',
    'input.divinationTime': '起卦时间',
    'input.selectSixLines': '选择六爻 (从上往下：初爻→上爻)',
    'input.line1': '初爻',
    'input.line2': '二爻',
    'input.line3': '三爻',
    'input.line4': '四爻',
    'input.line5': '五爻',
    'input.line6': '上爻',
    'input.yang': '阳',
    'input.yin': '阴',
    'input.numberDivination': '数字起卦',
    'input.numberHint': '数字起卦基于数字的阴阳属性，起卦方法：输入6组三位数（每位数范围0-9）。',
    'input.maxDigits': '最多3位数字',
    'input.question': '您的问题',
    'input.questionPlaceholder': '请输入您想解答的问题...',
    'input.analyze': '万事贞明',
    'input.selectYao': '选择六爻 (从上往下：初爻→上爻)',
    'input.timeDivination': '时间起卦',

    // Analysis
    'analysis.placeholder': '点击"重新分析"按钮开始解卦',

    // Profile
    'profile.defaultName': '易学爱好者',

    // Date Picker
    'picker.title': '选择日期时间',
    'picker.sun': '日',
    'picker.mon': '一',
    'picker.tue': '二',
    'picker.wed': '三',
    'picker.thu': '四',
    'picker.fri': '五',
    'picker.sat': '六',
    'picker.time': '时间',
    'picker.timeSelect': '时间选择',

    // Share
    'share.title': '分享解卦结果',
    'share.wechat': '分享至微信',
    'share.moments': '分享至朋友圈',
    'share.copy': '复制结果',

    // Confirm
    'confirm.title': '确认操作',
    'confirm.message': '确定要执行此操作吗？',

    // Analysis
    'analysis.title': '解卦分析',
    'analysis.loading': '正在分析卦象...',
    'analysis.originalHexagram': '本卦',
    'analysis.changedHexagram': '变卦',
    'analysis.sixSpirits': '六神',
    'analysis.sixRelatives': '六亲',
    'analysis.regenerate': '重新分析',
    'analysis.share': '分享结果',
    'analysis.feedback': '解析准确',
    'analysis.copy': '复制结果',
    'analysis.divinationTime': '起卦时间',
    'analysis.copySuccess': '已复制到剪贴板',
    'analysis.copyFail': '复制失败',
    'analysis.complete': '解卦分析完成',
    'analysis.failed': '分析失败',
    'analysis.reanalyzing': '正在重新分析卦象...',

    // History
    'history.title': '历史记录',
    'history.empty': '暂无历史记录',
    'history.emptyHint': '开始您的第一次占卜吧',
    'history.delete': '删除',
    'history.deleteConfirm': '确定删除这条记录吗？',
    'history.clearAll': '清空全部',
    'history.clearConfirm': '确定清空所有历史记录吗？此操作不可恢复。',

    // Profile
    'profile.settings': '设置',
    'profile.help': '帮助与反馈',
    'profile.about': '关于贞明',
    'profile.logout': '退出登录',
    'profile.logoutConfirm': '确定退出登录吗？',
    'profile.divinationCount': '已解卦 {count} 次',

    // Settings
    'settings.title': '设置',
    'settings.general': '通用设置',
    'settings.historyLimit': '历史保存数量',
    'settings.historyLimitDesc': '最多保存的历史记录条数',
    'settings.records50': '50条',
    'settings.records100': '100条',
    'settings.records200': '200条',
    'settings.autoSave': '自动保存问题',
    'settings.autoSaveDesc': '是否自动记录占卜问题',
    'settings.language': '语言',
    'settings.languageDesc': '选择应用语言',
    'settings.dataManagement': '数据管理',
    'settings.storageStats': '存储统计',
    'settings.recordCount': '记录数量',
    'settings.backupCount': '备份数量',
    'settings.storageSize': '存储大小',
    'settings.syncStatus': '同步状态',
    'settings.refreshStats': '刷新统计',
    'settings.dataBackup': '数据备份',
    'settings.dataBackupDesc': '创建数据备份以防止数据丢失',
    'settings.createBackup': '创建备份',
    'settings.viewBackups': '查看备份',
    'settings.cloudSync': '云端同步',
    'settings.cloudSyncDesc': '同步数据到云端，防止数据丢失',
    'settings.upload': '上传同步',
    'settings.download': '下载同步',
    'settings.exportImport': '数据导出/导入',
    'settings.exportImportDesc': '导出数据到文件或从文件导入',
    'settings.export': '导出数据',
    'settings.import': '导入数据',

    // Nav titles
    'nav.inputHexagram': '输入卦象',
    'nav.analysisResult': '解卦结果',

    // Toast messages
    'toast.completeLinesRequired': '请选择完整的六爻',
    'toast.questionSuggested': '建议输入占卜问题，以获得更准确的解析',
    'toast.hexagramGenerated': '卦象生成成功',
    'toast.divinationFailed': '解卦失败',
    'toast.recordDeleted': '记录已删除',
    'toast.deleteFailed': '删除失败',
    'toast.historyLimitUpdated': '已更新历史保存数量',
    'toast.analyzing': '解卦中...',
    'toast.noQuestion': '未设置问题',
    'toast.thanksFeedback': '感谢您的反馈！',

    // Common
    'common.cancel': '取消',
    'common.save': '保存',
    'common.back': '返回',
    'common.loading': '加载中...',
    'common.error': '出错了',
    'common.success': '成功',
    'common.unlimited': '不限制',

    // Delete Account
    'profile.deleteAccount': '删除账号',
    'profile.deleteAccountConfirm': '此操作将永久删除您的账号及所有数据，且无法撤销。确定继续吗？',
    'profile.deleteAccountConfirm2': '最后确认：您的账号和所有占卜历史将被永久删除。',
    'profile.deleteAccountRelogin': '出于安全考虑，请先退出登录并重新登录，然后再删除账号。',
    'profile.deleteAccountSuccess': '账号已删除',

    // About page
    'about.appName': '贞明 · 六爻解卦',
    'about.appDesc': '贞明是一款基于传统易学智慧的六爻占卜应用，旨在帮助用户通过易经的指引，洞察人生，把握机遇。',
    'about.guideTitle': '📖 六爻解卦基本说明',
    'about.whatTitle': '什么是六爻',
    'about.whatContent': '六爻是《周易》占卜的一种重要方法，通过六个爻位的阴阳变化来预测事物的发展趋势。每一爻代表不同的时间和空间层次，从下至上分别为初爻、二爻、三爻、四爻、五爻、上爻。',
    'about.linesTitle': '阴阳爻',
    'about.linesContent': '• <strong>阳爻（—）</strong>：代表刚健、主动、向上的力量<br>• <strong>阴爻（- -）</strong>：代表柔顺、被动、收敛的力量<br>• <strong>老阳</strong>：阳爻动，将变为阴爻<br>• <strong>老阴</strong>：阴爻动，将变为阳爻',
    'about.methodsTitle': '起卦方法详解',
    'about.method1Title': '1. 手动起卦（铜钱/硬币摇卦）',
    'about.method1CoinContent': '<strong>铜钱摇卦：</strong><br>• 准备三枚铜钱（古钱币）<br>• 字面为阴，无字面为阳<br>• 双手合握铜钱，诚心默念问题<br>• 摇动后掷到桌上，记录结果<br>• 重复六次，从下至上记录（初爻→上爻）',
    'about.method1ModernContent': '<strong>硬币摇卦：</strong><br>• 使用三枚现代硬币（一元、五角等）<br>• 有字一面为阳，花纹/图案面为阴<br>• 同样诚心默念问题后摇动掷出<br>• 连续摇六次，每次专注于问题',
    'about.method2Title': '2. 时间起卦',
    'about.method2Content': '• 选择起卦的具体时间（年月日时）<br>• 最好使用农历时间（更符合传统）<br>• 系统自动根据时间数理推算卦象<br>• 适合在重要时刻或特定时辰起卦<br>• 不需要实物工具，时间即数理',
    'about.method3Title': '3. 数字起卦',
    'about.method3Content': '• 心中默念问题，想到什么数字就输入<br>• 每组可输入1-3个数字<br>• 共需输入6组数字，对应六爻<br>• 凭直觉输入，不要刻意思考<br>• 系统根据数字的奇偶性生成阴阳爻',
    'about.hexagramTitle': '本卦与变卦',
    'about.hexagramContent': '• <strong>本卦：</strong>当前事物的现状和基本情况<br>• <strong>变卦：</strong>事物未来的发展趋势和变化方向<br>• <strong>动爻：</strong>影响事态变化的关键因素',
    'about.spiritsTitle': '六神与六亲',
    'about.spiritsContent': '• <strong>六神：</strong>青龙、朱雀、勾陈、腾蛇、白虎、玄武，代表不同的吉凶属性<br>• <strong>六亲：</strong>父母、兄弟、子孙、妻财、官鬼，代表与问事者的关系',
    'about.howTitle': '如何解卦',
    'about.howContent': '<li>明确问题，诚心起卦</li><li>观察本卦和变卦的卦象</li><li>分析动爻的位置和含义</li><li>结合六神六亲综合判断</li><li>参考AI分析获得更深入的见解</li>',
    'about.tipsTitle': '📝 使用建议',
    'about.tipsContent': '• 保持虔诚之心，专注于问题本身<br>• 问题要具体明确，避免模糊不清<br>• 同一问题不宜反复占卜<br>• 易经是指引而非决定，最终选择权在自己',
    'about.copyright': '© 2025 贞明 · 六爻解卦',
  },

  en: {
    // App
    'app.title': 'Divine Clarity',
    'app.subtitle': 'The Way of Sun and Moon, Clarity of Truth',

    // Login
    'login.welcome': 'Welcome to ZhenMing',
    'login.subtitle': 'I Ching Divination · Insight Beyond',
    'login.phone': 'Phone Login',
    'login.phonePlaceholder': 'Enter phone number',
    'login.sendCode': 'Send Code',
    'login.codePlaceholder': 'Enter verification code',
    'login.login': 'Login',
    'login.thirdParty': 'Third-party Login',
    'login.skip': 'Skip Login',
    'login.desc': 'Start your I Ching divination journey after login',
    'login.phoneLabel': 'Phone',
    'login.codeLabel': 'Code',
    'login.google': 'Sign in with Google',
    'login.wechat': 'Sign in with WeChat',
    'login.facebook': 'Sign in with Facebook',
    'login.terms': 'By logging in, you agree to our Terms of Service and Privacy Policy',

    // Navigation
    'nav.home': 'Home',
    'nav.divination': 'Divine',
    'nav.history': 'History',
    'nav.profile': 'Profile',

    // Home
    'home.startDivination': 'Observe & Divine',
    'home.description': 'Six-line I Ching divination for guidance and clarity',
    'home.recentActivity': 'Recent Activity',

    // Divination Input
    'input.method': 'Method',
    'input.manual': 'Manual',
    'input.time': 'Time-based',
    'input.number': 'Number-based',
    'input.manualDesc': 'For coin toss: text side is Yin, blank side is Yang; for modern coins: number side is Yang, image side is Yin',
    'input.numberDesc': 'Enter the numbers that come to mind, up to 3 digits per group, 6 groups for six lines',
    'input.timeDesc': 'Time-based divination uses the date and time of your query, converted to lunar calendar following traditional rules',
    'input.divinationTime': 'Divination Time',
    'input.selectSixLines': 'Select Six Lines (bottom to top)',
    'input.line1': 'Line 1',
    'input.line2': 'Line 2',
    'input.line3': 'Line 3',
    'input.line4': 'Line 4',
    'input.line5': 'Line 5',
    'input.line6': 'Line 6',
    'input.yang': 'Yang',
    'input.yin': 'Yin',
    'input.numberDivination': 'Number Divination',
    'input.numberHint': 'Enter 6 groups of up to 3-digit numbers (0-9 each digit).',
    'input.maxDigits': 'Max 3 digits',
    'input.question': 'Your Question',
    'input.questionPlaceholder': 'Enter your question...',
    'input.analyze': 'Divine Clarity',
    'input.selectYao': 'Select Six Lines (bottom to top)',
    'input.timeDivination': 'Time Divination',

    // Analysis
    'analysis.placeholder': 'Click "Re-analyze" to start analysis',

    // Profile
    'profile.defaultName': 'I Ching Enthusiast',

    // Date Picker
    'picker.title': 'Select Date & Time',
    'picker.sun': 'Sun',
    'picker.mon': 'Mon',
    'picker.tue': 'Tue',
    'picker.wed': 'Wed',
    'picker.thu': 'Thu',
    'picker.fri': 'Fri',
    'picker.sat': 'Sat',
    'picker.time': 'Time',
    'picker.timeSelect': 'Select Time',

    // Share
    'share.title': 'Share Result',
    'share.wechat': 'Share to WeChat',
    'share.moments': 'Share to Moments',
    'share.copy': 'Copy Result',

    // Confirm
    'confirm.title': 'Confirm',
    'confirm.message': 'Are you sure?',

    // Analysis
    'analysis.title': 'Analysis',
    'analysis.loading': 'Analyzing hexagram...',
    'analysis.originalHexagram': 'Original',
    'analysis.changedHexagram': 'Changed',
    'analysis.sixSpirits': 'Spirits',
    'analysis.sixRelatives': 'Relatives',
    'analysis.regenerate': 'Re-analyze',
    'analysis.share': 'Share',
    'analysis.feedback': 'Accurate',
    'analysis.copy': 'Copy Result',
    'analysis.divinationTime': 'Divination Time',
    'analysis.copySuccess': 'Copied to clipboard',
    'analysis.copyFail': 'Copy failed',
    'analysis.complete': 'Analysis complete',
    'analysis.failed': 'Analysis failed',
    'analysis.reanalyzing': 'Re-analyzing hexagram...',

    // History
    'history.title': 'History',
    'history.empty': 'No records yet',
    'history.emptyHint': 'Start your first divination',
    'history.delete': 'Delete',
    'history.deleteConfirm': 'Delete this record?',
    'history.clearAll': 'Clear All',
    'history.clearConfirm': 'Clear all history? This cannot be undone.',

    // Profile
    'profile.settings': 'Settings',
    'profile.help': 'Help & Feedback',
    'profile.about': 'About ZhenMing',
    'profile.logout': 'Logout',
    'profile.logoutConfirm': 'Are you sure you want to logout?',
    'profile.divinationCount': '{count} divinations',

    // Settings
    'settings.title': 'Settings',
    'settings.general': 'General',
    'settings.historyLimit': 'History Limit',
    'settings.historyLimitDesc': 'Maximum number of saved records',
    'settings.records50': '50',
    'settings.records100': '100',
    'settings.records200': '200',
    'settings.autoSave': 'Auto-save Questions',
    'settings.autoSaveDesc': 'Automatically save divination questions',
    'settings.language': 'Language',
    'settings.languageDesc': 'Choose app language',
    'settings.dataManagement': 'Data Management',
    'settings.storageStats': 'Storage Stats',
    'settings.recordCount': 'Records',
    'settings.backupCount': 'Backups',
    'settings.storageSize': 'Storage Size',
    'settings.syncStatus': 'Sync Status',
    'settings.refreshStats': 'Refresh Stats',
    'settings.dataBackup': 'Data Backup',
    'settings.dataBackupDesc': 'Create backups to prevent data loss',
    'settings.createBackup': 'Create Backup',
    'settings.viewBackups': 'View Backups',
    'settings.cloudSync': 'Cloud Sync',
    'settings.cloudSyncDesc': 'Sync data to cloud to prevent data loss',
    'settings.upload': 'Upload',
    'settings.download': 'Download',
    'settings.exportImport': 'Export / Import',
    'settings.exportImportDesc': 'Export data to file or import from file',
    'settings.export': 'Export',
    'settings.import': 'Import',

    // Nav titles
    'nav.inputHexagram': 'Cast Hexagram',
    'nav.analysisResult': 'Analysis Result',

    // Toast messages
    'toast.completeLinesRequired': 'Please select all six lines',
    'toast.questionSuggested': 'Enter a question for more accurate analysis',
    'toast.hexagramGenerated': 'Hexagram generated',
    'toast.divinationFailed': 'Divination failed',
    'toast.recordDeleted': 'Record deleted',
    'toast.deleteFailed': 'Delete failed',
    'toast.historyLimitUpdated': 'History limit updated',
    'toast.analyzing': 'Analyzing...',
    'toast.noQuestion': 'No question set',
    'toast.thanksFeedback': 'Thank you for your feedback!',

    // Common
    'common.confirm': 'Confirm',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.back': 'Back',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.unlimited': 'Unlimited',

    // Delete Account
    'profile.deleteAccount': 'Delete Account',
    'profile.deleteAccountConfirm': 'This will permanently delete your account and all data. This action cannot be undone. Are you sure?',
    'profile.deleteAccountConfirm2': 'Final confirmation: Your account and all divination history will be permanently deleted.',
    'profile.deleteAccountRelogin': 'For security, please log out and log back in before deleting your account.',
    'profile.deleteAccountSuccess': 'Account deleted',

    // About page
    'about.appName': 'TrueInsight · Six-Line Divination',
    'about.appDesc': 'TrueInsight is an I Ching six-line divination app rooted in classical Chinese wisdom, designed to help you gain clarity and navigate life\'s pivotal moments.',
    'about.guideTitle': '📖 About Six-Line (Liu Yao) Divination',
    'about.whatTitle': 'What is Liu Yao?',
    'about.whatContent': 'Liu Yao (Six-Line Divination) is a core method of I Ching oracle practice. It reads the yin-yang shifts across six line positions to reveal how a situation is likely to develop. Each line represents a layer of time and circumstance, from the foundation (Line 1) to the outcome (Line 6).',
    'about.linesTitle': 'Yin & Yang Lines',
    'about.linesContent': '• <strong>Yang line (—)</strong>: Active, assertive, upward energy<br>• <strong>Yin line (- -)</strong>: Receptive, yielding, inward energy<br>• <strong>Old Yang</strong>: A yang line in motion, about to become yin<br>• <strong>Old Yin</strong>: A yin line in motion, about to become yang',
    'about.methodsTitle': 'How to Cast a Hexagram',
    'about.method1Title': '1. Manual Cast (Coin Method)',
    'about.method1CoinContent': '<strong>Traditional coins:</strong><br>• Use three coins (ideally antique)<br>• Text side = Yin, blank side = Yang<br>• Hold coins in both hands, focus on your question<br>• Toss and record the result<br>• Repeat six times, building from Line 1 to Line 6',
    'about.method1ModernContent': '<strong>Modern coins:</strong><br>• Use any three coins<br>• Number side = Yang, image/pattern side = Yin<br>• Focus on your question, then toss<br>• Repeat six times with full intention',
    'about.method2Title': '2. Time-Based Cast',
    'about.method2Content': '• Select a specific date and time for your reading<br>• Lunar calendar dates follow traditional practice<br>• The system automatically derives the hexagram from time numerology<br>• Best used at meaningful moments or specific hours<br>• No physical tools required — time itself is the oracle',
    'about.method3Title': '3. Number-Based Cast',
    'about.method3Content': '• Clear your mind, focus on your question<br>• Enter the numbers that naturally come to you<br>• Up to 3 digits per group, 6 groups total<br>• Trust your intuition — do not overthink<br>• Odd numbers = Yang; Even numbers = Yin',
    'about.hexagramTitle': 'Original & Changed Hexagrams',
    'about.hexagramContent': '• <strong>Original Hexagram:</strong> The present state of your situation<br>• <strong>Changed Hexagram:</strong> Where things are heading<br>• <strong>Moving Lines:</strong> The key forces driving the change',
    'about.spiritsTitle': 'Six Spirits & Six Relatives',
    'about.spiritsContent': '• <strong>Six Spirits:</strong> Azure Dragon, Vermilion Bird, Hook Chen, Flying Serpent, White Tiger, Black Tortoise — each carries distinct fortunate or challenging qualities<br>• <strong>Six Relatives:</strong> Parent, Sibling, Offspring, Wealth, Officer — each maps to a dimension of your life situation',
    'about.howTitle': 'How to Read Your Result',
    'about.howContent': '<li>Define your question clearly before casting</li><li>Observe the original and changed hexagrams</li><li>Focus on the moving lines — they drive the story</li><li>Integrate the Six Spirits and Six Relatives for context</li><li>Use the AI analysis for deeper, personalized insight</li>',
    'about.tipsTitle': '📝 Tips for Best Results',
    'about.tipsContent': '• Approach with a calm, focused mind<br>• Ask a specific, concrete question<br>• Do not cast the same question repeatedly<br>• I Ching offers guidance, not commands — you hold the final choice',
    'about.copyright': '© 2025 TrueInsight',
  }
};

class I18n {
  constructor() {
    this.lang = localStorage.getItem('app-language') || this.detectLanguage();
    this.listeners = [];
  }

  detectLanguage() {
    // Default to 'en' for undefined environments (e.g. Capacitor, older WebViews)
    const browserLang = navigator.language || navigator.userLanguage || 'en';
    return browserLang.startsWith('zh') ? 'zh' : 'en';
  }

  t(key, params) {
    const dict = translations[this.lang] || translations['zh'];
    let text = dict[key] || translations['zh'][key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  }

  setLanguage(lang) {
    if (lang !== 'zh' && lang !== 'en') return;
    this.lang = lang;
    localStorage.setItem('app-language', lang);
    this.applyToDOM();
    this.listeners.forEach(fn => fn(lang));
  }

  getLanguage() {
    return this.lang;
  }

  onChange(fn) {
    this.listeners.push(fn);
  }

  // Apply translations to all elements with data-i18n / data-i18n-html / data-i18n-placeholder
  applyToDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const attr = el.getAttribute('data-i18n-attr');
      if (attr) {
        el.setAttribute(attr, this.t(key));
      } else {
        el.textContent = this.t(key);
      }
    });
    // data-i18n-html: sets innerHTML (use only for developer-controlled content)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const html = (translations[this.lang] || translations['zh'])[key]
                || translations['zh'][key] || '';
      if (html) el.innerHTML = html;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = this.t(el.getAttribute('data-i18n-placeholder'));
    });
  }
}

const i18n = new I18n();
window.i18n = i18n;
window.t = (key, params) => i18n.t(key, params);

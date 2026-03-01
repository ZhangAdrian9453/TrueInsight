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
  }
};

class I18n {
  constructor() {
    this.lang = localStorage.getItem('app-language') || this.detectLanguage();
    this.listeners = [];
  }

  detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage || 'zh';
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

  // Apply translations to all elements with data-i18n attribute
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
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = this.t(el.getAttribute('data-i18n-placeholder'));
    });
  }
}

const i18n = new I18n();
window.i18n = i18n;
window.t = (key, params) => i18n.t(key, params);

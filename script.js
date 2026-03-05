// i18n helper
function t(key, params) { return window.i18n ? window.i18n.t(key, params) : key; }

// ==================== Toast提示系统（必须在最前面定义）====================
class ToastManager {
    constructor() {
        this.container = null;
    }
    
    ensureContainer() {
        if (!this.container) {
            this.container = document.getElementById('toast-container');
            if (!this.container) {
                this.container = document.createElement('div');
                this.container.id = 'toast-container';
                this.container.className = 'fixed top-4 right-4 z-50 space-y-2';
                this.container.style.pointerEvents = 'none';
                document.body.appendChild(this.container);
            }
        }
        return this.container;
    }
    
    show(message, type = 'info', duration = 3000) {
        const container = this.ensureContainer();
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-hiding');
            toast.addEventListener('animationend', () => toast.remove());
        }, duration);

        return toast;
    }
    
    success(message, duration) {
        return this.show(message, 'success', duration);
    }
    
    error(message, duration) {
        return this.show(message, 'error', duration);
    }
    
    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }
    
    info(message, duration) {
        return this.show(message, 'info', duration);
    }
}

// 创建全局Toast实例
window.toast = new ToastManager();

// HTML转义工具函数，防止XSS
function escapeHTML(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}


// 获取农历日期信息（天干地支 + 旬空）
function getLunarDateInfo(date) {
    const d = date || new Date();
    try {
        if (typeof Solar === 'undefined') {
            return { lunarDate: '农历计算库未加载', xuankong: '' };
        }
        const solar = Solar.fromDate(d);
        const lunar = solar.getLunar();
        const yearGZ = lunar.getYearInGanZhi();
        const monthGZ = lunar.getMonthInGanZhi();
        const dayGZ = lunar.getDayInGanZhi();
        const lunarDate = `${yearGZ}年 ${monthGZ}月 ${dayGZ}日`;

        // 计算旬空：根据日干支推算
        const tianGan = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
        const diZhi = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
        const dayGan = dayGZ.charAt(0);
        const dayZhi = dayGZ.charAt(1);
        const ganIdx = tianGan.indexOf(dayGan);
        const zhiIdx = diZhi.indexOf(dayZhi);
        // 旬首的地支序号 = zhiIdx - ganIdx（mod 12）
        const xunStart = ((zhiIdx - ganIdx) % 12 + 12) % 12;
        // 旬空的两个地支是本旬未覆盖的最后两个
        const kong1 = diZhi[(xunStart + 10) % 12];
        const kong2 = diZhi[(xunStart + 11) % 12];
        const xuankong = `旬空：${kong1}、${kong2}`;
        const monthZhi = monthGZ.charAt(1);

        return { lunarDate, xuankong, dayGan, dayZhi, monthZhi };
    } catch (e) {
        console.error('农历计算失败:', e);
        return { lunarDate: '农历计算失败', xuankong: '' };
    }
}

// ==================== 主初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态并记录
    const isLoggedIn = window.authManager && window.authManager.isLoggedIn();

    // 简化初始化，移除主题相关代码
    
    // 清理可能存在的深色模式设置
    try {
        document.body.classList.remove('dark-mode');
        localStorage.removeItem('app_settings');
    } catch (error) {
        console.error('清理设置失败:', error);
    }
    
    // 更新个人中心用户信息（如果已登录）
    if (window.authManager && window.authManager.isLoggedIn()) {
        updateUserProfile();
    }
    
    // UI Elements - 添加null检查
    const navHeader = document.getElementById('nav-header');
    const screenTitle = document.getElementById('screen-title');
    const backButton = document.getElementById('back-button');
    
    if (!navHeader || !screenTitle || !backButton) {
        console.error('Critical UI elements missing:', {
            navHeader: !!navHeader,
            screenTitle: !!screenTitle,
            backButton: !!backButton
        });
        // 不要完全返回，继续初始化其他功能
    }
    
    const welcomeScreen = document.getElementById('welcome-screen');
    const divinationInputScreen = document.getElementById('divination-input-screen');
    const analysisScreen = document.getElementById('analysis-screen');
    const historyScreen = document.getElementById('history-screen');
    const profileScreen = document.getElementById('profile-screen');
    const shareModal = document.getElementById('share-modal');
    
    // 检查所有屏幕元素
    const screens = [welcomeScreen, divinationInputScreen, analysisScreen, historyScreen, profileScreen];
    const missingScreens = screens.filter(screen => !screen);
    if (missingScreens.length > 0) {
        console.error('Missing screen elements:', {
            welcomeScreen: !!welcomeScreen,
            divinationInputScreen: !!divinationInputScreen,
            analysisScreen: !!analysisScreen,
            historyScreen: !!historyScreen,
            profileScreen: !!profileScreen,
            shareModal: !!shareModal
        });
    }
    
    // Bottom navigation elements
    const navHome = document.getElementById('nav-home');
    const navDivination = document.getElementById('nav-divination');
    const navHistory = document.getElementById('nav-history');
    const navProfile = document.getElementById('nav-profile');
    
    const startDivinationBtn = document.getElementById('start-divination-btn');
    const analyzeBtn = document.getElementById('analyze-btn');
    // Sections for different methods
    const manualSection = document.getElementById('manual-section');
    const manualTimeSection = document.getElementById('manual-time-section');
    const numberSection = document.getElementById('number-section');
    const numberTimeSection = document.getElementById('number-time-section');
    const timeSection = document.getElementById('time-section');
    // Description sections
    const manualDescription = document.getElementById('manual-description');
    const numberDescription = document.getElementById('number-description');
    const timeDescription = document.getElementById('time-description');
    // Inputs for number/time methods
    const numInputs = [
        document.getElementById('num-line-1'),
        document.getElementById('num-line-2'),
        document.getElementById('num-line-3'),
        document.getElementById('num-line-4'),
        document.getElementById('num-line-5'),
        document.getElementById('num-line-6')
    ].filter(Boolean);
    // DateTime picker elements
    const datetimeBtn = document.getElementById('datetime-btn');
    const datetimeDisplay = document.getElementById('datetime-display');
    const refreshBtn = document.getElementById('refresh-btn');
    const manualDatetimeBtn = document.getElementById('manual-datetime-btn');
    const manualDatetimeDisplay = document.getElementById('manual-datetime-display');
    const manualRefreshBtn = document.getElementById('manual-refresh-btn');
    const numberDatetimeBtn = document.getElementById('number-datetime-btn');
    const numberDatetimeDisplay = document.getElementById('number-datetime-display');
    const numberRefreshBtn = document.getElementById('number-refresh-btn');
    const timePickerModal = document.getElementById('time-picker-modal');
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const calendarDays = document.getElementById('calendar-days');
    const prevMonth = document.getElementById('prev-month');
    const nextMonth = document.getElementById('next-month');
    const timeDisplay = document.getElementById('time-display');
    const hourOptions = document.getElementById('hour-options');
    const minuteOptions = document.getElementById('minute-options');
    const pickerConfirm = document.getElementById('picker-confirm');
    const pickerCancel = document.getElementById('picker-cancel');
    const closePicker = document.getElementById('close-picker');
    
    const methodBtns = document.querySelectorAll('.method-btn');
    const coinBtns = document.querySelectorAll('.coin-btn');
    const yarrowResults = document.querySelectorAll('.yarrow-result');

    // Coin button label: sun/moon symbols in EN, 阳/阴 in ZH
    // Returns HTML string (use btn.innerHTML, not textContent)
    function _coinLabel(state) {
        if (window.i18n?.getLanguage() === 'en') {
            return state === 'yang'
                ? '<span style="font-size:1.25em;font-weight:600;line-height:1">○</span>'
                : '☽';
        }
        return state === 'yang' ? '阳' : '阴';
    }
    function _updateCoinLabels() {
        coinBtns.forEach(btn => {
            btn.innerHTML = _coinLabel(btn.dataset.state || 'yang');
        });
    }
    // Update coin labels whenever language changes
    window.i18n?.onChange(() => { _updateCoinLabels(); });
    // Apply on initial load (page may default to EN)
    _updateCoinLabels();
    const questionInput = document.getElementById('question');
    
    const feedbackGoodBtn = document.getElementById('feedback-good-btn');
    const shareBtn = document.getElementById('share-btn');
    const closeShareModalBtn = document.getElementById('close-share-modal');
    const copyResultBtn = document.getElementById('copy-result');
    const recentActivity = document.getElementById('recent-activity');
    
    // State management
    let selectedYarrows = {};
    let coinStates = {}; // Store coin states for each line
    let currentMethod = 'manual';
    let currentScreen = welcomeScreen;
    let navigationHistory = []; // 导航历史记录

    function hideAllScreens() {
        const allScreens = document.querySelectorAll('#screens-container > section[id$="-screen"]');
        allScreens.forEach(s => {
            s.style.display = 'none';
            s.classList.add('opacity-0');
            s.classList.add('pointer-events-none');
            s.classList.remove('screen-enter', 'screen-exit');
        });
    }

    window.__hideAllScreens = hideAllScreens;
    
    // Initialize navigation - 添加安全检查
    try {
        screenTitle.textContent = '';
        backButton.style.visibility = 'hidden'; // Hide back button on welcome screen
        // Initialize manual method on page load
        switchMethod('manual');
    } catch (error) {
        console.error('Navigation initialization failed:', error);
    }
    
    // Show recent activity with delay - 添加安全检查
    if (recentActivity) {
        setTimeout(() => {
            try {
                recentActivity.classList.add('visible');
            } catch (error) {
                console.error('Recent activity animation error:', error);
            }
        }, 1200);
    }
    
    // Event Listeners - 添加安全检查
    if (startDivinationBtn) {
        startDivinationBtn.addEventListener('click', () => {
            try {
                window.__pendingNavigation = { screenId: 'divination-input-screen', title: t('nav.inputHexagram'), navId: 'nav-divination' };
                // 检查登录状态
                if (!checkLoginRequired()) return;
                
                showScreen(divinationInputScreen, t('nav.inputHexagram'));
                setActiveNavItem(navDivination);
            } catch (error) {
                console.error('Start divination error:', error);
            }
        });
    } else {
        console.error('startDivinationBtn not found');
    }
    
    if (backButton) {
        backButton.onclick = () => {
            if (typeof window.handleBackClick === 'function') {
                window.handleBackClick();
            }
        };
    }
    
    // Bottom navigation event listeners
    if (navHome) {
        navHome.addEventListener('click', () => {
            showScreen(welcomeScreen, '');
            setActiveNavItem(navHome);
        });
    }

    if (navDivination) {
        navDivination.addEventListener('click', () => {
            window.__pendingNavigation = { screenId: 'divination-input-screen', title: t('nav.inputHexagram'), navId: 'nav-divination' };
            if (!checkLoginRequired()) return;
            showScreen(divinationInputScreen, t('nav.inputHexagram'));
            setActiveNavItem(navDivination);
        });
    }

    if (navHistory) {
        navHistory.addEventListener('click', () => {
            window.__pendingNavigation = { screenId: 'history-screen', title: t('history.title'), navId: 'nav-history' };
            if (!checkLoginRequired()) return;
            showScreen(historyScreen, t('history.title'));
            setActiveNavItem(navHistory);
        });
    }

    if (navProfile) {
        navProfile.addEventListener('click', () => {
            window.__pendingNavigation = { screenId: 'profile-screen', title: t('nav.profile'), navId: 'nav-profile' };
            if (!checkLoginRequired()) return;
            showScreen(profileScreen, t('nav.profile'));
            setActiveNavItem(navProfile);
        });
    }
    
    function switchMethod(method) {
        currentMethod = method;
        
        // Update method buttons
        methodBtns.forEach(btn => btn.classList.remove('selected'));
        document.querySelector(`[data-method="${method}"]`).classList.add('selected');
        
        // Show/hide sections
        manualSection.style.display = method === 'manual' ? 'block' : 'none';
        numberSection.style.display = method === 'number' ? 'block' : 'none';
        timeSection.style.display = method === 'time' ? 'block' : 'none';
        numberTimeSection.style.display = method === 'number' ? 'block' : 'none';
        
        // Hide manual time section when not in manual mode
        if (manualTimeSection) {
            manualTimeSection.style.display = method === 'manual' ? 'block' : 'none';
        }
        
        // Show/hide descriptions
        numberDescription.style.display = method === 'number' ? 'block' : 'none';
        timeDescription.style.display = method === 'time' ? 'block' : 'none';
        
        // Show manual description only for manual method
        if (manualDescription) {
            manualDescription.style.display = method === 'manual' ? 'block' : 'none';
        }
        
        // Initialize coin states when switching to manual method
        if (method === 'manual') {
            coinStates = {};
            selectedYarrows = {};
            // Initialize all coin buttons to default yang state and record states
            coinBtns.forEach(btn => {
                const line = btn.dataset.line;
                const coin = btn.dataset.coin;
                btn.dataset.state = 'yang';
                btn.innerHTML = _coinLabel('yang');
                btn.classList.remove('selected');
                
                // Initialize coin states
                if (!coinStates[line]) {
                    coinStates[line] = {};
                }
                coinStates[line][coin] = 'yang';
            });
            
            // Calculate initial yarrow results for all lines
            for (let i = 1; i <= 6; i++) {
                updateYarrowResult(i);
            }
        }
        
        // Auto-refresh time to current when switching methods
        if (method === 'manual') {
            refreshToCurrentTime('manual');
        } else if (method === 'number') {
            refreshToCurrentTime('number');
        } else if (method === 'time') {
            refreshToCurrentTime('time');
        }
        
        checkEnableAnalyzeButton();
    }

    methodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Add button press animation
            btn.classList.add('press-animation');
            switchMethod(btn.dataset.method);
            setTimeout(() => btn.classList.remove('press-animation'), 300);
        });
    });
    
    // Coin button event listeners
    coinBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const line = btn.dataset.line;
            const coin = btn.dataset.coin;
            const currentState = btn.dataset.state;

            // Toggle state
            const newState = currentState === 'yang' ? 'yin' : 'yang';
            btn.dataset.state = newState;
            btn.innerHTML = _coinLabel(newState);
            btn.classList.toggle('selected', newState === 'yin');
            
            // Update coin states
            if (!coinStates[line]) {
                coinStates[line] = {};
            }
            coinStates[line][coin] = newState;
            
            // Calculate and update the yarrow result
            updateYarrowResult(line);
            
            playSelectionSound();
        });
    });
    
    function updateYarrowResult(line) {
        const coins = coinStates[line];
        if (!coins || Object.keys(coins).length < 3) return;
        
        // Count yin and yang
        let yinCount = 0;
        let yangCount = 0;
        
        Object.values(coins).forEach(state => {
            if (state === 'yin') yinCount++;
            else yangCount++;
        });
        
        // Determine result based on coin combination
        let resultType;
        if (yinCount === 3) resultType = 'laoyin'; // 老阴 (三个阴)
        else if (yangCount === 3) resultType = 'laoyang'; // 老阳 (三个阳)
        else if (yinCount === 2) resultType = 'shaoyang'; // 少阳 (两阴一阳)
        else if (yangCount === 2) resultType = 'shaoyin'; // 少阴 (两阳一阴)
        
        // Store result without displaying (since we removed the display elements)
        selectedYarrows[line] = resultType;
        checkEnableAnalyzeButton();
    }
    
    questionInput.addEventListener('input', checkEnableAnalyzeButton);
    // Limit number inputs to 0-9 and max 3 chars
    numInputs.forEach((inp) => {
        inp && inp.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            checkEnableAnalyzeButton();
        });
    });
    // Initialize date-time picker
    let currentPickerTarget = ''; // 'time', 'manual', or 'number'
    let calendarDate = new Date();
    let selectedDateTime = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        hour: new Date().getHours(),
        minute: 0
    };
    let manualDateTime = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        hour: new Date().getHours(),
        minute: 0
    };
    let numberDateTime = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        hour: new Date().getHours(),
        minute: 0
    };

    function updateDateTimeButtons() {
        if (datetimeDisplay) {
            datetimeDisplay.textContent = `${selectedDateTime.year}-${selectedDateTime.month.toString().padStart(2, '0')}-${selectedDateTime.day.toString().padStart(2, '0')} ${selectedDateTime.hour.toString().padStart(2, '0')}:${selectedDateTime.minute.toString().padStart(2, '0')}`;
        }
        if (manualDatetimeDisplay) {
            manualDatetimeDisplay.textContent = `${manualDateTime.year}-${manualDateTime.month.toString().padStart(2, '0')}-${manualDateTime.day.toString().padStart(2, '0')} ${manualDateTime.hour.toString().padStart(2, '0')}:${manualDateTime.minute.toString().padStart(2, '0')}`;
        }
        if (numberDatetimeDisplay) {
            numberDatetimeDisplay.textContent = `${numberDateTime.year}-${numberDateTime.month.toString().padStart(2, '0')}-${numberDateTime.day.toString().padStart(2, '0')} ${numberDateTime.hour.toString().padStart(2, '0')}:${numberDateTime.minute.toString().padStart(2, '0')}`;
        }
        checkEnableAnalyzeButton();
    }

    function refreshToCurrentTime(target = 'time') {
        const now = new Date();
        const currentTime = {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes()
        };
        
        if (target === 'manual') {
            manualDateTime = { ...currentTime };
        } else if (target === 'number') {
            numberDateTime = { ...currentTime };
        } else {
            selectedDateTime = { ...currentTime };
        }
        
        updateDateTimeButtons();
    }

    function showDateTimePicker(target = 'time') {
        if (!timePickerModal) return;
        currentPickerTarget = target;
        
        const targetDateTime = target === 'manual' ? manualDateTime : 
                              target === 'number' ? numberDateTime : selectedDateTime;
        
        // Set calendar to current selected date
        calendarDate = new Date(targetDateTime.year, targetDateTime.month - 1, targetDateTime.day);
        
        // Initialize calendar and time picker
        updateCalendar();
        initializeTimePicker(targetDateTime);
        
        timePickerModal.classList.remove('hidden');
        timePickerModal.classList.add('flex');
    }

    function updateCalendar() {
        const year = calendarDate.getFullYear();
        const month = calendarDate.getMonth();
        
        // Update month/year display
        const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        calendarMonthYear.textContent = `${year}年 ${monthNames[month]}`;
        
        // Clear previous days
        calendarDays.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'h-8';
            calendarDays.appendChild(emptyDay);
        }
        
        // Add days of the month
        const targetDateTime = currentPickerTarget === 'manual' ? manualDateTime : 
                              currentPickerTarget === 'number' ? numberDateTime : selectedDateTime;
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'h-8 flex items-center justify-center text-sm cursor-pointer rounded hover:bg-gray-100';
            dayElement.textContent = day;
            
            // Highlight selected day
            if (year === targetDateTime.year && month === targetDateTime.month - 1 && day === targetDateTime.day) {
                dayElement.classList.add('bg-blue-500', 'text-white', 'hover:bg-blue-600');
            }
            
            dayElement.addEventListener('click', () => {
                // Remove previous selection
                calendarDays.querySelectorAll('.bg-blue-500').forEach(el => {
                    el.classList.remove('bg-blue-500', 'text-white', 'hover:bg-blue-600');
                    el.classList.add('hover:bg-gray-100');
                });
                
                // Add selection to clicked day
                dayElement.classList.add('bg-blue-500', 'text-white', 'hover:bg-blue-600');
                dayElement.classList.remove('hover:bg-gray-100');
                
                // Update selected date
                targetDateTime.year = year;
                targetDateTime.month = month + 1;
                targetDateTime.day = day;
            });
            
            calendarDays.appendChild(dayElement);
        }
    }

    function initializeTimePicker(targetDateTime) {
        // Initialize hour options
        hourOptions.innerHTML = '';
        for (let h = 0; h < 24; h++) {
            const hourElement = document.createElement('div');
            hourElement.className = 'px-3 py-2 text-sm cursor-pointer hover:bg-gray-100';
            hourElement.textContent = h.toString().padStart(2, '0');
            
            if (h === targetDateTime.hour) {
                hourElement.classList.add('bg-blue-50', 'text-blue-600');
            }
            
            hourElement.addEventListener('click', () => {
                hourOptions.querySelectorAll('.bg-blue-50').forEach(el => {
                    el.classList.remove('bg-blue-50', 'text-blue-600');
                });
                hourElement.classList.add('bg-blue-50', 'text-blue-600');
                targetDateTime.hour = h;
                updateTimeDisplay(targetDateTime);
            });
            
            hourOptions.appendChild(hourElement);
        }
        
        // Initialize minute options
        minuteOptions.innerHTML = '';
        for (let m = 0; m < 60; m += 5) {
            const minuteElement = document.createElement('div');
            minuteElement.className = 'px-3 py-2 text-sm cursor-pointer hover:bg-gray-100';
            minuteElement.textContent = m.toString().padStart(2, '0');
            
            if (m === targetDateTime.minute) {
                minuteElement.classList.add('bg-blue-50', 'text-blue-600');
            }
            
            minuteElement.addEventListener('click', () => {
                minuteOptions.querySelectorAll('.bg-blue-50').forEach(el => {
                    el.classList.remove('bg-blue-50', 'text-blue-600');
                });
                minuteElement.classList.add('bg-blue-50', 'text-blue-600');
                targetDateTime.minute = m;
                updateTimeDisplay(targetDateTime);
            });
            
            minuteOptions.appendChild(minuteElement);
        }
        
        updateTimeDisplay(targetDateTime);
    }

    function updateTimeDisplay(dateTime) {
        if (timeDisplay) {
            timeDisplay.textContent = `${dateTime.hour.toString().padStart(2, '0')}:${dateTime.minute.toString().padStart(2, '0')}`;
        }
    }

    function hideTimePicker() {
        if (timePickerModal) {
            timePickerModal.classList.add('hidden');
            timePickerModal.classList.remove('flex');
        }
    }

    // Calendar navigation event listeners
    if (prevMonth) {
        prevMonth.addEventListener('click', () => {
            calendarDate.setMonth(calendarDate.getMonth() - 1);
            updateCalendar();
        });
    }
    
    if (nextMonth) {
        nextMonth.addEventListener('click', () => {
            calendarDate.setMonth(calendarDate.getMonth() + 1);
            updateCalendar();
        });
    }

    // DateTime picker event listeners
    if (datetimeBtn) {
        datetimeBtn.addEventListener('click', () => showDateTimePicker('time'));
    }
    
    if (datetimeDisplay) {
        datetimeDisplay.addEventListener('click', () => showDateTimePicker('time'));
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => refreshToCurrentTime('time'));
    }
    
    if (manualDatetimeBtn) {
        manualDatetimeBtn.addEventListener('click', () => showDateTimePicker('manual'));
    }
    
    if (manualDatetimeDisplay) {
        manualDatetimeDisplay.addEventListener('click', () => showDateTimePicker('manual'));
    }
    
    if (manualRefreshBtn) {
        manualRefreshBtn.addEventListener('click', () => refreshToCurrentTime('manual'));
    }
    
    if (numberDatetimeBtn) {
        numberDatetimeBtn.addEventListener('click', () => showDateTimePicker('number'));
    }
    
    if (numberDatetimeDisplay) {
        numberDatetimeDisplay.addEventListener('click', () => showDateTimePicker('number'));
    }
    
    if (numberRefreshBtn) {
        numberRefreshBtn.addEventListener('click', () => refreshToCurrentTime('number'));
    }

    if (pickerConfirm) {
        pickerConfirm.addEventListener('click', () => {
            // Update the appropriate button display
            updateDateTimeButtons();
            hideTimePicker();
        });
    }

    if (pickerCancel) pickerCancel.addEventListener('click', hideTimePicker);
    if (closePicker) closePicker.addEventListener('click', hideTimePicker);

    // Initialize datetime buttons
    updateDateTimeButtons();
    
    let isAnalyzing = false;
    const analyzeBtnOriginalText = analyzeBtn.textContent;

    analyzeBtn.addEventListener('click', async () => {
        if (analyzeBtn.disabled || isAnalyzing) return;

        // 验证起卦数据
        if (currentMethod === 'manual') {
            const hasEmptyYarrow = Object.values(selectedYarrows).some(y => !y);
            if (hasEmptyYarrow) {
                if (window.toast) toast.warning(t('toast.completeLinesRequired'));
                return;
            }
        }

        // 验证问题
        if (!questionInput.value.trim()) {
            if (window.toast) toast.warning(t('toast.questionSuggested'));
        }

        // 防抖：禁用按钮
        isAnalyzing = true;
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = t('toast.analyzing');

        // Add button press animation
        analyzeBtn.classList.add('press-animation');
        setTimeout(() => analyzeBtn.classList.remove('press-animation'), 300);

        try {
            // Prepare the hexagram data based on method
            let hexagram = [];
            if (currentMethod === 'manual') {
                for (let i = 1; i <= 6; i++) {
                    hexagram.push(selectedYarrows[i]);
                }
            } else if (currentMethod === 'number') {
                hexagram = buildHexagramFromNumbers();
            } else if (currentMethod === 'time') {
                hexagram = buildHexagramFromTime();
            }

            // Display question on analysis screen
            document.getElementById('question-display').textContent = questionInput.value;

            if (window.toast) toast.success(t('toast.hexagramGenerated'));

        // Convert hexagram array to proper format and display
        const hexagramData = convertToHexagramFormat(hexagram);
        await displayHexagrams(hexagramData);

        // 保存当前卦象数据供AI分析使用（含干支旬空）
        const _lunarInfo = getLunarDateInfo(new Date());
        const _dayGan   = _lunarInfo.dayGan   || '甲';
        const _monthZhi = _lunarInfo.monthZhi || '子';
        const _paipan   = window.getPaipanData ? window.getPaipanData(hexagramData.lines, _dayGan, _monthZhi) : null;
        currentHexagramData = {
            question: questionInput.value || t('toast.noQuestion'),
            originalName: hexagramData.originalName,
            changedName: hexagramData.changedName,
            lines: hexagramData.lines,
            lunarDate: _lunarInfo.lunarDate,
            xuankong: _lunarInfo.xuankong,
            dayGan: _dayGan,
            monthZhi: _monthZhi,
            lineDetails: _paipan ? _paipan.lineDetails : buildLineDetails(hexagramData.lines),
            paipan: _paipan ? {palaceName:_paipan.palaceName, palaceElement:_paipan.palaceElement, shiPos:_paipan.shiPos, yingPos:_paipan.yingPos} : null
        };

        // Show analysis screen
        showScreen(analysisScreen, t('nav.analysisResult'));

        // 自动触发分析，显示加载动画和结果
        performAIAnalysis(
            currentHexagramData.question,
            currentHexagramData.originalName,
            currentHexagramData.changedName
        );

        } catch (error) {
            console.error('解卦失败:', error);
            if (window.toast) toast.error(t('toast.divinationFailed') + ': ' + error.message);
        } finally {
            // 恢复按钮状态（使用当前语言的翻译，不能用初始捕获的中文字符串）
            isAnalyzing = false;
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = t('input.analyze');
        }
    });
    
    // AI配置相关代码已移除，供后台管理使用
    
    
    if (feedbackGoodBtn) {
        feedbackGoodBtn.addEventListener('click', () => {
            feedbackGoodBtn.classList.toggle('selected');
            playFeedbackSound();
            showToast(t('toast.thanksFeedback'));
        });
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (shareModal) shareModal.classList.add('visible');
        });
    }

    if (closeShareModalBtn) {
        closeShareModalBtn.addEventListener('click', () => {
            if (shareModal) shareModal.classList.remove('visible');
        });
    }

    if (copyResultBtn) {
        copyResultBtn.addEventListener('click', () => {
            const textToCopy = generateSharingText();
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showToast(t('analysis.copySuccess'));
                    if (shareModal) shareModal.classList.remove('visible');
                })
                .catch(() => {
                    showToast(t('analysis.copyFail'));
                });
        });
    }

    if (shareModal) {
        shareModal.addEventListener('click', (e) => {
            if (e.target === shareModal) {
                shareModal.classList.remove('visible');
            }
        });
    }
    
    
    // Utility Functions
    function showScreen(screen, title, fromHistory = false) {
        try {
            // 如果不是从历史记录跳转，记录当前页面到导航历史
            if (!fromHistory && currentScreen && currentScreen !== screen) {
                navigationHistory.push(currentScreen);
            }

            hideAllScreens();
            
            // Always show navigation header
            navHeader.classList.remove('hidden');
            navHeader.classList.add('flex');
            
            // 清除之前的页面标记
            if (screen === welcomeScreen) {
                window.previousScreen = null;
            }
            
            // Set title and back button visibility based on screen
            if (screen === welcomeScreen) {
                screenTitle.textContent = '';
                backButton.style.visibility = 'hidden';
            } else {
                screenTitle.textContent = title;
                backButton.style.visibility = 'visible';
            }
            
            // Show new screen with enter animation
            if (screen) {
                screen.style.display = 'flex';
                screen.classList.remove('opacity-0');
                screen.classList.remove('pointer-events-none');
                screen.classList.add('screen-enter');
                screen.scrollTop = 0;
            }
            window.scrollTo(0, 0);

            // Update current screen reference
            currentScreen = screen;
            window.__currentScreenId = screen?.id || null;
        } catch (error) {
            console.error('showScreen error:', error);
        }
    }

    window.__showScreen = showScreen;
    
    function setActiveNavItem(activeItem) {
        try {
            // Remove active class from all nav items
            const navItems = [navHome, navDivination, navHistory, navProfile];
            navItems.forEach(item => {
                if (item) item.classList.remove('active');
            });
            
            // Add active class to the selected item
            if (activeItem) {
                activeItem.classList.add('active');
            }
        } catch (error) {
            console.error('setActiveNavItem error:', error);
        }
    }
    
    function checkEnableAnalyzeButton() {
        try {
            if (!questionInput) {
                console.error('questionInput not found');
                return;
            }
            
            const questionComplete = questionInput.value.trim() !== '';
            let ready = false;
            if (currentMethod === 'manual') {
                // For manual method, just check if question is filled (coins are optional)
                ready = true;
            } else if (currentMethod === 'number') {
                ready = numInputs.length === 6 && numInputs.every(inp => inp && inp.value.length > 0 && inp.value.length <= 3);
            } else if (currentMethod === 'time') {
                ready = !!(selectedDateTime.year && selectedDateTime.month && selectedDateTime.day && selectedDateTime.hour !== undefined);
            }
            
            if (analyzeBtn) {
                analyzeBtn.disabled = !(ready && questionComplete);
                if (analyzeBtn.disabled) {
                    analyzeBtn.classList.add('opacity-50');
                    analyzeBtn.classList.add('cursor-not-allowed');
                } else {
                    analyzeBtn.classList.remove('opacity-50');
                    analyzeBtn.classList.remove('cursor-not-allowed');
                }
            }
        } catch (error) {
            console.error('checkEnableAnalyzeButton error:', error);
        }
    }

    // Helpers for number/time methods
    function lineTypeFromDigits(d1, d2, d3) {
        // 基于数字阴阳属性：奇为阳，偶为阴
        const digits = [d1, d2, d3].map(n => parseInt(n, 10));
        let yin = 0, yang = 0;
        digits.forEach(d => {
            if (!isNaN(d)) {
                if (d % 2 === 0) yin++; else yang++;
            }
        });
        if (yin === 3) return 'laoyin';
        if (yang === 3) return 'laoyang';
        if (yin === 2) return 'shaoyang';
        return 'shaoyin';
    }

    function buildHexagramFromNumbers() {
        const hex = [];
        for (let i = 0; i < 6; i++) {
            const val = (numInputs[i] && numInputs[i].value) || '';
            const a = val[0] || '0';
            const b = val[1] || '0';
            const c = val[2] || '0';
            hex.push(lineTypeFromDigits(a, b, c));
        }
        return hex;
    }

    function buildHexagramFromTime() {
        // Build digits from selected time values: YYYYMMDDHHMM
        const y = selectedDateTime.year.toString();
        const m = selectedDateTime.month.toString().padStart(2,'0');
        const d = selectedDateTime.day.toString().padStart(2,'0');
        const h = selectedDateTime.hour.toString().padStart(2,'0');
        const min = selectedDateTime.minute.toString().padStart(2,'0');
        const digits = `${y}${m}${d}${h}${min}`.replace(/\D/g, '');
        // Build 6 lines from consecutive triples, wrap if needed
        const hex = [];
        for (let i = 0; i < 6; i++) {
            const start = i * 3;
            const a = digits[(start) % digits.length] || '0';
            const b = digits[(start + 1) % digits.length] || '0';
            const c = digits[(start + 2) % digits.length] || '0';
            hex.push(lineTypeFromDigits(a, b, c));
        }
        return hex;
    }
    
    // 将 lines 数组转为 AI 服务所需的详情格式（含纳甲/六亲/六神/世应）
    function buildLineDetails(lines, dayGan, monthZhi) {
        if (window.getPaipanData) {
            const paipan = window.getPaipanData(lines, dayGan || '甲', monthZhi || '子');
            if (paipan) return paipan.lineDetails;
        }
        return lines.map(line => ({
            type: line.type,
            changing: line.type === 'laoyang' || line.type === 'laoyin'
        }));
    }

    function convertToHexagramFormat(hexagramArray) {
        // Convert simple array to object format with lines property
        const lines = hexagramArray.map(lineType => ({ type: lineType }));
        
        // Get hexagram names using existing logic
        const originalName = getHexagramName(lines, false);
        const changedName = getHexagramName(lines, true);
        
        return {
            lines: lines,
            originalName: originalName,
            changedName: changedName
        };
    }
    
    function getHexagramName(lines, isChanged) {
        // Convert lines to trigrams for name lookup
        const trigrams = [];
        
        // Get upper and lower trigrams
        for (let i = 0; i < 2; i++) {
            let trigramCode = '';
            for (let j = 0; j < 3; j++) {
                const lineIndex = i * 3 + j;
                let lineType = lines[lineIndex].type;
                
                // For changed hexagram, flip old yin/yang
                if (isChanged) {
                    if (lineType === 'laoyin') lineType = 'yang';
                    else if (lineType === 'laoyang') lineType = 'yin';
                }
                
                trigramCode += (lineType === 'yang' || lineType === 'laoyang') ? '1' : '0';
            }
            trigrams.push(trigramCode);
        }
        
        // Complete 64 hexagram name mapping
        // hexagramCode = upper trigram + lower trigram (each 3-bit, bottom-to-top)
        // 乾=111, 坤=000, 震=100, 艮=001, 坎=010, 离=101, 巽=011, 兑=110
        const hexagramNames = {
            '111111': '乾为天',
            '000000': '坤为地',
            '010100': '水雷屯',
            '001010': '山水蒙',
            '010111': '水天需',
            '111010': '天水讼',
            '000010': '地水师',
            '010000': '水地比',
            '011111': '风天小畜',
            '111110': '天泽履',
            '000111': '地天泰',
            '111000': '天地否',
            '111101': '天火同人',
            '101111': '火天大有',
            '000001': '地山谦',
            '100000': '雷地豫',
            '110100': '泽雷随',
            '001011': '山风蛊',
            '000110': '地泽临',
            '011000': '风地观',
            '101100': '火雷噬嗑',
            '001101': '山火贲',
            '001000': '山地剥',
            '000100': '地雷复',
            '111100': '天雷无妄',
            '001111': '山天大畜',
            '001100': '山雷颐',
            '110011': '泽风大过',
            '010010': '坎为水',
            '101101': '离为火',
            '110001': '泽山咸',
            '100011': '雷风恒',
            '111001': '天山遁',
            '100111': '雷天大壮',
            '101000': '火地晋',
            '000101': '地火明夷',
            '011101': '风火家人',
            '101110': '火泽睽',
            '010001': '水山蹇',
            '100010': '雷水解',
            '001110': '山泽损',
            '011100': '风雷益',
            '110111': '泽天夬',
            '111011': '天风姤',
            '110000': '泽地萃',
            '000011': '地风升',
            '110010': '泽水困',
            '010011': '水风井',
            '110101': '泽火革',
            '101011': '火风鼎',
            '100100': '震为雷',
            '001001': '艮为山',
            '011001': '风山渐',
            '100110': '雷泽归妹',
            '100101': '雷火丰',
            '101001': '火山旅',
            '011011': '巽为风',
            '110110': '兑为泽',
            '011010': '风水涣',
            '010110': '水泽节',
            '011110': '风泽中孚',
            '100001': '雷山小过',
            '010101': '水火既济',
            '101010': '火水未济'
        };
        
        const hexagramCode = trigrams[1] + trigrams[0]; // Upper + Lower
        return hexagramNames[hexagramCode] || '未知卦';
    }
    
    async function displayHexagrams(hexagram) {
        const originalDiv = document.getElementById('original-hexagram');
        const changedDiv = document.getElementById('changed-hexagram');
        const originalNameDiv = document.getElementById('original-name');
        const changedNameDiv = document.getElementById('changed-name');
        
        // Clear previous content
        originalDiv.innerHTML = '';
        changedDiv.innerHTML = '';
        
        // Display original hexagram (from bottom to top)
        for (let i = 5; i >= 0; i--) {
            const line = hexagram.lines[i];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'hexagram-line';
            
            if (line.type === 'yang' || line.type === 'laoyang' || line.type === 'shaoyang') {
                lineDiv.innerHTML = '<div class="yang-line" style="height: 8px; width: 60px; background-color: #1A1A1A; border-radius: 4px; margin: 0 auto;"></div>';
            } else if (line.type === 'yin' || line.type === 'laoyin' || line.type === 'shaoyin') {
                lineDiv.innerHTML = '<div class="yin-line" style="height: 8px; width: 60px; display: flex; justify-content: space-between; background: transparent; margin: 0 auto;"><span style="height: 8px; width: 26px; background-color: #1A1A1A; border-radius: 4px;"></span><span style="height: 8px; width: 26px; background-color: #1A1A1A; border-radius: 4px;"></span></div>';
            }
            
            // Add changing indicator for old yin/yang with correct type
            if (line.type === 'laoyang') {
                lineDiv.classList.add('changing-yang');
            } else if (line.type === 'laoyin') {
                lineDiv.classList.add('changing-yin');
            }

            // Sequential appear animation (bottom to top)
            lineDiv.classList.add('hexagram-animation');
            lineDiv.style.transitionDelay = `${(5 - i) * 0.1}s`;

            originalDiv.appendChild(lineDiv);
        }
        
        // Display changed hexagram (from bottom to top)
        for (let i = 5; i >= 0; i--) {
            const line = hexagram.lines[i];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'hexagram-line';
            
            // For changed hexagram, flip old yin/yang
            let displayType = line.type;
            if (line.type === 'laoyin') displayType = 'yang';
            else if (line.type === 'laoyang') displayType = 'yin';
            
            if (displayType === 'yang' || displayType === 'shaoyang' || displayType === 'laoyang') {
                lineDiv.innerHTML = '<div class="yang-line" style="height: 8px; width: 60px; background-color: #1A1A1A; border-radius: 4px; margin: 0 auto;"></div>';
            } else if (displayType === 'yin' || displayType === 'shaoyin' || displayType === 'laoyin') {
                lineDiv.innerHTML = '<div class="yin-line" style="height: 8px; width: 60px; display: flex; justify-content: space-between; background: transparent; margin: 0 auto;"><span style="height: 8px; width: 26px; background-color: #1A1A1A; border-radius: 4px;"></span><span style="height: 8px; width: 26px; background-color: #1A1A1A; border-radius: 4px;"></span></div>';
            }
            
            // Sequential appear animation for changed hexagram
            lineDiv.classList.add('hexagram-animation');
            lineDiv.style.transitionDelay = `${(5 - i) * 0.1}s`;

            changedDiv.appendChild(lineDiv);
        }

        // Trigger sequential appear animation
        requestAnimationFrame(() => {
            originalDiv.querySelectorAll('.hexagram-animation').forEach(el => el.classList.add('appear'));
            changedDiv.querySelectorAll('.hexagram-animation').forEach(el => el.classList.add('appear'));
        });

        // Set hexagram names
        originalNameDiv.textContent = hexagram.originalName;
        changedNameDiv.textContent = hexagram.changedName;
        
        // Generate detailed hexagram table
        generateHexagramTable(hexagram);
        
        // Generate spirits and time info
        generateSpiritsInfo();
        generateTimeInfo();
        
        // 保存完整的解卦结果到历史
        await saveCompleteHexagramResult(hexagram);
    }
    
    // English translation maps for divination table
    const _SPIRIT_EN_MAP   = {'青龙':'Azure Dragon','朱雀':'Vermilion Bird','勾陈':'Curved Array','腾蛇':'Flying Serpent','白虎':'White Tiger','玄武':'Black Tortoise'};
    const _RELATION_EN_MAP = {'父母':'Parents','兄弟':'Siblings','子孙':'Offspring','妻财':'Wealth','官鬼':'Officer'};

    function generateHexagramTable(hexagram) {
        const tableBody = document.getElementById('hexagram-table-body');
        tableBody.innerHTML = '';

        // 获取排盘数据（若已计算则用缓存，否则实时计算）
        const _li = getLunarDateInfo(new Date());
        const _paipanResult = window.getPaipanData
            ? window.getPaipanData(hexagram.lines, _li.dayGan || '甲', _li.monthZhi || '子')
            : null;
        const _lineDetails = _paipanResult ? _paipanResult.lineDetails : null;
        const _isEn = window.i18n?.getLanguage() === 'en';

        // 从上爻到初爻 (i=5 到 i=0)
        for (let i = 5; i >= 0; i--) {
            const line = hexagram.lines[i];
            const row = document.createElement('tr');
            row.className = 'border-b border-gray-100';

            // 六神/六亲：优先使用真实排盘数据，英文模式下翻译
            const _rawSpirit   = _lineDetails ? _lineDetails[i].spirit   : ['白虎','腾蛇','勾陈','朱雀','青龙','玄武'][5-i];
            const _rawRelation = _lineDetails ? _lineDetails[i].relation  : ['父母','兄弟','子孙','妻财','官鬼','父母'][5-i];
            const spirit   = _isEn ? (_SPIRIT_EN_MAP[_rawSpirit]   || _rawSpirit)   : _rawSpirit;
            const relation = _isEn ? (_RELATION_EN_MAP[_rawRelation] || _rawRelation) : _rawRelation;
            const zhiEl    = _lineDetails ? `${_lineDetails[i].zhi}${_lineDetails[i].element}` : '';
            const shiyingMark = _lineDetails && _lineDetails[i].isShi
                ? (_isEn ? 'Self' : '世')
                : (_lineDetails && _lineDetails[i].isYing ? (_isEn ? 'Match' : '应') : '');

            // 生成爻象符号
            const originalSymbol = getLineSymbol(line.type);
            const changedSymbol = getChangedLineSymbol(line.type);

            // 动爻标记
            let changingClass = '';
            if (line.type === 'laoyang') changingClass = ' changing-yang';
            else if (line.type === 'laoyin') changingClass = ' changing-yin';

            row.innerHTML = `
                <td class="py-1">${spirit}</td>
                <td class="py-1">${relation}${zhiEl ? `<span class="text-xs text-gray-400 ml-1">${zhiEl}</span>` : ''}${shiyingMark ? `<span class="text-xs text-amber-600 ml-1">[${shiyingMark}]</span>` : ''}</td>
                <td class="py-2 text-center position-relative${changingClass}" style="min-width: 60px;">${originalSymbol}</td>
                <td class="py-2 text-center" style="min-width: 60px;">${changedSymbol}</td>
            `;
            
            // 移除动爻高亮显示
            // if (isChanging) {
            //     row.classList.add('bg-yellow-50');
            // }
            
            tableBody.appendChild(row);
        }
    }
    
    function getLineSymbol(lineType) {
        switch(lineType) {
            case 'yang':
            case 'laoyang':
            case 'shaoyang':
                return '<div style="height: 4px; width: 40px; background-color: #1A1A1A; border-radius: 1px; margin: 0 auto;"></div>';
            case 'yin':
            case 'laoyin':
            case 'shaoyin':
                return '<div style="height: 4px; width: 40px; display: flex; justify-content: space-between; margin: 0 auto;"><span style="height: 4px; width: 17px; background-color: #1A1A1A; border-radius: 1px;"></span><span style="height: 4px; width: 17px; background-color: #1A1A1A; border-radius: 1px;"></span></div>';
            default:
                return '<div style="height: 4px; width: 40px; background-color: #1A1A1A; border-radius: 1px; margin: 0 auto;"></div>';
        }
    }
    
    function getChangedLineSymbol(lineType) {
        switch(lineType) {
            case 'laoyang':
                return '<div style="height: 4px; width: 40px; display: flex; justify-content: space-between; margin: 0 auto;"><span style="height: 4px; width: 17px; background-color: #1A1A1A; border-radius: 1px;"></span><span style="height: 4px; width: 17px; background-color: #1A1A1A; border-radius: 1px;"></span></div>';
            case 'laoyin':
                return '<div style="height: 4px; width: 40px; background-color: #1A1A1A; border-radius: 1px; margin: 0 auto;"></div>';
            case 'yang':
            case 'shaoyang':
                return '<div style="height: 4px; width: 40px; background-color: #1A1A1A; border-radius: 1px; margin: 0 auto;"></div>';
            case 'yin':
            case 'shaoyin':
                return '<div style="height: 4px; width: 40px; display: flex; justify-content: space-between; margin: 0 auto;"><span style="height: 4px; width: 17px; background-color: #1A1A1A; border-radius: 1px;"></span><span style="height: 4px; width: 17px; background-color: #1A1A1A; border-radius: 1px;"></span></div>';
            default:
                return '<div style="height: 4px; width: 40px; background-color: #1A1A1A; border-radius: 1px; margin: 0 auto;"></div>';
        }
    }
    
    function generateSpiritsInfo() {
        const spiritsContainer = document.querySelector('.spirits-info');
        const spiritsRow1 = document.getElementById('spirits-row1');
        const spiritsRow2 = document.getElementById('spirits-row2');

        // English users don't need traditional Chinese auspicious-spirit annotations
        if (window.i18n?.getLanguage() === 'en') {
            if (spiritsContainer) spiritsContainer.style.display = 'none';
            return;
        }

        if (spiritsContainer) spiritsContainer.style.display = '';

        // 将所有神煞信息合并到一行显示
        const allSpirits = '禄神-亥　羊刃-子　文昌-寅　驿马-申　桃花-卯　将星-午　华盖-戌　谋星-辰　劫煞-亥　灾煞-子　天医-申　天喜-辰　贵人-卯,巳';

        spiritsRow1.innerHTML = allSpirits;
        spiritsRow2.innerHTML = ''; // 清空第二行

        // 确保神煞信息左对齐，允许换行
        spiritsRow1.style.textAlign = 'left';
        spiritsRow1.style.display = 'block';
        spiritsRow2.style.display = 'none'; // 隐藏第二行
    }
    
    function generateTimeInfo() {
        const divinationTime = document.getElementById('divination-time');
        const lunarInfo = document.getElementById('lunar-info');
        const now = new Date();
        const isEn = window.i18n?.getLanguage() === 'en';

        if (isEn) {
            const _MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            divinationTime.textContent = `Cast: ${_MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}  ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
            lunarInfo.style.display = 'none'; // hide ganzhi / xuankong row
        } else {
            const timeStr = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
            const lunarDateInfo = getLunarDateInfo(now);
            lunarInfo.innerHTML = `<span>${escapeHTML(lunarDateInfo.lunarDate)}</span><span>${escapeHTML(lunarDateInfo.xuankong)}</span>`;
            lunarInfo.style.display = '';
            divinationTime.textContent = `起卦时间：${timeStr}`;
        }
    }
    
    // ── 进度条控制 ────────────────────────────────────────────
    const _PROGRESS_STAGES = [
        { pct: 12, text: '正在排盘…',   delay: 150  },
        { pct: 35, text: '推演卦象…',   delay: 1500 },
        { pct: 60, text: '解卦论断…',   delay: 4000 },
        { pct: 82, text: '整理结论…',   delay: 8000 },
        { pct: 94, text: '即将完成…',   delay: 14000 }
    ];
    let _progressTimers = [];

    function startLoadingProgress() {
        stopLoadingProgress();
        const bar    = document.getElementById('ai-progress-bar');
        const status = document.getElementById('ai-loading-status');
        if (bar) bar.style.width = '0%';
        if (status) status.textContent = '正在起卦…';
        _progressTimers = _PROGRESS_STAGES.map(stage =>
            setTimeout(() => {
                if (bar)    bar.style.width    = stage.pct + '%';
                if (status) status.textContent = stage.text;
            }, stage.delay)
        );
    }

    function stopLoadingProgress() {
        _progressTimers.forEach(clearTimeout);
        _progressTimers = [];
        const bar = document.getElementById('ai-progress-bar');
        if (bar) bar.style.width = '100%';
    }
    // ──────────────────────────────────────────────────────────

    // 执行AI分析：优先走后端 /api/analysis，失败再 fallback 到 window.aiService 直连
    async function performAIAnalysis(question, originalName, changedName) {
        const loadingElement = document.getElementById('loading-analysis');
        const resultElement  = document.getElementById('analysis-result');

        loadingElement.classList.remove('hidden');
        resultElement.classList.add('hidden');
        startLoadingProgress();

        let analysis = null;

        // 1. 尝试后端代理（避免 CORS，API Key 不暴露前端）
        try {
            const body = {
                question,
                originalName,
                changedName,
                lang: window.i18n?.getLanguage() || 'zh',
                lineDetails: currentHexagramData?.lineDetails || [],
                lunarDate:   currentHexagramData?.lunarDate   || '',
                xuankong:    currentHexagramData?.xuankong    || '',
                dayGan:      currentHexagramData?.dayGan      || '',
                monthZhi:    currentHexagramData?.monthZhi    || '',
                paipan:      currentHexagramData?.paipan      || null
            };
            const apiBase = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE) || '';
            const resp = await fetch(`${apiBase}/api/analysis`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (resp.ok) {
                const data = await resp.json();
                console.log('[DEBUG Frontend received] success:', data.success, '| source:', data.source, '| analysis length:', data.analysis?.length, '| analysis前50字符:', data.analysis?.substring(0, 50));
                if (data.success && data.analysis) {
                    analysis = data.analysis;
                    console.log('[performAIAnalysis] 后端返回成功, source:', data.source);
                } else {
                    console.warn('[DEBUG Frontend received] data.success 或 data.analysis 为空! data:', JSON.stringify(data).substring(0, 200));
                }
            } else {
                console.warn('[performAIAnalysis] 后端响应非 ok:', resp.status);
            }
        } catch (e) {
            console.warn('[performAIAnalysis] 后端不可达，尝试直连 fallback:', e.message);
        }

        // 2. fallback：window.aiService 直连（若后端不可用）
        if (!analysis && window.aiService) {
            try {
                analysis = await window.aiService.analyzeWithAI(currentHexagramData);
                console.log('[performAIAnalysis] aiService 直连成功');
            } catch (e) {
                console.warn('[performAIAnalysis] aiService 直连也失败:', e.message);
            }
        }

        stopLoadingProgress();
        loadingElement.classList.add('hidden');
        resultElement.classList.remove('hidden');

        console.log('[DEBUG Rendering to DOM] analysis 变量:', analysis ? `长度 ${analysis.length} | 前80字符: ${analysis.substring(0, 80)}` : '【NULL / EMPTY】');
        console.log('[DEBUG Rendering to DOM] resultElement 当前 classList:', resultElement.className);
        if (analysis) {
            resultElement.innerHTML = analysis;
            console.log('[DEBUG Rendering to DOM] innerHTML 已设置，resultElement.innerHTML 前80字符:', resultElement.innerHTML.substring(0, 80));
            resultElement.classList.add('analysis-fade-in');
            resultElement.classList.remove('visible');
            requestAnimationFrame(() => { resultElement.classList.add('visible'); });
            updateHistoryAnalysis(analysis);
        } else {
            resultElement.innerHTML = `
                <div class="bg-amber-50 border border-amber-200 rounded-md p-4">
                    <h4 class="text-amber-800 font-medium mb-2">大师正在闭关</h4>
                    <p class="text-amber-700 text-sm">解卦服务暂时不可用，请稍后再试</p>
                    <p class="text-gray-500 text-xs mt-2">请点击"重新分析"重试</p>
                </div>
            `;
        }
    }
    
    // 本地分析功能
    const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE) || '';
    async function generateLocalAnalysis(question, originalName, changedName) {
        try {
            const response = await fetch(`${API_BASE}/api/analysis`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, originalName, changedName, lang: window.i18n?.getLanguage() || 'zh' })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.analysis) {
                    return data.analysis;
                }
            }
        } catch (e) {
            console.warn('后端不可用，使用前端本地分析:', e.message);
        }

        // 后端不可用时降级到前端本地分析
        if (typeof generateAnalysis === 'function') {
            try {
                return generateAnalysis(question, originalName, changedName);
            } catch (error) {
                console.error('generateAnalysis error:', error);
            }
        }
        return getFallbackAnalysis(question, originalName, changedName);
    }
    
    // 暴露到全局供 regenerateAnalysis 使用
    window.generateLocalAnalysis = generateLocalAnalysis;

    // 备用分析（全局可用，供divination-logic.js调用）
    window.getFallbackAnalysis = getFallbackAnalysis;
    function getFallbackAnalysis(question, originalName, changedName) {
        return `
            <div class="analysis-content">
                <p>根据卦象显示，当前情况正在发生变化。从「${originalName}」到「${changedName}」的转变，预示着事物的发展趋势。建议您保持耐心，顺应自然规律，在变化中寻找机遇。具体的行动方案需要结合实际情况来制定。</p>
            </div>
        `;
    }
    
    function generateSharingText() {
        const question = document.getElementById('question-display')?.textContent || '';
        const originalName = document.getElementById('original-name')?.textContent || '';
        const changedName = document.getElementById('changed-name')?.textContent || '';
        const analysisResult = document.getElementById('analysis-result');
        const analysisText = analysisResult ? (analysisResult.textContent || '').trim() : '';
        const timeText = document.getElementById('divination-time')?.textContent || '';

        return `【贞明解卦】\n问题：${question}\n本卦：${originalName} → 变卦：${changedName}\n${timeText}\n\n${analysisText}`;
    }

    function showToast(message) {
        if (window.toast) {
            window.toast.info(message);
        }
    }
    
    function playSelectionSound() {
        // In a real app, this would play a subtle selection sound
    }
    
    function playFeedbackSound() {
        // In a real app, this would play a feedback acknowledgment sound
    }
    
});

// 历史记录功能
class HexagramHistory {
    constructor() {
        this.storageKey = 'hexagram_history';
        this.maxRecords = 50; // 最多保存50条记录
    }

    // 生成唯一ID
    generateId() {
        return Date.now().toString() + Math.random().toString(36).substring(2, 8);
    }

    // 获取农历日期
    getLunarDate() {
        try {
            const info = getLunarDateInfo();
            return info.lunarDate || '';
        } catch {
            return '';
        }
    }

    // 获取旬空信息
    getXuankong() {
        try {
            const info = getLunarDateInfo();
            return info.xuankong || '';
        } catch {
            return '';
        }
    }

    // 保存完整的解卦结果到历史
    async saveCompleteResult(completeResult) {
        try {
            // 确保记录有必要的字段
            const record = {
                id: completeResult.id || this.generateId(),
                question: completeResult.question || t('toast.noQuestion'),
                originalHexagram: completeResult.originalHexagram,
                changedHexagram: completeResult.changedHexagram,
                originalName: completeResult.originalName,
                changedName: completeResult.changedName,
                lines: completeResult.lines,
                date: completeResult.date || new Date().toLocaleDateString('zh-CN'),
                time: completeResult.time || new Date().toLocaleTimeString('zh-CN', { hour12: false }),
                analysis: completeResult.analysis || '',
                lunarDate: completeResult.lunarDate || this.getLunarDate(),
                xuankong: completeResult.xuankong || this.getXuankong(),
                timestamp: Date.now()
            };

            // 使用新的存储管理器保存
            if (this.storageManager) {
                const success = await this.storageManager.saveRecord(record);
                if (success) {
                    await this.updateHistoryDisplay();
                    return record;
                }
            }

            // 备用方案：使用localStorage
            const history = await this.getHistory();
            history.unshift(record);

            // 限制历史记录数量
            if (history.length > this.maxRecords) {
                history.splice(this.maxRecords);
            }

            localStorage.setItem(this.storageKey, JSON.stringify(history));
            // 立即更新历史显示
            await this.updateHistoryDisplay();
            return record;
        } catch (error) {
            console.error('保存完整解卦结果失败:', error);
            return null;
        }
    }
    
    // 保存卦象到历史记录
    async saveHexagram(hexagramData, question, analysis = '') {
        try {
            const record = {
                id: this.generateId(),
                question: question || t('toast.noQuestion'),
                originalHexagram: hexagramData.original,
                changedHexagram: hexagramData.changed,
                originalName: hexagramData.originalName,
                changedName: hexagramData.changedName,
                lines: hexagramData.lines,
                date: new Date().toLocaleDateString('zh-CN'),
                time: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
                analysis: analysis,
                lunarDate: this.getLunarDate(),
                xuankong: this.getXuankong(),
                timestamp: Date.now()
            };
            
            // 使用新的存储管理器保存
            if (this.storageManager) {
                const success = await this.storageManager.saveRecord(record);
                if (success) {
                    await this.updateHistoryDisplay();
                    return record;
                }
            }
            
            // 备用方案：使用localStorage
            const history = await this.getHistory();
            history.unshift(record);
            
            // 限制记录数量
            if (history.length > this.maxRecords) {
                history.splice(this.maxRecords);
            }
            
            localStorage.setItem(this.storageKey, JSON.stringify(history));
            await this.updateHistoryDisplay();
            return record;
        } catch (error) {
            console.error('保存历史记录失败:', error);
            return null;
        }
    }

    // 获取历史记录
    async getHistory() {
        try {
            // 优先使用存储管理器
            if (this.storageManager) {
                const records = await this.storageManager.getAllRecords();
                return records || [];
            }
            
            // 备用方案：使用localStorage
            const history = localStorage.getItem(this.storageKey);
            return history ? JSON.parse(history) : [];
        } catch (error) {
            console.error('读取历史记录失败:', error);
            return [];
        }
    }

    // 更新历史页面显示
    async updateHistoryDisplay() {
        const historyList = document.getElementById('history-list');
        if (!historyList) return;

        const history = await this.getHistory();
        
        if (history.length === 0) {
            historyList.innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <svg class="mx-auto h-12 w-12 text-gray-400 mb-4 empty-state-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>暂无解卦记录</p>
                    <p class="text-sm mt-1">开始您的第一次占卜吧</p>
                </div>
            `;
            return;
        }

        historyList.innerHTML = history.map((record, idx) => `
            <div class="history-card-container relative overflow-hidden" data-record-id="${record.id}" style="animation-delay: ${idx * 0.05}s">
                <div class="glass-card cursor-pointer hover:shadow-md transition-all duration-300 transform" 
                     onclick="window.jumpToDetail('${record.id}')"
                     data-record-id="${record.id}">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-medium text-gray-900 truncate pr-2">${escapeHTML(record.question)}</h4>
                    <span class="text-xs text-gray-500 whitespace-nowrap">${escapeHTML(record.date)}</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">${escapeHTML(record.originalName)} → ${escapeHTML(record.changedName)}</p>
                <p class="text-xs text-gray-500 truncate">${(() => {
                    const analysis = record.analysis || '暂无解析';
                    const cleanText = analysis.replace(/<[^>]*>/g, '').trim();
                    return escapeHTML(cleanText.length > 27 ? cleanText.substring(0, 27) + '...' : cleanText);
                })()}</p>
                <div class="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                    <span class="text-xs text-gray-400">${escapeHTML(record.lunarDate)}</span>
                    <span class="text-xs text-gray-400">${escapeHTML(record.time)}</span>
                </div>
                </div>
                <!-- 左滑删除按钮 -->
                <div class="absolute right-0 top-0 h-full flex items-center bg-red-500 transform translate-x-full transition-transform duration-300">
                    <button data-delete-id="${escapeHTML(record.id)}" data-delete-question="${escapeHTML(record.question)}"
                            onclick="event.stopPropagation(); window.showDeleteConfirm(this.dataset.deleteId, this.dataset.deleteQuestion)"
                            class="px-4 h-full text-white text-sm font-medium hover:bg-red-600 transition-colors">
                        删除
                    </button>
                    <button onclick="event.stopPropagation(); window.cancelSwipe('${escapeHTML(record.id)}')"
                            class="px-4 h-full bg-gray-500 text-white text-sm font-medium hover:bg-gray-600 transition-colors">
                        取消
                    </button>
                </div>
            </div>
        `).join('');
        
        // 添加左滑监听器
        setTimeout(() => {
            addSwipeListeners();
        }, 100);
    }

    // 删除历史记录
    async deleteRecord(recordId) {
        try {
            // 优先使用存储管理器
            if (this.storageManager) {
                const success = await this.storageManager.deleteRecord(recordId);
                if (success) {
                    this.updateHistoryDisplay();
                    if (window.toast) toast.success(t('toast.recordDeleted'));
                    return;
                }
            }
            
            // 备用方案：使用localStorage
            const history = await this.getHistory();
            const filteredHistory = history.filter(record => record.id !== recordId);
            localStorage.setItem(this.storageKey, JSON.stringify(filteredHistory));
            this.updateHistoryDisplay();
            if (window.toast) toast.success(t('toast.recordDeleted'));
        } catch (error) {
            console.error('删除历史记录失败:', error);
            if (window.toast) toast.error(t('toast.deleteFailed') + ': ' + error.message);
        }
    }

    // 清空所有历史记录
    clearHistory() {
        window.showConfirm(
            '清空历史记录',
            '确定要清空所有历史记录吗？此操作不可恢复。',
            async () => {
                try {
                    // 先创建备份
                    if (this.storageManager) {
                        await this.storageManager.createBackup('before_clear_all');
                        await this.storageManager.clearAllData();
                    } else {
                        // 备用方案
                        localStorage.removeItem(this.storageKey);
                    }
                    
                    this.updateHistoryDisplay();
                } catch (error) {
                    console.error('清空历史记录失败:', error);
                }
            }
        );
    }
}

// 创建历史记录管理实例
const hexagramHistory = new HexagramHistory();

// 确保全局可访问
window.hexagramHistory = hexagramHistory;

// 查看卦象详情 - 简化版本
window.viewHexagramDetail = async function(recordId) {
    try {
        const history = await hexagramHistory.getHistory();

        const record = history.find(r => r.id === recordId);

        if (!record) {
            console.error('未找到历史记录，ID:', recordId);
            return;
        }

        // 恢复问题显示
    const questionDisplay = document.getElementById('question-display');
    if (questionDisplay) {
        questionDisplay.textContent = record.question;
    }

    // 恢复卦象名称
    const originalNameDiv = document.getElementById('original-name');
    const changedNameDiv = document.getElementById('changed-name');
    if (originalNameDiv) originalNameDiv.textContent = record.originalName;
    if (changedNameDiv) changedNameDiv.textContent = record.changedName;

    // 恢复卦象HTML（如果有保存的HTML）
    if (record.hexagramHTML) {
        const originalHexagram = document.getElementById('original-hexagram');
        const changedHexagram = document.getElementById('changed-hexagram');
        const hexagramTable = document.getElementById('hexagram-table-body');
        
        if (originalHexagram && record.hexagramHTML.originalHexagram) {
            originalHexagram.innerHTML = record.hexagramHTML.originalHexagram;
        }
        if (changedHexagram && record.hexagramHTML.changedHexagram) {
            changedHexagram.innerHTML = record.hexagramHTML.changedHexagram;
        }
        if (hexagramTable && record.hexagramHTML.hexagramTable) {
            hexagramTable.innerHTML = record.hexagramHTML.hexagramTable;
        }
        
        // 恢复神煞信息（英文模式下隐藏）
        const _restoreIsEn = window.i18n?.getLanguage() === 'en';
        const _spiritsContainer = document.querySelector('.spirits-info');
        if (_restoreIsEn) {
            if (_spiritsContainer) _spiritsContainer.style.display = 'none';
        } else {
            if (_spiritsContainer) _spiritsContainer.style.display = '';
            if (record.hexagramHTML.spiritsInfo) {
                const spiritsRow1 = document.getElementById('spirits-row1');
                const spiritsRow2 = document.getElementById('spirits-row2');
                if (spiritsRow1) spiritsRow1.textContent = record.hexagramHTML.spiritsInfo.row1;
                if (spiritsRow2) spiritsRow2.textContent = record.hexagramHTML.spiritsInfo.row2;
            }
        }
    } else {
        // 如果没有保存HTML，重新生成
        const hexagramData = {
            lines: record.lines,
            originalName: record.originalName,
            changedName: record.changedName,
            question: record.question
        };
        await displayHexagrams(hexagramData);
        generateHexagramTable(hexagramData);
        generateSpiritsInfo();
    }
    
    // 恢复时间信息
    const divinationTime = document.getElementById('divination-time');
    const lunarInfo = document.getElementById('lunar-info');
    const _historyIsEn = window.i18n?.getLanguage() === 'en';
    if (divinationTime) {
        divinationTime.textContent = _historyIsEn
            ? `Cast: ${record.date} ${record.time}`
            : `起卦时间：${record.date} ${record.time}`;
    }
    if (lunarInfo) {
        if (_historyIsEn) {
            lunarInfo.style.display = 'none';
        } else {
            lunarInfo.style.display = '';
            lunarInfo.innerHTML = `<span>${escapeHTML(record.lunarDate)}</span><span>${escapeHTML(record.xuankong)}</span>`;
        }
    }

    // 恢复解析结果
    const analysisResult = document.getElementById('analysis-result');
    if (analysisResult) {
        // 始终使用转义版本，不信任localStorage中的原始HTML
        const analysisText = record.analysis || '暂无解析';
        const cleanAnalysis = analysisText.replace(/<[^>]*>/g, '').trim();
        analysisResult.innerHTML = `
            <div class="analysis-content">
                <h4 class="font-medium mb-2">卦象解析</h4>
                <p class="text-gray-700 leading-relaxed">${escapeHTML(cleanAnalysis)}</p>
                <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p class="text-sm text-blue-800">
                        <strong>占卜时间：</strong>${escapeHTML(record.date)} ${escapeHTML(record.time)}<br>
                        <strong>农历：</strong>${escapeHTML(record.lunarDate)}<br>
                        <strong>旬空：</strong>${escapeHTML(record.xuankong)}
                    </p>
                </div>
            </div>
        `;
        
        // 确保分析结果可见
        analysisResult.classList.remove('hidden');
        
        // 隐藏加载状态
        const loadingElement = document.getElementById('loading-analysis');
        if (loadingElement) {
            loadingElement.classList.add('hidden');
        }
    }

    // 切换到分析页面
    // 记录当前页面到导航历史（历史页面）
    const currentHistoryScreen = document.getElementById('history-screen');
    if (currentHistoryScreen) {
        navigationHistory.push(currentHistoryScreen);
    }
    
    // 隐藏所有页面
    const allScreens = ['welcome-screen', 'divination-input-screen', 'analysis-screen', 'history-screen', 'profile-screen'];
    allScreens.forEach(screenId => {
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.style.display = 'none';
            screen.classList.add('opacity-0', 'pointer-events-none');
        }
    });
    
    // 显示分析页面
    const targetAnalysisScreen = document.getElementById('analysis-screen');
    if (targetAnalysisScreen) {
        targetAnalysisScreen.style.display = 'block';
        targetAnalysisScreen.classList.remove('opacity-0', 'pointer-events-none');
        
        // 更新当前页面状态
        currentScreen = targetAnalysisScreen;
        
        // 更新标题和返回按钮
        const screenTitle = document.getElementById('screen-title');
        const backButton = document.getElementById('back-button');
        if (screenTitle) {
            screenTitle.textContent = t('nav.analysisResult');
        }
        if (backButton) {
            backButton.style.visibility = 'visible';
        }
        
    } else {
        console.error('未找到 analysis-screen 元素');
    }
    
    } catch (error) {
        console.error('跳转过程中发生错误:', error);
    }
};

// 更新历史记录中最新记录的分析内容
async function updateHistoryAnalysis(analysisContent) {
    try {
        const history = await hexagramHistory.getHistory();
        if (history.length > 0) {
            // 提取纯文本内容，去掉HTML标签
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = analysisContent;
            let plainText = tempDiv.textContent || tempDiv.innerText || '';
            
            // 直接提取最核心的分析内容
            plainText = plainText.trim();
            
            // 如果文本包含多个句子，选择最有意义的一句
            const sentences = plainText.split(/[。！？.!?]/).filter(s => s.trim().length > 10);
            if (sentences.length > 0) {
                // 优先选择包含关键词的句子
                let bestSentence = sentences.find(s => 
                    s.includes('预示') || 
                    s.includes('象征') || 
                    s.includes('表示') || 
                    s.includes('意味') ||
                    s.includes('建议') ||
                    s.includes('转变')
                );
                
                // 如果没找到关键句子，取第一个有意义的句子
                if (!bestSentence) {
                    bestSentence = sentences[0];
                }
                
                plainText = bestSentence.trim();
                if (!plainText.endsWith('。') && !plainText.endsWith('！') && !plainText.endsWith('？')) {
                    plainText += '。';
                }
            }
            
            // 如果处理后文本太短，使用简化的分析
            if (plainText.length < 10) {
                const originalName = history[0].originalName;
                const changedName = history[0].changedName;
                plainText = `从「${originalName}」到「${changedName}」的转变，预示着事物的发展趋势，建议保持耐心，顺应自然规律。`;
            }
            
            // 更新最新的记录
            const latestRecord = history[0];
            latestRecord.analysis = plainText;
            
            // 如果是完整结果记录，也保存完整的分析HTML
            if (latestRecord.hexagramHTML) {
                const analysisResult = document.getElementById('analysis-result');
                if (analysisResult) {
                    latestRecord.analysisHTML = analysisResult.innerHTML;
                }
            }
            
            // 保存回localStorage
            localStorage.setItem('hexagram_history', JSON.stringify(history));
            
            // 更新显示
            hexagramHistory.updateHistoryDisplay();
            
        }
    } catch (error) {
        console.error('更新历史记录分析失败:', error);
    }
}

// 保存完整的解卦结果到历史记录
async function saveCompleteHexagramResult(hexagram) {
    const questionInput = document.getElementById('question');
    const question = questionInput ? questionInput.value.trim() : '未记录问题';
    
    // 如果问题为空，使用默认问题
    const finalQuestion = (question && question.trim() !== '') ? question : `占卜记录 ${new Date().toLocaleString('zh-CN')}`;
    
    if (hexagram && hexagram.originalName && hexagram.changedName) {
        // 获取当前页面的完整状态
        const completeResult = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('zh-CN'),
            time: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
            question: finalQuestion,
            
            // 卦象基本信息
            originalName: hexagram.originalName,
            changedName: hexagram.changedName,
            lines: hexagram.lines,
            
            // 页面完整内容
            hexagramHTML: {
                originalHexagram: document.getElementById('original-hexagram')?.innerHTML || '',
                changedHexagram: document.getElementById('changed-hexagram')?.innerHTML || '',
                hexagramTable: document.getElementById('hexagram-table-body')?.innerHTML || '',
                spiritsInfo: {
                    row1: document.getElementById('spirits-row1')?.textContent || '',
                    row2: document.getElementById('spirits-row2')?.textContent || ''
                }
            },
            
            // 时间信息
            lunarDate: getLunarDateInfo().lunarDate,
            xuankong: getLunarDateInfo().xuankong,
            
            // 分析结果（稍后更新）
            analysis: '解卦分析正在生成中...'
        };
        
        // 保存到历史记录
        if (typeof hexagramHistory !== 'undefined') {
            try {
                await hexagramHistory.saveCompleteResult(completeResult);
            } catch (error) {
                console.error('保存历史记录失败:', error);
            }
        } else {
            console.error('hexagramHistory 未定义');
        }
    }
}

// 页面加载时初始化历史显示
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化，确保DOM完全加载
    setTimeout(async () => {
        if (hexagramHistory) {
            await hexagramHistory.updateHistoryDisplay();
        }
        
        // 初始化存储统计
        if (window.refreshStorageStats) {
            refreshStorageStats();
        }
    }, 500);
});


// 最简单的跳转函数
window.jumpToDetail = async function(recordId) {
    try {
        // 获取历史记录
        const history = await hexagramHistory.getHistory();

        const record = history.find(r => r.id === recordId);

        if (!record) {
            console.error('未找到记录，ID:', recordId);
            return;
        }

        // 安全地恢复内容
        const questionDisplay = document.getElementById('question-display');
        const originalName = document.getElementById('original-name');
        const changedName = document.getElementById('changed-name');
        const analysisResult = document.getElementById('analysis-result');
        const divinationTime = document.getElementById('divination-time');
        const lunarInfo = document.getElementById('lunar-info');

        if (questionDisplay) questionDisplay.textContent = record.question;
        if (originalName) originalName.textContent = record.originalName;
        if (changedName) changedName.textContent = record.changedName;

        if (analysisResult) {
            analysisResult.innerHTML = `
                <div class="analysis-content">
                    <h4 class="font-medium mb-2">卦象解析</h4>
                    <p class="text-gray-700 leading-relaxed">${escapeHTML(record.analysis)}</p>
                </div>
            `;
            analysisResult.classList.remove('hidden');
        }

        if (divinationTime) divinationTime.textContent = `起卦时间：${record.date} ${record.time}`;
        if (lunarInfo) lunarInfo.innerHTML = `<span>${escapeHTML(record.lunarDate)}</span><span>${escapeHTML(record.xuankong)}</span>`;

        // 记录来源页面
        window.previousScreen = 'history-screen';

        // 切换页面
        const historyScreen = document.getElementById('history-screen');
        const analysisScreen = document.getElementById('analysis-screen');
        const screenTitle = document.getElementById('screen-title');
        const backBtn = document.getElementById('back-button');

        if (historyScreen) historyScreen.style.display = 'none';
        if (analysisScreen) {
            analysisScreen.style.display = 'block';
            analysisScreen.classList.remove('opacity-0', 'pointer-events-none');
        }
        if (screenTitle) screenTitle.textContent = t('nav.analysisResult');
        if (backBtn) backBtn.style.visibility = 'visible';

    } catch (error) {
        console.error('跳转失败:', error);
    }
};

// 确认弹窗功能
window.showConfirm = function(title, message, onConfirm) {
    const modal = document.getElementById('confirm-modal');
    const titleEl = document.getElementById('confirm-title');
    const messageEl = document.getElementById('confirm-message');
    const cancelBtn = document.getElementById('confirm-cancel');
    const okBtn = document.getElementById('confirm-ok');
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    modal.classList.remove('hidden');
    modal.classList.add('modal-enter');
    modal.addEventListener('animationend', () => modal.classList.remove('modal-enter'), { once: true });

    // 移除之前的事件监听器
    const newCancelBtn = cancelBtn.cloneNode(true);
    const newOkBtn = okBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
    okBtn.parentNode.replaceChild(newOkBtn, okBtn);
    
    // 添加新的事件监听器
    newCancelBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    newOkBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        if (onConfirm) onConfirm();
    });
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
};

// 显示删除单条记录确认
window.showDeleteConfirm = function(recordId, question) {
    const shortQuestion = question.length > 20 ? question.substring(0, 20) + '...' : question;
    showConfirm(
        '删除记录',
        `确定要删除"${shortQuestion}"这条记录吗？`,
        () => {
            deleteSingleRecord(recordId);
        }
    );
};

// 删除单条记录
async function deleteSingleRecord(recordId) {
    try {
        // 播放滑出动画
        const cardEl = document.querySelector(`.history-card-container[data-record-id="${recordId}"]`);
        if (cardEl) {
            cardEl.classList.add('history-card-removing');
            await new Promise(resolve => cardEl.addEventListener('animationend', resolve, { once: true }));
        }

        const history = await hexagramHistory.getHistory();
        const filteredHistory = history.filter(record => record.id !== recordId);

        localStorage.setItem(hexagramHistory.storageKey, JSON.stringify(filteredHistory));

        // 重新显示历史记录
        hexagramHistory.updateHistoryDisplay();

    } catch (error) {
        console.error('删除记录失败:', error);
    }
}

// 左滑删除功能
let touchStartX = 0;
let touchStartY = 0;
let isSwiping = false;

function addSwipeListeners() {
    const containers = document.querySelectorAll('.history-card-container');
    
    containers.forEach(container => {
        const card = container.querySelector('.glass-card');
        const deletePanel = container.querySelector('.absolute');
        const recordId = container.getAttribute('data-record-id');
        
        // 触摸开始
        card.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isSwiping = false;
        });
        
        // 触摸移动
        card.addEventListener('touchmove', (e) => {
            if (!touchStartX) return;
            
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const deltaX = touchStartX - touchX;
            const deltaY = Math.abs(touchStartY - touchY);
            
            // 判断是否为水平滑动
            if (Math.abs(deltaX) > 10 && deltaY < 50) {
                isSwiping = true;
                e.preventDefault();
                
                // 左滑显示删除按钮
                if (deltaX > 0 && deltaX < 120) {
                    card.style.transform = `translateX(-${deltaX}px)`;
                    deletePanel.style.transform = `translateX(${120 - deltaX}px)`;
                } else if (deltaX >= 120) {
                    card.style.transform = 'translateX(-120px)';
                    deletePanel.style.transform = 'translateX(0px)';
                }
            }
        });
        
        // 触摸结束
        card.addEventListener('touchend', (e) => {
            if (isSwiping) {
                const touchX = e.changedTouches[0].clientX;
                const deltaX = touchStartX - touchX;
                
                // 如果滑动距离超过60px，显示删除按钮
                if (deltaX > 60) {
                    card.style.transform = 'translateX(-120px)';
                    deletePanel.style.transform = 'translateX(0px)';
                } else {
                    // 否则回弹
                    card.style.transform = 'translateX(0px)';
                    deletePanel.style.transform = 'translateX(120px)';
                }
                
                // 阻止点击事件
                e.preventDefault();
                e.stopPropagation();
            }
            
            touchStartX = 0;
            touchStartY = 0;
            isSwiping = false;
        });
        
        // 鼠标事件（桌面端）
        let mouseStartX = 0;
        let isMouseSwiping = false;
        
        card.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isMouseSwiping = false;
        });
        
        card.addEventListener('mousemove', (e) => {
            if (mouseStartX && e.buttons === 1) {
                const deltaX = mouseStartX - e.clientX;
                
                if (Math.abs(deltaX) > 10) {
                    isMouseSwiping = true;
                    
                    if (deltaX > 0 && deltaX < 120) {
                        card.style.transform = `translateX(-${deltaX}px)`;
                        deletePanel.style.transform = `translateX(${120 - deltaX}px)`;
                    } else if (deltaX >= 120) {
                        card.style.transform = 'translateX(-120px)';
                        deletePanel.style.transform = 'translateX(0px)';
                    }
                }
            }
        });
        
        card.addEventListener('mouseup', (e) => {
            if (isMouseSwiping) {
                const deltaX = mouseStartX - e.clientX;
                
                if (deltaX > 60) {
                    card.style.transform = 'translateX(-120px)';
                    deletePanel.style.transform = 'translateX(0px)';
                } else {
                    card.style.transform = 'translateX(0px)';
                    deletePanel.style.transform = 'translateX(120px)';
                }
                
                e.preventDefault();
                e.stopPropagation();
            }
            
            mouseStartX = 0;
            isMouseSwiping = false;
        });
    });
}

// 取消滑动
window.cancelSwipe = function(recordId) {
    const container = document.querySelector(`[data-record-id="${recordId}"]`);
    if (container) {
        const card = container.querySelector('.glass-card');
        const deletePanel = container.querySelector('.absolute');
        
        card.style.transform = 'translateX(0px)';
        deletePanel.style.transform = 'translateX(120px)';
    }
};

// 第一个SettingsManager类定义已删除，使用后面的版本

// 设置管理器将在后面定义

// 显示关于页面
window.showAboutPage = function() {
    const aboutScreen = document.getElementById('about-screen');
    const profileScreen = document.getElementById('profile-screen');
    
    if (!aboutScreen) {
        console.error('About screen not found');
        return;
    }
    
    if (window.__showScreen) {
        window.__showScreen(aboutScreen, t('profile.about'));
    } else {
        aboutScreen.style.display = 'flex';
        aboutScreen.classList.remove('opacity-0', 'pointer-events-none');
    }

    const navProfile = document.getElementById('nav-profile');
    if (navProfile) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        navProfile.classList.add('active');
    }

    window.previousScreen = 'profile-screen';
};

// 显示设置页面
window.showSettingsScreen = function() {
    const settingsScreen = document.getElementById('settings-screen');
    const profileScreen = document.getElementById('profile-screen');
    
    if (settingsScreen) {
        if (window.__showScreen) {
            window.__showScreen(settingsScreen, t('settings.title'));
        } else {
            settingsScreen.style.display = 'flex';
            settingsScreen.classList.remove('opacity-0', 'pointer-events-none');
        }

        const navProfile = document.getElementById('nav-profile');
        if (navProfile) {
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));
            navProfile.classList.add('active');
        }

        window.previousScreen = 'profile-screen';

        // 恢复已保存的设置值
        const savedLimit = localStorage.getItem('history-limit');
        if (savedLimit) {
            const select = document.getElementById('history-limit-select');
            if (select) select.value = savedLimit;
        }
        const savedAutoSave = localStorage.getItem('auto-save-question');
        if (savedAutoSave !== null) {
            const checkbox = document.getElementById('auto-save-question');
            if (checkbox) checkbox.checked = savedAutoSave === 'true';
        }
        // Restore language setting
        const langSelect = document.getElementById('language-select');
        if (langSelect && window.i18n) {
            langSelect.value = window.i18n.getLanguage();
        }
    }
};

// 显示帮助与反馈页面
window.showHelpScreen = function() {
    const helpScreen = document.getElementById('help-screen');
    if (!helpScreen) return;
    if (window.__showScreen) {
        window.__showScreen(helpScreen, '帮助与反馈');
    } else {
        helpScreen.style.display = 'flex';
        helpScreen.classList.remove('opacity-0', 'pointer-events-none');
    }
    const navProfile = document.getElementById('nav-profile');
    if (navProfile) {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        navProfile.classList.add('active');
    }
    window.previousScreen = 'profile-screen';
};

// ==================== 帮助与反馈 - 在线反馈表单 ====================
let _feedbackType = '';

window.toggleFeedbackForm = function() {
    const container = document.getElementById('feedback-form-container');
    const chevron = document.getElementById('feedback-form-chevron');
    if (!container) return;
    const isHidden = container.classList.contains('hidden');
    container.classList.toggle('hidden');
    if (chevron) {
        chevron.style.transform = isHidden ? 'rotate(90deg)' : '';
    }
};

window.selectFeedbackType = function(btn) {
    document.querySelectorAll('.feedback-type-btn').forEach(b => {
        b.classList.remove('bg-gray-900', 'text-white', 'border-gray-900');
        b.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
    });
    btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
    btn.classList.add('bg-gray-900', 'text-white', 'border-gray-900');
    _feedbackType = btn.dataset.type;
};

window.submitFeedback = function() {
    const textEl = document.getElementById('feedback-text');
    const text = textEl ? textEl.value.trim() : '';
    if (!text) {
        if (window.toast) toast.warning('请填写反馈内容');
        return;
    }
    // 存入本地
    try {
        const feedbacks = JSON.parse(localStorage.getItem('user_feedbacks') || '[]');
        feedbacks.push({ type: _feedbackType || 'other', content: text, time: new Date().toISOString() });
        localStorage.setItem('user_feedbacks', JSON.stringify(feedbacks));
    } catch (e) { /* ignore */ }
    // 重置表单
    if (textEl) textEl.value = '';
    _feedbackType = '';
    document.querySelectorAll('.feedback-type-btn').forEach(b => {
        b.classList.remove('bg-gray-900', 'text-white', 'border-gray-900');
        b.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
    });
    // 收起表单
    const container = document.getElementById('feedback-form-container');
    const chevron = document.getElementById('feedback-form-chevron');
    if (container) container.classList.add('hidden');
    if (chevron) chevron.style.transform = '';
    if (window.toast) toast.success('感谢您的反馈，我们将尽快处理！');
};

// 设置功能函数
window.changeHistoryLimit = function(limit) {
    localStorage.setItem('history-limit', limit);
    if (window.toast) toast.success(t('toast.historyLimitUpdated'));
};

window.toggleAutoSaveQuestion = function(enabled) {
    localStorage.setItem('auto-save-question', enabled ? 'true' : 'false');
    if (window.toast) toast.success(enabled ? '已开启自动保存问题' : '已关闭自动保存问题');
};

// 数据管理功能函数
window.refreshStorageStats = async function() {
    try {
        if (window.storageManager) {
            const stats = await window.storageManager.getStorageStats();
            if (stats) {
                document.getElementById('record-count').textContent = stats.recordCount;
                document.getElementById('backup-count').textContent = stats.backupCount;
                document.getElementById('storage-size').textContent = stats.totalSize;
                document.getElementById('sync-status').textContent = 
                    `${stats.syncedCount}/${stats.recordCount} 已同步`;
                
            }
        } else {
            // 备用统计
            const localData = localStorage.getItem('hexagram_history');
            const records = localData ? JSON.parse(localData) : [];
            document.getElementById('record-count').textContent = records.length;
            document.getElementById('backup-count').textContent = '0';
            document.getElementById('storage-size').textContent = 
                window.storageManager ? window.storageManager.formatBytes(localData?.length || 0) : '未知';
            document.getElementById('sync-status').textContent = '未同步';
        }
    } catch (error) {
        console.error('刷新存储统计失败:', error);
    }
};

window.createManualBackup = async function() {
    try {
        if (window.storageManager) {
            const backupId = await window.storageManager.createBackup('manual');
            if (backupId) {
                alert(`备份创建成功！\n备份ID: ${backupId}\n时间: ${new Date(backupId).toLocaleString()}`);
                refreshStorageStats();
            } else {
                alert('备份创建失败，请重试');
            }
        } else {
            alert('存储管理器未初始化，无法创建备份');
        }
    } catch (error) {
        console.error('创建备份失败:', error);
        alert('创建备份失败: ' + error.message);
    }
};

window.showBackupList = async function() {
    try {
        if (window.storageManager) {
            const backups = await window.storageManager.getAllBackups();
            if (backups.length === 0) {
                alert('暂无备份记录');
                return;
            }
            
            let message = '备份列表:\n\n';
            backups.forEach((backup, index) => {
                const date = new Date(backup.timestamp).toLocaleString();
                message += `${index + 1}. ${date}\n`;
                message += `   原因: ${backup.reason}\n`;
                message += `   记录数: ${backup.recordCount}\n\n`;
            });
            
            const choice = prompt(message + '输入序号恢复备份 (取消则不恢复):');
            if (choice) {
                const index = parseInt(choice) - 1;
                if (index >= 0 && index < backups.length) {
                    const confirmed = confirm(`确定要恢复备份吗？\n时间: ${new Date(backups[index].timestamp).toLocaleString()}\n这将覆盖当前所有数据！`);
                    if (confirmed) {
                        const success = await window.storageManager.restoreBackup(backups[index].timestamp);
                        if (success) {
                            alert('备份恢复成功！页面将刷新...');
                            location.reload();
                        } else {
                            alert('备份恢复失败，请重试');
                        }
                    }
                }
            }
        } else {
            alert('存储管理器未初始化，无法查看备份');
        }
    } catch (error) {
        console.error('查看备份失败:', error);
        alert('查看备份失败: ' + error.message);
    }
};

window.syncToCloud = async function() {
    try {
        if (window.storageManager) {
            await window.storageManager.syncToCloud();
            alert('云端同步完成！');
            refreshStorageStats();
        } else {
            alert('存储管理器未初始化，无法同步');
        }
    } catch (error) {
        console.error('云端同步失败:', error);
        alert('云端同步失败: ' + error.message);
    }
};

window.syncFromCloud = async function() {
    try {
        if (window.storageManager) {
            await window.storageManager.syncFromCloud();
            alert('云端数据同步完成！');
            refreshStorageStats();
            // 刷新历史显示
            if (window.hexagramHistory) {
                window.hexagramHistory.updateHistoryDisplay();
            }
        } else {
            alert('存储管理器未初始化，无法同步');
        }
    } catch (error) {
        console.error('云端数据同步失败:', error);
        alert('云端数据同步失败: ' + error.message);
    }
};

window.exportData = async function() {
    try {
        let records = [];
        if (window.storageManager) {
            records = await window.storageManager.getAllRecords();
        } else {
            const localData = localStorage.getItem('hexagram_history');
            records = localData ? JSON.parse(localData) : [];
        }
        
        const exportData = {
            exportTime: new Date().toISOString(),
            version: '1.0',
            recordCount: records.length,
            records: records
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `贞明数据备份_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('数据导出失败:', error);
        alert('数据导出失败: ' + error.message);
    }
};

window.importData = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        try {
            const text = await file.text();
            const importData = JSON.parse(text);
            
            if (!importData.records || !Array.isArray(importData.records)) {
                throw new Error('无效的数据格式');
            }
            
            const confirmed = confirm(`确定要导入数据吗？\n文件: ${file.name}\n记录数: ${importData.recordCount}\n导出时间: ${new Date(importData.exportTime).toLocaleString()}\n\n这将覆盖当前所有数据！`);
            
            if (confirmed) {
                // 先创建当前数据的备份
                if (window.storageManager) {
                    await window.storageManager.createBackup('before_import');
                    await window.storageManager.clearAllData();
                    
                    // 导入新数据
                    for (const record of importData.records) {
                        await window.storageManager.saveRecord(record, false);
                    }
                } else {
                    // 备用方案
                    localStorage.setItem('hexagram_history', JSON.stringify(importData.records));
                }
                
                alert('数据导入成功！页面将刷新...');
                location.reload();
            }
        } catch (error) {
            console.error('数据导入失败:', error);
            alert('数据导入失败: ' + error.message);
        }
    };
    
    input.click();
};

// 设置初始化已移到主要的DOMContentLoaded事件中
// Toast系统已移到文件开头

// AI配置已移至后端 server/.env
let currentHexagramData = null; // 保存当前卦象数据用于重新分析

// 重新生成分析
window.regenerateAnalysis = async function() {
    if (!currentHexagramData) {
        return;
    }

    const loadingDiv = document.getElementById('loading-analysis');
    const resultDiv = document.getElementById('analysis-result');

    try {
        // 显示加载状态
        loadingDiv.classList.remove('hidden');
        resultDiv.classList.add('hidden');

        toast.info(t('analysis.reanalyzing'));

        // 确保 currentHexagramData 含有 lineDetails（历史跳转时可能缺少）
        if (currentHexagramData && !currentHexagramData.lineDetails && currentHexagramData.lines) {
            const _li = getLunarDateInfo(new Date());
            const _dg = _li.dayGan || '甲';
            const _mz = _li.monthZhi || '子';
            currentHexagramData.lunarDate   = currentHexagramData.lunarDate   || _li.lunarDate;
            currentHexagramData.xuankong    = currentHexagramData.xuankong    || _li.xuankong;
            currentHexagramData.dayGan      = currentHexagramData.dayGan      || _dg;
            currentHexagramData.monthZhi    = currentHexagramData.monthZhi    || _mz;
            const _pp = window.getPaipanData ? window.getPaipanData(currentHexagramData.lines, _dg, _mz) : null;
            currentHexagramData.lineDetails = _pp ? _pp.lineDetails : currentHexagramData.lines.map(l => ({type:l.type, changing:l.type==='laoyang'||l.type==='laoyin'}));
            currentHexagramData.paipan      = _pp ? {palaceName:_pp.palaceName, palaceElement:_pp.palaceElement, shiPos:_pp.shiPos, yingPos:_pp.yingPos} : null;
        }

        // 1. 尝试后端
        let analysis = null;
        try {
            const body = {
                question:     currentHexagramData.question,
                originalName: currentHexagramData.originalName,
                changedName:  currentHexagramData.changedName,
                lang:         window.i18n?.getLanguage() || 'zh',
                lineDetails:  currentHexagramData.lineDetails || [],
                lunarDate:    currentHexagramData.lunarDate   || '',
                xuankong:     currentHexagramData.xuankong    || '',
                dayGan:       currentHexagramData.dayGan      || '',
                monthZhi:     currentHexagramData.monthZhi    || '',
                paipan:       currentHexagramData.paipan      || null
            };
            const apiBase = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE) || '';
            const resp = await fetch(`${apiBase}/api/analysis`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (resp.ok) {
                const data = await resp.json();
                console.log('[DEBUG regenerate Frontend received] success:', data.success, '| source:', data.source, '| analysis length:', data.analysis?.length, '| 前50字符:', data.analysis?.substring(0, 50));
                if (data.success && data.analysis) {
                    analysis = data.analysis;
                    console.log('[regenerateAnalysis] 后端返回成功');
                } else {
                    console.warn('[DEBUG regenerate] data 异常:', JSON.stringify(data).substring(0, 200));
                }
            }
        } catch (e) {
            console.warn('[regenerateAnalysis] 后端不可达:', e.message);
        }

        // 2. fallback 直连
        if (!analysis && window.aiService) {
            analysis = await window.aiService.analyzeWithAI(currentHexagramData);
        }

        if (!analysis) throw new Error('解卦服务暂时不可用');

        console.log('[DEBUG regenerate Rendering to DOM] analysis 长度:', analysis.length, '| 前80字符:', analysis.substring(0, 80));
        // 显示结果
        loadingDiv.classList.add('hidden');
        resultDiv.classList.remove('hidden');
        resultDiv.innerHTML = analysis;

        // fade-in 动画
        resultDiv.classList.add('analysis-fade-in');
        resultDiv.classList.remove('visible');
        requestAnimationFrame(() => {
            resultDiv.classList.add('visible');
        });

        toast.success(t('analysis.complete'));

        // 更新历史记录中的分析内容
        if (window.hexagramHistory && currentHexagramData.recordId) {
            updateHistoryAnalysisById(currentHexagramData.recordId, analysis);
        }

    } catch (error) {
        loadingDiv.classList.add('hidden');
        resultDiv.classList.remove('hidden');
        resultDiv.innerHTML = `
            <div class="bg-amber-50 border border-amber-200 rounded-md p-4">
                <h4 class="text-amber-800 font-medium mb-2">大师正在闭关</h4>
                <p class="text-amber-700 text-sm">${escapeHTML(error.message)}</p>
                <p class="text-gray-500 text-xs mt-2">请再次点击"重新分析"</p>
            </div>
        `;
        toast.error(t('analysis.failed') + ': ' + error.message);
    }
};

// 更新历史记录中的分析内容
async function updateHistoryAnalysisById(recordId, analysis) {
    try {
        const history = await window.hexagramHistory.getHistory();
        const record = history.find(r => r.id === recordId);
        
        if (record) {
            record.analysis = analysis;
            
            if (window.storageManager) {
                await window.storageManager.saveRecord(record);
            } else {
                localStorage.setItem('hexagram_history', JSON.stringify(history));
            }
            
        }
    } catch (error) {
        console.error('更新历史记录分析失败:', error);
    }
}

// 简单的返回按钮处理函数
window.handleBackClick = function() {
    const loginScreen = document.getElementById('login-screen');
    const aboutScreen = document.getElementById('about-screen');
    const settingsScreen = document.getElementById('settings-screen');
    const analysisScreen = document.getElementById('analysis-screen');
    const divinationInputScreen = document.getElementById('divination-input-screen');
    const historyScreen = document.getElementById('history-screen');
    const profileScreen = document.getElementById('profile-screen');
    const welcomeScreen = document.getElementById('welcome-screen');

    const isVisible = (el) => !!(el && el.style.display !== 'none' && !el.classList.contains('opacity-0'));

    const setNavActive = (navId) => {
        const nav = document.getElementById(navId);
        if (!nav) return;
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        nav.classList.add('active');
    };

    // 1) 登录页：返回到首页
    if (isVisible(loginScreen)) {
        window.__pendingNavigation = null;
        // 隐藏登录页
        loginScreen.style.display = 'none';
        loginScreen.classList.add('opacity-0', 'pointer-events-none');
        // 显示首页
        if (welcomeScreen) {
            welcomeScreen.style.display = 'flex';
            welcomeScreen.classList.remove('opacity-0', 'pointer-events-none');
        }
        setNavActive('nav-home');
        return;
    }

    // 2) 关于/设置：回到“我的”
    if (isVisible(aboutScreen) || isVisible(settingsScreen)) {
        if (profileScreen && window.__showScreen) {
            window.__showScreen(profileScreen, t('nav.profile'));
        }
        setNavActive('nav-profile');
        window.previousScreen = null;
        return;
    }

    // 3) 解卦结果：按来源返回
    if (isVisible(analysisScreen)) {
        if (window.previousScreen === 'history-screen') {
            if (historyScreen && window.__showScreen) {
                window.__showScreen(historyScreen, t('history.title'), true);
            }
            setNavActive('nav-history');
            window.previousScreen = null;
        } else {
            if (divinationInputScreen && window.__showScreen) {
                window.__showScreen(divinationInputScreen, t('nav.inputHexagram'), true);
            }
            setNavActive('nav-divination');
        }
        return;
    }

    // 4) 其他一级页面：统一回到欢迎页
    if (welcomeScreen && window.__showScreen) {
        window.__showScreen(welcomeScreen, '');
    }
    setNavActive('nav-home');
};

// ==================== 登录相关功能 ====================

// 检查是否需要登录
function checkLoginRequired() {
    const loggedIn = window.authManager && window.authManager.isLoggedIn();
    if (loggedIn) {
        return true; // 已登录，可以继续
    }
    
    // 未登录，显示登录页面
    showLoginScreen();
    return false;
}

// 显示登录页面
function showLoginScreen() {
    const loginScreen = document.getElementById('login-screen');
    const welcomeScreen = document.getElementById('welcome-screen');
    
    if (!loginScreen) {
        console.error('登录页面元素不存在');
        return;
    }
    
    window.__loginReturnScreenId = window.__currentScreenId || 'welcome-screen';

    // 隐藏首页，防止重叠
    if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
        welcomeScreen.classList.add('opacity-0', 'pointer-events-none');
    }

    // 显示登录页面
    loginScreen.style.display = 'flex';
    loginScreen.classList.remove('opacity-0', 'pointer-events-none');
    
    // 绑定登录相关事件
    initLoginEvents();
}

function continueAfterLogin() {
    try {
        const pending = window.__pendingNavigation;
        const screenTitle = document.getElementById('screen-title');

        const loginScreen = document.getElementById('login-screen');
        if (loginScreen) {
            loginScreen.classList.add('opacity-0', 'pointer-events-none');
            setTimeout(() => {
                loginScreen.style.display = 'none';
            }, 300);
        }

        if (pending && pending.screenId) {
            const target = document.getElementById(pending.screenId);
            if (target && window.__showScreen) {
                window.__showScreen(target, pending.title || '');
            }

            if (pending.navId) {
                const nav = document.getElementById(pending.navId);
                if (nav) {
                    const navItems = document.querySelectorAll('.nav-item');
                    navItems.forEach(item => item.classList.remove('active'));
                    nav.classList.add('active');
                }
            }

            window.__pendingNavigation = null;
        } else {
            const welcomeScreen = document.getElementById('welcome-screen');
            if (welcomeScreen && window.__showScreen) {
                window.__showScreen(welcomeScreen, '');
            } else if (screenTitle) {
                screenTitle.textContent = '';
            }
        }
    } catch (error) {
        console.error('continueAfterLogin error:', error);
    }
}

// 初始化登录事件
function initLoginEvents() {
    const submitBtn = document.getElementById('auth-submit-btn');

    // 防止重复绑定
    if (!submitBtn || submitBtn.dataset.bound === 'true') return;
    submitBtn.dataset.bound = 'true';

    let authMode = 'login'; // 'login' | 'register'

    // Tab 切换（供 HTML onclick 调用）
    window.switchAuthTab = function(mode) {
        authMode = mode;
        const loginTab    = document.getElementById('tab-login-btn');
        const registerTab = document.getElementById('tab-register-btn');
        const btn         = document.getElementById('auth-submit-btn');
        const pwdInput    = document.getElementById('login-password');

        if (mode === 'login') {
            loginTab.classList.add('border-gray-900', 'text-gray-900');
            loginTab.classList.remove('border-transparent', 'text-gray-400');
            registerTab.classList.remove('border-gray-900', 'text-gray-900');
            registerTab.classList.add('border-transparent', 'text-gray-400');
            btn.textContent = '登录';
            pwdInput.placeholder = '请输入密码';
            pwdInput.setAttribute('autocomplete', 'current-password');
        } else {
            registerTab.classList.add('border-gray-900', 'text-gray-900');
            registerTab.classList.remove('border-transparent', 'text-gray-400');
            loginTab.classList.remove('border-gray-900', 'text-gray-900');
            loginTab.classList.add('border-transparent', 'text-gray-400');
            btn.textContent = '注册';
            pwdInput.placeholder = '至少 6 位';
            pwdInput.setAttribute('autocomplete', 'new-password');
        }
    };

    submitBtn.addEventListener('click', async () => {
        const email    = (document.getElementById('login-email').value || '').trim();
        const password = document.getElementById('login-password').value || '';

        if (!email)    { alert('请输入邮箱'); return; }
        if (!password) { alert('请输入密码'); return; }

        submitBtn.disabled    = true;
        submitBtn.textContent = authMode === 'login' ? '登录中...' : '注册中...';

        try {
            const result = authMode === 'login'
                ? await window.authManager.login(email, password)
                : await window.authManager.register(email, password);

            if (result.success) {
                updateUserProfile();
                continueAfterLogin();
            }
        } catch (error) {
            submitBtn.disabled    = false;
            submitBtn.textContent = authMode === 'login' ? '登录' : '注册';
            alert(_firebaseErrorMsg(error.code));
        }
    });
}

// 将 Firebase 错误码转成用户可读的中文提示
function _firebaseErrorMsg(code) {
    const map = {
        'auth/invalid-email':          '邮箱格式不正确',
        'auth/user-not-found':         '该邮箱未注册，请先注册',
        'auth/wrong-password':         '密码错误，请重试',
        'auth/invalid-credential':     '邮箱或密码错误',
        'auth/email-already-in-use':   '该邮箱已注册，请直接登录',
        'auth/weak-password':          '密码至少需要 6 位',
        'auth/too-many-requests':      '操作过于频繁，请稍后再试',
        'auth/network-request-failed': '网络错误，请检查连接',
    };
    return map[code] || '操作失败，请重试';
}

// 更新个人中心用户信息
function updateUserProfile() {
    const user = window.authManager.getCurrentUser();
    if (!user) return;

    const usernameElement = document.getElementById('username');
    if (usernameElement) {
        usernameElement.textContent = user.email || '用户';
    }
}

// 退出登录
window.logout = async function() {
    try {
        if (confirm('确定要退出登录吗？')) {
            if (window.authManager && typeof window.authManager.logout === 'function') {
                await window.authManager.logout();
            }
            alert('已退出登录');
            window.location.reload();
        }
    } catch (error) {
        console.error('退出登录出错:', error);
        alert('退出登录失败，请刷新页面重试');
    }
};

// 删除账号（App Store 合规要求）
window.deleteAccount = async function() {
    const t = window.t || ((k) => k);

    const step1 = confirm(t('profile.deleteAccountConfirm'));
    if (!step1) return;

    const step2 = confirm(t('profile.deleteAccountConfirm2'));
    if (!step2) return;

    try {
        if (window.authManager && typeof window.authManager.deleteAccount === 'function') {
            await window.authManager.deleteAccount();
        }
        alert(t('profile.deleteAccountSuccess'));
        window.location.reload();
    } catch (error) {
        console.error('删除账号出错:', error);
        if (error.code === 'auth/requires-recent-login') {
            alert(t('profile.deleteAccountRelogin'));
        } else {
            alert('Delete failed. Please try again.');
        }
    }
};


// ==================== 用户认证系统（Firebase Email/Password） ====================
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    deleteUser,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from './src/firebase.js';

class AuthManager {
    constructor() {
        this.currentUser = null;

        // 立即从本地缓存恢复状态，避免页面加载时的短暂"未登录"闪烁
        this._loadFromStorage();

        // 监听 Firebase 登录态变化（异步，作为权威数据源）
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                this.currentUser = {
                    id: firebaseUser.uid,
                    email: firebaseUser.email,
                    loginType: 'email'
                };
                localStorage.setItem('zhenming_user', JSON.stringify(this.currentUser));
            } else {
                this.currentUser = null;
                localStorage.removeItem('zhenming_user');
            }
        });
    }

    _loadFromStorage() {
        try {
            const raw = localStorage.getItem('zhenming_user');
            if (raw) this.currentUser = JSON.parse(raw);
        } catch (e) {
            localStorage.removeItem('zhenming_user');
        }
    }

    isLoggedIn() {
        return this.currentUser !== null || auth.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    /** 注册新账号 */
    async register(email, password) {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const user = credential.user;
        this.currentUser = { id: user.uid, email: user.email, loginType: 'email' };
        localStorage.setItem('zhenming_user', JSON.stringify(this.currentUser));
        return { success: true, user: this.currentUser };
    }

    /** 登录已有账号 */
    async login(email, password) {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const user = credential.user;
        this.currentUser = { id: user.uid, email: user.email, loginType: 'email' };
        localStorage.setItem('zhenming_user', JSON.stringify(this.currentUser));
        return { success: true, user: this.currentUser };
    }

    /** 退出登录 */
    async logout() {
        await signOut(auth);
        this.currentUser = null;
        localStorage.removeItem('zhenming_user');
    }

    /**
     * 永久删除当前用户的 Firebase 账号并清理本地数据。
     * 若 Firebase 抛出 auth/requires-recent-login，调用方需提示用户重新登录后再试。
     */
    async deleteAccount() {
        const user = auth.currentUser;
        if (!user) throw new Error('No authenticated user');
        await deleteUser(user);
        this.currentUser = null;
        localStorage.clear();
        sessionStorage.clear();
    }
}

window.authManager = new AuthManager();

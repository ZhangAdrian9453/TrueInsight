/**
 * 数据持久化管理器
 * 支持多层次存储：localStorage -> IndexedDB -> 云端备份
 */
class StorageManager {
    constructor() {
        this.dbName = 'ZhenMingDB';
        this.dbVersion = 1;
        this.storeName = 'hexagram_records';
        this.db = null;
        this.isOnline = navigator.onLine;
        
        // 监听网络状态
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncToCloud();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
        
        this.initDB();
    }
    
    /**
     * 初始化IndexedDB
     */
    async initDB() {
        try {
            this.db = await this.openDB();
            console.log('IndexedDB 初始化成功');
            
            // 迁移localStorage数据到IndexedDB
            await this.migrateFromLocalStorage();
            
            // 如果在线，尝试同步云端数据
            if (this.isOnline) {
                this.syncFromCloud();
            }
        } catch (error) {
            console.error('IndexedDB 初始化失败，回退到localStorage:', error);
        }
    }
    
    /**
     * 打开IndexedDB数据库
     */
    openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // 创建对象存储
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { 
                        keyPath: 'id',
                        autoIncrement: false 
                    });
                    
                    // 创建索引
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                    store.createIndex('date', 'date', { unique: false });
                    store.createIndex('question', 'question', { unique: false });
                }
                
                // 创建设置存储
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', { keyPath: 'key' });
                }
                
                // 创建备份存储
                if (!db.objectStoreNames.contains('backups')) {
                    const backupStore = db.createObjectStore('backups', { 
                        keyPath: 'id',
                        autoIncrement: true 
                    });
                    backupStore.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
        });
    }
    
    /**
     * 从localStorage迁移数据到IndexedDB
     */
    async migrateFromLocalStorage() {
        try {
            const localData = localStorage.getItem('hexagram_history');
            if (localData) {
                const records = JSON.parse(localData);
                console.log(`发现localStorage中有${records.length}条记录，开始迁移...`);
                
                for (const record of records) {
                    await this.saveRecord(record, false); // false表示不触发云端同步
                }
                
                // 迁移完成后创建备份
                await this.createBackup('localStorage_migration');
                console.log('localStorage数据迁移完成');
            }
        } catch (error) {
            console.error('数据迁移失败:', error);
        }
    }
    
    /**
     * 保存记录（多层次存储）
     */
    async saveRecord(record, syncToCloud = true) {
        const timestamp = Date.now();
        const recordWithMeta = {
            ...record,
            timestamp,
            lastModified: timestamp,
            synced: false
        };
        
        try {
            // 1. 保存到IndexedDB
            if (this.db) {
                await this.saveToIndexedDB(recordWithMeta);
            }
            
            // 2. 备份到localStorage
            this.saveToLocalStorage(recordWithMeta);
            
            // 3. 如果在线且需要同步，保存到云端
            if (syncToCloud && this.isOnline) {
                await this.saveToCloud(recordWithMeta);
            }
            
            console.log('记录保存成功:', record.id);
            return true;
        } catch (error) {
            console.error('保存记录失败:', error);
            return false;
        }
    }
    
    /**
     * 保存到IndexedDB
     */
    saveToIndexedDB(record) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put(record);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    /**
     * 备份到localStorage
     */
    saveToLocalStorage(record) {
        try {
            const existing = JSON.parse(localStorage.getItem('hexagram_history') || '[]');
            const index = existing.findIndex(r => r.id === record.id);
            
            if (index >= 0) {
                existing[index] = record;
            } else {
                existing.push(record);
            }
            
            // 限制localStorage存储数量
            const limitSetting = localStorage.getItem('history-limit') || '50';
            if (limitSetting !== 'unlimited') {
                const limit = parseInt(limitSetting, 10) || 50;
                if (existing.length > limit) {
                    existing.splice(0, existing.length - limit);
                }
            }
            
            localStorage.setItem('hexagram_history', JSON.stringify(existing));
        } catch (error) {
            console.error('localStorage保存失败:', error);
        }
    }
    
    /**
     * 保存到云端（模拟实现）
     */
    async saveToCloud(record) {
        try {
            // 这里应该调用实际的云端API
            // 现在使用localStorage模拟云端存储
            const cloudKey = `cloud_backup_${record.id}`;
            localStorage.setItem(cloudKey, JSON.stringify({
                ...record,
                synced: true,
                cloudTimestamp: Date.now()
            }));
            
            // 标记为已同步
            record.synced = true;
            if (this.db) {
                await this.saveToIndexedDB(record);
            }
            
            console.log('云端同步成功:', record.id);
        } catch (error) {
            console.error('云端同步失败:', error);
        }
    }
    
    /**
     * 获取所有记录
     */
    async getAllRecords() {
        try {
            // 优先从IndexedDB获取
            if (this.db) {
                return await this.getFromIndexedDB();
            }
            
            // 回退到localStorage
            return this.getFromLocalStorage();
        } catch (error) {
            console.error('获取记录失败:', error);
            return [];
        }
    }
    
    /**
     * 从IndexedDB获取记录
     */
    getFromIndexedDB() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();
            
            request.onsuccess = () => {
                const records = request.result.sort((a, b) => b.timestamp - a.timestamp);
                resolve(records);
            };
            request.onerror = () => reject(request.error);
        });
    }
    
    /**
     * 从localStorage获取记录
     */
    getFromLocalStorage() {
        try {
            const data = localStorage.getItem('hexagram_history');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('localStorage读取失败:', error);
            return [];
        }
    }
    
    /**
     * 删除记录
     */
    async deleteRecord(recordId) {
        try {
            // 从IndexedDB删除
            if (this.db) {
                await this.deleteFromIndexedDB(recordId);
            }
            
            // 从localStorage删除
            this.deleteFromLocalStorage(recordId);
            
            // 从云端删除
            if (this.isOnline) {
                await this.deleteFromCloud(recordId);
            }
            
            console.log('记录删除成功:', recordId);
            return true;
        } catch (error) {
            console.error('删除记录失败:', error);
            return false;
        }
    }
    
    /**
     * 从IndexedDB删除
     */
    deleteFromIndexedDB(recordId) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(recordId);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
    
    /**
     * 从localStorage删除
     */
    deleteFromLocalStorage(recordId) {
        try {
            const existing = JSON.parse(localStorage.getItem('hexagram_history') || '[]');
            const filtered = existing.filter(r => r.id !== recordId);
            localStorage.setItem('hexagram_history', JSON.stringify(filtered));
        } catch (error) {
            console.error('localStorage删除失败:', error);
        }
    }
    
    /**
     * 从云端删除
     */
    async deleteFromCloud(recordId) {
        try {
            const cloudKey = `cloud_backup_${recordId}`;
            localStorage.removeItem(cloudKey);
            console.log('云端删除成功:', recordId);
        } catch (error) {
            console.error('云端删除失败:', error);
        }
    }
    
    /**
     * 创建数据备份
     */
    async createBackup(reason = 'manual') {
        try {
            const records = await this.getAllRecords();
            const backup = {
                timestamp: Date.now(),
                reason,
                recordCount: records.length,
                data: records,
                version: this.dbVersion
            };
            
            if (this.db) {
                const transaction = this.db.transaction(['backups'], 'readwrite');
                const store = transaction.objectStore('backups');
                await new Promise((resolve, reject) => {
                    const request = store.add(backup);
                    request.onsuccess = () => resolve();
                    request.onerror = () => reject(request.error);
                });
            }
            
            // 同时保存到localStorage
            const backupKey = `backup_${backup.timestamp}`;
            localStorage.setItem(backupKey, JSON.stringify(backup));
            
            console.log('数据备份创建成功:', backup.timestamp);
            return backup.timestamp;
        } catch (error) {
            console.error('创建备份失败:', error);
            return null;
        }
    }
    
    /**
     * 恢复数据备份
     */
    async restoreBackup(backupId) {
        try {
            let backup = null;
            
            // 先尝试从IndexedDB获取备份
            if (this.db) {
                const transaction = this.db.transaction(['backups'], 'readonly');
                const store = transaction.objectStore('backups');
                backup = await new Promise((resolve, reject) => {
                    const request = store.get(backupId);
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                });
            }
            
            // 如果IndexedDB中没有，从localStorage获取
            if (!backup) {
                const backupKey = `backup_${backupId}`;
                const backupData = localStorage.getItem(backupKey);
                if (backupData) {
                    backup = JSON.parse(backupData);
                }
            }
            
            if (!backup) {
                throw new Error('备份不存在');
            }
            
            // 清空现有数据
            await this.clearAllData();
            
            // 恢复数据
            for (const record of backup.data) {
                await this.saveRecord(record, false);
            }
            
            console.log('数据恢复成功:', backupId);
            return true;
        } catch (error) {
            console.error('恢复备份失败:', error);
            return false;
        }
    }
    
    /**
     * 获取所有备份
     */
    async getAllBackups() {
        try {
            let backups = [];
            
            // 从IndexedDB获取
            if (this.db) {
                const transaction = this.db.transaction(['backups'], 'readonly');
                const store = transaction.objectStore('backups');
                backups = await new Promise((resolve, reject) => {
                    const request = store.getAll();
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                });
            }
            
            // 从localStorage获取
            const localBackups = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('backup_')) {
                    try {
                        const backup = JSON.parse(localStorage.getItem(key));
                        localBackups.push(backup);
                    } catch (e) {
                        console.error('解析备份失败:', key, e);
                    }
                }
            }
            
            // 合并并去重
            const allBackups = [...backups, ...localBackups];
            const uniqueBackups = allBackups.filter((backup, index, self) => 
                index === self.findIndex(b => b.timestamp === backup.timestamp)
            );
            
            return uniqueBackups.sort((a, b) => b.timestamp - a.timestamp);
        } catch (error) {
            console.error('获取备份列表失败:', error);
            return [];
        }
    }
    
    /**
     * 清空所有数据
     */
    async clearAllData() {
        try {
            // 清空IndexedDB
            if (this.db) {
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                await new Promise((resolve, reject) => {
                    const request = store.clear();
                    request.onsuccess = () => resolve();
                    request.onerror = () => reject(request.error);
                });
            }
            
            // 清空localStorage
            localStorage.removeItem('hexagram_history');
            
            console.log('所有数据已清空');
        } catch (error) {
            console.error('清空数据失败:', error);
        }
    }
    
    /**
     * 同步到云端
     */
    async syncToCloud() {
        try {
            const records = await this.getAllRecords();
            const unsyncedRecords = records.filter(r => !r.synced);
            
            console.log(`开始同步${unsyncedRecords.length}条未同步记录到云端...`);
            
            for (const record of unsyncedRecords) {
                await this.saveToCloud(record);
            }
            
            console.log('云端同步完成');
        } catch (error) {
            console.error('云端同步失败:', error);
        }
    }
    
    /**
     * 从云端同步
     */
    async syncFromCloud() {
        try {
            // 这里应该调用实际的云端API获取数据
            // 现在从localStorage模拟的云端存储获取
            const cloudRecords = [];
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('cloud_backup_')) {
                    try {
                        const record = JSON.parse(localStorage.getItem(key));
                        cloudRecords.push(record);
                    } catch (e) {
                        console.error('解析云端记录失败:', key, e);
                    }
                }
            }
            
            console.log(`从云端获取到${cloudRecords.length}条记录`);
            
            // 合并云端数据
            for (const cloudRecord of cloudRecords) {
                const localRecords = await this.getAllRecords();
                const existingRecord = localRecords.find(r => r.id === cloudRecord.id);
                
                if (!existingRecord || cloudRecord.cloudTimestamp > existingRecord.lastModified) {
                    await this.saveRecord(cloudRecord, false);
                }
            }
            
            console.log('云端数据同步完成');
        } catch (error) {
            console.error('云端数据同步失败:', error);
        }
    }
    
    /**
     * 获取存储统计信息
     */
    async getStorageStats() {
        try {
            const records = await this.getAllRecords();
            const backups = await this.getAllBackups();
            
            // 计算存储大小
            const recordsSize = JSON.stringify(records).length;
            const backupsSize = JSON.stringify(backups).length;
            
            return {
                recordCount: records.length,
                backupCount: backups.length,
                recordsSize: this.formatBytes(recordsSize),
                backupsSize: this.formatBytes(backupsSize),
                totalSize: this.formatBytes(recordsSize + backupsSize),
                syncedCount: records.filter(r => r.synced).length,
                unsyncedCount: records.filter(r => !r.synced).length,
                lastBackup: backups.length > 0 ? new Date(backups[0].timestamp) : null
            };
        } catch (error) {
            console.error('获取存储统计失败:', error);
            return null;
        }
    }
    
    /**
     * 格式化字节大小
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// 创建全局存储管理器实例
window.storageManager = new StorageManager();

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageManager;
}

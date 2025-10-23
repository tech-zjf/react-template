export class IndexedDBHelper<T> {
    private dbName: string;
    private storeName: string;
    private dbVersion: number;
    private db: IDBDatabase | null = null;

    constructor(dbName: string, storeName: string, dbVersion = 1) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.dbVersion = dbVersion;
    }

    private async getDB(): Promise<IDBDatabase> {
        if (this.db) return this.db;
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                }
            };
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            request.onerror = () => reject(request.error);
        });
    }

    async set(key: string, value: T): Promise<void> {
        const db = await this.getDB();
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        return new Promise((resolve, reject) => {
            const request = store.put({ id: key, ...value });
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    async get(key: string): Promise<T | null> {
        const db = await this.getDB();
        const transaction = db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        return new Promise((resolve, reject) => {
            const request = store.get(key);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    async getAll(): Promise<{ key: string; value: T }[]> {
        const db = await this.getDB();
        const transaction = db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    async remove(key: string): Promise<void> {
        const db = await this.getDB();
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        return new Promise((resolve, reject) => {
            const request = store.delete(key);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    async clear(): Promise<void> {
        const db = await this.getDB();
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        return new Promise((resolve, reject) => {
            const request = store.clear();
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }
}

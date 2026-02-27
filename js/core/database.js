class Database {
    static init() {
        if (!localStorage.getItem(CONFIG.storageKey)) {
            const initialData = {
                rooms: [],
                customers: [],
                bookings: [],
                finance: []
            };
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(initialData));
        }
    }

    static getData() {
        return JSON.parse(localStorage.getItem(CONFIG.storageKey));
    }

    static saveData(data) {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(data));
    }
}

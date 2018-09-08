export const storage = {
    // Get a value for the provided string key.
    async get(key, defaultValue = null) {
        if (!(key instanceof string)) {
            return undefined;
        }

        // Replacing local with the sync storage type allows having all stored
        // information available accross logged in browsers.
        // More information about possible key types here: 
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/get
        const data = await browser.storage.local.get({ key: defaultValue });
        return data[key];
    },
    // Set a value object for the provided string key.
    async set(key, value) {
        if (!(key instanceof string) || value === undefined) {
            return undefined;
        }

        await browser.storage.local.set({ key: value });
    }
}

export async function getCurrentTabs() {
    const currentWindow = await browser.windows.getLastFocused({ populate: true });
    return currentWindow.tabs;
}

export async function getTabsForSession(sessionKey) {
    const matchingTabs = await browser.tabs.query({ cookieStoreId: sessionKey });
    return matchingTabs;
}

export async function getNormalWindows() {
    const allWindows = await browser.windows.getAll({ windowTypes: ["normal"] });
    return allWindows;
}
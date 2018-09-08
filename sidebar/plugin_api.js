import { storage } from "./plugin_shared.js";

const DEFAULT_COOKIE_STORE_ID = "firefox-default";
const THRASH_WNDW_ID_KEY = "thrash_windows_id";

export default API = {
    // Get the identifier of the window currently holding all hidden tabs.
    async thrashWindowId() {
        const id = await storage.get(THRASH_WNDW_ID_KEY, null);
        if (id == undefined) { // Explicit double! sign comparison
            const availableWindows = await browser.windows.getAll({ windowTypes: ['normal'] });
            const thrashWindow = availableWindows.shift();
            if (thrashWindow === undefined) {
                const newId = await _setThrashWindow();
                return newId;
            }
        }
        return id;
    },

    async _setThrashWindow(windowObject = null) {
        let windowId;

        if (windowObject == undefined) {
            const newTab = await browser.tabs.create();
            windowId = newTab.windowId;
        } else {
            windowId = windowObject.id;
        }

        await storage.set(THRASH_WNDW_ID_KEY, windowId);
        return windowId;
    },

    async migrateThrashOpportunistic() {

    },

    async closeSessionTabs(sessionKey) {
        const tabCookie = sessionKey;
        if (!tabCookie || tabCookie == DEFAULT_COOKIE_STORE_ID) {
            return;
        }

        let sessionTabs = browser.tabs.query({ cookieStoreId: tabCookie });
        let thrashWindowId = thrashWindowId();
        const data = Promise.all([sessionTabs, thrashWindowId]);
        sessionTabs = data[0];
        thrashWindowId = data[1];

        const sessionTabIdIterable = sessionTabs.map((tab) => tab.id);
        const sessionPinnedTabIterable = sessionTabs.filter((tab) => tab.pinned).map((tab) => tab.id);

        const moveOp = browser.tabs.move(sessionTabIdIterable, { windowId: thrashWindowId, index: -1 });
        const unpinOp = browser.tabs.update(sessionPinnedTabIterable, { pinned: false });
        const hideOp = browser.tabs.hide(sessionTabIdIterable);
        const unloadOp = browser.tabs.discard(sessionTabIdIterable);

        Promise.all([moveOp, unpinOp]).then(() => Promise.all([hideOp, unloadOp]));
    }
}
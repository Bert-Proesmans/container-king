import API from "./plugin_api.js";

const DEBUG_MODE = true;

function SessionCenterManager() {
    browser.commands.onCommand.addListener(this.onCommand);
    browser.browserAction.onClicked.addListener(this.onAction);

    browser.windows.onRemoved.addListener(this.onWindowDeleted);

    // It's possible `browser.contextualIdentities === undefined`, in which case this extension
    // cannot work!
    browser.contextualIdentities.onUpdated.addListener(this.onIdentityUpdated);
    browser.contextualIdentities.onCreated.addListener(this.onIdentityAdded);
    browser.contextualIdentities.onRemoved.addListener(this.onIdentityDeleted);
}

// End of exported functions
// ---

SessionCenterManager.prototype = {
    onCommand(command_name) {
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/commands/onCommand#addListener_syntax
        console.log({ msg: "Command invoked", name: command_name });
    },

    async onAction(tab) {
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/onClicked#addListener_syntax
        console.log({ msg: "Browser action invoked", tab: tab.id });

        if (!tab.id || tab.id == browser.tabs.TAB_ID_NONE) {
            return;
        }

        const sessionKey = tab.cookieStoreId;

        // 1. Make another tab active
        // 2. Call API to close all session related tabs
        await API.closeSessionTabs(sessionKey);
        // 3. Profit

    },

    onIdentityDeleted({ name, cookieStoreId }) {

    },

    onIdentityAdded({ name, cookieStoreId }) {

    },

    onIdentityUpdated({ name, cookieStoreId }) {

    },

    onWindowDeleted(windowId) {

    },

    _enableBrowserAction() {
        browser.browserAction.enable();
    },

    _disableBrowserAction() {
        browser.browserAction.disable();
    }
};

// ---

const dbg_log_commands = async function (commands) {
    for (let command of commands) {
        // Note: This logs to the Extension debugger's console!
        console.log(command);
    }
}

if (DEBUG_MODE == true) {
    // Retrieve list of all registered extension commands.
    browser.commands.getAll().then(dbg_log_commands);
}

/*
*       ^  ^
* ~(  = ° w°)=
*   u u u  u
*/

new SessionCenterManager();
// Manifest docs: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands
debug = true;

function SessionCenterManager() {
    commands.onCommand.addListener((name) => this.onCommand(name));
    browser.browserAction.onClicked.addListener((tab) => this.onAction(tab));
}

function SessionCenterInstance() {

}

// End of exported functions
// ---

SessionCenterManager.prototype = {
    onCommand(command_name) {
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/commands/onCommand#addListener_syntax
    },
    onAction(tab) {
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/onClicked#addListener_syntax
    },
    onContainerDeleted() {
        
    },
    onContainerAdded() {

    },
    onContainerUpdated() {

    },
};

SessionCenterInstance.prototype = {
    open() {
        // TODO
    },
    close() {
        // TODO
    },
}

// ---

const dbg_log_commands = async function(commands) {
    for(let command of commands) {
        // Note: This logs to the Extension debugger's console!
        console.log(command);
    }
}

if (debug == true) {
    // Retrieve list of all registered extension commands.
    browser.commands.getAll().then(dbg_log_commands);
}

// It's possible `browser.contextualIdentities === undefined`, in which case this extension
// cannot work!
// browser.contextualIdentities.onUpdated.addListener(_ => containers_changed());
// browser.contextualIdentities.onCreated.addListener(_ => containers_changed());
// browser.contextualIdentities.onRemoved.addListener(_ => containers_changed());

// browser.tabs.onUpdated.addListener(_);
// browser.tabs.onActivated.addListener(_);

/*
*       ^  ^
* ~(  = ° w°)=
*   u u u  u
*/

new SessionCenterManager();
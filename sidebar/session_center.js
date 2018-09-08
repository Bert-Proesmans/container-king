import create_container_element from "./center_components.js";

function SessionCenter() {
    this._list = document.getElementById("container_list");
 }

SessionCenter.prototype = {
    async init() {
        if (browser.contextualIdentities === undefined) {
            this._report_error("__TODO_MSG_IDENTITIES_NOT_AVAILABLE__");
            return;
        }

        await this._populate();
    },

    _report_error({ message }) {
        // TODO
    },

    async _populate() {
        await this._construct_identity_list();
    },

    async _construct_identity_list() {
        const identities = await browser.contextualIdentities.query({});
        if (!identities.length) {
            this._report_error("__TODO_MSG_NO_IDENTITIES__");
            return;
        }

        const listFragment = document.createDocumentFragment();

        for (let identity of identities) {
            const containerFragment = await create_container_element(identity);
            listFragment.appendChild(containerFragment);
        }

        this._list.appendChild(listFragment);
    },
}

export default SessionCenter;
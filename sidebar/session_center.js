
function SessionCenter() {
    this._listWrapper = document.getElementById("list_body_wrapper");
    this._list = document.getElementById("container_list");
    this._container_item_template = document.getElementById("container_list_item_template");
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
            let fragment = this._markup_identity_item(identity);
            listFragment.appendChild(fragment);
        }

        this._list.appendChild(listFragment);
    },

    _markup_identity_item(identity) {
        const item = this._container_item_template.content.children[0].cloneNode(true);
        let titleView = item.querySelector(".container_name");
        titleView.innerText = identity.name;

        return item;
    }
}

export default SessionCenter;
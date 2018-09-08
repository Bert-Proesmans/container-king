
const _container_item_template = document.getElementById("container_list_item_template");
const _container_tab_item = document.getElementById("container_tab_item");

export default async function create_container_element(identity) {
    const item = _container_item_template.content.children[0].cloneNode(true);
    item.dataset.identity = identity.cookieStoreId;
    //
    let titleView = item.querySelector(".container_name");
    titleView.innerText = identity.name;
    // 
    let tabsList = item.querySelector(".container_tabs");
    const sessionTabs = browser.tabs.query({ cookieStoreId: identity.cookieStoreId });

    for (let tab of (await sessionTabs).sort((a, b) => b.lastAccessed - a.lastAccessed)) {
        const tabFragment = _create_tab_element(tab);
        tabsList.appendChild(tabFragment);
    }

    return item;
}

function _create_tab_element(tab) {
    if (!tab.id || tab.id == browser.tabs.TAB_ID_NONE) {
        return;
    }

    const tabElement = _container_tab_item.content.children[0].cloneNode(true);
    //
    let titleView = tabElement.querySelector(".container_tab_name");
    titleView.innerText = tab.title;

    return tabElement;
}
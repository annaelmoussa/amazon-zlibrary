const globalRegex = new RegExp('amazon[^\.]*(?:\.[^\.]+){1,2}$|\.amazon$', 'gi');

async function getTab() {
    const tab = await browser.tabs.query({
        active: true,
        lastFocusedWindow: true
    });
    return tab[0];
}

async function testWebsiteTabs() {
    let tabs = await getTab();
    let foundRegex = tabs.url.match(globalRegex);
    if (foundRegex) {
        return true;
    } else {
        return false;
    }
}

async function getBookName() {
    if (await testWebsiteTabs()) {
        let executing = await browser.tabs.executeScript({
            code: `document.getElementById("productTitle").innerText`,
        });
        return executing;
    } else {
        return booknull = [null];
    }
}

async function badWebsite() {
    let tabs = await getTab();
    browser.browserAction.setBadgeText({
        text: ":(",
        tabId: tabs.id
    });
    browser.browserAction.setBadgeBackgroundColor({
        color: "red",
        tabId: tabs.id
    });
}

async function openBook() {
    let nameBook = await getBookName();
    if (await testWebsiteTabs() && nameBook[0] !== null && typeof nameBook[0] !== 'undefined') {
        browser.tabs.update({
            "url": "https://b-ok.cc/s/" + nameBook[0]
        });
    } else {
        badWebsite();
    }
}

async function notif() {
    let tabs = await getTab();
    browser.browserAction.setBadgeText({
        text: "1",
        tabId: tabs.id
    });
    browser.browserAction.setBadgeBackgroundColor({
        color: "green",
        tabId: tabs.id
    });
}

async function getNotif() {
    let tabs = await getTab();
    let book = await getBookName();
    if (book[0] !== null && typeof book[0] !== 'undefined') {
        notif();
    } else {
        browser.browserAction.setBadgeText({
            text: "",
            tabId: tabs.id
        });
    }
}

browser.browserAction.onClicked.addListener(openBook);
browser.tabs.onUpdated.addListener(getNotif);
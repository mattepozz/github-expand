function openAll() {
    const hiddenConversationsButtons =
        document.evaluate(
            "//button[contains(text(), 'hidden conversations')]",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null)
    for (let i = 0; i < hiddenConversationsButtons.snapshotLength; i++) {
        hiddenConversationsButtons.snapshotItem(i).click()
    }

    const showResolvedSpans =
        document.evaluate(
            "//span[contains(text(), 'Show resolved') and not(@hidden)]",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        )
    for (let i = 0; i < showResolvedSpans.snapshotLength; i++) {
        const node = showResolvedSpans.snapshotItem(i)
        if (!window.getComputedStyle(node)['display'].includes('none')) {
            node.click()
        }
    }
}

chrome.action.onClicked.addListener( (tab) => {
    if (!tab.url.startsWith('https://github.com')) {
        console.log(`Does not work on ${tab.url}`);
        return;
    }
    console.log("Opening...")
    chrome.scripting.executeScript({
        target: {tabId: tab.id}, function: openAll,
    });
});

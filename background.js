chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const options = {
        type: "basic",
        iconUrl: "icon48.png", // Add your icon path
        title: "Reminder!",
        message: request.text,
        priority: 2
    };
    chrome.notifications.create("", options);
});

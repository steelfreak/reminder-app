document.addEventListener('DOMContentLoaded', loadReminders);

document.getElementById('setReminder').addEventListener('click', function() {
    const reminderText = document.getElementById('reminderText').value;
    const reminderDate = document.getElementById('reminderDate').value;
    const reminderTime = document.getElementById('reminderTime').value;

    if (!reminderText || !reminderDate || !reminderTime) {
        alert("Please fill in all fields.");
        return;
    }

    const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
    const now = new Date();
    const timeUntilReminder = reminderDateTime - now;

    if (timeUntilReminder < 0) {
        alert("Please set a future date and time.");
        return;
    }

    // Save the reminder in storage
    const reminder = {
        text: reminderText,
        dateTime: reminderDateTime.toString(),
    };

    chrome.storage.local.set({ reminder: reminder }, function() {
        console.log('Reminder saved:', reminder);
    });

    // Schedule a notification
    setTimeout(() => {
        chrome.runtime.sendMessage({ text: reminderText });
    }, timeUntilReminder);
});

function loadReminders() {
    chrome.storage.local.get('reminder', function(data) {
        if (data.reminder) {
            document.getElementById('reminderText').value = data.reminder.text;
            const dateTime = new Date(data.reminder.dateTime);
            document.getElementById('reminderDate').value = dateTime.toISOString().split('T')[0];
            document.getElementById('reminderTime').value = dateTime.toTimeString().split(' ')[0].slice(0, 5);
        }
    });
}

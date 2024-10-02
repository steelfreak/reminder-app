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

    setTimeout(() => {
        showReminder(reminderText);
    }, timeUntilReminder);
});

function showReminder(message) {
    document.getElementById('reminderMessage').innerText = message;
    document.getElementById('overlay').classList.remove('hidden');
}

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('overlay').classList.add('hidden');
});

document.addEventListener("DOMContentLoaded", function () {
    const body = document.getElementById("summary-body");
    const message = document.getElementById("success-message");

    if (!body) {
        return;
    }

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    const storedData = sessionStorage.getItem("sejongGymRegistration");

    if (!storedData) {
        if (message) {
            message.hidden = false;
            message.textContent = "No submission was found. Please return to the form and submit it again.";
        }
        return;
    }

    let entries = [];

    try {
        entries = JSON.parse(storedData);
    } catch (error) {
        if (message) {
            message.hidden = false;
            message.textContent = "The submitted data could not be read. Please submit the form again.";
        }
        return;
    }

    let rowsHtml = "";

    for (let i = 0; i < entries.length; i += 1) {
        rowsHtml += "<tr><td>" + escapeHtml(entries[i].label) + "</td><td>" + escapeHtml(entries[i].value) + "</td></tr>";
    }

    body.innerHTML = rowsHtml;
    sessionStorage.removeItem("sejongGymRegistration");
});
document.addEventListener("DOMContentLoaded", function () {
    const joinForm = document.getElementById("join-form");

    if (!joinForm) {
        return;
    }

    joinForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const entries = [];

        function valueOrFallback(value) {
            if (value === null || value === undefined) {
                return "Not provided";
            }

            const trimmed = String(value).trim();
            return trimmed === "" ? "Not provided" : trimmed;
        }

        function addEntry(label, value) {
            entries.push({
                label: label,
                value: valueOrFallback(value)
            });
        }

        function byId(id) {
            const element = document.getElementById(id);
            return element ? element.value : "";
        }

        addEntry("First Name", byId("first-name"));
        addEntry("Last Name", byId("last-name"));
        addEntry("Email", byId("email"));
        addEntry("Phone Number", byId("phone"));
        addEntry("Age", byId("age"));
        addEntry("Planned Weekly Gym Visits", byId("weekly-visits"));

        // Loop through the radio options and keep the checked one.
        const membershipOptions = document.querySelectorAll("input[name='membership-type']");
        let selectedMembership = "No option selected";

        for (let i = 0; i < membershipOptions.length; i += 1) {
            if (membershipOptions[i].checked) {
                selectedMembership = membershipOptions[i].value;
                break;
            }
        }

        addEntry("Membership Type", selectedMembership);

        // Loop through checkboxes and build a comma-separated value.
        const selectedInterests = [];
        const interestOptions = document.querySelectorAll("input[name='interests']");

        for (let i = 0; i < interestOptions.length; i += 1) {
            if (interestOptions[i].checked) {
                selectedInterests.push(interestOptions[i].value);
            }
        }

        if (selectedInterests.length === 0) {
            addEntry("Preferred Classes", "None selected");
        } else {
            addEntry("Preferred Classes", selectedInterests.join(", "));
        }

        const workoutTime = document.getElementById("workout-time");
        if (workoutTime && workoutTime.value !== "") {
            addEntry("Preferred Workout Time", workoutTime.value);
        } else {
            addEntry("Preferred Workout Time", "No option selected");
        }

        addEntry("Fitness Goals", byId("goals"));

        const agreeCheckbox = document.getElementById("agree");
        addEntry("Agreed to Policies", agreeCheckbox && agreeCheckbox.checked ? "Yes" : "No");

        const popup = window.open("", "_blank");

        if (!popup) {
            window.alert("Please allow pop-ups so the summary page can open.");
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

        let rowsHtml = "";

        for (let i = 0; i < entries.length; i += 1) {
            rowsHtml += "<tr>" +
                "<td>" + escapeHtml(entries[i].label) + "</td>" +
                "<td>" + escapeHtml(entries[i].value) + "</td>" +
                "</tr>";
        }

        const resultPageHtml = "<!DOCTYPE html>" +
            "<html lang='en'>" +
            "<head>" +
            "<meta charset='UTF-8'>" +
            "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
            "<title>Registration Summary</title>" +
            "<style>" +
            "body{font-family:Manrope,Segoe UI,Tahoma,Geneva,Verdana,sans-serif;margin:0;background:#0e0e0e;color:#ffffff;line-height:1.55;}" +
            ".wrap{width:min(980px,94%);margin:1.5rem auto;background:linear-gradient(150deg,#1a1a1a 0%,#262626 100%);border:1px solid rgba(255,255,255,.12);padding:1.2rem;box-shadow:0 16px 32px rgba(0,0,0,.5);}" +
            "h1{margin-top:0;margin-bottom:1rem;font-family:'Space Grotesk',Manrope,Segoe UI,sans-serif;letter-spacing:-.02em;text-transform:uppercase;}" +
            "table{width:100%;border-collapse:collapse;}" +
            "th,td{border:1px solid rgba(255,255,255,.12);padding:.65rem;text-align:left;vertical-align:top;}" +
            "th{background:rgba(202,253,0,.12);color:#f3ffca;font-family:'Space Grotesk',Manrope,Segoe UI,sans-serif;letter-spacing:.08em;text-transform:uppercase;font-size:.73rem;}" +
            "tbody tr:nth-child(even){background:rgba(255,255,255,.02);}" +
            "p{margin:.65rem 0 0;color:#adaaaa;}" +
            "</style>" +
            "</head>" +
            "<body>" +
            "<main class='wrap'>" +
            "<h1>Sejong Gym Membership Summary</h1>" +
            "<table aria-label='Submitted registration data'>" +
            "<thead><tr><th>Field</th><th>Value</th></tr></thead>" +
            "<tbody>" + rowsHtml + "</tbody>" +
            "</table>" +
            "<p>This summary was generated from your form submission.</p>" +
            "</main>" +
            "</body>" +
            "</html>";

        popup.document.open();
        popup.document.write(resultPageHtml);
        popup.document.close();
    });
});
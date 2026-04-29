document.addEventListener("DOMContentLoaded", function () {
    const joinForm = document.getElementById("join-form");

    if (!joinForm) {
        return;
    }

    function valueOrFallback(value) {
        if (value === null || value === undefined) {
            return "Not provided";
        }

        const trimmed = String(value).trim();
        return trimmed === "" ? "Not provided" : trimmed;
    }

    function addEntry(entries, label, value) {
        entries.push({
            label: label,
            value: valueOrFallback(value)
        });
    }

    function byId(id) {
        const element = document.getElementById(id);
        return element ? element.value : "";
    }

    function getSelectedRadioValue(selector) {
        const options = document.querySelectorAll(selector);

        for (let i = 0; i < options.length; i += 1) {
            if (options[i].checked) {
                return options[i].value;
            }
        }

        return "No option selected";
    }

    function getSelectedCheckboxValues(selector) {
        const checkedValues = [];
        const options = document.querySelectorAll(selector);

        for (let i = 0; i < options.length; i += 1) {
            if (options[i].checked) {
                checkedValues.push(options[i].value);
            }
        }

        return checkedValues;
    }

    joinForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const entries = [];

        addEntry(entries, "First Name", byId("first-name"));
        addEntry(entries, "Last Name", byId("last-name"));
        addEntry(entries, "Email", byId("email"));
        addEntry(entries, "Phone Number", byId("phone"));
        addEntry(entries, "Age", byId("age"));
        addEntry(entries, "Planned Weekly Gym Visits", byId("weekly-visits"));
        addEntry(entries, "Membership Type", getSelectedRadioValue("input[name='membership-type']"));

        const selectedInterests = getSelectedCheckboxValues("input[name='interests']");
        addEntry(entries, "Preferred Classes", selectedInterests.length === 0 ? "None selected" : selectedInterests.join(", "));

        addEntry(entries, "Preferred Workout Time", byId("workout-time"));
        addEntry(entries, "Fitness Goals", byId("goals"));

        const agreeCheckbox = document.getElementById("agree");
        addEntry(entries, "Agreed to Policies", agreeCheckbox && agreeCheckbox.checked ? "Yes" : "No");

        try {
            sessionStorage.setItem("sejongGymRegistration", JSON.stringify(entries));
            window.location.href = "success.html";
        } catch (error) {
            window.alert("Could not open the success page. Please try again.");
        }
    });
});
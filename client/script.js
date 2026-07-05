const API = "/api";
// Generate Token
async function generateToken() {

    const name = document.getElementById("name").value.trim();

    if (name === "") {
        alert("Please enter patient name");
        return;
    }

    try {

        const res = await fetch(API + "/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        });

        const data = await res.json();

        document.getElementById("token").innerHTML =
            `✅ Your Token Number: <b>${data.token}</b>`;

        document.getElementById("name").value = "";

        loadQueue();

    } catch (err) {
        console.log(err);
        alert("Unable to generate token.");
    }
}

// Load Queue
async function loadQueue() {

    try {

        const res = await fetch(API + "/queue");
        const patients = await res.json();

        const queue = document.getElementById("queue");
        queue.innerHTML = "";

        // Dashboard
        document.getElementById("waitingCount").innerText = patients.length;

        if (patients.length > 0) {
            document.getElementById("currentToken").innerText = patients[0].token;
        } else {
            document.getElementById("currentToken").innerText = "--";
            queue.innerHTML = "<li>No patients waiting</li>";
            return;
        }

        // Queue List
        patients.forEach((patient, index) => {

            const waitTime = index * 5;

            queue.innerHTML += `
                <li>
                    <strong>🎫 Token ${patient.token}</strong><br>
                    👤 ${patient.name}<br>
                    ⏳ Estimated Wait: ${waitTime} mins
                </li>
            `;

        });

    } catch (err) {
        console.log(err);
    }
}

// Admin - Serve Next Patient
async function nextPatient() {

    try {

        await fetch(API + "/next", {
            method: "PUT"
        });

        loadQueue();

    } catch (err) {
        console.log(err);
    }
}

// Load queue when page opens
loadQueue();

// Refresh queue every 3 seconds
setInterval(loadQueue, 3000);
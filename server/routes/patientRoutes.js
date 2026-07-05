const express = require("express");
const router = express.Router();

let patients = [];
let tokenCounter = 1;

// Generate Token
router.post("/token", (req, res) => {
    const patient = {
        id: Date.now(),
        name: req.body.name,
        token: tokenCounter++,
        status: "Waiting"
    };

    patients.push(patient);
    res.json(patient);
});
router.get("/queue", (req, res) => {
    res.json(patients);
});


router.put("/next", (req, res) => {
    if (patients.length > 0) {
        patients[0].status = "Completed";
        patients.shift();
    }

    res.json({
        message: "Next patient called",
        queue: patients
    });
});

module.exports = router;
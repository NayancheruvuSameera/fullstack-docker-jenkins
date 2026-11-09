
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const BACKEND_URL =
  process.env.BACKEND_URL || "http://localhost:5000";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Receive form submission and forward it to Flask
app.post("/api/submit", async (req, res) => {
    try {
        const response = await fetch(
            `${BACKEND_URL}/submit`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req.body)
            }
        );

        const result = await response.json();

        res.status(response.status).json(result);

    } catch (error) {
        console.error("Backend connection error:", error.message);

        res.status(502).json({
            message: "Unable to connect to Flask backend"
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Frontend running on port ${PORT}`);
});

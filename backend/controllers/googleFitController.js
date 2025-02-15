
const fetchGoogleFitData = async (req, res) => {
    const { accessToken } = req.body;

    if (!accessToken) {
        return res.status(400).json({ error: "Access token required" });
    }

    const now = Date.now();
    const startTimeMillis = now - 86400000;
    const endTimeMillis = now;

    try {
        const response = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                aggregateBy: [
                    { dataTypeName: "com.google.step_count.delta" },
                    { dataTypeName: "com.google.heart_rate.bpm" },
                    { dataTypeName: "com.google.sleep.segment" }
                ],
                bucketByTime: { durationMillis: 86400000 },
                startTimeMillis,
                endTimeMillis
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports={fetchGoogleFitData};

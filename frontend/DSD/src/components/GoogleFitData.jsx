import { useState, useEffect } from "react";
import API from '../api/axios';

const GoogleFitData = () => {
    const [data, setData] = useState("Fetching data...");

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem("access_token");

            if (!accessToken) {
                setData("No valid access token found. Please connect Google Fit.");
                return;
            }

            try {
                const response = await API.post('/googlefit/data', { accessToken });
                const fitData = response.data;
                
                if (!fitData || !fitData.bucket || fitData.bucket.length === 0) {
                    setData("No data available.");
                    return;
                }

                const bucket = fitData.bucket[0];
                const steps = bucket.dataset
                    .find(ds => ds.dataSourceId.includes("step_count.delta"))?.point || [];
                const heartRatePoints = bucket.dataset
                    .find(ds => ds.dataSourceId.includes("heart_rate.bpm"))?.point || [];
                const heartRates = heartRatePoints.length ? heartRatePoints[0].value.map(v => v.fpVal) : [];
                const sleepData = bucket.dataset.find(ds => ds.dataSourceId.includes("sleep.segment"))?.point || [];

                setData(`
                    Steps: ${steps.length ? steps[0].value[0].intVal : "No data"}
                    Heart Rate: ${heartRates.length ? heartRates.join(", ") : "No data"}
                    Sleep Data Points: ${sleepData.length}
                `);
            } catch (error) {
                setData(`Error fetching data: ${error.message}`);
            }
        };

        fetchData();
    }, []);

    return <pre>{data}</pre>;
};

export default GoogleFitData;
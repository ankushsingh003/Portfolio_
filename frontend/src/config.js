const PROD_API_URL = "https://portfolio-2-2l21.onrender.com"; 
const DEV_API_URL = "http://127.0.0.1:8000";

export const API_URL = import.meta.env.PROD ? PROD_API_URL : DEV_API_URL;

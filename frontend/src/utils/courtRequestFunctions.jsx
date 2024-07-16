import axios from "axios"

const serverBaseUrl = import.meta.env.VITE_COURT_SERVER_BASE_URL;

const axiosRequest = axios.create({
    withCredentials: true,
    baseURL: serverBaseUrl,
    headers: {
        "Content-Type": "application/json"
    }
});

// fetch all courts from the server
export const getAllCourtsInfo = async ({queryKey}) => {
    try {
        const response = await axiosRequest.get("/courts", {
            params: queryKey
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching courts:", error.message);
        // throw error;
    }
}

// fetch a single court by its id from the server
export const getCourtDetailInfo = async ({queryKey}) => {
    const [_, courtId] = queryKey;

    try {
        const response = await axiosRequest.get(`/courts/${courtId.courtId}`, {
            params: {
                fromFsq: courtId.fromFsq
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching court details:", error.message);
        throw error;
    }
}
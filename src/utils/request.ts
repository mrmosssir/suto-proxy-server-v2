import axios from "axios";

export const request = async (config: any) => {
    const response: any = await axios(config);
    const code = response?.code ?? 0;
    switch (code) {
        case 401:
            localStorage.removeItem("token");
            window.location.href = "/login";
            break;
        default:
            break;
    }
    return response;
};
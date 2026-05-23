import API from "../api/axios";

export const sendExchangeRequest = async (bookId) => {
    const response = await API.post(`/exchange/request/${bookId}`);
    return response.data;
};

export const getIncomingRequests = async () => {
    const response = await API.get("/exchange/incoming");
    return response.data;
};

export const getMyRequests = async () => {
    const response = await API.get("/exchange/my-requests");
    return response.data;
};

export const acceptRequest = async (requestId) => {
    const response = await API.put(`/exchange/accept/${requestId}`);
    return response.data;
};

export const rejectRequest = async (requestId) => {
    const response = await API.put(`/exchange/reject/${requestId}`);
    return response.data;
};
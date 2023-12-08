const SERVER_URL = process.env.REACT_APP_SERVER_URL_RAILWAY

export const myFetch = async (path, method = 'GET', token, body) => {
    try {
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        }
        if (token){
            headers['Authorization'] = `Bearer ${token}`
        }
        const bodyData = body ? JSON.stringify(body) : null;
        const response = await fetch(`${SERVER_URL}${path}`, {
            method,
            headers,
            body: bodyData,
        });
        const data = await response.json();
        if (data.error){
            throw data.error;
        }
        return data;
    }catch (e) {
        throw e;
    }
}

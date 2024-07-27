async function requester(method, url, data) {
    const options = { method };
    if (method !== 'GET' && method !== 'HEAD') {
        options.headers = {
            'Content-Type': 'application/json',
        };
        if (data) {
            options.body = JSON.stringify(data);
        }
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        const textResponse = await response.text();
        console.error('Error fetching data:', textResponse);
        throw new Error('Unexpected response format');
    }

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType &&contentType.includes('application/json')) {
        const jsonResponse = await response.json();
        return jsonResponse;
    } else {
        const textResponse = await response.text();
        console.error('Error fetching data:', textResponse);
        throw new Error('Unexpected response format');
    }
}

export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const del = requester.bind(null, 'DELETE');

// export const get = (url, data) => requester('GET', url, data);
// export const post = (url, data) => requester('POST', url, data);
// export const put = (url, data) => requester('PUT', url, data);
// export const del = (url, data) => requester('DELETE', url, data);

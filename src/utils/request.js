import { message } from "antd";

export default async function request(url, options) {
    return requestDataProcess(url, options);
}
async function requestDataProcess(url, options) {
    if (/post/i.test(options.method)) {
        let { data } = options;
        let body = null;
        if (typeof data === 'string') {
            body = data;
        } else {
            body = JSON.stringify(data);
        }
        options.body = body;
        delete options.data;
    }
    let headers = {};
    headers['Content-Type'] = 'application/json';
    options.headers = headers;

    const result = await fetch(url, options).then(async response => {
        if (response.status >= 200 && response.status < 300) {
            const responseJSON = await response.json();
            return responseJSON;
        } else {
            message.error(response.statusText)
        }
    });
    return result;
}

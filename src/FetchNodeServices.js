var axios = require("axios")

var ServerURL = "http://localhost:5000"

const postData = async (url, body) => {
    try {
        const response = await axios.post(`${ServerURL}/${url}`, body);
        return response.data
    } catch (err) {
        return { status: false }
    }
}

export { ServerURL, postData }
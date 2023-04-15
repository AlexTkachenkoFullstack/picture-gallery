import axios from 'axios';
export async function fetchPictures(valueOfInput, currentPage, limOnPage) {
    const url = 'https://pixabay.com/api/';
    const objectOfParams = {
        key: '35387506-5af8e0fa3bfbe7696023fb8a4',
        q: valueOfInput,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: limOnPage,
        page: currentPage
    };
    const instanceParams = new URLSearchParams(objectOfParams).toString()
    try {
        const response = await axios.get(`${url}?${instanceParams}`);
        return response
    } catch (error) {
        console.error(error.message);
    }
}

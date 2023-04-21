import axios from 'axios';
export class NewAPIService{
    constructor() {
        this.searchQuery = '';
        this.currentPage = 1;
        this.limOnPage = 40;
        this.totalItems = null;
    }

    async fetchPictures() {
        const UrlString = this.returnUrlString();
    try {
        const response = await axios.get(UrlString);
        return response?.data;
    } catch (error) {
        console.error(error.message);
    }
}

    returnUrlString() {
        const url = 'https://pixabay.com/api/';
    const objectOfParams = {
        key: '35387506-5af8e0fa3bfbe7696023fb8a4',
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: this.limOnPage,
        page: this.currentPage
    };
    const instanceParams = new URLSearchParams(objectOfParams).toString()
    return `${url}?${instanceParams}`
    }
    
    updateCurrentPage() {
      return  this.currentPage +=1;
    }
    
    reset() {
        this.currentPage = 1;
        this.searchQuery = '';
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}




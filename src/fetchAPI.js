import axios from 'axios';
const API_KEY = '28417818-644aba253245949f255c992a1';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class GetPixabayApi {
constructor(searchQuery) {
    this.searchQuery = '';
    this.page=1;
}

async fetchImg() {
    const params = new URLSearchParams({
        key: API_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 40,
    })
    

  const {data} = await axios.get(`?${params}`);
  this.incrementPage();
   return data;
}
 get searchQueryRequest() {
    return this.searchQuery;
 }

 set searchQueryRequest(newSearchQuery) {
    this.searchQuery = newSearchQuery;
 }

incrementPage() {
    this.page += 1;
}

resetPage() {
    this.page = 1;
}

}

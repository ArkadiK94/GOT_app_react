export default class GetGotInfo{
    constructor(){
        this._mainAddress = 'https://anapioficeandfire.com/api';
    }
    async getGotData(url){
        const res = await fetch(`${this._mainAddress}${url}`);
        if(!res.ok){
            throw new Error(`Can't get the data from ${url}, error ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters(){
        return this.getGotData(`/characters/?page=6&pageSize=10`);
    }
    getCharacter(id){
        return this.getGotData(`/characters/${id}`);
    }
    getAllBooks(){
        return this.getGotData(`/books/`);
    }
    getBook(id){
        return this.getGotData(`/books/${id}`);
    }
    getAllHouses(){
        return this.getGotData(`/houses/`);
    }
    getHouse(id){
        return this.getGotData(`/houses/${id}`);
    }
}






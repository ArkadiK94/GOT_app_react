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
        return this.getGotData(`/characters/${id}`)
        .then(res=>{
            return this.changeData(res,"character");
        });
    }
    getAllBooks(){
        return this.getGotData(`/books/`);
    }
    getBook(id){
        return this.getGotData(`/books/${id}`)
        .then(res=>{
            return this.changeData(res,"books");
        });
    }
    getAllHouses(){
        return this.getGotData(`/houses/`);
    }
    getHouse(id){
        return this.getGotData(`/houses/${id}`)
        .then(res=>{
            return this.changeData(res,"houses");
        });
    }
    changeData(data,type){
        if(type==="character"){
            const {name,gender,born,died,culture} = data;
            return {
                name,
                gender,
                born,
                died,
                culture
            }
        }
        if(type==="houses"){
            const {name,region,words,titles,seats} = data;
            return {
                name,
                region,
                words,
                titles,
                seats
            }
        }
        if(type==="books"){
            const {name,authors,publiser,country,released} = data;
            return {
                name,
                authors,
                publiser,
                country,
                released
            }
        }
    }
}





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
        return this.getGotData(`/characters/?page=50&pageSize=10`)
            .then(res=>{
                return res.map((item)=>{
                    return this.changeData(item,"character");
                });
            });
    }
    getCharacter(id){
        return this.getGotData(`/characters/${id}`)
            .then(res=>{
                return this.changeData(res,"character");
            });
    }
    getAllBooks(){
        return this.getGotData(`/books/`)
            .then(res=>{
                return res.map((item)=>{
                    return this.changeData(item,"books");
                });
            });
    }
    getBook(id){
        return this.getGotData(`/books/${id}`)
            .then(res=>{
                return this.changeData(res,"books");
            });
    }
    getAllHouses(){
        return this.getGotData(`/houses/`)
            .then(res=>{
                return res.map((item)=>{
                    return this.changeData(item,"houses");
                });
            });
    }
    getHouse(id){
        return this.getGotData(`/houses/${id}`)
            .then(res=>{
                return this.changeData(res,"houses");
            });
    }
    isValid(info){
        if(info){
            return info;
        } else{
            return "no data :(";
        }
    }
    excractId (url){
        let id = url.match(/\d/g);
        id = id.join("");
        return id;
    }
    changeData(data,type){
        if(type==="character"){
            const {url,name,gender,born,died,culture} = data;
            return {
                id : this.excractId(url),
                name : this.isValid(name),
                gender : this.isValid(gender),
                born : this.isValid(born),
                died : this.isValid(died),
                culture : this.isValid(culture),
            }
        }
        if(type==="houses"){
            const {url,name,region,words,titles,seats} = data;
            return {
                id : this.excractId(url),
                name: this.isValid(name),
                region: this.isValid(region),
                words: this.isValid(words),
                titles: this.isValid(titles),
                seats: this.isValid(seats)
            }
        }
        if(type==="books"){
            const {url,name,authors,publiser,country,released} = data;
            return {
                id : this.excractId(url),
                name: this.isValid(name),
                authors: this.isValid(authors),
                publiser: this.isValid(publiser),
                country: this.isValid(country),
                released: this.isValid(released)
            }
        }
    }
}





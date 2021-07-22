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
        return this.getGotData(`/characters/?page=6&pageSize=10`)
        .then(res=>{
            return res.map((item)=>{
                return this.changeData(item,"characters");
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
    changeData(data,type){
        if(type==="character"){
            const {name,gender,born,died,culture} = data;
            return {
                name : this.isValid(name),
                gender : this.isValid(gender),
                born : this.isValid(born),
                died : this.isValid(died),
                culture : this.isValid(culture)
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





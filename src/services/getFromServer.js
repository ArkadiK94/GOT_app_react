export default class GetGotInfo{
    constructor(){
        this._mainAddress = 'https://anapioficeandfire.com/api';
    }
    getGotData = async(url)=>{
        const res = await fetch(`${this._mainAddress}${url}`);
        if(!res.ok){
            throw new Error(`Can't get the data from ${url}, error ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters =()=>{
        return this.getGotData(`/characters/?page=60&pageSize=10`)
            .then(res=>{
                return res.map((item)=>{
                    return this._changeCharData(item);
                });
            });
    }
    getCharacter= (id)=>{
        return this.getGotData(`/characters/${id}`)
            .then(res=>{
                return this._changeCharData(res);
            });
    }
    getAllBooks=()=>{
        return this.getGotData(`/books/`)
            .then(res=>{
                return res.map((item)=>{
                    return this._changeBookData(item);
                });
            });
    }
    getBook= (id)=>{
        return this.getGotData(`/books/${id}`)
            .then(res=>{
                return this._changeBookData(res);
            });
    }
    getAllHouses= ()=>{
        return this.getGotData(`/houses/`)
            .then(res=>{
                return res.map((item)=>{
                    return this._changeHouseData(item);
                });
            });
    }
    getHouse= (id)=>{
        return this.getGotData(`/houses/${id}`)
            .then(res=>{
                return this._changeHouseData(res);
            });
    }
    isValid= (info)=>{
        return ((info && info[0] !== "")? info:"no data :(");
    }
    excractId= (url)=>{
        let id = url.match(/\d/g);
        id = id.join("");
        return id;
    }
    _changeCharData= (data)=>{
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
    _changeHouseData = (data)=>{
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
    getYear = (date)=>{
        return date = date.match(/\d\d\d\d/);
    }
    _changeBookData = (data)=>{
        const {url,name,authors,country,released} = data;
        return {
            id : this.excractId(url),
            name: this.isValid(name),
            authors: this.isValid(authors),
            country: this.isValid(country),
            released: this.getYear(this.isValid(released))
        }
    }
}





class LocalStorageManager{
    getItem(item: string){
        if(JSON.parse(localStorage.getItem(item) || '{}') ) return JSON.parse(localStorage.getItem(item) || '{}')
        else return item + 'Not Founded!!';
    }
    setItem(itemName: string, itemValue: any){
        localStorage.setItem(itemName, JSON.stringify(itemValue))
    }
    removeItem(itemName:string){
        localStorage.removeItem(itemName);
        return itemName + 'was deleted!!';
    }
    clearStorage(){
        localStorage.clear();
    }
}

export {
    LocalStorageManager
}
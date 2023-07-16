import { LocalStorageManager } from "./LocalStorageManager";
export class User {

    local = new LocalStorageManager()
    
    setMyFavoriteMusicList(id_song: number){
        const keyUser = this.local.getItem("key");
        const userInfo = this.local.getItem("user_info"+keyUser);

        if(!userInfo.favorites_songs_id_list.includes(id_song)){
            userInfo.favorites_songs_id_list.push(id_song);
            this.local.setItem("user_info"+keyUser, userInfo);
        }
    }   
}
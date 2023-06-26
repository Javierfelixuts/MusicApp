import userListJson from '../assets/JSON/users.json';
import { UserLoginType } from '../types/UserLogin';
import { LocalStorageManager } from './LocalStorageManager';
class UserLogin {
    private userList = userListJson;
    private userAuth = false;
    #local = new LocalStorageManager()
    constructor(){

    }
    loginUser(user:UserLoginType){
        const idUser = this.getIdUser(user.email)?.id;
        const userFiltered = this.userList.filter(userObj => userObj.id === idUser);
        if(userFiltered[0]?.email == user.email && userFiltered[0].password == user.password){
          this.userAuth = true
          this.#local.setItem("auth", true)
          return true;
        }
        this.userAuth = false;
        return false
    }
    logOutUser(){
        this.#local.removeItem("auth");
    }
    isUserAuthenticated(){
        if(this.#local.getItem("auth")){
            return this.#local.getItem("auth");
        }
        return this.userAuth;
    }
    getIdUser(email: string){
        return this.userList.find((user) => user.email = email)
    }
}

export default UserLogin
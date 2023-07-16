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
        const getUser = this.getUser(user.email);
        if(getUser.email == user.email && getUser.password == user.password){
          this.userAuth = true;
          if(!!this.#local.getItem("auth")){
              this.#local.setItem("auth", this.userAuth)
          }
          if(!!this.#local.getItem("user_info" + getUser.id)){
            this.#local.setItem('user_info' + getUser.id, getUser)
          }
          if(!!this.#local.getItem("key")){
              this.#local.setItem("key", getUser.id)
          }

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
    getUser(email: string){
        return this.userList.filter((user) => user.email == email)[0]
    }
}

export default UserLogin
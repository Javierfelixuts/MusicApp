import { defineStore } from 'pinia'
 
export const useUserList = defineStore('userList', {
  state: () => {
    const userAuth = false;
    const users = [
      {
        id: 'o1s351skh245',
        username: 'jaft2023',
        name: 'Javier',
        last_name: 'Felix',
        email: 'javier.felix@gcabsa.com.mx',
        password: 'jaft2023',
      }
    ]
    return { users, userAuth }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    getUsers() {
      return this.users;
    },
    isUserAuthenticated(){
      return this.userAuth;
    },
    getIdUser(email: string){
      return this.users.find((user) => user.email = email)
    },
    loginUser(email: string, password: string){
      const idUser = this.getIdUser(email)?.id;
      const user = this.users.filter(user => user.id === idUser);
      if(user[0]?.email == email && user[0].password == password){
        this.userAuth = true
        return true
      }
      this.userAuth = false;
      return false
    }
  },
})
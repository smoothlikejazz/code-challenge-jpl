import { v4 as uuidv4 } from 'uuid';
interface User {
    id?: string,
    name?: string,
    location?: object
}
interface State {
    userList: User[];
    activeUser: User,
}

export const useMainStore = defineStore('main', {
    persist: {
        storage: persistedState.localStorage,
    },
    state: (): State => {
        return {
            userList: [],
            activeUser: {},
        }
    },
    actions: {
        login(user: User) {
            // implicitly add user to list if they do not exist
            const existingUser = this.userList.find(u => u.name === user.name)
            if(existingUser) {
                this.activeUser = existingUser
            } else {
                const newUser = {name: user.name, id: uuidv4()}
                this.userList.push(newUser)
                this.activeUser = newUser
            }
        },
        logout() {
            this.activeUser = {}
        }
    },
    getters: {},
})

import { v4 as uuidv4 } from 'uuid';
import { useLaunchStore } from './launch'
interface User {
    id?: string,
    name?: string,
    location?: object
}
interface State {
    userList: User[];
    activeUser: User,
    now: object,
    pollTimer: null | ReturnType<typeof setTimeout>,
}

export const useMainStore = defineStore('main', {
    persist: {
        storage: persistedState.localStorage,
    },
    state: (): State => {
        return {
            userList: [],
            activeUser: {},
            now: (new Date()),
            pollTimer: null,
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
        },
        updateUserLocation(location: object) {
            this.activeUser.location = location
        },
        startPollTimer() {
            const launchStore= useLaunchStore()
            if (!this.pollTimer) {
                this.pollTimer = setInterval(() => {
                    this.now = new Date()
                    launchStore.evaluateLaunches()
                }, 1000);
            }
        },
        clearTimer(){
            this.pollTimer = null
        }
    },
    getters: {
        hasLocation: (state) => {
            return !!state.activeUser.location
        },
        currentTime: (state) => {
            return state.now
        }
    },
})

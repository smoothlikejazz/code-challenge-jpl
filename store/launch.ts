import { v4 as uuidv4 } from 'uuid';
import { useMainStore } from './index'
import {isAfter, isWithinInterval, subMinutes, addMinutes} from 'date-fns';
export enum LaunchStatus {
    Cancelled = "CANCELLED",
    Active = "ACTIVE",
    Scheduled = "SCHEDULED",
    Completed = "COMPLETED",
    InFlight = "IN_FLIGHT"
}
interface Launch {
    name: string
    id: string
    launchPad: object
    rocket: object
    launchTime: string,
    status: LaunchStatus,
    userId?: string,
    metrics?: {
        velocity: number,
        altitude: number,
    }
}

interface State {
    launches: Launch[]
}

export const useLaunchStore = defineStore('launch', {
    persist: {
        storage: persistedState.localStorage,
    },
    state: (): State => ({
        launches: []
    }),
    actions: {
        addLaunch(launch: Launch) {
            const mainStore= useMainStore()
            this.launches.push({
                ...launch,
                id: uuidv4(),
                userId: mainStore.activeUser.id
            })
        },
        abortLaunch(id: string) {
            const launch = this.launches.find(launch => launch.id === id)
            if(launch) {
                launch.status = LaunchStatus.Cancelled
            }
        },
    },
    getters: {
        // TODO: if time refactor this can be single function with launch status type
        scheduledLaunches: (state): Launch[] => {
            const mainStore= useMainStore()
            return state.launches.filter( launch => launch.status === LaunchStatus.Scheduled && mainStore.activeUser.id === launch.userId)
        },
        completedLaunches: (state): Launch[] => {
            const mainStore= useMainStore()
            return state.launches.filter( launch => launch.status === LaunchStatus.Completed && mainStore.activeUser.id === launch.userId)
        },
        cancelledLaunches: (state): Launch[] => {
            const mainStore= useMainStore()
            return state.launches.filter( launch => launch.status === LaunchStatus.Cancelled && mainStore.activeUser.id === launch.userId)
        },
        activeLaunches: (state): Launch[] => {
            const mainStore= useMainStore()
            return state.launches.filter( launch => launch.status === LaunchStatus.Active && mainStore.activeUser.id === launch.userId)
        },
        inFlightLaunches: (state): Launch[] => {
            const mainStore= useMainStore()
            return state.launches.filter( launch => launch.status === LaunchStatus.InFlight && mainStore.activeUser.id === launch.userId)
        },
        getLaunchById: (state) => {
            return (id: string) => {
                const launch = state.launches.find(launch => launch.id === id)
                return launch || {}
            }

        }
    },
})

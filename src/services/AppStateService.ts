import { APP_MODES } from "../types";

interface AppState {
    appMode: APP_MODES,
    currentPost: any
};

class StateService {
    state: AppState = {
        appMode: APP_MODES.COMIC_ROLL,
        currentPost: null
    };

    cb: Function | null = null;

    update(state: any): void {
        this.state = Object.assign(this.state, state);

        if (this.cb) {
            this.cb();
        }
    }

    get(): AppState {
        return this.state;
    }

    registerRequestUpdateCallBack(cb: Function) {
        this.cb = cb;
    }
}


export default new StateService();
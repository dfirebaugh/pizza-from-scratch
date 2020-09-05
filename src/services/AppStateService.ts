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

    /**
     * requestUpdateCallBack 
     * we register this so that we can update
     * the view when the state changes.
     */
    requestUpdateCallBack: Function | null = null;

    update(state: any): void {
        this.state = Object.assign(this.state, state);

        if (this.requestUpdateCallBack) {
            this.requestUpdateCallBack();
        }
    }

    get(): AppState {
        return this.state;
    }

    registerRequestUpdateCallBack(cb: Function) {
        this.requestUpdateCallBack = cb;
    }
}


export default new StateService();

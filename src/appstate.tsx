import { isBrowser } from "react-device-detect";
import { pubSubService } from "./pubsub";


export interface Pane {
    paneId: string;
    contentId: string;
    contentPage: boolean;
}

class AppState {
    public isLoggedIn = false;
    public loggedInUser: { safeName: string, memberName: string } = { safeName: '', memberName: '' }

    public navigation = new Navigation();

    constructor() {
        this.setLoggedInUser(null);
    }

    public setLoggedInUser(user: { safeName: string, memberName: string } | null) {

        if (user && user.safeName) {
            this.isLoggedIn = false;
            this.loggedInUser = user;
            this.navigation.setStack([{ paneId: this.navigation.nextPaneId(), contentId: 'main-menu', contentPage: false }]);
        } else {
            this.loggedInUser = { safeName: '', memberName: '' };
            this.isLoggedIn = false;
            this.navigation.setStack([{ paneId: this.navigation.nextPaneId(), contentId: 'welcome', contentPage: false }]);
        }

    }

    public navigateTo(destination: string, contentPage: boolean) {
        let activePane = this.navigation.navigationStack[this.navigation.activePaneIndex];

        if (!activePane || activePane.contentId !== destination) {
            pubSubService.emit({ id: 'navigate', to: destination, contentPage: contentPage });
        }
    }

    public getActivePane() {
        const activePane = this.navigation.navigationStack[this.navigation.activePaneIndex];
        return activePane.contentId;
    }
}

class Navigation {
    private paneIdCount = 0;
    public navigationStack: Pane[] = [];
    public activePaneIndex: number = 0;
    public minimumPaneIndex: number = 0;

    public nextPaneId(): string {
        ++this.paneIdCount;
        return `${this.paneIdCount}`;
    }

    hasPreviousPane(): import("react").SetStateAction<boolean> {
        return this.activePaneIndex > this.minimumPaneIndex;
    }

    constructor() {
        const subscription = pubSubService.notifications().subscribe((value) => {
            if (value.id === 'navigate') {
                if (value['to']) {
                    this.pushPane({ paneId: this.nextPaneId(), contentId: value['to'], contentPage: value['contentPage'] });
                }
            } else if (value.id === 'navigate-back') {
                if (this.navigationStack.length > 1 && this.activePaneIndex > this.minimumPaneIndex) {
                    // don't reset the panes because we want animation to smoothly happen, we dont
                    // yet want to remove the pane
                    this.activePaneIndex = this.activePaneIndex - 1;
                    pubSubService.emit('navigation-changed');
                }
            }
        });
    }

    public isLatestPaneContent() {
        return this.navigationStack[this.navigationStack.length - 1].contentPage;
    }

    public setStack(newPanes: Pane[]) {
        // add new panes so we can animate smoothly
        this.minimumPaneIndex = this.navigationStack.length;
        this.navigationStack = this.navigationStack.concat(newPanes);
        this.activePaneIndex = this.navigationStack.length - 1;
        pubSubService.emit('navigation-changed');
    }

    public pushPane(newPane: Pane) {
        if (this.isLatestPaneContent() && isBrowser) {
            //This is a work around to get the back button to show up after swapping between multiple content panes
            if (this.activePaneIndex === this.minimumPaneIndex) {
                this.activePaneIndex++;
            }
            // Replace the latest content pane with new content pane
            this.navigationStack[this.navigationStack.length - 1] = newPane;
        } else {
            let newPaneIndex = this.activePaneIndex + 1;
            this.navigationStack.splice(newPaneIndex);
            this.navigationStack.push(newPane);
            this.activePaneIndex = newPaneIndex;
        }
        pubSubService.emit('navigation-changed');
    }
}

export const appState = new AppState();

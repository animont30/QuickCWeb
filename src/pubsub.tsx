import { Subject } from 'rxjs';
import { type } from 'os';

export interface PubSubNotifcation {
    id: string;
    [index: string]: any;
}

class PubSubService {

    private subject = new Subject<PubSubNotifcation>();

    constructor() {
    }

    emit<T extends PubSubNotifcation>(value: T | string) {
        if (typeof value === 'string') {
            this.subject.next({ id: value });
        } else {
            this.subject.next(value);
        }
    }

    notifications() {
        return this.subject.asObservable();
    }
}

let pubSubService = new PubSubService();


export { pubSubService }
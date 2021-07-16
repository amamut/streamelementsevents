import { EventEmitter } from "events";
import { EventType, StreamElementEvent, StreamElementEventObject, StreamElementsEventListeners } from "./types";

type DonationEventHandler = (e: StreamElementEvent) => Promise<void> | void;

const POSTEVENT = "postevent";

function isResub(data: StreamElementEvent) {
    return data.amount != 1;
}

export class Events {
    private eventEmitter = new EventEmitter();

    constructor() {
        this.registerOnEventReceived();
    }
    /**
     * Registers a custom function on load of your widget to do some preprocessing.
     * @param  {(evt:Event)=>Promise<void>} onload A function to register on load of widget
     */
    registerOnLoad(onload: (evt: Event) => Promise<void>) {
        window.addEventListener("onWidgetLoad", onload);
    }
    /**
     * Creates an event handler for a Stream Elements event
     * @param  {EventType} t The event type to listen for
     * @param  {DonationEventHandler} handler Function which handle the event
     */
    on(t: EventType, handler: DonationEventHandler) {
        this.eventEmitter.on(t, this.wrapHandler(handler));
    }

    /**
     * Registers an post event handler which is called after your event has been processed
     * @param  {()=>Promise<any>} handler Function which is run after your event handler completes
     */
    async registerPostEventHandler(handler: () => Promise<any>) {
        this.eventEmitter.on(POSTEVENT, handler);
    }

    private registerOnEventReceived() {
        window.addEventListener("onEventReceived", this.onEventReceived);
    }

    private onEventReceived = async (evt: Event) => {
        const listener = (<CustomEvent<StreamElementEventObject>>evt).detail.listener;
        if (!listener) {
            return;
        }
        const event = (<CustomEvent<StreamElementEventObject>>evt).detail.event;
        if (!event) {
            return;
        }
        const incomingEvent = this.getEventType(listener!, event);
        if (incomingEvent) {
            this.eventEmitter.emit(incomingEvent, event);
        }
    };

    private wrapHandler = (f: DonationEventHandler) => {
        return async (e: StreamElementEvent) => {
            await f(e);
            this.eventEmitter.emit(POSTEVENT);
        };
    };

    private getEventType(listener: string, event: StreamElementEvent): EventType | null {
        switch (listener) {
            case StreamElementsEventListeners.MessageListener:
                return EventType.Message;
            case StreamElementsEventListeners.DeleteMessageListener:
                return EventType.DeleteMessage;
            case StreamElementsEventListeners.DeleteMessagesListener:
                return EventType.DeleteMessages;
            case StreamElementsEventListeners.SubscriberLatestListener:
                if (event.bulkGifted) {
                    return EventType.CommunityGift;
                } else if (event.isCommunityGift) {
                    return EventType.Giftee;
                } else if (event.gifted) {
                    return EventType.Gift;
                } else {
                    return !isResub(event) ? EventType.Sub : EventType.Resub;
                }
            case StreamElementsEventListeners.TipLatestListener:
                return EventType.Tip;
            case StreamElementsEventListeners.CheerLatestListener:
                return EventType.Cheer;
            case StreamElementsEventListeners.HostLatestListener:
                return EventType.Host;
            case StreamElementsEventListeners.RaidLatestListener:
                return EventType.Raid;
            case StreamElementsEventListeners.FollowerLatestListener:
                return EventType.Follower;
            case StreamElementsEventListeners.KVStoreListener:
                return EventType.KVStoreUpdate;
            case StreamElementsEventListeners.ToggleSoundListener:
                return EventType.ToggleSound;
            case StreamElementsEventListeners.EventSkipListener:
                return EventType.EventSkip;
            case StreamElementsEventListeners.EventTestListener:
                if (event.listener === StreamElementsEventListeners.WidgetButtonListener) {
                    return EventType.WidgetButton;
                }
                return EventType.EventTest;
            case StreamElementsEventListeners.BotCounterListener:
                return EventType.BotCounter;
            default:
                break;
        }
        return null;
    }
}

export enum StreamElementsEventListeners {
    MessageListener = "message",
    DeleteMessageListener = "delete-message",
    DeleteMessagesListener = "delete-messages",
    TipLatestListener = "tip-latest",
    CheerLatestListener = "cheer-latest",
    SubscriberLatestListener = "subscriber-latest",
    HostLatestListener = "host-latest",
    RaidLatestListener = "raid-latest",
    FollowerLatestListener = "follower-latest",
    RedemptionLatest = "redemption-latest",
    MerchLatest = "merch-latest",
    BotCounterListener = "bot:counter",
    EventSkipListener = "event:skip",
    EventTestListener = "event:test",
    KVStoreListener = "kvstore:update",
    ToggleSoundListener = "alertService:toggleSound",
    WidgetButtonListener = "widget-button"
}

export enum EventType {
    Cheer = "cheer",
    Tip = "tip",
    Sub = "sub",
    Resub = "resub",
    Gift = "gift",
    CommunityGift = "communityGift",
    Giftee = "giftee",
    Raid = "raid",
    Host = "host",
    Message = "message",
    DeleteMessage = "deleteMessage",
    DeleteMessages = "deleteMessages",
    Merch = "merch",
    Redemption = "redemption",
    Follower = "follower",
    BotCounter = "botCounter",
    EventSkip = "eventSkip",
    EventTest = "eventTest",
    WidgetButton = "widgetButton",
    KVStoreUpdate = "kvStoreUpdate",
    ToggleSound = "toggleSound"
}

export enum EventCategory {
    CheerLatest = "cheer-latest",
    TipLatest = "tip-latest",
    SubscriberLatest = "subscriber-latest"
}

export interface StreamElementCatalogItem {
    name: string;
    price: number;
    quantity: number;
}

export interface StreamElementEvent {
    amount: number;
    count: number;
    gifted?: boolean;
    bulkGifted?: boolean;
    isCommunityGift?: boolean;
    isTest: boolean;
    items: StreamElementCatalogItem[];
    message: string;
    month: string;
    name: string;
    originalEventName: EventCategory;
    sessionTop: boolean;
    tier: number;
    tts: boolean;
    type: string;
    listener?: string;
}

export interface FieldData {
    backgroundColor: string;
    backgroundOpacity: number;
    direction: string;
    eventsLimit: number;
    fadeoutTime: number;
    fontColor: string;
    iconColor: string;
    includeCheers: string;
    includeFollowers: string;
    includeHosts: string;
    includeRaids: string;
    includeRedemptions: string;
    includeSubs: string;
    includeTips: string;
    locale: string;
    minCheer: number;
    minHost: number;
    minRaid: number;
    minTip: number;
    textOrder: string;
    theme: string;
    counterColor: string;
    startingAmount: number;
    fillCounter: number;
}

export interface StreamElementEventObject {
    event?: StreamElementEvent;
    listener?: string;
}

export interface StreamElementLoadingObject {
    channel: any;
    currency: any;
    fieldData: FieldData;
}

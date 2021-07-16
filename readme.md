# Stream Elements Events

Easily handle Stream Elements events

## Example

```typescript
const registerOnLoad = (event: Event) => {
    // do something on widget load
};

const postProcess = () => {
    // do something after an event is processed
};

const events = new Events();
events.registerOnLoad(registerOnLoad);
events.registerPostEventHandler(postProcess);

events.on(EventType.Sub, (event: StreamElementEvent) => {
    // process sub event
});

events.on(EventType.Gift, (event: StreamElementEvent) => {
    // process gift event
});
```

## Contribution

### Setup

`yarn install --pure-lockfile` or `npm install --pure-lockfile`

### Building

`yarn build` or `npm run-script build`

declare module 'donevent';

type EventCallbackType = (event: any) => void

type OnDoneType<R> = (callback: EventCallbackType, delay?: number, keyboardEventCB?: EventCallbackType) => R;

export const onDoneTypeJSX: OnDoneType<{
    onBlur: any,
    onKeyUp: any,
    onKeyPress: any,
}>

export const onDoneType: OnDoneType<{
    onblur: any,
    onkeyup: any,
    onkeypress: any,
}>
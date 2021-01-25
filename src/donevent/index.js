export const onDoneTypeJSX = (callback, ms = 700, withKeyboardCB) => {
    let timeoutReference;

    const typingEventHandlerForChildren = (event) => {
        const { type, keyCode, target, which } = event;
        const isInputBlurOrPressEnter =
            type === 'blur' ||
            (target.nodeName !== 'TEXTAREA' && (keyCode === 13 || which === 13));
        const typeIsKeyUpUnlessItIsBackspace = type === 'keyup' && keyCode !== 8;
        const FakeEvent = { type, target, keyCode };

        if (typeof withKeyboardCB === 'function' && type !== 'blur') {
            withKeyboardCB(event);
        }

        if (isInputBlurOrPressEnter) {
            if (timeoutReference) {
                clearTimeout(timeoutReference);
                timeoutReference = undefined;
            }
            return callback(FakeEvent);
        }

        if (typeIsKeyUpUnlessItIsBackspace) return;

        if (timeoutReference) clearTimeout(timeoutReference);

        timeoutReference = setTimeout(() => {
            callback(FakeEvent);
            timeoutReference = undefined;
        }, ms);
    };

    return {
        onBlur: typingEventHandlerForChildren,
        onKeyUp: typingEventHandlerForChildren,
        onKeyPress: typingEventHandlerForChildren,
    };
};

export const onDoneType = (...props) => {
    const events = onDoneTypeJSX(...props)

    return Object.keys(events).reduce((result, key) => {
        result[key.toLocaleLowerCase()] = events[key]
        return result
    }, {})
}
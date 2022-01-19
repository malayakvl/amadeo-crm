import { createSelector } from 'reselect';

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
    (state: State.Root) => state.chatbot,
    (chatbot: State.Chatbot): State.Chatbot => chatbot
);

export const paginatedItemsSelector = createSelector(
    rootSelector,
    (chatbot: State.Chatbot): any => chatbot.items
);
export const itemsCountSelector = createSelector(
    rootSelector,
    (chatbot: State.Chatbot): number => chatbot.count
);
export const itemsSystemSelector = createSelector(
    rootSelector,
    (chatbot: State.Chatbot): any => chatbot.itemsSystem
);

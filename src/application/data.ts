import produce, { Draft, enableES5 } from 'immer';

import { Action } from './actions';
import {DELAY, INTERVAL, State} from './types';

enableES5();

export const data = produce((draft: Draft<State>, action: Action) => {
    switch (action.type) {
        case 'timer':
            if (!draft.pause) {
                draft.progress += INTERVAL;
            }
            break;
        case 'prev':
            draft.pause = false;
            draft.progress = 0;
            draft.index = Math.max(draft.index - 1, 0);
            break;
        case 'next':
            if (draft.index + 1 < draft.stories.length) {
                draft.index++;
                draft.progress = 0;
            } else {
                draft.progress = DELAY;
                draft.pause = true;
            }

            break;
        case 'restart':
            draft.pause = false;
            draft.progress = 0;
            draft.index = 0;
            break;
        case 'update':
            const { alias, data } = action.data;

            if (alias) {
                draft.stories[0].alias = alias;
            }

            if (data) {
                Object.assign(draft.stories[draft.index].data, data);
            }

            break;
        case 'theme':
            draft.theme = action.theme;
            break;
    }
});


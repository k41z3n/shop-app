
import { UiState } from "./"

type UiActionType =
    | { type: 'UI - toogleMenu' }


export const uiReducer = (state: UiState, action: UiActionType) => {

    switch (action.type) {
        case 'UI - toogleMenu':

            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            }

        default:
            return state
    }

}
// action - state management
import * as actionTypes from './constant'

export const initialState = {
  isOpen: [],
  opened: true
}

// ==============================|| CUSTOMIZATION REDUCER ||============================== //
const customizationReducer = (state = initialState, action) => {
  let id
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id
      return {
        ...state,
        isOpen: [id]
      }
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened
      }
    default:
      return state
  }
}

export default customizationReducer

// action - state management
import * as actionTypes from './actions'

export const initialState = {
  isOpen: [],
  opened: true,
  formula: ''
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
    case actionTypes.SET_FORMULA:
      return {
        ...state,
        formula: action.formula
      }
    default:
      return state
  }
}

export default customizationReducer

import { ActionType } from './actions'

export const exampleInitialState = {
  text: undefined
}

function reducer(state = exampleInitialState, action) {
  switch (action.type) {
    case ActionType.REDUCER1:
    case ActionType.REDUCER2: {
      state.text = action.payload;
      return state;
    }

    default:
      return state
  }
}

export default reducer

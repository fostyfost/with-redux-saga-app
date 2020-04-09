export const ActionType = {
  SAGA1: 'SAGA1',
  SAGA2: 'SAGA2',
  REDUCER1: 'REDUCER1',
  REDUCER2: 'REDUCER2',
}

export const saga1Action = (payload) => ({
  type: ActionType.SAGA1,
  payload,
})

export const saga2Action = (payload) => ({
  type: ActionType.SAGA2,
  payload,
})

export const reducer1Action = (payload) => ({
  type: ActionType.REDUCER1,
  payload,
})

export const reducer2Action = (payload) => ({
  type: ActionType.REDUCER2,
  payload,
})

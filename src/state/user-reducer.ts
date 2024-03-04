type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {
                ...state,
                age: state.age + 1
            }
        case 'INCREMENT-CHILDREN-COUNT':
            let newState = {...state}
            newState.childrenCount = newState.childrenCount + 1
            return newState
        case 'CHANGE-NAME':
            let copyState = {...state}
            copyState.name = action.newName
            return copyState
        default:
            throw new Error('I don\'t understand this type')
    }
}

const INITIAL_STATE = {
    name: 'Luat',
    age: 18,
    postid :1,

};
// const postid = 1

export function reducer(state = INITIAL_STATE, action: { type: any; }) {
    switch (action.type) {
        case 'getData':
            return {...state,oke: 'oke'}
        default:
            return state
    }
}
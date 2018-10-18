import { createStore, combineReducers } from 'redux';


const reducer = combineReducers({
    sessionUser: sessionReducer,
    chats: chatReducer
});

function sessionReducer(state=null, action) {
    switch (action.type) {
      case 'SET_SESSION_USER': {
        state = action.payload;
        return state;
      }
      default: {
        return state;
      }
    }
}

function chatReducer(state=[], action) {
    switch (action.type) {
        case 'ADD_CHAT': {
            const newChat = {
                text: action.text,
                timestamp: Date.now()
            };
            return state.concat(newChat);
        }
        default: {
            return state;
        }
    }
}
  
const store = createStore(reducer);

export { store };
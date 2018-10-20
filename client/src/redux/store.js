import { createStore, combineReducers } from 'redux';

const initialScrapingData = {
    linkCount: 0,
    scrappedData: []
};

const reducer = combineReducers({
    sessionUser: sessionReducer,
    chats: chatReducer,
    scraping: scrapingReducer
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

function scrapingReducer(state=initialScrapingData, action) {
    switch (action.type) {
        case 'SET_LINK_COUNT': {
            return {
                ...state,
                linkCount: action.payload
            };
        }
        case 'SET_SCRAPED_DATA': {
            const data = state.scrappedData.push(action.payload);
            return {
                ...state,
                scrappedData: data
            };
        }
        default: {
            return state;
        }
    }
}

  
const store = createStore(reducer);

export { store };
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, createTransform} from "redux-persist"
import userReducer from '../features/auth/userSlice';
import memoriesReducer  from "../features/memories/memoriesSlice";
import storage from "redux-persist/lib/storage"; // Default is localStorage


// Transform to persist only specific keys in the user slice
const userTransform = createTransform(
  // Transform state before it is persisted
  (inboundState) => {
    const { user, isAuthenticated } = inboundState; // Persist only the 'user' key
    return { user, isAuthenticated };
  },
  // Transform state when it is rehydrated
  (outboundState) => {
    return {
      ...outboundState,
      loading: false, // Default value for loading
      error: null, // Default value for error
      status : false
    };
  },
  { whitelist: ["user"] } // Apply this transform only to the 'user' slice
);
const persistConfig = {
    key : "root",
    storage,
    whitelist: ["user"],
    transforms : [userTransform]
}

const clearStateMiddleware = store => next => action => {
    if (action.type === 'user/logout') { // Adjust this to your logout action type
      storage.removeItem('persist:user'); // Remove 'user' slice from storage
    }
    return next(action);
  };
const rootReducer = combineReducers({
  user : userReducer,
  memories : memoriesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store =  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH  ,  REHYDRATE, PAUSE,  PERSIST, PURGE, REGISTER  ],
          },
      }).concat(clearStateMiddleware),
});

const persistor = persistStore(store);

export {store, persistor}
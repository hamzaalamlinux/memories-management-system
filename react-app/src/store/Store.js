import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist"
import userReducer from '../slices/userSlice';
import memoriesReducer  from "../slices/memoriesSlice";
import storage from "redux-persist/lib/storage"; // Default is localStorage

const persistConfig = {
    key : "root",
    storage,
    whitelist: ["user"]
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
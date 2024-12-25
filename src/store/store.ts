import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import ThemeSlice from "./themeSlice"

// Persist configuration for the entire store
const persistConfig = {
 key: 'root',
 storage: AsyncStorage,
};


// Create the persisted reducer
const rootReducer = combineReducers({
//  counter: counterSlice,
 theme: persistReducer(persistConfig, ThemeSlice),
});


// Configure the store with the combined reducers
const store = configureStore({
 reducer: rootReducer,
 middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
     serializableCheck: false,
   }),
});


// Create the persistor
export const persistor = persistStore(store);


// Export the store
export default store;



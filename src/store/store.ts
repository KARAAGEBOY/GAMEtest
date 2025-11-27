import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // SceneDefinitionなどの大きなオブジェクトがあるため、チェックを無効化
        ignoredActions: ['game/setCurrentScene', 'game/loadGame'],
        ignoredPaths: ['game.currentScene'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

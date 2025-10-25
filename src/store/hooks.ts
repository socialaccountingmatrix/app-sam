import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * Custom hooks for typed usage of Redux in the application.
 *
 * - `useAppDispatch`: typed version of `useDispatch` for dispatching actions.
 * - `useAppSelector`: typed version of `useSelector` for accessing state.
 *
 * These hooks should be used throughout the app instead of the plain
 * `useDispatch` and `useSelector` to ensure full TypeScript type safety.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

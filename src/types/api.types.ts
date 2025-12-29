/**
 * Type definitions for API responses, errors, and loading states
 */

/**
 * API error structure
 */
export interface ApiError {
  error: string;
  details?: string;
  message?: string;
  statusCode?: number;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

/**
 * Loading state enum for async operations
 */
export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Async data state wrapper
 */
export interface AsyncDataState<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
}

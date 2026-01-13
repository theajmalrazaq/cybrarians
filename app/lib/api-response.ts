import { NextResponse } from 'next/server';
import type { ApiSuccessResponse, ApiErrorResponse } from '@/app/types';

/**
 * Create a success response
 */
export function successResponse<T = unknown>(
  data?: T,
  message?: string,
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      ...(data !== undefined && { data }),
      ...(message && { message }),
    },
    { status }
  );
}

/**
 * Create an error response
 */
export function errorResponse(
  error: string,
  status: number = 400
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  );
}

/**
 * Common error responses
 */
export const ApiErrors = {
  unauthorized: (message = 'Unauthorized') =>
    errorResponse(message, 401),

  forbidden: (message = 'Forbidden') =>
    errorResponse(message, 403),

  notFound: (resource = 'Resource') =>
    errorResponse(`${resource} not found`, 404),

  conflict: (message = 'Resource already exists') =>
    errorResponse(message, 409),

  validation: (message = 'Validation failed') =>
    errorResponse(message, 400),

  internal: (message = 'Internal server error') =>
    errorResponse(message, 500),
};

/**
 * Handle API errors consistently
 */
export function handleApiError(error: unknown): NextResponse<ApiErrorResponse> {
  console.error('API Error:', error);

  if (error instanceof Error) {
    // Handle specific error types
    if ('code' in error) {
      const sqliteError = error as { code: string };

      if (sqliteError.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return ApiErrors.conflict('A record with this information already exists');
      }
    }

    return errorResponse(error.message, 500);
  }

  return ApiErrors.internal();
}

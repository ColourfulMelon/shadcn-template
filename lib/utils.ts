import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface FibbonaciRetryOptions {
  maxAttempts?: number;
  onRetry?: (attempt: number, delay: number, error: Error) => void;
}

interface RateLimitError extends Error {
  code?: string;
  status?: number;
}

/**
 * Implements a Fibonacci backoff retry strategy for async functions
 * @param fn The async function to retry
 * @param options Retry configuration options
 * @returns Promise resolving to the function result
 * @throws Original error if max attempts reached or non-rate-limit error occurs
 */
export async function fibonacciRetry<T>(
    fn: () => Promise<T>,
    options: FibbonaciRetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 5,
    onRetry = (attempt: number, delay: number) =>
        console.log(`Rate limit hit. Retrying in ${delay/1000} seconds... (Attempt ${attempt}/${maxAttempts})`)
  } = options;
  
  const fibonacci = (n: number): number => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };
  
  let attempt = 0;
  
  while (attempt < maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      
      const rateLimitError = error as RateLimitError;
      
      // Check various possible rate limit indicators
      const isRateLimit =
          rateLimitError.message?.toLowerCase().includes('rate limit') ||
          rateLimitError.code === 'RATE_LIMIT' ||
          rateLimitError.status === 429;
      
      if (!isRateLimit || attempt === maxAttempts) {
        throw error;
      }
      
      const delay = fibonacci(attempt) * 1000;
      onRetry(attempt, delay, rateLimitError);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // TypeScript requires this even though it's unreachable
  throw new Error('Maximum retry attempts reached');
}

interface ExponentialRetryOptions {
  maxAttempts?: number;
  baseDelay?: number;  // Base delay in milliseconds
  maxDelay?: number;   // Maximum delay cap in milliseconds
  onRetry?: (attempt: number, delay: number, error: Error) => void;
}

/**
 * Implements an exponential backoff retry strategy for async functions
 * @param fn The async function to retry
 * @param options Retry configuration options
 * @returns Promise resolving to the function result
 * @throws Original error if max attempts reached or non-rate-limit error occurs
 */
export async function exponentialRetry<T>(
    fn: () => Promise<T>,
    options: ExponentialRetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 5,
    baseDelay = 1000,    // Start with 1 second
    maxDelay = 32000,    // Cap at 32 seconds
    onRetry = (attempt: number, delay: number) =>
        console.log(`Rate limit hit. Retrying in ${delay/1000} seconds... (Attempt ${attempt}/${maxAttempts})`)
  } = options;
  
  const calculateDelay = (attempt: number): number => {
    // Calculate exponential delay: baseDelay * 2^attempt
    const exponentialDelay = baseDelay * Math.pow(2, attempt - 1);
    
    // Add some random jitter (±100ms) to prevent thundering herd
    const jitter = Math.random() * 200 - 100;
    
    // Return the delay capped at maxDelay
    return Math.min(exponentialDelay + jitter, maxDelay);
  };
  
  let attempt = 0;
  
  while (attempt < maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      
      const rateLimitError = error as RateLimitError;
      
      // Check various possible rate limit indicators
      const isRateLimit =
          rateLimitError.message?.toLowerCase().includes('rate limit') ||
          rateLimitError.code === 'RATE_LIMIT' ||
          rateLimitError.status === 429;
      
      if (!isRateLimit || attempt === maxAttempts) {
        throw error;
      }
      
      const delay = calculateDelay(attempt);
      onRetry(attempt, delay, rateLimitError);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Maximum retry attempts reached');
}
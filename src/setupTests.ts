import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jest: typeof import('@jest/globals')['jest'];
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
}); 
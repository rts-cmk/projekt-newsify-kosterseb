import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useSwipe } from './useSwipe';
import { describe, it, expect, vi } from 'vitest';
import "@testing-library/jest-dom/vitest";

describe('useSwipe', () => {
    it('should detect left swipe', () => {
        const onSwipeLeft = vi.fn();
        const onSwipeRight = vi.fn();
        const { result } = renderHook(() => useSwipe(onSwipeLeft, onSwipeRight, 50));

        act(() => {
            result.current.handleTouchStart({ targetTouches: [{ clientX: 200 }] });
        });

        act(() => {
            result.current.handleTouchMove({ targetTouches: [{ clientX: 100 }] });
        });

        act(() => {
            result.current.handleTouchEnd();
        });

        expect(onSwipeLeft).toHaveBeenCalled();
        expect(onSwipeRight).not.toHaveBeenCalled();
    })

    it('should detect right swipe', () => {
        const onSwipeLeft = vi.fn();
        const onSwipeRight = vi.fn();
        const { result } = renderHook(() => useSwipe(onSwipeLeft, onSwipeRight, 50));
      
        act(() => {
          result.current.handleTouchStart({ targetTouches: [{ clientX: 100 }] });
        });
      
        act(() => {
          result.current.handleTouchMove({ targetTouches: [{ clientX: 200 }] });
        });
      
        act(() => {
          result.current.handleTouchEnd();
        });
      
        expect(onSwipeRight).toHaveBeenCalled();
        expect(onSwipeLeft).not.toHaveBeenCalled();
      });
      
}
);

import { it } from 'vitest';
import { useHasSubmit } from './useHasSubmit';

it("Should be false is not done", () => {
  const fetcher = {
    state: 'idle',
    type: 'init',
    data: {
      error: null,
    }
  }
  const result = useHasSubmit(fetcher);

  expect(result).toBe(false);
})

it("Should be false if has error", () => {
  const fetcher = {
    type: 'done',
    data: {
      error: 'error',
    }
  }
  const result = useHasSubmit(fetcher);

  expect(result).toBe(false);
})

it("Should be true if done and no error", () => {
  const fetcher = {
    type: 'done',
    data: {
      error: null,
    }
  }
  const result = useHasSubmit(fetcher);

  expect(result).toBe(false);
})

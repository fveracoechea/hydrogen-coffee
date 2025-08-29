type AsyncTimeoutOptions = {
  delay?: number;
  signal?: AbortSignal;
};

export function asyncTimeout<T = void>(
  callback: () => Promise<T>,
  options: AsyncTimeoutOptions = {},
): Promise<T> {
  const { delay = 350, signal } = options;

  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        resolve(await callback());
      } catch (error) {
        reject(error);
      }
    }, delay);

    signal?.addEventListener('abort', () => {
      clearTimeout(timeoutId);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}

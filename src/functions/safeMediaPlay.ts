/**
 * Безопасный вызов HTMLMediaElement.play(): не даёт uncaught при размонтировании
 * (AbortError) и при неподдерживаемом источнике (NotSupportedError).
 */
const BENIGN = new Set(['AbortError', 'NotSupportedError']);

export async function safeMediaPlay(
  media: HTMLMediaElement | null | undefined,
): Promise<void> {
  if (!media) return;
  try {
    await media.play();
  } catch (err) {
    const name = err instanceof DOMException ? err.name : '';
    if (!BENIGN.has(name)) throw err;
  }
}

/** То же, без await — для watch и колбэков. */
export function safeMediaPlayVoid(media: HTMLMediaElement | null | undefined): void {
  void safeMediaPlay(media);
}

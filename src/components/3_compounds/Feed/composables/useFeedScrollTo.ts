import { watch, Ref, nextTick } from 'vue';

interface UseFeedScrollToOptions {
  /** ID целевого элемента для прокрутки */
  targetIdRef: Ref<string | null>;
  /** ID контейнера ленты */
  feedContainerId: string;
  /** CSS-класс для фокуса на сообщении */
  focusClass?: string;
}

function resolveTargetElementId(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;

  if (document.getElementById(trimmed)) {
    return trimmed;
  }

  const prefixed = trimmed.startsWith('msg-') ? trimmed : `msg-${trimmed}`;
  if (document.getElementById(prefixed)) {
    return prefixed;
  }

  try {
    const parsed = JSON.parse(trimmed) as { messageId?: string | number };
    if (parsed?.messageId != null) {
      const legacyId = `msg-${parsed.messageId}`;
      if (document.getElementById(legacyId)) {
        return legacyId;
      }
    }
  } catch {
    // legacy: не JSON
  }

  return prefixed;
}

/**
 * Композабл для прокрутки к определённому сообщению с подсветкой
 */
export function useFeedScrollTo({ targetIdRef, feedContainerId, focusClass = 'focused-message' }: UseFeedScrollToOptions) {
  watch(
    () => targetIdRef.value,
    (targetId) => {
      if (!targetId) return;

      const scrollToTarget = (attempt = 0) => {
        const resolvedId = resolveTargetElementId(targetId);
        const target = document.getElementById(resolvedId);
        const list = document.getElementById(feedContainerId);

        if (target instanceof HTMLElement && list instanceof HTMLElement) {
          list.scrollTop = target.offsetTop + target.clientHeight / 2 - list.clientHeight / 2;

          target.children[0]?.classList.add(focusClass);

          setTimeout(() => {
            target.children[0]?.classList.remove(focusClass);
          }, 2000);
          return;
        }

        if (attempt < 5) {
          setTimeout(() => scrollToTarget(attempt + 1), 50);
        }
      };

      nextTick(() => scrollToTarget());
    }
  );
}


import { provideMessageDraftStore } from './useMessageDraft'
import { provideThemeStore } from './useTheme'
import { provideSearchModelStore } from './useSearchModel'
import { provideEmojiNativeStore } from './useEmojiNative'

/**
 * Provide всех instance-scoped store чата (BaseContainer / FloatContainer).
 */
export function provideChatAppStores() {
  provideMessageDraftStore()
  provideThemeStore()
  provideSearchModelStore()
  provideEmojiNativeStore()
}

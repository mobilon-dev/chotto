<template>
  <Transition>
    <ButtonContextMenu
      v-if="commands"
      ref="refBCM"
      menu-side="top"
      :mode="mode"
      :disabled="getMessage().isRecording || state == 'disabled'"
      :actions="commands"
      @click="sendCommand"
    >
      <span
        class="commands__trigger"
        :class="{
          commands__disabled: getMessage().isRecording || state == 'disabled',
        }"
      >
        /
      </span>
    </ButtonContextMenu>
  </Transition>
</template>

<script setup lang="ts">
import { useTemplateRef, inject, watch } from "vue";
import { useMessage } from "../../../helpers/useMessage";
import { IInputMessage } from "../../../types";
import { ButtonContextMenu } from "../ButtonContextMenu";

const props = defineProps({
  commands: {
    type: Array,
    required: false,
    default: null,
  },
  mode: {
    type: String,
    required: false,
    default: "hover",
  },
  state: {
    type: String,
    default: "active",
  },
});

const emit = defineEmits(["send"]);

const chatAppId = inject("chatAppId");
const { getMessage } = useMessage(chatAppId as string);

const refBCM = useTemplateRef("refBCM");

const sendCommand = (command) => {
  console.log(command);
  const messageObject: IInputMessage = {
    type: "message.command",
    text: command.action,
  };
  emit("send", messageObject);
};

watch(
  () => getMessage().text,
  () => {
    if (props.commands) {
      if (getMessage().text.startsWith("/")) {
        refBCM.value?.updatePosition();
      } else {
        refBCM.value?.hideMenu();
      }
    }
  }
);
</script>

<style scoped lang="scss">
.commands {
  &__trigger {
    padding: var(--chotto-chat-input-button-padding);
    display: block;
    cursor: pointer;
    font-size: calc(var(--chotto-button-icon-size) - 7px);
    color: var(--chotto-button-color-active);
  }

  &__trigger:hover {
    color: var(--chotto-button-color-hover);
  }

  &__disabled {
    color: var(--chotto-button-color-disabled);
    cursor: auto;
    pointer-events: none;
  }
}
</style>

import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],

  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },

  viteFinal: async (config) => {
    // Use local base in dev and GitHub Pages base in production builds
    config.base = process.env.NODE_ENV === 'production' ? '/chotto/' : '/';
    return config;
  }
};
export default config;

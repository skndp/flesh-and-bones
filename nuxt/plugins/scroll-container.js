import { defineNuxtPlugin } from "#app"
import ScrollContainerPlugin from "~/utils/scroll-container"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ScrollContainerPlugin, {
    directiveName: "scroll-container",
  })
})
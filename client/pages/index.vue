<script setup lang="ts">
import { useDevtoolsClient } from '@nuxt/devtools/iframe-client'

// import wellKnownOptions from '#well-known'

const client = useDevtoolsClient()
const router = computed(() => client.value?.host?.nuxt.vueApp.config.globalProperties?.$router)

async function goToSecurityTxt () {
  await router.value?.push('.well-known/security.txt')
  router.value?.go(0)
  // console.log('client.value?.host?.nuxt.vueApp.config.globalProperties', client.value?.host?.nuxt.vueApp.config.globalProperties)
}

async function checkChangePasswordRedirection () {
  await router.value?.replace('.well-known/change-passord')
  router.value?.go(0)
}
</script>

<template>
  <div class="relative p-10 n-bg-base flex flex-col h-screen">
    <h1 class="text-3xl font-bold">
      Nuxt Well Known
    </h1>
    <div class="opacity-50 mb-4">
      Nuxt DevTools Integration
    </div>
    <div
      v-if="client"
      class="flex flex-col gap-2 h-full"
    >
      <NTip
        n="green"
        icon="carbon-checkmark"
      >
        Nuxt DevTools is connected
      </NTip>

      <ModuleAuthorNote icon="carbon-align-box-top-left" />

      <div class="w-full bg-green opacity-50 h-0.5 mt-2" />

      <div class="flex gap-4 flex-1 items-start py-2">
        <NButton
          n="green"
          @click="goToSecurityTxt"
        >
          Go to security.txt
        </NButton>

        <NButton
          n="green"
          @click="checkChangePasswordRedirection"
        >
          Test change password redirection
        </NButton>
      </div>

      <div>
        <NButton
          n="green"
          class="mt-4"
          @click="client?.host.closeDevTools()"
        >
          Close DevTools
        </NButton>
      </div>
    </div>
    <div v-else>
      <NTip n="yellow">
        Failed to connect to the client. Did you open this page inside Nuxt DevTools?
      </NTip>
    </div>

    <div class="flex-auto" />
  </div>
</template>

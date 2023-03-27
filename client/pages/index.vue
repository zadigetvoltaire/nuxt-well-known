<script setup lang="ts">
import { useDevtoolsClient } from '@nuxt/devtools-kit/iframe-client'

const client = useDevtoolsClient()

const nuxtConfig = await client.value?.devtools.rpc.getServerConfig()
const moduleOptions = nuxtConfig?.wellKnown
</script>

<template>
  <div class="relative p-5 n-bg-base flex flex-col">
    <h1 class="text-3xl font-bold">
      Nuxt Well Known
    </h1>

    <p class="opacity-50 mb-4">
      By Zadig&voltaire ©
    </p>

    <div
      v-if="client"
      class="flex flex-col gap-2 h-full"
    >
      <div class="w-full bg-green opacity-50 h-0.5 mt-2" />

      <ModuleAuthorNote icon="carbon-align-box-top-left" />

      <OptionTable v-if="moduleOptions" :options="moduleOptions" />

      <div class="flex flex-col gap-2 flex-1 items-start py-2">
        <h2 class="w-full text-xl font-bold">
          URIs
        </h2>

        <a
          v-if="moduleOptions?.securityTxt && !moduleOptions?.securityTxt.disabled"
          href="/.well-known/security.txt"
          class="hover:underline text-green"
        >
          /.well-known/security.txt
        </a>

        <a
          v-if="moduleOptions?.changePassword && !moduleOptions?.changePassword.disabled"
          href="/.well-known/change-password"
          class="hover:underline text-green"
        >
          /.well-known/change-password
        </a>

        <template v-if="moduleOptions?.contentUris">
          <a v-for="(uri, i) in moduleOptions.contentUris" :key="i" class="hover:underline text-green" :href="`/.well-known/${uri.path}`">
            /.well-known/{{ uri.path }}
          </a>
        </template>
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

    <div class="flex-auto" />
  </div>
</template>

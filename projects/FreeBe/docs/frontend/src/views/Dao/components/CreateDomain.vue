
<script setup lang="ts">
import { useField } from 'vee-validate';
import { toFieldValidator } from '@vee-validate/zod';
import * as zod from 'zod';

const emit = defineEmits<{ (e: "onStateChanged", checked: boolean): void }>();

const fieldSchema = toFieldValidator(
  zod.string().max(10).min(3).trim()
);
const { value, errorMessage } = useField('domain', fieldSchema);

const errorMsgs = ref(errorMessage);
function onSubmit() {
  if (!value.value) { errorMsgs.value = "Please enter the Dao the domain name!"; return };
  if (errorMessage.value) return;

  emit('onStateChanged', true);
}

</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mt-24 h-40 w-full">
      <div class="mb-28 w-full">
        <img src="@/assets/logos/Freebe_logo.svg" width="150" alt="">
        <h1 class="text-4xl font-black">Let’s create your DAO!</h1>
      </div>
      <h1 class="text-xl font-bold">Pick your domain</h1>
      <p class="text-gray-400  mb-8 ">This is your DAO link which can be shared on the internet.</p>
      <div>
        <div class="flex w-full">
          <div class="h-12 rounded-sm text-center px-5 pt-3 bg-traxgray border border-gray-200 text-gray-500">
            free-be.xyz
          </div>
          <label for="UserText"
            class="relative flex-auto overflow-hidden rounded-rm border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <input type="text" id="UserText" v-model="value" name="domain" placeholder="Dao Domain"
              class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />

            <span
              class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              Dao Domain
            </span>
          </label>
        </div>
        <span class="text-red-500">{{ errorMsgs }}</span>
      </div>
    </div>
    <FreeBtn op_type="submit" class="mt-80" size="full" type="default" redius="rounded">Create my DAO &nbsp; ->
    </FreeBtn>
  </form>
</template>

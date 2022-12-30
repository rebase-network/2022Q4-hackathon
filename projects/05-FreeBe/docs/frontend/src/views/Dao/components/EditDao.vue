
<script setup lang="ts">
import { useField } from 'vee-validate';
import { toFieldValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import { Ref } from 'vue';
import { colorMock } from '@/mocks/color';

const emit = defineEmits<{ (e: "onStateChanged", checked: boolean): void }>();

const fieldSchema = toFieldValidator(
  zod.string().max(10).min(3)
);
const { value, errorMessage } = useField('domain', fieldSchema);

const isActiveIndex = ref(0);
const colors = ref(colorMock);
const daoColor: Ref<string> = ref("");
const showColorPicker = ref(false);

function updateDaoColor(colorVal: string) {
  daoColor.value = colorVal;
  colors.value[colors.value.length - 1] = colorVal;
}

function CheckThemeColor(colorVal: string, index: number) {
  daoColor.value = colorVal;
  isActiveIndex.value = index;
  if (index === colors.value.length - 1) {
    showColorPicker.value = !showColorPicker.value;
  }
}


function BackDomain() {
  // 1. Clear Data

  // 2. back
  emit('onStateChanged', false);
}

const visible: Ref<boolean> = ref(false);
</script>

<template>
  <div>
    <!-- <Form> -->
    <FreeDialog title="Edit DAO Basics" v-model:visible="visible">
      <div class="mt-4 w-full h-40">
        <div class="mb-12">
          <h1 class="text-4xl mb-2">✨</h1>
          <h1 class="text-4xl font-black">Tell us about your DAO.</h1>
        </div>
        <!-- DAO name -->
        <div class="h-32">
          <h1 class="text-xl font-bold">DAO name *</h1>
          <p class="text-gray-400  mb-2">How would you like to be known?</p>
          <div class="flex w-ful ">
            <label for="UserText"
              class="relative flex-auto w-128 overflow-hidden rounded-rm border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <input type="text" id="UserText" v-model="value" name="domain" placeholder="Input name"
                class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />

              <span
                class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                Input name
              </span>
            </label>
          </div>
          <span class="text-red-500">{{ errorMessage }}</span>
        </div>
        <!-- Upload image -->
        <div class="h-32">
          <FreeUpload />
        </div>
        <!-- Mission -->
        <div class="mb-4 h-40">
          <h1 class="text-xl font-bold">Mission</h1>
          <p class="text-gray-400  mb-2 ">What is your purpose of creating this DAO?</p>
          <div class="flex w-full">
            <label for="UserText"
              class="relative flex-auto w-128 overflow-hidden rounded-rm border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <input type="text" id="UserText" v-model="value" name="domain" placeholder="Input name"
                class="peer h-20 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />

              <span
                class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                Make it short and easy to understand.
              </span>
            </label>
          </div>
          <span class="text-red-500">{{ errorMessage }}</span>
        </div>
        <!-- Theme Color -->
        <div class="relative">
          <h1 class="text-xl font-bold">Theme Color *</h1>
          <p class="text-gray-400  mb-2 ">Pick theme color for your DAO</p>
          <ul class="w-full flex">
            <li v-for="(item, index) in colors" :key="index" class="w-12 h-12 rounded-lg mr-6 cursor-pointer"
              :class="{ active: index === isActiveIndex, lastColor: index === colors.length - 1 }"
              :style="{ backgroundColor: item }" @click.stop="CheckThemeColor(item, index)">
            </li>
          </ul>
          <div v-show="showColorPicker" class="absolute top-[-18rem] left-[10rem]">
            <v-color-picker @update:model-value="updateDaoColor($event)"></v-color-picker>
          </div>
        </div>
        <!-- handle button -->
        <div class="w-full flex justify-evenly mt-12">
          <FreeBtn @click="BackDomain()" size="middle" type="light" radius="rounded-xl">Create my DAO &nbsp; ->
          </FreeBtn>
          <FreeBtn to="/" class="rounded-xl" size="large" type="default" redius="rounded-xl">Create my DAO &nbsp; ->
          </FreeBtn>
        </div>
      </div>
    </FreeDialog>
    <!-- </Form> -->
  </div>
</template>

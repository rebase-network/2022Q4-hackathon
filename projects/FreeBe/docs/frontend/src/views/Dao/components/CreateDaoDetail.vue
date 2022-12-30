
<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import { Ref } from 'vue';
import { colorMock } from '@/mocks/color';
import { useDaoStore } from "@/stores/daoStore"

import { useUserStore } from '@/stores/userStore';
import router from '@/router';
const userStore = useUserStore();
const { profile } = storeToRefs(userStore);

const daoStore = useDaoStore();
const emit = defineEmits<{ (e: "onStateChanged", checked: boolean): void }>();

const isActiveIndex = ref(0);
const colors = ref(colorMock);
const daoColor: Ref<string> = ref("");
const showColorPicker = ref(false);


const validator = toFormValidator(
  // 定义表单的验证规则
  zod.object({
    dao_name: zod
      .string({
        required_error: "Please enter your DAO name",
        invalid_type_error: "The DAO name type errors",
      })
      .regex(/^\w{2,19}$/, "The length of daoname must be 3 to 20"),
    mission: zod
      .string({
        required_error: "Please enter your DAO mission",
        invalid_type_error: "The DAO mission type errors",
      })
      .regex(/^\w{9,49}$/, "The length of mission must be 10 to 50"),
    theme_color: zod
      .string({
        required_error: "Please enter your DAO theme_color",
        invalid_type_error: "The DAO theme_color type errors",
      })
  })
);

const { handleSubmit, values, setFieldValue, validate } = useForm({
  validationSchema: validator,
  initialValues: {
    dao_name: "",
    dao_image: "",
    mission: "",
    theme_color: "#0FBCC0"
  },
});

const onSubmit = handleSubmit(async (formValues) => {
  await daoStore.createDao({ action: 'create', wallet_address: "profile.value.result.wallet_address", ...formValues });
  if (formValues) router.push('/thedao');
});

function updateDaoColor(colorVal: string) {
  daoColor.value = colorVal;
  colors.value[colors.value.length - 1] = colorVal;
  setFieldValue('theme_color', colorVal)
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



</script>

<template>
  <div>
    <Form @submit.prevent="onSubmit">
      <div class="mt-4 w-full h-40">
        <div class="mb-12">
          <h1 class="text-4xl mb-2">✨</h1>
          <h1 class="text-4xl font-black">Tell us about your DAO.</h1>
        </div>
        <!-- DAO name -->
        <div class="h-32">
          <h1 class="text-xl font-bold">DAO name *</h1>
          <p class="text-gray-400  mb-2">How would you like to be known?</p>
          <Field name="dao_name" type="text" v-slot="{ field }">
            <div class="flex w-ful ">
              <label for="UserText"
                class="relative flex-auto w-128 overflow-hidden rounded-rm border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input type="text" id="UserText" v-bind="field" name="domain" placeholder="Input name"
                  class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />

                <span
                  class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                  Input name
                </span>
              </label>
            </div>
            <ErrorMessage name="dao_name" v-slot="{ message }">
              <div class="error text-red-500">
                <i class="iconfont icon-warning "></i> {{ message }}
              </div>
            </ErrorMessage>

            <!-- <span class="text-red-500">{{ errorMessage }}</span> -->
          </Field>
        </div>
        <!-- Upload image -->
        <div class="h-32">
          <Field name="dao_image" type="text" v-slot="{ field }">
            <FreeUpload :field="field" @on-image-changed="setFieldValue('dao_image', $event as string)" />
            <ErrorMessage name="dao_image" v-slot="{ message }">
              <div class="error text-red-500">
                <i class="iconfont icon-warning"></i> {{ message }}
              </div>
            </ErrorMessage>
          </Field>
        </div>
        <!-- Mission -->
        <div class="mb-4 h-40">
          <h1 class="text-xl font-bold">Mission</h1>
          <p class="text-gray-400  mb-2 ">What is your purpose of creating this DAO?</p>
          <Field name="mission" type="text" v-slot="{ field }">
            <div class="flex w-full">
              <label for="UserText"
                class="relative flex-auto w-128 overflow-hidden rounded-rm border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input type="text" id="UserText" v-bind="field" name="domain" placeholder="Input name"
                  class="peer h-20 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />

                <span
                  class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                  Make it short and easy to understand.
                </span>
              </label>
            </div>
            <ErrorMessage name="mission" v-slot="{ message }">
              <div class="error text-red-500">
                <i class="iconfont icon-warning"></i> {{ message }}
              </div>
            </ErrorMessage>
          </Field>
          <!-- <span class="text-red-500">{{ errorMessage }}</span> -->
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
          <FreeBtn @click="BackDomain()" size="middle" type="light" radius="rounded-xl"> &lt;- &nbsp;BackDomain
          </FreeBtn>
          <FreeBtn op_type="submit" class="rounded-xl" size="large" type="default" redius="rounded-xl">Create my DAO
            &nbsp; ->
          </FreeBtn>
        </div>
      </div>
    </Form>
  </div>
</template>

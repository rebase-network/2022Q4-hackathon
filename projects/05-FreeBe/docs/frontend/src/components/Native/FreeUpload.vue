
<script setup lang="ts">
const emit = defineEmits<{ (e: "onImageChanged", image: string): string }>();

const fileInput = ref();
const previewImage = ref('');
const img_file = ref<Blob>();
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files![0];

  const reader = new FileReader();
  reader.onloadend = () => {
    previewImage.value = reader.result as string;
  }

  reader.readAsDataURL(file);
  img_file.value = file;
  fileInput.value = file;

  emit("onImageChanged", file.name)
}
const uploadFile = () => {
  // 利用ref触发input
  fileInput.value.click();
  // 上传文件的逻辑
};
</script>


<template>
  <!-- 后期拆分解构 -->
  <div class="flex items-center flex-wrap w-full my-2 ">
    <input type="file" accept="image/*" @change="handleFileChange" ref="fileInput" v-show="false" />

    <div class="w-20 h-20 m-2 rounded-full ">
      <img v-if="!previewImage" src="@/assets/images/upload.svg"
        class="p-2 w-20 border-2 rounded-full border-gray-400 border-dashed" alt="">
      <img v-else :src="previewImage" class="w-full rounded-full h-full" alt="">
    </div>
    <div class="flex-auto w-36 ml-4">
      <button @click="uploadFile" class="px-4 h-10 rounded-lg bg-gray-200 hover:border-green-300">Upload logo</button>
      <p class="text-[#827d75]">.png .jpg .gif | 1:1size | Max 5Mb</p>
    </div>
  </div>
</template>

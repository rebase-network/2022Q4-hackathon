<script setup lang="ts">
const props = defineProps(["daoDatas"]);
const animation_fast = ref();
const animation_last_one = ref();
const animation_last_two = ref();

let animationId: number | null = null;
function animate1(time: number) { }


onMounted(() => {
  let x = 0; // x-offset-value
  function animate() {
    if (!animation_fast.value?.style) return;

    animation_fast.value.style.transform = `translateX(-${240 + x}px)`;
    animation_last_one.value.style.transform = `translateX(-${x}px)`;
    animation_last_two.value.style.transform = `translateX(-${100 + x}px)`;
    x += 0.5; // movement speed
    requestAnimationFrame(animate);
    const rect = animation_fast.value.getBoundingClientRect();

    if (-rect.left + animation_fast.value.offsetWidth > window.innerWidth && -rect.left % 1000 === 0 && props.daoDatas.value?.length < 5) {
      // 部分元素超出可视区域 - 添加数据数据
      animation_fast.value.removeChild(animation_fast.value.children[0]);
      animation_last_one.value.removeChild(animation_last_one.value.children[0]);
      animation_last_two.value.removeChild(animation_last_two.value.children[0]);
      props.daoDatas.value?.shift();
      // 请求数据
    }
  }

  // 页面挂载时触发
  if (animation_fast.value) requestAnimationFrame(animate);

  animationId = requestAnimationFrame((time: number) => animate1(time));
})

onUnmounted(() => {
  console.log('over');
  // animation_fast.value.style.transform = `translateX(${0}px)`;
  // animation_last_one.value.style.transform = `translateX(-${0}px)`;
  // animation_last_two.value.style.transform = `translateX(-${0}px)`;
  cancelAnimationFrame(animationId!);
})


</script>

<template>
  <div class="banner_main">
    <div class="dao_banner_list list_last" ref="animation_last_one">
      <SquareBannerCard :dao-data="daoDatas" />
    </div>
    <div class="dao_banner_list list_fast" ref="animation_fast">
      <SquareBannerCard :dao-data="daoDatas" />
    </div>
    <div class="dao_banner_list list_last" ref="animation_last_two">
      <SquareBannerCard :dao-data="daoDatas" />
    </div>
  </div>
</template>



<style scoped lang="less">
.banner_main {
  // margin-top: 40px;

  .dao_banner_list {
    display: flex;
  }
}

// .dao_banner_list:nth-last-of-type(2) {
//   transform: translateX(-240px);
// }

// // animation style
// .list_fast {
//   animation: scroll_fast 12s linear 0s infinite;
// }

// .list_last {
//   animation: scroll1_last 12s linear 0s infinite;
// }


// @keyframes scroll1_last {
//   from {
//     // transform: translateX(0);
//     // left: 0;
//   }

//   to {
//     // transform: translateX(-480px);
//   }
// }

// @keyframes scroll_fast {
//   from {
//     // transform: translateX(-240px);
//     // left: 0;
//   }

//   to {
//     // transform: translateX(-720px);
//   }
// }
</style>

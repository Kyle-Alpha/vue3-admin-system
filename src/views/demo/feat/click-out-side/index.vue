<template>
  <PageWrapper title="点内外部触发事件">
    {{ decimal }}\{{ decimal2 }}

    <ClickOutSide @clickOutside="handleClickOutside" class="flex justify-center">
      <div @click="innerClick" class="demo-box">
        {{ text }}
      </div>
    </ClickOutSide>
    <div>浮点:v-input -> {{ decimal }}</div>
    <a-input type="text" v-input v-model:value="decimal" />
    <div> 浮点格式化:v-input.format -> {{ decimal2 }}</div>
    <a-input type="text" v-input.format v-model:value="decimal2" />
    <div>整型:v-input.int -> {{ decimal3 }}</div>
    <a-input type="text" v-input.int v-model:value="decimal3" />
    <div>整型格式化:v-input.int.format -> {{ decimal4 }}</div>
    <a-input type="text" v-input.int.format v-model:value="decimal4" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { ClickOutSide } from '/@/components/ClickOutSide';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: { ClickOutSide, PageWrapper },
    setup() {
      const text = ref('Click');
      function handleClickOutside() {
        text.value = 'Click Out Side';
      }

      function innerClick() {
        text.value = 'Click Inner';
      }
      const decimal = ref('');
      const decimal2 = ref('');
      const decimal3 = ref('');
      const decimal4 = ref('');
      return { innerClick, handleClickOutside, text, decimal, decimal2, decimal3, decimal4 };
    },
  });
</script>

<style lang="less" scoped>
  .demo-box {
    display: flex;
    width: 100%;
    height: 300px;
    font-size: 24px;
    color: #fff;
    background-color: #408ede;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  }
</style>

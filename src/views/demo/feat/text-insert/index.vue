<template>
  <PageWrapper title="插入文案">
    <a-button type="primary" class="mb-10" @click="insert('')">插入</a-button>
    <a-textarea v-model:value="content" ref="dom" placeholder="Basic usage" :rows="4" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    name: 'TextInsertDemo',
    components: { PageWrapper },
    setup() {
      const content = ref(`
五百里滇池，奔来眼底，披襟岸帻，喜茫茫空阔无边。看东骧神骏，西翥灵仪，北走蜿蜒，南翔缟素。高人韵士，何妨选胜登临。趁蟹屿螺洲，梳裹就风鬟雾鬓；更苹天苇地，点缀些翠羽丹霞，莫辜负四围香稻，万顷晴沙，九夏芙蓉，三春杨柳。
数千年往事，注到心头，把酒凌虚，叹滚滚英雄谁在。想汉习楼船，唐标铁柱，宋挥玉斧，元跨革囊。伟烈丰功，费尽移山心力。尽珠帘画栋，卷不及暮雨朝云；便断碣残碑，都付与苍烟落照。只赢得几杵疏钟，半江渔火，两行秋雁，一枕清霜。
`);
      const dom = ref(null);
      const insert = async (val = '@用户名称') => {
        const insertDom = dom.value.$el;
        const cursorStart = insertDom.selectionStart;
        const cursorEnd = insertDom.selectionEnd;
        content.value = content.value.slice(0, cursorStart) + val + content.value.slice(cursorEnd);
        await nextTick();
        insertDom.focus();
        const len = cursorEnd - (cursorEnd - cursorStart) + val.length;
        insertDom.setSelectionRange(len, len);
      };
      return { content, insert, dom };
    },
  });
</script>
<style lang="less" scoped>
  .w-300 {
    width: 300px;
  }

  .w-30p {
    width: 30%;
  }
</style>

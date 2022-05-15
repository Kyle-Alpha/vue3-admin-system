<template>
  <PageWrapper title="打印示例">
    <h4>一行文本超出隐藏</h4>
    <div class="w-300 text-ellipsis">
      很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本
    </div>
    <h4>两行文本超出隐藏</h4>
    <div class="w-300 text-ellipsis--l2">
      很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本,
      很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本
    </div>
    <h4>自适应文本超出隐藏</h4>
    <div class="w-30p flex">
      <span class="text-ellipsis">
        很长的文本很长的很长的文本很长的很长的文本很长的很长的文本很长的
      </span>
      <span class="text-ellipsis"
        >🐯🐯🐯🐯🐼🐼🐼🐼🐼🐼🐼🐙🐙🙉🙉🐔🙊🙊🐒🐒🐯🐯🐯🐯🐼🐼🐼🐼🐼🐼🐼🐙🐙🙉🙉🐔🙊🙊🐒🐒</span
      >
    </div>
    <div class="w-30p text-ellipsis--l2">
      <span class="item" v-for="item in 16" :key="item">标签{{ item }}</span>
    </div>
    <div class="ellipsis-component">
      <OverflowEllipsis
        class="ellipsis-content"
        @click-btn="hideMore(false)"
        :content="content"
        :rows="2"
        :btnText="'查看全部'"
        :ellipsisText="'...'"
        v-if="ellipsis"
      />
      <div class="ellipsis-content" v-else>
        {{ content }}
        <span class="btn" @click.stop="hideMore(true)">折叠</span>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { OverflowEllipsis } from '/@/components/OverflowEllipsis';

  export default defineComponent({
    name: 'TextOverflowDemo',
    components: { PageWrapper, OverflowEllipsis },
    setup() {
      /* 生成随机颜色 */
      // const randomColor = () => {
      //   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      // };
      const content = ref(`
五百里滇池，奔来眼底，披襟岸帻，喜茫茫空阔无边。看东骧神骏，西翥灵仪，北走蜿蜒，南翔缟素。高人韵士，何妨选胜登临。趁蟹屿螺洲，梳裹就风鬟雾鬓；更苹天苇地，点缀些翠羽丹霞，莫辜负四围香稻，万顷晴沙，九夏芙蓉，三春杨柳。
数千年往事，注到心头，把酒凌虚，叹滚滚英雄谁在。想汉习楼船，唐标铁柱，宋挥玉斧，元跨革囊。伟烈丰功，费尽移山心力。尽珠帘画栋，卷不及暮雨朝云；便断碣残碑，都付与苍烟落照。只赢得几杵疏钟，半江渔火，两行秋雁，一枕清霜。
`);
      const ellipsis = ref(false);
      const hideMore = (bool) => {
        ellipsis.value = bool;
      };
      return { content, ellipsis, hideMore };
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

  .item {
    display: inline-flex;
    margin-right: 10px;
    margin-top: 10px;
    padding: 5px 10px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }
</style>

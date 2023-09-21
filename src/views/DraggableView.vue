<template>
  <div>
    <DraggableComponentVue
    :msg="title"
      :leftList="leftList.data"
      :contentList="contentList.data"
      @delGroup="delGroupFn"
      @delItem="delItemFn"
      @addGroup="addGroupFn"
      @commitJson="commitJsonFn"
    ></DraggableComponentVue>
  </div>
</template>
 
<script lang="ts" setup>
import DraggableComponentVue from "@/components/DraggableComponent.vue";
import { reactive, ref } from "vue";
const title = ref("标题栏")
const leftList = reactive({
  data: [
    {
      id: 101,
      name: "卡片1",
    },
    {
      id: 102,
      name: "卡片2",
    },
    {
      id: 103,
      name: "卡片3",
    },
    {
      id: 104,
      name: "卡片4",
    },
    {
      id: 105,
      name: "卡片5",
    },
  ],
});
let contentList = reactive({
  data: [
    {
      title: "标题1",
      item: [
        {
          name: "苹果",
          id: 300,
        },
        {
          name: "香蕉",
          id: 301,
        },
      ],
    },
    {
      title: "标题2",
      item: [
        {
          name: "篮球",
          id: 200,
        },
        {
          name: "足球",
          id: 300,
        },
      ],
    },
  ],
});

const addGroupFn = ()=>{
  contentList.data.push({ title: "新分组", item: [] });
}

const commitJsonFn = ()=>{
  alert(JSON.stringify(contentList.data))
  console.log(contentList.data)
}

//删除分组
const delGroupFn = (data: any) => {
  contentList.data = contentList.data.filter((item: any) => item !== data);
  data.item.forEach((i: any) => {
    //删除后回到左边列表
    leftList.data.push(i);
  });
};

//删除单个
const delItemFn = (el: any) => {
  console.log(el);
  contentList.data.map((i: any) => {
    console.log(i);
    i.item = i.item.filter((j: any) => j !== el);
  });
  leftList.data.push(el);
};
</script>
<style lang="scss" scoped>
</style>
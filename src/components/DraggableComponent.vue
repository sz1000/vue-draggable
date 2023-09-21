<template>
  <div class="box">
    <div class="leftList">
      <!-- 为组件设置相同的 group 属性，可以实现在不同的块之间拖拽 -->
      <div class="title">
        功能栏({{ msg }})<span @click="addGroup" class="add"> + </span>
      </div>
      <div class="groupCrud">
        <span class="text">分组卡片</span>
      </div>
      <draggable
        group="group"
        :list="leftList"
        item-key="id"
        :move="onMove"
        chosen-class="chosen1"
        animation="300"
        @end="onEnd"
      >
        <template #item="{ element }">
          <div class="item">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="contentList">
      <draggable
        :list="contentList"
        group="ul"
        :move="onMove"
        animation="300"
        @end="onEnd"
        itemKey="id"
        class="conList"
      >
        <template #item="{ element }">
          <div class="list">
            <div class="title">
              <a-input class="text" v-model:value="element.title"></a-input>
              <span class="delGroup" @click="delGroup(element)">X</span>
            </div>
            <draggable
              class="ul"
              :list="element.item"
              group="group"
              :move="onMove"
              animation="300"
              itemKey="id"
              @end="onEnd"
            >
              <template #item="{ element }">
                <div class="item" @click="delItem(element)">
                  <div class="info">{{ element.id }}</div>
                  <div class="title">{{ element.name }}</div>
                </div>
              </template>
            </draggable>
          </div>
        </template>
      </draggable>
    </div>
    <a-button type="primary" @click="commitJson">提交</a-button>
  </div>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable";
const emit = defineEmits([
  "addGroup",
  "onMove",
  "onEnd",
  "delGroup",
  "delItem",
  "commitJson",
]);
const props = defineProps({
  leftList: {
    type: Array,
    default: () => [],
  },
  contentList: {
    type: Array,
    default: () => [],
  },
  msg:{
    type:String,
    default:''
  }
});

const addGroup = () => {
  emit("addGroup");
};
const onMove = () => {
  emit("onMove");
};
const onEnd = () => {
  emit("onEnd");
};
const delGroup = (data: any) => {
  emit("delGroup",data);
};
const delItem = (data: any) => {
  console.log(data);
  emit("delItem",data);
};
const commitJson = () => {
  emit("commitJson");
};
</script>
<style  lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-around;
  margin: 0 50px;
  .leftList {
    border: 1px solid #777;
    border-radius: 10px;
    min-height: 300px;
    width: 220px;
    .title {
      line-height: 2;
      position: relative;
      .add {
        cursor: pointer;
        width: 40px;
        width: 40px;
        position: absolute;
        right: 6px;
        top: 0px;
      }
    }
    .groupCrud {
      display: flex;
      justify-content: space-around;
      .text {
        flex: 1;
        background: #f1f1f1;
        padding: 0 20px;
        line-height: 2;
      }
    }

    .item {
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      background-color: #1890ff;
      text-align: center;
      color: #fff;
      font-size: 18px;
      margin: 10px;
    }
  }

  .contentList {
    flex-wrap: wrap;
    width: 100%;

    .conList {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #777;
      border-radius: 10px;
      margin: 0 20px;
      padding-bottom: 50px;
      .list {
        width: 180px;
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px;
        border-radius: 10px;
        .title {
          width: 100%;
          text-align: center;
          font-size: 14px;
          position: relative;
          line-height: 1.5;
          height: 30px;
          .text {
            width: 126px;
          }
          .delGroup {
            cursor: pointer;
            position: absolute;
            right: 0;
            top: 5px;
          }
        }
        .ul {
          min-height: 200px;
          display: flex;
          flex-wrap: wrap;
          .item {
            cursor: pointer;
            margin: 10px;
            .info {
              background-color: skyblue;
              color: #fff;
              border-radius: 50%;
              width: 50px;
              line-height: 50px;

              text-align: center;
            }
            .title {
              position: relative;
              width: 100%;
              text-align: center;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>

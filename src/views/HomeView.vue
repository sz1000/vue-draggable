<template>
  <div class="box">
    <div class="contentList">
      <draggable
        :disabled="true"
        :list="arr.list"
        group="ul"
        animation="300"
        itemKey="id"
        class="conList"
      >
        <template #item="{ element }">
          <div class="list">
            <div class="title">
              <span>{{ element.title }}</span>
            </div>
            <draggable
              :disabled="true"
              class="ul"
              :list="element.item"
              group="group"
              animation="300"
              itemKey="id"
            >
              <template #item="{ element }">
                <div class="item">
                  <div class="info">{{ element.id }}</div>
                  <div class="title">{{ element.name }}</div>
                </div>
              </template>
            </draggable>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
import draggable from "vuedraggable";

const arr = reactive<any>({
  list: [],
}) as any;

onMounted(() => {
  console.log("router---: ", route);
  if (route.query && route.query.list) {
    localStorage.setItem("list", route.query.list);
    let data = localStorage.getItem("list");
    const list = JSON.parse(data);
    arr.list = list;
  } else if (localStorage.getItem("list")) {
    let data = localStorage.getItem("list");
    const list = JSON.parse(data);
    arr.list = list;
  }
});
</script>
<style  lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-around;
  margin: 0 50px;
  .leftList {
    border: 1px solid #ccc;
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
      .list {
        width: 180px;
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px;
        border-radius: 10px;
        min-height: 200px;
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

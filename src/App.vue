<template>
  <div id="app" style="top:30px; bottom:0px; position:absolute; width:100%;">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <vue-waterfall-easy
      :imgsArr="imgsArr"
      @scrollReachBottom="getData"
      @click="clickFn"
      linkRange="img"
    >
      <div slot-scope="props" style="display:flex; flex-flow: column; word-break: break-word">
        <div class="card-body">
          <h5 class="card-title">第{{props.index+1}}张图片</h5>
          <p class="card-text">{{props.value.info}}</p>
        </div>
      </div>
    </vue-waterfall-easy>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import vueWaterfallEasy from "vue-waterfall-easy";
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      imgsArr: [],
      group: 0 // request param
    };
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    getData() {
      // In the real environment,the backend will return a new image array based on the parameter group.
      // Here I simulate it with a stunned json file.
      axios.get("./data.json?group=" + this.group).then(res => {
        this.imgsArr = this.imgsArr.concat(res.data);
        this.group++;
      });
    },
    clickFn() {}
  },
  created() {
    this.getData();
  }
};
</script>

<style>
#app {
  min-height: 300px;
}
</style>

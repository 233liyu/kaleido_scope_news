<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- nav bar -->
    <NavBar title="Kaleido Scope"></NavBar>

    <!-- water fall content -->
    <div style="top:56px; bottom:0px; position:absolute; width:100%;">
      <vue-waterfall-easy
        :imgsArr="imgsArr"
        @scrollReachBottom="getData"
        @click="clickFn"
        linkRange="custom"
      >
        <div slot-scope="props" class="slot_tab" style>
          <div class="card-body">
            <h5 class="card-title">第{{ props.index + 1 }}张图片</h5>
            <p class="card-text">{{ props.value.info }}</p>
          </div>
        </div>
      </vue-waterfall-easy>
    </div>

    <newsModal ref="news_modal"></newsModal>
    <!-- end of water fall wrapper -->
  </div>
  <!-- end of app -->
</template>

<script>
import NavBar from "./components/NavBar.vue";
import newsModal from "./components/Modal.vue";

import vueWaterfallEasy from "vue-waterfall-easy";
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      imgsArr: [],
      group: 0,
      publicPath: process.env.BASE_URL
    };
  },
  components: {
    vueWaterfallEasy,
    NavBar,
    newsModal
  },
  methods: {
    getData() {
      // In the real environment,the backend will return a new image array based on the parameter group.
      // Here I simulate it with a stunned json file.
      axios.get("/cs584vm6/data.json?group=" + this.group).then(res => {
        this.imgsArr = this.imgsArr.concat(res.data);
        this.group++;
      });
    },
    clickFn(event, { index, value }) {
      // Prevent a tag jump
      event.preventDefault();
      // Do it only when you click on the image
      if (event.target.tagName.toLowerCase() == "img") {
        // console.log("img clicked", index, value);
        // alert(value.href);
        this.$refs.news_modal.toggleModal(value.href);
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style>
@import url(./assets/css/main.css);
</style>

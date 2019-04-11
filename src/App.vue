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
        hrefKey="url"
        srcKey="img_href"
        v-bind:imgWidth="Number(400)"
      >
        <div slot-scope="props" class="slot_tab" style>
          <div class="card-body">
            <!-- <h5 class="card-title">第{{ props.index + 1 }}张图片</h5> -->
            <h5 class="card-title">{{ props.value.title }}</h5>
            <p class="card-text">{{ props.value.content.substring(0, 150)}}</p>
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
      axios.get("/cs584vm6/news.json?group=" + this.group).then(res => {
        var res_data = res.data
        var con_str = "/cs584vm6/img/"
        for (let i = 0; i < res_data.length; i++) {
          var element = res_data[i];
          switch (element.publication) {
            case "New York Times":
              element.img_href = con_str + "the-new-york-times-logo-featured.jpg";
              break;
            case "Breitbart":
              element.img_href = con_str + "1200px-Breitbart_News.svg.png";
              break;
            case "CNN":
              element.img_href = con_str + "CNN_logo_400x400.png";
              break;
            case "Business Insider":
              element.img_href = con_str + "og-image-logo-social.png";
              break;
            case "Atlantic":
              element.img_href = con_str + "default-thumbnail.png";
              break;
            default:
              break;
          }
          res_data[i] = element;
        }
        this.imgsArr = this.imgsArr.concat(res.data);
        this.group++;
      });
    },
    clickFn(event, { index, value }) {
      // Prevent a tag jump
      event.preventDefault();
      // console.log(value)
      this.$refs.news_modal.toggleModal(value);
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

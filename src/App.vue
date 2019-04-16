<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- nav bar -->
    <NavBar title="Kaleido Scope"></NavBar>

    <!-- water fall content -->
    <div style="top:56px; bottom:0px; position:absolute; width:100%; z-index:-100">
      <vue-waterfall-easy
        :imgsArr="imgsArr"
        @scrollReachBottom="getData"
        @click="clickFn"
        linkRange="custom"
        hrefKey="url"
        srcKey="img_href"
        v-bind:imgWidth="Number(250)"
        v-bind:gap="Number(30)"
        v-bind:maxCols="Number(4)"
      >
        <div slot-scope="props" class="slot_tab" style>
          <div class="card-body">
            <!-- <h5 class="card-title">第{{ props.index + 1 }}张图片</h5> -->
            <h5 class="card-title">
              {{ props.value.title }}
              <b-badge v-bind:variant="props.value.recAlgo_va">{{props.value.recAlgo}}</b-badge>
            </h5>
            <p class="card-text">{{ props.value.content.substring(0, 150)}}</p>
          </div>
        </div>
      </vue-waterfall-easy>
    </div>

    <newsModal ref="news_modal"></newsModal>
    <!-- end of water fall wrapper -->
    <b-container :show="error_alert">
      <b-alert :show="error_alert" dismissible variant="danger">
        <h4 class="alert-heading">Something Wrong!</h4>
        <p>Aww we are encountering some problems, when connecting with our server. Please be patient, while Xinyao, and Yu is working on the problem</p>
        <hr>
        <p class="mb-0">All you need to do is be patient, and refresh this page 5 mins later!</p>
      </b-alert>
    </b-container>
    <!-- end of alert -->
  </div>
  <!-- end of app -->
</template>

<script>
import NavBar from "./components/NavBar.vue";
import newsModal from "./components/Modal.vue";

import vueWaterfallEasy from "vue-waterfall-easy";
import axios from "axios";
import BAlert from "bootstrap-vue/es/components/alert/alert";

export default {
  name: "app",
  data() {
    return {
      imgsArr: [],
      group: 0,
      publicPath: process.env.BASE_URL,
      error_alert: false
    };
  },
  components: {
    vueWaterfallEasy,
    NavBar,
    newsModal,
    "b-alert": BAlert
  },
  methods: {
    getData() {
      // In the real environment,the backend will return a new image array based on the parameter group.
      // Here I simulate it with a stunned json file.
      axios
        .get("/cs584vm6/kaleidoscope/rec/getRec?user_id=1")
        // .get("/cs584vm6/news.json")
        .then(res => {
          // axios.get("/cs584vm6/news.json").then(res => {
          var res_data = res.data.data;
          var con_str = "/cs584vm6/img/";

          for (let i = 0; i < res_data.length; i++) {
            var element = res_data[i];
            switch (element.recAlgo) {
              // 0-随机，1-热点，2-内容相似，3-协同过滤
              // 0-random，1-hot，2-content-similarity，3-collaborative-filtering
              case 0:
                element.recAlgo = "random";
                element.recAlgo_va = "primary";
                break;
              case 1:
                element.recAlgo = "hot";
                element.recAlgo_va = "secondary";

                break;
              case 2:
                element.recAlgo = "cb";
                element.recAlgo_va = "success";

                break;
              case 3:
                element.recAlgo = "cf";
                element.recAlgo_va = "danger";
                break;

              default:
                break;
            }
            // set news background img
            switch (element.source) {
              case "New York Times":
                element.img_href =
                  con_str + "the-new-york-times-logo-featured.jpg";
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
            element.isLike = false;
            element.isDislike = false;
            element.isCollect = false;
            res_data[i] = element;
          }
          this.imgsArr = this.imgsArr.concat(res_data);
          this.group++;
        })
        .catch(error => {
          console.log(error);
          this.error_alert = true;
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
/* // main.styl */
</style>

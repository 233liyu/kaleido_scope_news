<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- nav bar -->
    <NavBar
      title="Kaleido Scope"
      v-bind:debug="debug_flag"
      v-on:debug_change="debug_flag = !debug_flag"
      v-on:user_signup="show_user_rg()"
    ></NavBar>
    <debug-module v-bind:debug_flag="debug_flag" ref="debug_module"></debug-module>

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
              <p class="text-success" v-if="props.value.recAlgo == 'cb'">{{props.value.matchTag}}</p>
            </h5>
            <p class="card-text">{{ props.value.content.substring(0, 150)}}</p>
          </div>
        </div>
      </vue-waterfall-easy>
    </div>

    <newsModal ref="news_modal"></newsModal>
    <user-modal ref="user_modal"></user-modal>
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
import debugModule from "./components/Debug.vue";
import userModal from "./components/userModal.vue";

import vueWaterfallEasy from "vue-waterfall-easy";
import BAlert from "bootstrap-vue/es/components/alert/alert";

import { pre_process } from "./assets/js/util.js";

export default {
  name: "app",
  data() {
    return {
      imgsArr: [],
      publicPath: process.env.BASE_URL,
      error_alert: false,
      debug_flag: false
    };
  },
  components: {
    vueWaterfallEasy,
    NavBar,
    newsModal,
    userModal,
    "b-alert": BAlert,
    debugModule
  },
  methods: {
    getData() {
      // In the real environment,the backend will return a new image array based on the parameter group.
      // Here I simulate it with a stunned json file.
      this.$http
        .get("/cs584vm6/kaleidoscope/rec/getRec?user_id=1")
        // .get("/cs584vm6/news.json")
        .then(res => {
          var res_data = res.data.data;
          var con_str = "/cs584vm6/img/";

          this.error_alert = false;

          if (res_data.length == 0) {
            this.error_alert = true;
            makeToast("No content", "return array = 0", "danger");
          }

          res_data = pre_process(res_data, con_str);
          this.imgsArr = this.imgsArr.concat(res_data);
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
      this.$refs.news_modal.click_fnc(1);
      this.$refs.debug_module.update_tags();
    },
    makeToast(title, content, variant = "info") {
      this.$bvToast.toast(content, {
        title: title,
        autoHideDelay: 5000,
        appendToast: true,
        variant: variant,
        toaster: "b-toaster-bottom-right",
        solid: true
      });
    },
    show_user_rg() {
      this.$refs.user_modal.toggleModal();
    }
  },
  created() {
    this.$http.get("/cs584vm6/kaleidoscope/rec/truncateRecTable");
    this.getData();
  }
};
</script>

<style>
@import url(./assets/css/main.css);
/* // main.styl */
</style>

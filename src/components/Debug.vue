<template>
  <div class="tag_class">
    <div style="display: inline-flex">
      <b-button
        v-b-toggle.tags_info
        v-show="debug_flag"
        variant="danger"
        @click="show_tag=true"
      >tags</b-button>
      <b-button
        v-b-toggle.user_info
        v-show="debug_flag"
        style="margin-left: 5px; width: max-content;"
        variant="info"
        @click="show_user=true; get_userinfo()"
      >User Info</b-button>
    </div>

    <div style="margin-top: 10px;">
      <b-collapse id="tags_info" v-if="debug_flag && show_tag">
        <b-card id="tag_list_id_1">
          <transition-group name="tag_list">
            <li v-for="item in rec_tags" v-bind:key="item" class="tag_list_item">
              <b-badge
                pill
                v-bind:variant="style_list[Math.floor(Math.random() * style_list.length)]"
              >{{ item }}</b-badge>
            </li>
          </transition-group>
        </b-card>
      </b-collapse>

      <b-collapse id="user_info" v-if="debug_flag && show_user">
        <b-card id="tag_list_id_2" style="min-width: 300px;">
          <h5>User Info</h5>
          <b-container>
            <b-row v-for="item in user_info" v-bind:key="item.key" class="tag_list_item">
              <b-col cols="6" class="text-right">{{item.key}}:</b-col>
              <b-col cols="6" style="overflow: visible;display: contents;">{{item.value}}</b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { shuffle } from "../assets/js/util";
export default {
  name: "debug-module",
  props: {
    debug_flag: Boolean
  },
  data: function() {
    return {
      rec_tags: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      show_tag: true,
      show_user: true,
      user_info: [],
      style_list: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark"
      ]
    };
  },
  methods: {
    update_tags() {
      this.$http
        .get("/cs584vm6/kaleidoscope/rec/getUserTag?user_id=1")
        // .get("/cs584vm6/data.json")
        .then(res => {
          var res_data = res.data.data.tag;
          this.rec_tags = shuffle(res_data);
        });
    },
    get_userinfo() {
      if (localStorage.user) {
        var user = JSON.parse(localStorage.user);
        var output = Object.entries(user).map(([key, value]) => ({
          key,
          value
        }));
        this.user_info = output;
      }
    }
  },
  mounted() {
    this.update_tags();
    this.$root.$on("bv::collapse::state", (collapseId, isJustShown) => {
      if (collapseId == "tags_info") {
        this.show_user = !isJustShown;
      }
      if (collapseId == "user_info") {
        this.show_tag = !isJustShown;
      }
    });
  }
};
</script>

<style>
.tag_list_item {
  transition: all 1s;
  display: flex;
  margin-right: 0;
}
.tag_list-enter, .tag_list-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.tag_list-leave-active {
  position: absolute;
}

.tag_class {
  width: min-content;
  padding: 10px;
  display: inline-block;
  position: fixed;
  top: 56px;
  z-index: -50;
}
</style>

<template>
  <b-modal scrollable ref="myModalRef" v-bind:article="news" title="Kaleido Scope News" size="lg">
    <div class="d-block text-center">
      <h3>{{ news.title }}</h3>
      <footer class="blockquote-footer">
        {{ news.author }} in
        <cite>{{ news.source }}</cite>
      </footer>
      <br>

      <p>{{ news.content }}</p>
      <p>{{ news.url }}</p>
    </div>
    <!-- <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button> -->
    <!-- 2-点赞 3-收藏，4-点踩 -->
    <div slot="modal-footer" style="display: block; width: 80%; margin: auto;">
      <b-container>
        <b-row align-h="center">
          <b-col cols="2">
            <font-awesome-icon
              v-bind:class="{button_click : !news.isLike, color_red : news.isLike}"
              v-on:click="news.isLike = !news.isLike"
              @click="click_fnc(2)"
              icon="thumbs-up"
            />
          </b-col>
          <b-col cols="2">
            <font-awesome-icon
              v-bind:class="{button_click : !news.isDislike, color_red : news.isDislike}"
              v-on:click=" news.isDislike = !news.isDislike"
              @click="click_fnc(4)"
              icon="thumbs-down"
            />
          </b-col>
          <b-col cols="2">
            <font-awesome-icon
              v-bind:class="{button_click : !news.isCollect, color_red : news.isCollect}"
              v-on:click=" news.isCollect = !news.isCollect"
              @click="click_fnc(3)"
              icon="heart"
            />
          </b-col>
        </b-row>
      </b-container>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "newsModal",
  methods: {
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    toggleModal(value) {
      // We pass the ID of the button that we want to return focus to when
      // the modal has hidden
      this.$refs.myModalRef.toggle();

      this.news = value;
      //   this.$refs.myModalRef.$props.title = "hahahahha";
    },
    click_fnc(action) {
      // user_id:int（用户id），action_type:int(用户行为类型，包括1-阅读 2-点赞 3-收藏，4-点踩)，news_id:int
      var news_id = this.news.newsID;
      // console.log('news_id', news_id);
      // console.log('news_id', this);

      this.$http
        .get("/cs584vm6/kaleidoscope/rec/updateUserTag", {
          params: {
            user_id: 1,
            action_type: action,
            news_id: news_id
          }
        })
        .then(function(respons) {
          // do nothing
        });
    }
  },
  data: function() {
    return {
      news: {
        author: "Margalit Fox",
        content: "When Walt Disney’s “Bambi” opened in 1942, critics",
        date: "2017-01-06",
        id: 17285,
        img_href: "/cs584vm6/img/the-new-york-times-logo-featured.jpg",
        month: 1,
        publication: "New York Times",
        title:
          "Tyrus Wong, ‘Bambi’ Artist Thwarted by Racial Bias, Dies at 106 - The New York Times",
        url: "/cs584vm6/img/og-image-logo-social.png",
        year: 2017
      }
    };
  }
};
</script>

<style>
#circle {
  width: 200px;
  height: 200px;
  float: left;
  background: red;
  border-radius: 50%;
  -webkit-shape-outside: circle();
  shape-outside: circle();
}

.badge.badge-pill {
  font-size: 1.2em;
  margin-bottom: 0.5em;
}

.button_click:hover {
  color: blueviolet;
}

.color_red {
  color: crimson;
}
</style>

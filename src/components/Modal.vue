<template>
  <b-modal ref="myModalRef" v-bind:article="news" hide-footer size="lg">
    <div class="d-block text-center">
      <h3>{{ news.title }}</h3>
      <footer class="blockquote-footer">
        {{ news.author }} in
        <cite>{{ news.source }}</cite>
      </footer>
      <br>

      <p>{{ news.content }}</p>
      <p>{{ news.url }}</p>


      <b-container style="margin-top: 20px; margin-bottom:10px;">
        <b-row align-h="center">
          <b-col cols="2">
            <font-awesome-icon
              v-bind:class="{button_click : !news.isLike, color_red : news.isLike}"
              v-on:click="news.isLike = !news.isLike"
              icon="thumbs-up"
            />
          </b-col>
          <b-col cols="2">
            <font-awesome-icon
              v-bind:class="{button_click : !news.isDislike, color_red : news.isDislike}"
              v-on:click=" news.isDislike = !news.isDislike"
              icon="thumbs-down"
            />
          </b-col>
          <b-col cols="2">
            <font-awesome-icon
              v-bind:class="{button_click : !news.isCollect, color_red : news.isCollect}"
              v-on:click=" news.isCollect = !news.isCollect"
              icon="heart"
            />
          </b-col>
        </b-row>
      </b-container>

      <!-- <div class="ru">
        <div id="circle"></div>

        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
      </div>-->
    </div>
    <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
    <!-- <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button> -->
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
      this.$refs.myModalRef.toggle("#toggleBtn");

      this.news = value;
      //   this.$refs.myModalRef.$props.title = "hahahahha";
    },
    click_fn(str_c) {}
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
      },

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

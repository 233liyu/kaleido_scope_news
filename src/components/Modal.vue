<template>
  <b-modal ref="myModalRef" v-bind:article="news" hide-footer size="lg">
    <div class="d-block text-center">
      <h3>{{ news.title }}</h3>
      <footer class="blockquote-footer">
        {{ news.author }} in
        <cite>{{ news.source }}</cite>
      </footer>
      <fa-adn>
      <p>{{ news.content }}</p>
      <p>{{ news.url }}</p>

      <!-- <div class="ru">
        <div id="circle"></div>

        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
        <span class="badge badge-primary badge-pill">Primary</span>
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
import Vuetify from 'vuetify';

export default {
  name: "newsModal",
  components : {
    Vuetify
  },
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
      console.log(value);
      this.news = value;
      //   this.$refs.myModalRef.$props.title = "hahahahha";
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

/* .ru{
    width: 500px;
    height: 500px;
    border-radius: 20%;
    background-color: antiquewhite;
} */
/* @import 'vuetify/src/stylus/main'; */

</style>

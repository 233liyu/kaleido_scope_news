<template>
  <b-modal ref="myModalRef" v-bind:title="news_title" hide-footer size="lg">
    <div class="d-block text-center">
      <h3>Hello From My Modal! {{ news_title }}</h3>
      <footer class="blockquote-footer">
        Someone famous in
        <cite title="Source Title">Source Title</cite>
      </footer>
      <p>{{ news_content }}</p>
      <p>{{ href }}</p>
      <div class="ru">
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

      </div>
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
      this.href = value;
      //   this.$refs.myModalRef.$props.title = "hahahahha";
    }
  },
  data: function() {
    return {
      news_title: "News title",
      news_content:
        "<b-modal>, by default, has an OK and Cancel buttons in the footer. These buttons can be customized by setting various props on the component. You can customize the size of the buttons, disable buttons, hide the Cancel button (i.e. OK Only), choose a variant (e.g. danger for a red OK button) using the ok-variant and cancel-variant props, and provide custom button content using the ok-title and cancel-title props, or using the named slots modal-ok and modal-cancel.\n<b-modal> supports close on ESC (enabled by default), close on backdrop click (enabled by default), and the X close button in the header (enabled by default). These features may be disabled by setting the the props no-close-on-esc, no-close-on-backdrop, and hide-header-close respectively.\nYou can override the modal title via the named slot modal-title, override the header completely via the modal-header slot, and override the footer completely via the modal-footer slot.\nNote: when using the modal-footer slot, the default OK and Cancel buttons will not be present. Also, if you use the modal-header slot, the default header X close button will not be present, nor can you use the modal-title slot.",
      href: String
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

.badge.badge-pill{
    font-size: 1.2em;
    margin-bottom: 0.5em;
}

/* .ru{
    width: 500px;
    height: 500px;
    border-radius: 20%;
    background-color: antiquewhite;
} */
</style>

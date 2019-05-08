<template>
  <b-modal
    scrollable
    ref="userModal"
    centered
    hide-footer
    hide-header
    title="Kaleido Scope News"
    size="lg"
  >
    <transition name="component-fade" mode="out-in">
      <component v-on:updated_user="toggleModal()" v-bind:is="cmp_list[cmp_idx]"></component>
    </transition>
    <!-- <b-btn @click="slide()">{{cmp_list[cmp_idx]}}</b-btn> -->
  </b-modal>
</template>

<script>
import userForm from "./userForm.vue";
import userSub from "./userSub.vue";

export default {
  name: "userModal",
  data() {
    return {
      cmp_idx: 0,
      cmp_list: ['u_form', 'u_sub']
    };
  },
  components: {
    'u_form': userForm,
    'u_sub': userSub,
  },
  methods: {
    showModal() {
      this.$refs.userModal.show();
    },
    hideModal() {
      this.$refs.userModal.hide();
    },
    toggleModal() {
      this.$refs.userModal.toggle();
    },
    slide(){
      this.cmp_idx = this.cmp_idx == this.cmp_list.length -1 ? 0 : this.cmp_idx + 1;
    }
  }
};
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>

<template>
  <div
    id="content-body"
    class="select-none bg-gradient-to-b from-coolGray-900 to-coolGray-800"
    :class="theme"
    @click="leftClick"
    @click.right="rightClick"
    @contextmenu.prevent
  >
    <Content id="content" />
    <ContextMenu
      v-if="isActive"
      id="context-menu"
      class="absolute top-40 left-20"
      :class="classList"
    />
  </div>
</template>

<script>
import Content from './views/Content';
import ContextMenu from './components/ContextMenu';
import { mapState } from 'vuex';

const emptyMenu = {
  isActive: false,
  classList: 'pointer-events-none',
  event: null,
  X: null,
  Y: null
};

export default {
  name: 'App',

  components: {
    Content,
    ContextMenu
  },
  data() {
    return {
      // theme: 'dark' // 'dark' or null
      theme: 'theme-default-dark'
    };
  },
  methods: {
    rightClick(e) {
      if (e.target.classList.value.includes('song-row-item')) {
      } else {
        this.clearMenu();
      }
    },
    leftClick(e) {
      if (
        !e.target.id.includes('contextMenu')
        // && !e.target.classList.value.includes('context-menu')
      ) {
        this.clearMenu();
      }
    },
    clearMenu() {
      this.$store.dispatch('app/setContextMenuData', emptyMenu);
    },
    setMenu(value) {
      this.$store.dispatch('app/setContextMenuData', value);
    }
  },
  computed: {
    ...mapState({
      isActive: state => state.app.contextMenuData.isActive,
      classList: state => state.app.contextMenuData.classList
    })
  },
  created() {
    this.$store.dispatch('library/loadLibrary');
  }
};
</script>

<style>
/* html {
  background-color: #00233b33;
} */
body::-webkit-scrollbar {
  display: none;
}

.point-to-me {
  pointer-events: all;
}
</style>

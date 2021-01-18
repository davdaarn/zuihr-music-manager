<template>
  <div class="flex flex-col">
    <div class="h-20 p-4 text-theme-text-active">Fancy Logo</div>
    <div class="h-40 flex flex-col justify-around">
      <router-link to="/home">
        <div class="pl-6 pt-2 cursor-pointer">
          <span class="mdi mdi-home text-theme-text-active"></span>
          <span class="text-theme-text-active">Home</span>
        </div>
      </router-link>
      <router-link to="/">
        <div class="pl-6 pt-2 cursor-pointer">
          <span class="mdi mdi-text-search text-theme-text-active"></span>
          <span class="text-theme-text-active">Search</span>
        </div>
      </router-link>
      <router-link to="/library">
        <div class="pl-6 pt-2 cursor-pointer">
          <span class="mdi mdi-playlist-music text-theme-text-active"></span>
          <span class="text-theme-text-active">Libary</span>
        </div>
      </router-link>
    </div>
    <hr />
    <div class="pt-4 pl-4 text-sm text-theme-text-muted">Playlists</div>
    <div class="pt-4 pl-4 text-sm">
      <span class="mdi mdi-playlist-plus text-theme-text-active"></span>
      <span class="text-theme-text-active">Create new</span>
    </div>
    <hr />
    <div class="h-20 flex-grow pr-4 pt-4 pb-4">
      <ul class="h-full overflow-auto">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="pt-3 select-none cursor-pointer"
        >
          <span
            class="mdi mdi-playlist-music text-theme-text-active"
            :class="item.icon"
          ></span>
          <span class="text-theme-text-active">{{ item.text }}</span>
        </li>
      </ul>
    </div>
    <!-- <div class="h-20 w-64"></div> -->
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data: () => ({
    mini: false,
    drawer: false,
    selectedItem: 0,
    items: [
      { text: 'First', icon: 'mdi-folder' },
      { text: 'Shared with me', icon: 'mdi-account-multiple' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Backups', icon: 'mdi-cloud-upload' },
      { text: 'My Files', icon: 'mdi-folder' },
      { text: 'Shared with me', icon: 'mdi-account-multiple' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Backups', icon: 'mdi-cloud-upload' },
      { text: 'My Files', icon: 'mdi-folder' },
      { text: 'Shared with me', icon: 'mdi-account-multiple' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Backups', icon: 'mdi-cloud-upload' },
      { text: 'My Files', icon: 'mdi-folder' },
      { text: 'Shared with me', icon: 'mdi-account-multiple' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Backups', icon: 'mdi-cloud-upload' },
      { text: 'My Files', icon: 'mdi-folder' },
      { text: 'Shared with me', icon: 'mdi-account-multiple' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Last', icon: 'mdi-cloud-upload' }
    ]
  }),
  methods: {}
};
</script>

<style>
.sidebar {
  box-shadow: black;
}
</style>
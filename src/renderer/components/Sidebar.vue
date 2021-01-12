<template>
  <div class="flex flex-col bg-gray-300">
    <div class="h-20 p-4">Fancy Logo</div>
    <div class="h-40 flex flex-col justify-around">
      <router-link to="/home">
        <div class="pl-6 pt-2 cursor-pointer">
          <v-icon>mdi-home</v-icon> Home
        </div>
      </router-link>
      <router-link to="/">
        <div class="pl-6 pt-2 cursor-pointer">
          <v-icon>mdi-text-search</v-icon> Search
        </div>
      </router-link>
      <router-link to="/about">
        <div class="pl-6 pt-2 cursor-pointer">
          <v-icon>mdi-playlist-music</v-icon> Library
        </div>
      </router-link>
    </div>
    <hr />
    <div class="pt-4 pl-4 text-sm text-green-600">Playlists</div>
    <div class="h-20 flex-grow pr-4 pt-4 pb-4">
      <ul class="h-full overflow-auto">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="pt-3 select-none cursor-pointer"
        >
          <v-icon>{{ item.icon }}</v-icon>
          {{ item.text }}
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
</style>
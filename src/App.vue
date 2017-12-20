<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view v-on:newGame="newGame" v-on:loadGame="loadGame" v-on:toggleAudio="toggleAudio" v-on:toggleMusic="toggleMusic" :beaten="beaten" :audio="audio" :music="music" :classic="classic" :game="game" />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      beaten: true,
      audio: true,
      music: true,
      classic: false,
      game: []
    }
  },
  methods: {
    newGame: function (classic) {
      if (classic === true) {
        this.classic = true
      }
      else {
        this.classic = false
      }
      this.$router.push('/game')
    },
    loadGame: function (game) {
      if (game !== null) {
        this.game = game
        this.classic = game[0].classic
      }
      this.$router.push('/game')
    },
    toggleAudio: function () {
      this.audio = !this.audio
    },
    toggleMusic: function () {
      this.music = !this.music
    }
  }
}
</script>

<style scoped lang="less">
</style>

<template>
  <div class="main">
    <threethousand v-if="!classic" :year="gameData.year" :starved="gameData.starved" :immigrants="gameData.immigrants" :population="gameData.population" :land="gameData.land" :rationsPerQuadrant="gameData.bushelsPerAcre" :spaceCrabs="gameData.rats" :store="gameData.store" :quadrantRate="gameData.landRate"></threethousand>
    <classicmode v-if="classic" v-on:saveGame="saveGame" v-on:turnChange="turnChange" :year="gameData.year" :starved="gameData.starved" :immigrants="gameData.immigrants" :population="gameData.population" :land="gameData.land" :bushelsPerAcre="gameData.bushelsPerAcre" :rats="gameData.rats" :store="gameData.store" :landRate="gameData.landRate"></classicmode>
  </div>
</template>

<script>
import ThreeThousand from './elements/3000'
import Classic from './elements/Classic'
export default {
  name: 'game',
  props: ['classic', 'game', 'difficulty'],
  components: {
    'threethousand': ThreeThousand,
    'classicmode': Classic
  },
  created () {
    this.gameData.classicMode = this.classic
    this.gameData.gameDifficulty = this.difficulty
  },
  data () {
    return {
      gameData: {
        year: 1,
        starved: 0,
        immigrants: 5,
        population: 100,
        land: 1000,
        bushelsPerAcre: 3,
        rats: 200,
        store: 2800,
        landRate: 26,
        classicMode: false,
        gameDifficulty: 'easy',
        name: '',
        time: ''
      }
    }
  },
  methods: {
    turnChange: function (inputs) {
    },
    saveGame: function (name) {
      this.gameData.name = name
      let x = new Date()
      this.gameData.time = x.getHours() + ':' + x.getMinutes()
      this.$emit('saveGame', this.gameData)
    }
  }
}
</script>

<style scoped lang="less">
</style>

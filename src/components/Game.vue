<template>
  <div class="main">
    <threethousand v-if="!classic && !victory" v-on:saveGame="saveGame" v-on:turnChange="turnChange" :year="gameData.year" :starved="gameData.starved" :immigrants="gameData.immigrants" :population="gameData.population" :land="gameData.land" :harvest="gameData.harvest" :bushelsPerAcre="gameData.bushelsPerAcre" :rats="gameData.rats" :store="gameData.store" :landRate="gameData.landRate"></threethousand>
    <classicmode v-if="classic && !victory" v-on:saveGame="saveGame" v-on:turnChange="turnChange" :year="gameData.year" :starved="gameData.starved" :immigrants="gameData.immigrants" :population="gameData.population" :land="gameData.land" :harvest="gameData.harvest" :bushelsPerAcre="gameData.bushelsPerAcre" :rats="gameData.rats" :store="gameData.store" :landRate="gameData.landRate"></classicmode>
    <div v-if="victory">
      You win!!
    </div>
  </div>
</template>

<script>
import ThreeThousand from './elements/ThreeThousand'
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
      victory: false,
      gameData: {
        year: 1,
        starved: 0,
        starvedTotal: 0,
        immigrants: 5,
        population: 100,
        land: 1000,
        bushelsPerAcre: 3,
        rats: 200,
        harvest: 2000,
        store: 2800,
        landRate: 26,
        plague: false,
        classicMode: false,
        gameDifficulty: 'easy',
        name: '',
        time: ''
      }
    }
  },
  methods: {
    turnChange: function (inputs) {
      this.gameData.year++
      if (Math.floor(Math.random() * 20) >= 17) {
        this.gameData.plague = true
        this.gameData.population = this.gameData.population - (this.gameData.population * Math.floor(Math.random() * 0.33))
      }
      else {
        this.gameData.plague = false
      }
      if (inputs.bushelFeed / 20 >= this.gameData.population) {
        this.gameData.starved = 0
        this.gameData.store = this.gameData.store - inputs.bushelFeed
      }
      else {
        this.gameData.starved = this.gameData.population - (inputs.bushelFeed / 20)
        this.gameData.starvedTotal = this.gameData.starvedTotal + this.gameData.starved
        if (this.gameData.starvedTotal >= 50) {
          this.victory = true
        }
        this.gameData.population = this.gameData.population - this.gameData.starved
        this.gameData.store = this.gameData.store - inputs.bushelFeed
      }
      this.gameData.immigrants = Math.floor(Math.random() * 10)
      this.gameData.population = this.gameData.population + this.gameData.immigrants
      if (inputs.landBuy !== 0) {
        this.gameData.land = parseInt(this.gameData.land) + parseInt(inputs.landBuy)
      }
      this.gameData.landRate = Math.floor(Math.random() * 9) + 17
      this.gameData.bushelsPerAcre = (Math.floor(Math.random() * 8) + 1)
      this.gameData.harvest = inputs.planted * this.gameData.bushelsPerAcre
      this.gameData.store = this.gameData.store + this.gameData.harvest - inputs.planted
      this.gameData.rats = Math.floor((Math.random() * 0.2) * this.gameData.store)
      this.gameData.store = this.gameData.store - this.gameData.rats
      if (this.gameData.year >= 11) {
        this.victory = true
      }
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

<template>
  <div class="main">
    <h1 class="title">Hammurabi 3000</h1>
    <transition name="fade">
      <div class="report" v-if="report">
        <strong>Overlord Hammurabi</strong>: I beg to report to you,
        <span v-if="plague">An enemy incursion has swept over your demense! <strong><span class="plagueNumber">{{this.plagueNumber}}</span> Citizens have perished!!</strong></span>
        In the <strong>Year <span class="year">{{this.year}}</span></strong>,
        <strong><span class="starved">{{this.starved}}</span></strong> civilians starved.
        <strong><span class="immigrants">{{this.immigrants}}</span></strong> civilians came to the city.
        You harvested {{this.harvest}} rations at a rate of {{this.bushelsPerAcre}} rations per quadrant.
        Space crabs ate <strong><span class="spaceCrabs">{{this.rats}}</span></strong> rations.<br/>
        <button v-on:click="next">Next</button>
      </div>
    </transition>
    <transition name="fade">
      <div class="resource" v-if="resource">
        <div class="population">Population: {{this.population}}</div>
        <div class="land">Land: {{this.activeLand}}</div>
        <div class="rations">Rations: {{this.activeStore}}</div>
        <div class="landTrade">Landtrade: {{this.landRate}}</div>
      </div>
    </transition>
    <transition name="fade">
      <div class="input" v-if="input">
        <span class="question">How many quadrants do you wish to appropriate?</span><br/>
        <input v-model="inputs.landBuy" placeholder="enter negative to barter" class="landBuy" rows="1" cols="25" type="number"></input><br/>
        <span class="question">How many rations do you wish to feed your citizens?</span><br/>
        <input v-model="inputs.bushelFeed" placeholder="each citizen needs 20/year" class="food" rows="1" cols="25" type="number"></input><br/>
        <span class="question">How many quadrants do you wish to inseminate?</span><br/>
        <input v-model="inputs.planted" placeholder="quadrant = 1ration" class="plant" rows="1" cols="25" type="number"></input>
        <button class="quit" v-on:click="saveMenuToggle">Quit Game</button>
      </div>
    </transition>
    <threeThousandPeasant></threeThousandPeasant>
    <button v-bind:class="makeItSoLogic" v-if="makeItSo" v-on:click="turnChange">Make It So!</button>
    <div v-bind:class="makeItSoHide">Not Allowed</div>
    <button v-if="input" v-on:click="backReport">Report</button>
    <div class="saveMenu" v-if="saveMenu">
      <div class="saveQuestion" v-if="saveQuestion">
        <h1 class="title">Do you wish to save your progress?</h1>
        <button class="yesSave" v-on:click="saveQuestionToggle">Yes</button>
        <button class="noSave" v-on:click="quitGame">No</button>
      </div>
      <div class="saveInput" v-else>
        <h1 class="title">Name Your Save</h1>
        <input class="saveName" v-model="name" placeholder="Save Name"></input>
        <button class="saveGame" v-on:click="saveGame">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import ThreeThousandPeasant from './ThreeThousandPeasant'
export default {
  name: 'threethousand',
  props: [ 'year', 'starved', 'immigrants', 'population', 'land', 'harvest', 'bushelsPerAcre', 'rats', 'store', 'landRate' ],
  components: {
    'threeThousandPeasant': ThreeThousandPeasant
  },
  created () {
    let vue = this
    this.totalCost = (this.store - parseInt(this.inputs.bushelFeed) - parseInt(this.inputs.planted) - (parseInt(this.inputs.landBuy) * this.landRate))
    this.plantRule = ((parseInt(this.inputs.planted) / 10) - this.population)
    this.totalLand = (this.land + parseInt(vue.inputs.landBuy))
    this.plantable = (this.activeLand - parseInt(this.inputs.planted))
    document.addEventListener('keyup', function () {
      vue.totalCost = (vue.store - parseInt(vue.inputs.bushelFeed) - parseInt(vue.inputs.planted) - (parseInt(vue.inputs.landBuy) * vue.landRate))
      vue.plantRule = ((parseInt(vue.inputs.planted) / 10) - vue.population)
      vue.totalLand = (vue.land + parseInt(vue.inputs.landBuy))
      vue.plantable = (vue.activeLand - parseInt(vue.inputs.planted))
      vue.activeStore = (vue.store - parseInt(vue.inputs.bushelFeed) - parseInt(vue.inputs.planted) - (parseInt(vue.inputs.landBuy) * vue.landRate))
      vue.activeLand = (vue.land + parseInt(vue.inputs.landBuy))
    })
  },
  data () {
    return {
      plague: false,
      report: true,
      resource: false,
      input: false,
      makeItSo: false,
      saveMenu: false,
      saveQuestion: true,
      activeStore: 2800,
      activeLand: 1000,
      totalCost: 0,
      plantRule: 0,
      totalLand: 0,
      plantable: 0,
      inputs: {
        landBuy: 0,
        bushelFeed: 0,
        planted: 0
      }
    }
  },
  computed: {
    makeItSoLogic: function () {
      return {
        allowed: (this.totalCost >= 0) && (this.plantRule <= 0) && (this.totalLand >= 0) && (this.plantable >= 0),
        hidden: (this.totalCost < 0) || (this.plantRule > 0) || (this.totalLand <= 0) || (this.plantable < 0) || (this.inputs.landBuy === '-') || (this.inputs.planted === '-') || (this.inputs.bushelFeed === '-') || ((this.inputs.landBuy === '') || (this.inputs.planted === '') || (this.inputs.bushelFeed === ''))
      }
    },
    makeItSoHide: function () {
      return {
        notAllowed: (this.totalCost < 0) || (this.plantRule > 0) || (this.totalLand <= 0) || (this.plantable < 0) || (this.inputs.landBuy === '-') || (this.inputs.planted === '-') || (this.inputs.bushelFeed === '-') || ((this.inputs.landBuy === '') || (this.inputs.planted === '') || (this.inputs.bushelFeed === '')),
        hidden: ((this.totalCost >= 0) && (this.plantRule <= 0) && (this.totalLand >= 0) && (this.plantable >= 0))
      }
    }
  },
  methods: {
    next: function () {
      this.report = false
      this.resource = true
      this.input = true
      this.makeItSo = true
      this.seeReport = true
      this.activeStore = this.store
      this.activeLand = this.land
      this.inputs.landBuy = 0
      this.inputs.bushelFeed = 0
      this.inputs.planted = 0
    },
    turnChange: function () {
      this.$emit('turnChange', this.inputs)
      this.report = true
      this.resource = false
      this.input = false
      this.makeItSo = false
      this.seeReport = false
    },
    saveMenuToggle: function () {
      this.saveMenu = !this.saveMenu
      this.report = false
      this.resource = false
      this.input = false
      this.makeItSo = false
      this.quit = false
      this.seeReport = false
    },
    saveQuestionToggle: function () {
      this.saveQuestion = !this.saveQuestion
    },
    saveGame: function () {
      this.$emit('saveGame', this.name)
    },
    quitGame: function () {
      this.$router.push('/')
    },
    backReport: function () {
      this.report = true
      this.resource = false
      this.input = false
      this.makeItSo = false
    }
  }
}
</script>

<style scoped lang="less">
.main {

}

.title {
  text-align: center;
  color: #fff;
  font-size: 2.4em;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .16s;
}

.fade-enter-active {
  transition-delay: .16s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.switch-enter-active, .switch-leave-active {
  transition-property: opacity;
  transition-duration: .16s;
}

.switch-enter-active {
  transition-delay: .16s;
}

.switch-enter, .switch-leave-to {
  opacity: 0;
}

.report {
  font-size: .9em;
  padding-top: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  position: relative;
  text-align: center;
  background-color: #fff;
  border: 8px solid #29005d;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
  -webkit-box-shadow: 2px 2px 4px #29005d;
  -moz-box-shadow: 2px 2px 4px #29005d;
  box-shadow: 2px 2px 4px #29005d;
}

.report:before {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: 32px;
  top: 127px;
  border: 25px solid;
  border-color: #29005d transparent transparent #29005d;
}

.report:after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: 40px;
  top: 127px;
  border: 15px solid;
  border-color: #fff transparent transparent #fff;
}

.resource {
  display: grid;
  grid-template-columns: 30px 1fr 1fr 1fr 30px;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  background: rgba(180,63,191,0.5);
  border: 4px solid rgba(180,63,191,1);
  border-bottom: 0;
  margin-left: 10px;
  margin-right: 10px;
}

.population {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 2;
}

.land {
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 2;
  grid-row-end: 2;
}

.rations {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 4;
  grid-row-end: 4;
}

.landTrade {
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 4;
  grid-row-end: 4;
}

.input {
 background: rgba(180,63,191,0.5);
 border: 4px solid rgba(180,63,191,1);
 border-top: 0;
 margin-bottom: 10px;
 margin-left: 10px;
 margin-right: 10px;
 padding-bottom: 5px;
}

.quit {
  margin-top: 30px;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 35px;
}

.yesSave {
  width: 40%;
  position: absolute;
  left: 5%;
  top: 300px;
  height: 60px;
  line-height: 60px;
  font-size: 1.6em;
}

.noSave {
  width: 40%;
  position: absolute;
  right: 5%;
  top: 300px;
  height: 60px;
  line-height: 60px;
  font-size: 1.6em;
}

.saveName {
  text-align: center;
  width: 80%;
  height: 1.8em;
  font-size: 1.4em;
  margin-left: 10%;
}

.saveGame {
  text-align: center;
  width: 80%;
  height: 60px;
  line-height: 60px;
  margin-top: 20px;
  font-size: 1.4em;
  margin-left: 10%;
}
</style>

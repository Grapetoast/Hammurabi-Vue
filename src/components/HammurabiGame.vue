<template>
  <div class="main">
    <div class="wrapper">
      <div class="box a">
        <h1>HAMMURABI 3000</h1>
        <h4>A GAME OF GALACTIC STRATEGY AND MASS RESOURCE ALOTMENT</h4>
      </div>
      <div class="box b">
        <div class="report">
          <strong>Overlord Hammurabi</strong>: I beg to report to you,
          <span v-if="plague">An enemy incursion has swept over your demense! <strong><span class="plagueNumber">{{this.plagueNumber}}</span> Citizens have perished!!</strong></span>
          In the <strong>Year <span class="year">{{this.year}}</span></strong>,
          <strong><span class="starved">{{this.starved}}</span></strong> civilians starved.
          <strong><span class="immigrants">{{this.immigrants}}</span></strong> civilians came to the city.
          The Dominion population is now <strong><span class="population">{{this.population}}</span></strong>.
          The Dominion now owns <strong><span class="land">{{this.land}}</span></strong> quadrants.
          You harvested <strong><span class="harvest">{{this.harvest}}</span></strong> rations per quadrant.
          Space crabs ate <strong><span class="spaceCrabs">{{this.spaceCrabs}}</span></strong> rations.
          You now have <strong><span class="rationsStore">{{this.rationsStore}}</span></strong> rations in store.
          Space is trading at <strong><span class="landTrade">{{this.landTrade}}</span></strong> rations per quadrant.</br>
        </div>
      </div>
      <div class="count c">
        <span class="borderCounter"><span class="rationCounter"><strong>{{this.rationCounter}}</strong></span> rations remain!</span>
      </div>
      <div class="box d">
        <div class="input">
          <span class="question">How many quadrants do you wish to appropriate?</span> </br><textarea placeholder="enter negative to barter" class="landBuy" rows="1" cols="25" type="number"></textarea></br>
          <span class="question">How many rations do you wish to feed your citizens?</span> </br><textarea placeholder="each citizen needs 20/year" class="food" rows="1" cols="25" type="number"></textarea></br>
          <span class="question">How many quadrants do you wish to inseminate?</span> </br><textarea placeholder="quadrant = 1ration" class="plant" rows="1" cols="25" type="number"></textarea>
        </div>
      </div>
      <div class="box e">
        <div class="btn">
        <button>Back To Menu</button>
        <button class="makeItSo">Make it So!</button>
        </div>
      </div>
      <div class="box f">
        <center>
        <div v-if="winScreen">
          <img src="../assets/YOU_WIN.png" class="youWin"/>
        </div>
        </center>
      </div>
      <div class="box g">
        <center>
        <div v-if="failScreen">
          <img src="../assets/YOU_LOSE.png" class="youFail"/>
        </div>
        </center>
      </div>
      <div class="box h">
        <div v-if="endReport">
          Starved = <span class="starvedTotal">0</span>
          SpacePerCiv = <span class="landRatio">10</span>
          You earned <span class="points">0</span> points!
          <span class="fink">Your performance was so abysmal the people call you the Intergalactic fink!</span>
          <span class="meh">Your rule is forgetable as are you.</span>
          <span class="good">Quite the performance, it was almost worthy of a true king.</span>
          <span class="best">You are the single greatest ruler that has ever served, may we all beg to report to you for all time!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      year: 3001,
      starved: 0,
      immigrants: 5,
      population: 100,
      land: 1000,
      harvest: 3,
      spaceCrabs: 200,
      rationsStore: 2800,
      landTrade: 22,
      rations: 2800,
      starvedTotal: 0,
      points: 0,
      landRatio: 10,
      rationCounter: 2800
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
@primary-color:#7071b5;
@accent-color:#29005d;
@background-color:#000024;
@bold-font:'Bungee';
@light-font:'Aldrich', sans-serif;

.wrapper {
  display: grid;
  grid-template-columns: 15% 2fr 2fr 15%;
  grid-template-rows: 150px 300px 50px 200px;
  grid-gap: 10px;
  color: #444;
  font-size: 1em;
  font-family: 'Bungee', cursive;
}

.box {
  border-radius: 5px;
  padding: 20px;
}
//title
.a {
  display: inline;
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row: 1;
  z-index: 3;
}
//report
.b {
  display: inline;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row: 2;
}
//ration counter
.c {
  display: inline;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row: 3;
}
//inputs
.d {
  display: inline;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row: 2;
}
//buttons
.e {
  display: inline;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row: 4;
}
//win screen
.f {
  display: none;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row: 2;
}
//failscreen
.g {
  display: none;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row: 2;
}
//endreport
.h {
  display: none;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row: 3;
}

/*Background*/
body {
  background-image: url(../assets/BackgroundPC.png);
  background-position: center center;
  background-color: @background-color;
  background-attachment: fixed;
  background-size: cover;
}
/*Background End*/

/*Report*/
h1 {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color:@primary-color;
  font-family: 'bungee';
  font-size: 3em;
}

h4 {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color:@primary-color;
  font-family:@light-font;
  font-size: 1.2em;
}

.info {
  text-align: justify;
}

.report {
  width: 240px;
  color: @primary-color;
  font-family:@light-font;
  font-size: 1em;
  text-align: justify;
  float: right;
  margin-right: 40px;
  border-radius: 5px;
  border-style: solid;
  border-color: @primary-color;
  border-size: 2px;
  padding: 6px;
  background-color: @background-color;
}

strong {
  color:@primary-color;
  font-family: @bold-font;
  font-size: 1.1em;
}

.plague {
    display: none;
}

.count {
  margin-top: 20px;
  color:@primary-color;
  font-size: 1em;
  text-align: center;
}

.borderCounter {
  border-radius: 5px;
  border-style: solid;
  border-color: @primary-color;
  border-size: 2px;
  padding: 6px;
  background-color: @background-color;
}
/*Report end*/

/*questions*/
.input {
  width: 240px;
  text-align: justify;
  margin-top: 5px;
  overflow: hidden;
  float: left;
  margin-left: 40px;
  color:@primary-color;
  font-family:@light-font;
  font-size: 1em;
  border-radius: 5px;
  border-style: solid;
  border-color: @primary-color;
  border-size: 2px;
  padding: 6px;
  background-color: @background-color;
}

textarea {
  font-size: 1em;
  margin-top: 4px;
  margin-bottom: 8px;
  font-family:@light-font;
  border-radius: 6px;

}
/*questions end*/

/*buttons*/
.btn {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

button {
  -webkit-border-radius: 6;
    -moz-border-radius: 6;
    border-radius: 6px;
    color: @primary-color;
    font-family: @bold-font;
    border-color: @primary-color;
    font-size: 1em;
    background-color: @background-color;
    padding: 8px 16px;
    text-decoration: none;
}

button:hover {
  background-color: @accent-color;
}

.makeItSo {
  margin-left: 60px;
}

.startNew {
  margin-right: 60px;
}
/*buttons end*/

/*EndScreen*/
.youWin {
  margin-left: none;
  margin-right: none;
  text-align: center;
}

.youFail {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.endReport {
  text-align: center;
  color: @primary-color;
  font-family: @bold-font;
  font-size: 1.2em;
  border-radius: 5px;
  border-style: solid;
  border-color: @primary-color;
  border-size: 2px;
  padding: 6px;
  background-color: @background-color;

}
/* EndScreen end*/
//mobile support
@media screen and (max-width:760){
.wrapper {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 150px 200px 200px 200px;
  grid-gap: 10px;
  color: #444;
}

  //title
.a {
  display: inline;
  grid-column: 2;
  grid-row: 1;
}
//report
.b {
  display: inline;
  grid-column: 2;
  grid-row: 2;
}
//ration counter
.c {
  display: inline;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row: 3;
}
//inputs
.d {
  display: inline;
  grid-column: 2;
  grid-row: 3;
}
//buttons
.e {
  display: inline;
  grid-column: 2;
  grid-row: 4;
}
//win screen
.f {
  display: none;
  grid-column: 2;
  grid-row-start: 1;
  grid-row-end: 2;
}
//failscreen
.g {
  display: none;
  grid-column: 2;
  grid-row-start: 2;
  grid-row-end: 3;
}
//endreport
.e {
  display: none;
  grid-column: 2;
  grid-row-start: 3;
  grid-row-end: 4;
}
}
</style>

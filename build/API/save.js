var mongoose = require("mongoose")
var SaveSchema = new mongoose.Schema({
  name: {
          type: String,
          required: true,
        },
  time: {
          type: String,
          required: true,
        },
  year: {
          type: String,
          required: true,
        },
  starved: {
            type: String,
            required: true,
           },
 starvedTotal: {
           type: String,
           required: true,
          },
  immigrants: {
                type: String,
                required: true,
              },
  population: {
                type: String,
                required: true,
              },
  land: {
          type: String,
          required: true,
        },
  bushelsPerAcre: {
                    type: String,
                    required: true,
                  },
  rats: {
          type: String,
          required: true,
        },
  harvest: {
            type: String,
            required: true,
          },
  points: {
            type: String,
            required: true,
          },
  store: {
          type: String,
          required: true,
          },
  landTrade: {
              type: String,
              required: true,
            },
  starvedTotal: {
                  type: String,
                  required: true,
                },
  landRate: {
              type: String,
              required: true,
            },
  classicMode: {
                type: String,
                required: true,
              }
  gameDifficulty: {
                    type: String,
                    required: true,
                  }
  })

var Example = mongoose.model("Example", SaveSchema);
module.exports = Example;

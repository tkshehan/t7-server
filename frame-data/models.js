const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const FrameDataSchema = new mongoose.Schema(
  {
    _id: false,
    character: {type: String, unique: true, required: true},
    date: {type: Date, default: Date.now()},
    moves: {
      _id: false,
      type: [{
        throw: {type: Boolean, default: false},
        command: {type: String, required: true},
        level: {
          _id: false,
          required: true,
          type: {
            text: [String],
            specialMid: {type: Boolean, default: false},
            technicalJump: {type: Boolean, default: false},
            technicalCrouch: {type: Boolean, default: false},
          },
        },
        damage: {type: String, required: true},
        startup: {
          _id: false,
          required: true,
          type: {
            text: String,
            number: Number,
          },
        },
        block: {
          _id: false,
          required: true,
          type: {
            text: String,
            first: Number,
          },
        },
        hit: {
          _id: false,
          required: true,
          type: {
            text: String,
            juggle: {type: Boolean, default: false},
            crumpleStun: {type: Boolean, default: false},
            knockdown: {type: Boolean, default: false},
            onHit: Number,
          },
        },
        counterHit: {
          _id: false,
          required: true,
          type: {
            text: String,
            juggle: {type: Boolean, default: false},
            crumpleStun: {type: Boolean, default: false},
            knockdown: {type: Boolean, default: false},
            onHit: Number,
          },
        },
        notes: {
          _id: false,
          type: {
            rageArt: {type: Boolean, default: false},
            homing: {type: Boolean, default: false},
            powerCrush: {type: Boolean, default: false},
            tailSpin: {type: Boolean, default: false},
          },
        },
      }],
    },
  },
);

const FrameData = mongoose.model('FrameData', FrameDataSchema);

module.exports = {FrameData};
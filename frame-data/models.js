const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const FrameDataSchema = new mongoose.Schema(
  {
    name: {type: String, unique: true, required: true},
    date: {type: Date, default: Date.now()},
    moves: [{
      throw: {type: Boolean, default: false},
      command: {type: String, required: true},
      level: {
        text: [String],
        special: {type: Boolean, default: false},
        technicalJump: {type: Boolean, default: false},
        technicalCrouch: {type: Boolean, default: false},
        required: true,
        _id: false,
      },
      damage: {type: String, required: true},
      startup: {
        text: String,
        number: Number,
        required: true,
        _id: false,
      },
      block: {
        text: String,
        first: Number,
        required: true,
        _id: false,
      },
      hit: {
        text: String,
        juggle: {type: Boolean, default: false},
        crumpleStun: {type: Boolean, default: false},
        knockdown: {type: Boolean, default: false},
        onHit: Number,
        required: true,
        _id: false,
      },
      counterHit: {
        text: String,
        juggle: {type: Boolean, default: false},
        crumpleStun: {type: Boolean, default: false},
        knockdown: {type: Boolean, default: false},
        onHit: Number,
        required: true,
        _id: false,
      },
      notes: {
        rageArt: {type: Boolean, default: false},
        homing: {type: Boolean, default: false},
        powerCrush: {type: Boolean, default: false},
        tailSpin: {type: Boolean, default: false},
        _id: false,
      },
      _id: false,
    }],
  },
  {_id: false},
);

const FrameData = mongoose.model('FrameData', FrameDataSchema);

module.exports = {FrameData}
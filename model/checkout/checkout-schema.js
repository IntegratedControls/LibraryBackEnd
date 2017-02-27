const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const checkoutSchema = new Schema({
  userId: { type: String, required: true },
  bookId: { type: String, required: true }
});


module.exports = mongoose.model('Checkout', checkoutSchema);

const criteria = new Schema({
  key: String, // TODO: use constants
  value: String // TODO: use constants
});

const ownerships = new Schema({
  foreignId: mongoose.Schema.ObjectId,
  criteria: [criteria]
});

checkoutSchema.methods = {
  hasUse(userId) {
      return this.ownerships.some(function(ownership) =>{
        return ownership.foreignId === userId;
      })
  }
};

const Model = require('../../lib/facade');
const checkoutSchema  = require('./checkout-schema');


class CheckoutModel extends Model {
  // TODO: Determine if findByTitle method needs have the facade and schema linked
  // findByTitle(title) {
  //   return this.bookSchema
  //   .findByTitle(title)
  //   .exec();
  // }


}

module.exports = new CheckoutModel(checkoutSchema);

const controller = require('./user-controller');
const Router = require('express').Router;
const router = new Router();

router.route('/:id')
.put((...args) => controller.update(...args))
.get((...args) => controller.findById(...args));
//   .delete((...args) => controller.remove(...args));

// router.route('/getall')
// .get((...args) => controller.find(...args));

module.exports = router;

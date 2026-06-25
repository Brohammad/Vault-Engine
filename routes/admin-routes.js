const express =
require('express');

const router =
express.Router();

const authMiddleware =
require('../middleware/auth-middleware');

const adminMiddleware =
require('../middleware/admin-middleware');

const { getAllUsers } =
require('../controllers/admin-controller');
router.get(
'/dashboard',
authMiddleware,
adminMiddleware,
(req,res)=>{

    res.json({
        message:
        'Welcome Admin'
    });

});

router.get(
'/users',
authMiddleware,
adminMiddleware,
getAllUsers
);


module.exports =
router;
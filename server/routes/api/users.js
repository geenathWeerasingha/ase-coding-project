const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles'); 




router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), usersController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), usersController.createNewUser)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), usersController.updateUser)
    
    
    
router.route('/:id')
.delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), usersController.deleteUser);
 

module.exports = router;
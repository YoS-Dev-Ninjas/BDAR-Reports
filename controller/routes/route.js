/** Contain api routes of the application */
const { Router } = require("express");
const router = Router();
const {
  getdistricts,
  getDistrictById,
//   createUser,
//   updateUser,
//   deleteUser,
} = require("../dbOperations");

router.get("/districts", getdistricts);
router.get("/district/:id", getDistrictById);
// router.post("/users", createUser);
// router.put("/users/:id", updateUser);
// router.delete("/users/:id", deleteUser);

module.exports = router;
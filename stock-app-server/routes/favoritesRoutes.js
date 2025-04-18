const express = require("express");
const {getFavorites} = require("../controllers/favoritesController");

const router = express.Router();

router.get("/:userId",async(req,res)=>{
    const userId = req.params.userId;
    try {
        const response = await getFavorites(userId);
        res.json(response);
        console.log("Return Favorites");
    } catch (error) {
        console.log(error.message);
    }
});


module.exports = router;
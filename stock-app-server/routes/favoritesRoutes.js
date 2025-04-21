const express = require("express");
const {getFavorites, addFavorites} = require("../controllers/favoritesController");

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

router.post("/:userId", async(req,res) => {
    const userId = req.params.userId;
    const symbol = req.body.symbol;
    try {
        await addFavorites(userId, symbol);
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;
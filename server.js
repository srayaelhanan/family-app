const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ מחיר "חצי אמיתי" לפי חנויות
const priceDB = {
  "חלב": {price: 6.5, store: "רמי לוי"},
  "לחם": {price: 5.9, store: "שופרסל"},
  "ביצים": {price: 12.9, store: "ויקטורי"},
  "גבינה": {price: 8.5, store: "יינות ביתן"}
};

app.post("/price", (req,res)=>{

  let items = req.body.items;

  let result = items.map(i => {

    let base = priceDB[i.name] || {
      price: Math.floor(Math.random()*10)+5,
      store: "חנות כללית"
    };

    return {
      name: i.name,
      price: base.price * parseInt(i.qty || 1),
      store: base.store
    };
  });

  res.json(result);
});

app.listen(3000, ()=>{
  console.log("🔥 server running");
});

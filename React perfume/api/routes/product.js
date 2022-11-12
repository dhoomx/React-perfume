const Product = require("../models/Product");
const verifyToken = require("./verifyToken");

const router = require("express").Router();

//////////// CREATE "ADD" Product///////////
router.post("/", verifyToken.verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
//////////////////////////////////////////////////////////

//////////// UPDATE Proudct///////////
router.put("/:id", verifyToken.verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(403).json(err);
  }
});
// //////////////////////////////////////////////////////////

// //////////// DELETE Product///////////
router.delete("/:id", verifyToken.verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Prdouct has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
// //////////////////////////////////////////////////////////

// //////////// GET Product///////////
router.get("/find/:id", async (req, res) => {
  try {
    const prdouct = await Product.findById(req.params.id);
    res.status(200).json(prdouct);
    // res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
// //////////////////////////////////////////////////////////

// //////////// GET ALL Products///////////
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //////////////////////////////////////////////////////////

module.exports = router;

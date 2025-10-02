const express = require ("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema , reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");

const { cloudinary, storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router
  .route("/")
  .get(wrapAsync(listingController.index)) // Index route to list all listings
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );  // Create route to add a new listing


//New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);

 router
   .route("/:id")
   .get(wrapAsync(listingController.showListing)) // Show route to display a specific listing
   .put(
     isLoggedIn,
     isOwner,
     upload.single("listing[image]"),
     validateListing,
     wrapAsync(listingController.updateListing)
   ) // Update route to modify a specific listing
   .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));   // Delete route to remove a specific listing




//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync (listingController.renderEditForm ));



module.exports = router;
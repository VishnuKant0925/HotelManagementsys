const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReview = async(req,res)=>{

   let listing = await Listing.findById(req.params.id);
   let newReview = new Review(req.body.review);
   newReview.author = res.locals.currUser._id; // set the author to the current user
   listing.reviews.push(newReview);

   await newReview.save();
   await listing.save();

   console.log("new review saved");
    req.flash("success", "Successfully created a new review!");
   res.redirect(`/listings/${req.params.id}`);
   


}



module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted the review!");
  res.redirect(`/listings/${id}`);
};
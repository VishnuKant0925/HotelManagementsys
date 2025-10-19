const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};

module.exports.searchListings = async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    req.flash("error", "Please enter a search term!");
    return res.redirect("/listings");
  }

  try {
    let searchResults;

    // First try MongoDB text search (faster and more relevant)
    try {
      searchResults = await Listing.find({ $text: { $search: q } }).sort({
        score: { $meta: "textScore" },
      });
    } catch (textSearchError) {
      // Fallback to regex search if text index doesn't exist
      const searchQuery = {
        $or: [
          { title: { $regex: q, $options: "i" } },
          { location: { $regex: q, $options: "i" } },
          { country: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ],
      };
      searchResults = await Listing.find(searchQuery);
    }

    if (searchResults.length === 0) {
      // Try partial matches for better results
      const partialSearchQuery = {
        $or: [
          { title: { $regex: q.split(" ").join("|"), $options: "i" } },
          { location: { $regex: q.split(" ").join("|"), $options: "i" } },
          { country: { $regex: q.split(" ").join("|"), $options: "i" } },
        ],
      };

      searchResults = await Listing.find(partialSearchQuery);
    }

    if (searchResults.length === 0) {
      req.flash(
        "error",
        `No listings found for "${q}". Try searching with different keywords.`
      );
      return res.redirect("/listings");
    }

    req.flash("success", `Found ${searchResults.length} listing(s) for "${q}"`);
    res.render("./listings/search.ejs", {
      allListings: searchResults,
      searchQuery: q,
      searchCount: searchResults.length,
    });
  } catch (error) {
    console.error("Search error:", error);
    req.flash("error", "Something went wrong while searching!");
    res.redirect("/listings");
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist !");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id; // set the owner to the current user
  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;

  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "Successfully created a new listing!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist !");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined" && req.file !== null) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Successfully Deleted the listing!");
  res.redirect("/listings");
};

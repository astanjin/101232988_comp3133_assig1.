const User = require ('../models/User')
const Listing = require ('../models/Listing')
const Booking= require ('../models/Booking')
const { ListingType, BookingType } = require("./type")
const { GraphQLString,GraphQLFloat } = require("graphql")

const { createJwtToken } = require("../helper/auth")
//register
const register = {
  type: GraphQLString,//token is given
  description: "Registration",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    firstname :{type: GraphQLString},
    lastname :{type: GraphQLString},
    type :{type: GraphQLString},
  },
  async resolve(parent, args) {
    const { username, email, password, firstname,lastname,type } = args//object deconstructing
    const user = new User({ username, email, password, firstname,lastname,type})

    await user.save()
    const token = createJwtToken(user)
    return token
  },
}
//login
const login = {
  type: GraphQLString,//token
  description: "Login",
  args: {
    username:{type:GraphQLString},
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const user = await User.findOne({ username: args.username }).select("+password")
    console.log(user)
    if (!user || args.password !== user.password) {
      throw new Error("user is not valid!")
    }

    const token = createJwtToken(user)
    return token
  },
}
//add listing,only admin
const addListing = {
  type: ListingType,
  description: "Create a new listing",
  args: {
   listing_title: { type: GraphQLString },
   listing_description: { type: GraphQLString },
   street: { type: GraphQLString },
   city: { type: GraphQLString },
    postal_code: { type: GraphQLString },
     price: { type: GraphQLFloat },
      email: { type: GraphQLString },
  },
  resolve(parent, args, { verifiedUser }) {
    console.log("Verified one: ", verifiedUser)
    if (verifiedUser.type != "admin") {
      throw new Error("only admins can add a new listing here!")
    }

    const listing = new Listing({
      userId: verifiedUser._id,
      listing_title: args.listing_title,
      listing_description: args.listing_description,
      street:args.street,
      city:args.city,
      postal_code:args.postal_code,
      price:args.price,
      email:args.email
    })

    return listing.save()
  },
}

//add booking

const addBooking = {
  type: BookingType,
  description: "Create a new booking ",
  args: {
    userId:{type:GraphQLString},
    listingId: { type: GraphQLString },
  },
  resolve(parent, args, { verifiedUser }) {
    const booking = new Booking({
      userId: verifiedUser._id,
      listingId: args.listingId,
    
    })
    return booking.save()
  },
}



module.exports = {
  register,
  login,
  addListing,
  addBooking,
 
}

const User = require ('../models/User')
const Listing = require ('../models/Listing')
const Booking= require ('../models/Booking')
const { GraphQLList, GraphQLID,GraphQLString } = require("graphql")
const { UserType, ListingType, BookingType } = require("./type")
//all users
const users = {
  type: new GraphQLList(UserType),
  description: "List of users",
  resolve(parent, args) {
    return User.find()
  },
}
//user by id
const user = {
  type: UserType,
  description: "specific user",
  args: { id: { type: GraphQLID } },

  resolve(parent, args) {
    return User.findById(args.id)
  },
}
//only admin can see all the listings
const listings = {
  type: new GraphQLList(ListingType),
  description: "List of listings added by Admins",
  resolve(parent, args, { verifiedUser }) {
      if(verifiedUser.type!="admin"){
          throw new Error("only admins can see all the lists!")
      }
    return Listing.find()
  },
}
//all listing by city
const listingsByCity= {
  type:  new GraphQLList(ListingType),
  description: "Lists by city",
  args: { city: { type: GraphQLString} },
  resolve(parent, args) {
    return Listing.find({"city" : args.city})
  },
}
//all listing by name
const listingsByName= {
  type:  new GraphQLList(ListingType),
  description: "Lists by name",
  args: { listing_title: { type: GraphQLString} },
  resolve(parent, args) {
    return Listing.find({"listing_title" : args.listing_title})
  },
}
//all listing by postal code
const listingsByPostalcode= {
  type:  new GraphQLList(ListingType),
  description: "Lists by postal code",
  args: { postal_code: { type: GraphQLString} },
  resolve(parent, args) {
    return Listing.find({"postal_code" : args.postal_code})
  },
}
//all bookings
const bookings = {
  type: new GraphQLList(BookingType),
  description: "List of bookings",
  resolve() {     
    return Booking.find()
  },
}
//only user can see her or his bookings
const bookingUser = {
  type: new GraphQLList(BookingType),
  description: "List of bookings",
  args:{userId:{type:GraphQLID}},
  resolve(parent,args,{verifiedUser}) {  
      if(verifiedUser._id!=args.userId){
          throw new Error("only user can see her or his bookings!")
      }   
    return Booking.find({"userId":args.userId})
  },
}



module.exports = { users, user, listings,  bookings,listingsByName 
    ,listingsByCity,listingsByPostalcode,bookingUser}

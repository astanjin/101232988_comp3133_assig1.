const User = require ('../models/User')
const Listing = require ('../models/Listing')
const Booking= require ('../models/Booking')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat} = require("graphql")

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    type: { type: GraphQLString },
  }),
})

const ListingType = new GraphQLObjectType({
  name: "Listing",
  description: "Listing type",
  fields: () => ({
    id: { type: GraphQLID },
    listing_title: { type: GraphQLString },
    listing_description: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    postal_code: { type: GraphQLString },
    price: { type: GraphQLFloat },
    email:{type:GraphQLString},
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      },
    },
    
  }),
})

const BookingType = new GraphQLObjectType({
  name: "Booking",
  description: "Booking type",
  fields: () => ({
    id: { type: GraphQLID },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      },
    },
    listing: {
      type: ListingType,
      resolve(parent, args) {
        return Listing.findById(parent.listingId)
      },
    },
  }),
})

module.exports = { UserType, ListingType, BookingType }

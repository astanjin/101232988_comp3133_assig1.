const { GraphQLSchema, GraphQLObjectType } = require("graphql")

//queries
const { users, user, listings,  bookings,listingsByName ,
    listingsByCity,listingsByPostalcode,bookingUser} = require("./query")

// mutations
const {
  register,
  login,
  addListing,
  addBooking,
} = require("./mutation")

// QueryType,all queries
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: { users, user, listings,  bookings,listingsByName,
    listingsByCity,listingsByPostalcode,bookingUser },
})

// MutationType,all mutations
const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
   register,
  login,
  addListing,
  addBooking,
  },
})
//schema includes queries and mutations
module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})

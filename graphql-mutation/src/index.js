import { GraphQLServer } from 'graphql-yoga'



//String, Boolean, Float, Int, ID,Scalar-store single value(like only one data type value)
//app schema type def
const typeDefs= `
type Query {
 
}



`


//resolver
const resolvers ={
    Query: {
    }

}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
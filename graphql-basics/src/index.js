import { GraphQLServer } from 'graphql-yoga'

//String, Boolean, Float, Int, ID,Scalar-store single value(like only one data type value)
//app schema type def
const typeDefs= `
type Query {
    hello : String!
    name: String!,
    id:ID,
    age:Int!
    employee:Boolean
    gpa:Float
    myInfo:User!
    posts:Post!
}

type User {
    id: ID!
    name:String!
    email:String!
    age:Int
}

type Post {
    id:ID!
    title:String!
    body:String!
    published:Boolean
}

`


//resolver
const resolvers ={
    Query: {
        hello(){
            return "this is first query"
        },
        name(){
            return "Anil Verma"
        },
        id(){
return 'abc123'
        },
        age(){
            return 28

        },
        employee(){
     return true
        },
        gpa(){
return  3.6
        },
        myInfo(){
return {
    id:'abc12345',
    name:"anil",
    age:27,
    email:"adkj@gmail.com"

}
        }
,
        posts(){
            return {
            id:'1234',
            title:"ann",
            body:"fdklkfld klfgklg klgfk",
            published:false
        }
    }

    }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
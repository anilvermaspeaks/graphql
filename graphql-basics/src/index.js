import { GraphQLServer } from 'graphql-yoga'



//dummy data
const Users = [
    {
        id:1,
        name:"anil",
        email:"anil@gmail.com"
    
    },
    {
    id:2,
    name:"sunil",
    email:"sunil@gmail.com"

}]

const comments = [
    {
        id:1,
        text:"skdmkdskd kldfk",
       author:1 ,
       post :"Post1"
    
    },
    {
        id:4,
        text:"ffgfggf kldfk",
        author:1 ,
        post :"Post1"
    
    },
    {
        id:5,
        text:"skdgflkfgmkdskd kldfk",
        author:1 ,
        post :"Post1"
    },
    {
        id:2,
        text:"skdmkdskd kfdkj kfldfk",
        author:2,
        post :"Post1"
    
    },]

const PostArray = [
    {
        id:'Post1',
        title:"title1",
        body:"body1",
        author: 1,
        published:false

    },
    {
        id:'Post3',
        title:"title3",
        body:"body3",
        author: 1,
        published:false

    },
    {
        id:'Post2',
        title:"title2",
        body:"body2",
        author: 2,
        published:true

    }
]


//String, Boolean, Float, Int, ID,Scalar-store single value(like only one data type value)
//app schema type def
const typeDefs= `
type Query {
    greetings(name:String):String!
    hello : String!
    name: String!,
    id:ID,
    age:Int!
    employee:Boolean
    gpa:Float
    myInfo:User!
    posts:Post!
    grades:[Int!]!
    add(number:[Float]!):Float
    users(query:String):[User]!
    postsData(query:String):[Post]!
    comments:[Comment]!
}

type User {
    id: ID!
    name:String!    
    email:String!
    age:Int
    posts:[Post]!
    comments:[Comment]!
}

type Post {
    id:ID!
    title:String!
    body:String!
    published:Boolean
    author:User!
    comments:[Comment]!
}

type Comment{
    id:ID
    text:String!
    author:User!
    post:Post!
}


`


//resolver
const resolvers ={
    Query: {
        comments(parents, args, ctx, info){
       return comments
        },



        add(parents, args, ctx, info){
            if(args.number.length ===0){
                return 0
            }
           return args.number.reduce((result, currentVal)=>result + currentVal)
        }
,
        hello(){
            return "this is first query"
        },
        greetings(parent, args, ctx, info){
            if(args.name){
                return `hello ${args.name}`
            }
            return `hello`
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
        users(parents, args, ctx, info){
            if(args.query){
             return Users.filter((user)=>user.name.toLowerCase().includes(args.query.toLowerCase()))
            }
            return Users
                    },
                    postsData(parents, args, ctx, info){
                        if(args.query){
                         return PostArray.filter((post)=>post.title.toLowerCase().includes(args.query.toLowerCase()))
                        }
                        return PostArray
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
    },
    grades(parent,args,ctx,info){
        return [99, 50, 60]
    }

    },
    Post:{
author(parent,args, ctx, info){
    return Users.find((user)=>user.id ===parent.author)
},
comments(parent,args, ctx, info){
    return comments.filter((item)=>item.post ===parent.id)

}

    }
,
    User:{
        posts(parent,args, ctx, info){
            return PostArray.filter((item)=>item.author ===parent.id)

        },
        comments(parent,args, ctx, info){
            return comments.filter((item)=>item.author ===parent.id)

        }
    },
    Comment:{
        author(parent,args, ctx, info){
            return Users.find((user)=>user.id ===parent.author)

        },
        post(parent,args, ctx, info){
            return PostArray.find((item)=>item.id ===parent.post)
        
        }
    }

}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
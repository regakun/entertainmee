const { ApolloServer, gql } = require('apollo-server');
require('dotenv').config()
const redisConnection = {
  port: process.env.REDIS_PORT,          // Redis port
  host: process.env.REDIS_HOST,   // Redis host
  family: process.env.REDIS_FAMILY,           // 4(IPv4) or 6(IPv6)
  password: process.env.REDIS_PASSWORD
}
const axios = require('axios')
const Redis = require('ioredis') 
const redis = (process.env.IS_REDIS_DEFAULT) ? new Redis() : new Redis(redisConnection)

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Status {
    id: ID,
    status: Int
  }
  
  type Movies {
      _id : ID,
      title: String,
      overview: String,
      poster_path: String,
      popularity: Int,
      tags: [String]
  }
  
  type MovieStatus {
      _id : ID,
      title: String,
      overview: String,
      poster_path: String,
      popularity: Int,
      tags: [String],
      status: Int
  }
  
  type Series {
      _id : ID,
      title: String,
      overview: String,
      poster_path: String,
      popularity: Int,
      tags: [String]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    Series: [Series],
    Serie(id: ID): [Series],
    Movies: [Movies],
    Movie(id: ID): Movies,
  }
  type Mutation {
    insertMovie(title: String, overview: String, poster_path: String, popularity: Int, tags: [String]) :  Movies,
    updateMovie(id: ID,title: String, overview: String, poster_path: String, popularity: Int, tags: [String]) :  MovieStatus,
    deleteMovie(id: ID) :  Status,
    insertSerie(title: String, overview: String, poster_path: String, popularity: Int, tags: [String]) :  Series,
    updateSerie(id: ID,title: String, overview: String, poster_path: String, popularity: Int, tags: [String]) :  MovieStatus,
    deleteSerie(id: ID) :  Status,
  }
`;

const movieUrl = `${process.env.MOVIES_SERVER}/movies`
const seriesUrl = `${process.env.SERIES_SERVER}/series`


const resolvers = {
    Query : {
      Series: () => {
        let url =seriesUrl 
        return redis.get('series')
          .then(data => {
              if (!data) {
                return (
                  axios({
                    method: 'GET',
                    url: url
                  })
                  .then(({data}) => {
                    redis.set('series', JSON.stringify(data.data))
                    return (data.data)
                  })
                  .catch(err => {
                    throw (err)
                  })
                )
              }else{
                  return(JSON.parse(data))
              }
            })
        },
      Serie: (parent,args, context, info) => {
        const {id} = args
        let url =seriesUrl+'/'+id 
        // return redis.get('series')
          // .then(data => {
              // if (!data) {
                return (
                  axios({
                    method: 'GET',
                    url: url
                  })
                  .then(({data}) => {
                    return ([data.data])
                  })
                  .catch(err => {
                    throw (err)
                  })
                )
              // }else{
              //   data = JSON.parse(data)
              //   let filtered = data.filter(function(element){
              //     return element._id == id
              //   });
              //   return(filtered)
              // }
            // })
      },
      Movies: () => {
        let url =movieUrl 
        return redis.get('movies')
          .then(data => {
              if (!data) {
                return (
                  axios({
                    method: 'GET',
                    url: url
                  })
                  .then(({data}) => {
                    redis.set('movies', JSON.stringify(data.data))
                    return (data.data)
                  })
                  .catch(err => {
                    throw (err)
                  })
                )
              }else{
                  return(JSON.parse(data))
              }
            })
      },
      Movie: (parent,args, context, info) => {
        const {id} = args
        let url =`${movieUrl}/${id}` 
        // return redis.get('movies')
          // .then(data => {
              // if (!data) {
                return (
                  axios({
                    method: 'GET',
                    url: url
                  })
                  .then(({data}) => {
                    return (data.data)
                  })
                  .catch(err => {
                    throw (err)
                  })
                )
              // }else{
              //   data = JSON.parse(data)
              //   let filtered = data.filter(function(element){
              //     return element._id == id
              //   });
              //   return(filtered[0])
              // }
            // })
      },
    },
    Mutation : {
      insertSerie: (parent,args, context, info) => {
        const { title, overview, poster_path, popularity, tags } = args
        return axios({
          method: 'POST',
          url: seriesUrl,
          data: { title, overview, poster_path, popularity, tags }
        })
        .then(({data}) => {
          redis.del('series')
          return (data.data[0])
        })
        .catch(err => {
          throw err
        })
      },
      updateSerie: (parent,args, context, info) => {
        const {id, title, overview, poster_path, popularity, tags } = args
        return axios({
          method: 'PUT',
          url: seriesUrl+`/${id}`,
          data: { title, overview, poster_path, popularity, tags }
        })
        .then(({data}) => {
          redis.del('series')
          return {
            status: 1
          }
        })
        .catch(err => {
          throw err
        })
      },
      deleteSerie: (parent,args, context, info) => {
        const {id } = args
        return axios({
          method: 'DELETE',
          url: seriesUrl+`/${id}`,
        })
        .then(({data}) => {
          redis.del('series')
          return {
            status: 1
          }
        })
        .catch(err => {
          throw err
        })
      },
      insertMovie: (parent,args, context, info) => {
        const { title, overview, poster_path, popularity, tags } = args
        return axios({
          method: 'POST',
          url: movieUrl,
          data: { title, overview, poster_path, popularity, tags }
        })
        .then(({data}) => {
          redis.del('movies')
          return (data.data[0])
        })
        .catch(err => {
          throw err
        })
      },
      updateMovie: (parent,args, context, info) => {
        const {id, title, overview, poster_path, popularity, tags } = args
        return axios({
          method: 'PUT',
          url: movieUrl+`/${id}`,
          data: { title, overview, poster_path, popularity, tags }
        })
        .then(({data}) => {
          redis.del('movies')
          return {
            status: 1
          }
        })
        .catch(err => {
          throw err
        })
      },
      deleteMovie: (parent,args, context, info) => {
        const {id } = args
        return axios({
          method: 'DELETE',
          url: movieUrl+`/${id}`,
        })
        .then(({data}) => {
          redis.del('movies')
          return {
            status: 1
          }
        })
        .catch(err => {
          throw err
        })
      },
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
 console.log(`🚀  Server ready at ${url}`);
});
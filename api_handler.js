const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const GraphQLDate = require('./graphql_date.js');
const about = require('./about.js');
const issue = require('./issue.js');
const auth = require('./auth.js');

const resolvers = {
  Query: {
    about: about.getMessage,
    user: auth.resolveUser,
    resList: issue.list,
    patList: issue.patlist,
	  issue:issue.get,
    patissue: issue.patget,

  },
 
  Mutation: {
    setAboutMessage: about.setMessage,
    resissueAdd: issue.add,
    resissueUpdate: issue.update,
    resissueDelete: issue.delete,
    patissueAdd: issue.patadd,
    patissueUpdate: issue.patupdate,
    patissueDelete: issue.patdelete,
    resissueRestore: issue.restore,
    patissueRestore: issue.patrestore,
  },
  GraphQLDate,
};

function getContext({ req }) {
  const user = auth.getUser(req);
  return { user };
}


const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  context: getContext,
  formatError: (error) => {
    console.log(error);
    return error;
  },
  playground: true,
  introspection: true,
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  let cors;
  if (enableCors) {
    const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:8000';
    const methods = 'POST';
    cors = { origin, methods, credentials: true };
  } else {
    cors = 'false';
  }
  server.applyMiddleware({ app, path: '/graphql', cors });
}

module.exports = { installHandler };
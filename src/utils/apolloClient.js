import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'https://pangaea-interviews.now.sh/api/graphql'
})

export default apolloClient
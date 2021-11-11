import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import MovieList from './components/MovieList';
import NewMovieForm from './components/NewMovieForm';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});
function App() {
  return (
    <ApolloProvider client={client}>
      <body>
        <NewMovieForm />
        <MovieList />
      </body>
    </ApolloProvider>
  );
}

export default App;

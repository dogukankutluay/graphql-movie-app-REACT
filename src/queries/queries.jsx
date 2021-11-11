import { gql } from 'apollo-boost';

export const getDirectorsData = gql`
  {
    directors {
      name
      _id
    }
  }
`;
export const getMoviesQuery = gql`
  {
    movies {
      _id
      title
      description
    }
  }
`;
export const getMovieQuery = gql`
  query ($id: String) {
    movie(id: $id) {
      _id
      title
      description
      year
      director {
        name
        _id
        movies {
          _id
          description
          title
        }
      }
    }
  }
`;
export const newMovieMutation = gql`
  mutation (
    $title: String
    $description: String
    $year: Int
    $directorId: String
  ) {
    addMovie(
      title: $title
      description: $description
      year: $year
      directorId: $directorId
    ) {
      title
    }
  }
`;

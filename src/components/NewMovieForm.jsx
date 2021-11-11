import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  getDirectorsData,
  getMoviesQuery,
  newMovieMutation,
} from '../queries/queries';
function NewMovieForm() {
  const [movieCreate, setMovieCreate] = useState({
    title: '',
    description: '',
    year: null,
    directorId: '',
  });

  const onChange = (value, name) =>
    setMovieCreate({
      ...movieCreate,
      [name]: name === 'year' ? Number(value) : value,
    });
  return (
    <Mutation
      mutation={newMovieMutation}
      onCompleted={() => {
        setMovieCreate({
          title: '',
          description: '',
          year: null,
          directorId: '',
        });
      }}>
      {(addMovie, { loading, error }) => (
        <div className="container" data-state="New Movie">
          <div className="device" data-view="list">
            <form
              onSubmit={e => {
                e.preventDefault();
                addMovie({
                  variables: movieCreate,
                  refetchQueries: [{ query: getMoviesQuery }],
                });
              }}>
              <div>
                <label>Titlte</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  onChange={e => onChange(e.target.value, 'title')}
                  value={movieCreate.title}
                />
              </div>
              <div>
                <label>Description</label>
                <textarea
                  value={movieCreate.description}
                  name="description"
                  placeholder="Description"
                  onChange={e => onChange(e.target.value, 'description')}
                />
              </div>
              <div>
                <label>Year</label>
                <input
                  value={movieCreate.year}
                  type="text"
                  name="year"
                  placeholder="Year"
                  onChange={e => onChange(e.target.value, 'year')}
                />
              </div>
              <div>
                <label>Director</label>
                <select
                  value={movieCreate.directorId}
                  name="director"
                  id="director"
                  onChange={e => onChange(e.target.value, 'directorId')}>
                  <option value="" disabled selected>
                    Select Director
                  </option>
                  <Query query={getDirectorsData}>
                    {({ loading, error, data }) =>
                      loading ? (
                        <option value="">loading</option>
                      ) : (
                        data.directors.map((director, index) => {
                          return (
                            <option key={index} value={director._id}>
                              {director.name}
                            </option>
                          );
                        })
                      )
                    }
                  </Query>
                </select>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>Error.</div>}
          </div>
        </div>
      )}
    </Mutation>
  );
}

export default NewMovieForm;

import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { getMoviesQuery, getMovieQuery } from '../queries/queries';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
function MovieList() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState('');
  const showModal = id => {
    setId(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container" data-state="Movie App">
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div>
          <Query query={getMovieQuery} variables={{ id }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error...</div>;
              return (
                <div>
                  <h3>{data.movie.title}</h3>
                  <p>{data.movie.description}</p>
                  <p>{data.movie.year}</p>
                  <br />
                  <h3>{data.movie.director.name}</h3>
                  {data.movie.director.movies.map(movie => {
                    return <div key={movie.title}>{movie.title}</div>;
                  })}
                </div>
              );
            }}
          </Query>
        </div>
      </Modal>
      <div className="device" data-view="list">
        <ul className="layer" data-layer="list">
          <Query query={getMoviesQuery}>
            {({ loading, error, data }) =>
              loading ? (
                <div>loading...</div>
              ) : (
                data.movies.map((movie, index) => {
                  return (
                    <li
                      className="content"
                      key={index}
                      onClick={() => showModal(movie._id)}>
                      <div className="bg"></div>
                      <div className="avatar"></div>
                      <div className="title">{movie.title}</div>
                      <p>{movie.description}</p>
                    </li>
                  );
                })
              )
            }
          </Query>
        </ul>
      </div>
    </div>
  );
}

export default MovieList;

import React from 'react';

function ChatbotHeader() {
  return <h1>AI Movie Chatbot is awesome!</h1>;
}

function MovieList() {
  const movies = [
    { title: "The Avengers", year: 2012, director: "Joss Whedon" },
    { title: "Inception", year: 2010, director: "Christopher Nolan" },
    { title: "The Lion King", year: 1994, director: "Roger Allers" }
  ];

  return (
    <div>
      <h2>Movie Recommendations:</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <p>Title: {movie.title}</p>
            <p>Year: {movie.year}</p>
            <p>Director: {movie.director}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}



function App() {
  return (
    <div className="App">
      <ChatbotHeader />
      <p>This is where our chat interface will go.</p>
      <MovieList />
    </div>
  );
}

export default App;
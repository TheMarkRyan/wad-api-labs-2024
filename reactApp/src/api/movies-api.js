export const getMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=7194ca2f7febb4e3e714c7390912b48f&language=en-US&include_adult=false&page=1`
  );
  return response.json();
};

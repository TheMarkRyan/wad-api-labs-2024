export const getMovies = async () => {
  const response = await fetch(
    'http://localhost:8080/api/movies', // Updated to hit the correct API endpoint
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.json();
};

export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({ username: username, password: password }),
  });
  return response.json();
};

export const signup = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=register', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({ username: username, password: password }),
  });
  return response.json();
};

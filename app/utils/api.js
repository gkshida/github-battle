import axios from 'axios';

const BASE_URL = 'https://api.github.com/';
const ID = 'YOUR_CLIENT_ID';
const SEC = 'YOUR_SECRET_ID';
const params = '?client_id=' + ID + '&client_secret=' + SEC;

const getProfile = (username) => {
  return axios.get(BASE_URL + 'users/' + username + params)
    .then((user) => {
      return user.data;
    });
}

const getRepos = (username) => {
  return axios.get(BASE_URL + 'users/' + username + '/repos' + params + '&per_page=100');
}

const getStarCount = (repos) => {
  return repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count;
  }, 0);
}

const calculateScore = (profile, repos) => {
  let followers = profile.followers;
  let totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

const handleErrors = (error) => {
  console.warn(error);
  return null;
}

const getUserData = (player) => {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) => {
    let profile = data[0];
    let repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

const sortPlayers = (players) => {
  return players.sort((a, b) => {
    return b.score - a.score;
  });
}

export default {
  battle: (players) => {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleErrors);
  },
  fetchPopularRepos: (language) => {
    let encodedURI = window.encodeURI(BASE_URL + 'search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then((response) => {
        return response.data.items;
      });
  }
}

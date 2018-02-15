import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../utils/api';
import Loading from './Loading';

function SelectLanguage (props) {
  const languages = [
    'All',
    'JavaScript',
    'Ruby',
    'Java',
    'CSS',
    'Python',
    'C',
    'Go'
  ];

  return (
    <ul className='languages'>
      {languages.map((lang) => {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: '#d0021b'} : null}
            key={lang}>
            <a onClick={props.onSelect.bind(null, lang)}>
              {lang}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

const RepoGrid = (props) => (
  <ul className='popular-list'>
    {props.repos.map((repo, index) => {
      return (
        <li key={repo.name} className='popular-item'>
          <div className='popular-rank'>#{index + 1}</div>
          <ul className='space-list-items'>
            <li>
              <img
                className='avatar'
                src={repo.owner.avatar_url}
                alt={'Avatar for ' + repo.owner.login}
              />
            </li>
            <li><a href={repo.html_url} target='_blank'>{repo.name}</a></li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
          </ul>
        </li>
      )
    })}
  </ul>
)

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

export default class Popular extends Component {
  constructor(props) {
    super();

    // Initial state
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    // Until the updateLanguage is called, we don't know what's the 'this'
    // keyword is bound to.
    // The 'bind' property receives a context and returns
    // a new function with the 'this' keyword bound to that context.
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  // Method to update the state.
  // When we bound this function in line 82, the 'this' keyword here will
  // have the Component as a context.
  updateLanguage(lang) {
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(() => {
          return {
            repos: repos
          }
        })
      });
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos
          ? <Loading />
          : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

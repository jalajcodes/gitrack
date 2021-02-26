import { Octokit } from '@octokit/rest';
import localforage from '../node_modules/localforage/dist/localforage';

export const getUser = async (token, auth) => {
  const octo = new Octokit({
    auth: token
  });
  octo.hook.error('request', async (error, options) => {
    console.log('error', error.status, options);
    if (error.status === 401) {
      auth.signOut();
    }
  });
  const profileData = await octo.users.getAuthenticated();
  return profileData;
};

export const getIssues = async (username, auth) => {
  const { token } = await localforage.getItem('userData');
  const octo = new Octokit({
    auth: token
  });
  octo.hook.error('request', async (error, options) => {
    console.log('error', error.status, options);
    if (error.status === 401) {
      auth.signOut();
    }
  });
  const searchString = `is:open is:issue assignee:${username} archived:false`;
  const rawIssueData = await octo.search.issuesAndPullRequests({
    q: searchString
  });
  console.log('raw', rawIssueData);

  const formattedIssues = formatIssues(rawIssueData);
  return formattedIssues;
};

export const getMergedPr = async (username, auth) => {
  const { token } = await localforage.getItem('userData');
  const octo = new Octokit({
    auth: token
  });
  octo.hook.error('request', async (error, options) => {
    console.log('error', error.status, options);
    if (error.status === 401) {
      auth.signOut();
    }
  });

  const searchString = `is:merged is:pr author:${username} archived:false `;
  const rawData = await octo.search.issuesAndPullRequests({
    q: searchString
  });
  console.log(rawData);

  // const formattedPrs =
  // return recentIssues;
};

const formatIssues = (rawIssues) => {
  return {
    lanes: [
      {
        id: 'fetched-issues',
        title: 'Fetched Issues',
        cards: rawIssues?.data?.items.map((item) => {
          return {
            id: item.node_id,
            title: item.title,
            description: item.html_url
            // description: `${item.body.substring(0, 50)}...`
          };
        })
      }
    ]
  };
};

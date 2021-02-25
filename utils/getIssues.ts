import { Octokit } from '@octokit/rest';
import localforage from '../node_modules/localforage/dist/localforage';

export const getIssues = async (username) => {
  const { token } = await localforage.getItem('userData');
  const octo = new Octokit({
    auth: token
  });
  const searchString = `is:open is:issue assignee:${username} archived:false`;
  const rawIssueData = octo.search.issuesAndPullRequests({
    q: searchString
  });
  return rawIssueData;
};

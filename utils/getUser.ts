import { Octokit } from '@octokit/rest';

export const getUser = async (token) => {
  const octo = new Octokit({
    auth: token
  });
  const userData = octo.users.getAuthenticated();
  return userData;
};

import { Box, Heading, Stack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useAuth } from '@lib/auth';
import { getIssues } from '@utils/getIssues';
// import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import localforage from '../node_modules/localforage/dist/localforage';
import KanbanBoard from '@components/Kanban';

// const KanbanBoard = dynamic(() => import('../components/Kanban'), {
//   ssr: false
// });

const Kanban = () => {
  const [loading, setLoading] = useState(false);
  const [issues, setIssues] = useState(null);
  const [fetchIssues, setFetchIssues] = useState(false);

  const router = useRouter();
  const auth = useAuth();
  const toast = useToast();

  useEffect(() => {
    const init = async () => {
      const userData = await localforage.getItem('userData');

      if (!userData) {
        router.push('/login');
        toast({
          title: "You're not logged in.",
          description: 'Please login to view tracker.',
          status: 'warning',
          duration: 9000,
          position: 'top',
          isClosable: true
        });
      }
    };
    init();
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   const fetch = async () => {
  //     try {
  //       const userData = await localforage.getItem('userData');
  //       if (userData && userData.token) {
  //         const issuesFromGithub = await getIssues(
  //           auth?.user?.username ? auth.user.username : userData.username
  //         );
  //         console.log(issuesFromGithub);

  //         // const formattedIssues = formatIssues(issuesFromGithub);
  //         setIssues(issues);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.log(
  //         // 'Something went wrong while fetching issues from github',
  //         error
  //       );
  //     }
  //   };
  //   fetch();
  // }, [fetchIssues]);

  return (
    <>
      {loading ? (
        <Box
          w="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" />
        </Box>
      ) : (
        <>
          <Stack w="full" overflowX="scroll" m="5" mb="10">
            <Heading mb="5">Issue Tracker</Heading>
            <KanbanBoard issues={issues} />
          </Stack>
        </>
      )}
    </>
  );
};

export default Kanban;

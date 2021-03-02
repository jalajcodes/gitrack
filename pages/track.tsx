import { Box, Heading, HStack, Stack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useAuth } from '@lib/auth';
import { getIssues } from '@utils/getData';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import localforage from '../node_modules/localforage/dist/localforage';
import KanbanBoard from '@components/Kanban';
import { Button } from '@chakra-ui/button';
import { FetchIcon } from '@components/Icons';
import styled from '@emotion/styled';

const BoardWrapper = styled.div`
  .react-trello-card {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
    margin: 8px 8px 10px 8px;
  }

  .react-trello-lane.sc-iBPRYJ {
    background-color: transparent;
    box-shadow: 0 4px 24px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
    margin: 5px 25px 5px 0;
  }

  .react-trello-board.sc-jSgupP {
    background-color: transparent;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .react-trello-board.sc-jSgupP::-webkit-scrollbar {
    display: none;
  }
  .sc-hHftDr.sc-dmlrTW {
    margin: 8px 0 0 60px;
    box-shadow: 0 4px 24px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
    background-color: #5094f0;
    .sc-jcVebW {
      background-color: transparent;

      &:active {
        outline: none;
      }
    }
  }
  /* .sc-iBPRYJ.jyepsf {
    margin-left: 15px;
  } */
  .sc-fKFyDc {
    box-shadow: 0 4px 24px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
    padding: 5px;

    .sc-cBNfnY {
      background-color: #171923;
    }
  }
  .react-trello-lane.sc-iBPRYJ {
    margin-left: 10px;
  }

  .sc-iBPRYJ {
    box-shadow: 0 4px 24px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
    padding: 5px;
    margin-left: 60px;

    .sc-cBNfnY {
      background-color: #171923;
    }
  }

  a.sc-idOhPF {
    padding: 10px;
    background-color: #171923;
    text-align: center;
    border-radius: 5px;
    color: white;
    transition: all 0.3s;
    &:hover {
      text-decoration: none;
      background-color: #23242e;
    }
    &:active {
      transform: scale(0.95);
    }
  }
`;

const Kanban = () => {
  const [loading, setLoading] = useState(false);
  const [issues, setIssues] = useState(null);
  const [eventBus, setBus] = useState(undefined);
  const router = useRouter();
  const auth = useAuth();
  const toast = useToast();

  const setEventBus = (handle) => {
    setBus(handle);
  };

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

  useEffect(() => {
    // if (fetchIssues) {
    setLoading(true);
    const fetch = async () => {
      try {
        const userData = await localforage.getItem('userData');
        if (userData && userData.token) {
          const issuesFromGithub = await getIssues(
            auth?.user?.username ? auth.user.username : userData.username,
            auth
          );
          // console.log('from github', issuesFromGithub);
          setIssues(issuesFromGithub);
          setLoading(false);
        }
      } catch (error) {
        console.log(
          'Something went wrong while fetching issues from github',
          error
        );
      }
    };
    fetch();
    // }
  }, []);

  const handleClick = () => {
    setTimeout(() => {
      issues?.lanes[0].cards.map((card) => {
        eventBus.publish({
          type: 'ADD_CARD',
          laneId: 'issues',
          card: {
            id: card.id,
            title: card.title,
            description: card.description
          }
        });
      });

      if (issues?.lanes[0]?.cards.length === 0) {
        toast({
          title: 'No issues found',
          description: "You don't have any issues assigned to you currently.",
          status: 'warning',
          duration: 3000,
          position: 'top',
          isClosable: true
        });
      } else {
        toast({
          title: 'Sucess!',
          description: 'Board updated successfully.',
          status: 'success',
          duration: 2000,
          position: 'top',
          isClosable: true
        });
      }
    }, 2000);
  };

  // const addIssues = () => {
  //   issues?.lanes[0]?.cards.map((card) => {
  //     eventBus.publish({
  //       type: 'ADD_CARD',
  //       laneId: 'issues',
  //       card: {
  //         id: card.id,
  //         title: card.title,
  //         description: card.description
  //       }
  //     });
  //   });
  // };

  return (
    <>
      <Stack w="full" overflowX="scroll" m="5" mb="10">
        <HStack
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="8"
        >
          <Heading mr="12">Issue Tracker</Heading>
          <Button
            onClick={handleClick}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            <FetchIcon fill="white" mr="3" />
            Fetch Data from Github
          </Button>
        </HStack>
        {loading ? (
          <Box
            w="full"
            display="flex"
            h="full"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="xl" />
          </Box>
        ) : (
          <BoardWrapper>
            <KanbanBoard eventBusHandle={setEventBus} />
          </BoardWrapper>
        )}
      </Stack>
    </>
  );
};

export default Kanban;

import { Box, Spinner, useToast } from '@chakra-ui/react';
import Statistics from '@components/Statistics';
import { useAuth } from '@lib/auth';
import { getUser } from '@utils/getUser';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import localforage from '../node_modules/localforage/dist/localforage';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const auth = useAuth();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const userData = await localforage.getItem('userData');

      if (!userData) {
        router.push('/login');
        toast({
          title: "You're not logged in.",
          description: 'Please login to view profile.',
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
    setLoading(true);
    const fetch = async () => {
      const userData = await localforage.getItem('userData');
      if (userData && userData.token) {
        const data = await getUser(
          auth?.user?.token ? auth.user.token : userData.token
        );
        console.log(data);
        setStats(data);
        setLoading(false);
      }
    };
    fetch();
    // }
  }, []);

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
        <Statistics stats={stats} />
      )}
    </>
  );
};

export default Profile;

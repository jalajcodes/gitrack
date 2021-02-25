import NextLink from 'next/link';
import { Link, Flex } from '@chakra-ui/react';
import { useAuth } from '@lib/auth';

const Footer = () => {
  const auth = useAuth();
  return (
    <Flex mb={8} justify="center">
      <NextLink href="/" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
          Home
        </Link>
      </NextLink>
      <NextLink href="/profile" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
          Profile
        </Link>
      </NextLink>
      <NextLink href="/track" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
          Tracker
        </Link>
      </NextLink>
      {auth.user && (
        <Link
          onClick={() => auth.signOut()}
          fontSize="sm"
          mr={4}
          fontWeight="medium"
          color="gray.500"
        >
          Logout
        </Link>
      )}
    </Flex>
  );
};

export default Footer;

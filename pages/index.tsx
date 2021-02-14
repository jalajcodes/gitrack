import { useAuth } from '@lib/auth';

export const Home: React.VFC = () => {
  const auth = useAuth();

  return (
    <div>
      <main>
        <button onClick={() => auth.signinWithGithub()}>sign</button>
        <br />
        <button onClick={() => auth.signinWithTwitter()}>sign twitter</button>
        <div>{auth?.user?.displayName}</div>
        {auth.user && <button onClick={() => auth.signOut()}>sign out</button>}
      </main>
    </div>
  );
};

export default Home;

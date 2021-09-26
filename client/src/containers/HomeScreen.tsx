import React from 'react';
import {useSetRecoilState} from 'recoil';
import {useQuery, gql} from '@apollo/client';
import {currentUserState} from '../atoms/UserState';
import GlobalHeader from '../components/GlobalHeader';
import LeftNav from '../components/LeftNav';
import ScreenContent from '../components/ScreenContent';
import {UserGQLResponse} from '../models/User';

interface UserOneData {
  userOne: UserGQLResponse;
}

const GET_USER = gql`
  query GetUser {
    userOne {
      _id
      firstName
      lastName
      email
    }
  }
`;

const styles: {[key: string]: React.CSSProperties} = {
  leftNavAndScreenContent: {
    display: 'flex',
    flexDirection: 'row',
    height: 'calc(100vh - 80px)',
  },
};

const HomeScreen = () => {
  const {loading, error, data} = useQuery<UserOneData, {}>(GET_USER);
  const setCurrentUserState = useSetRecoilState(currentUserState);

  if (loading) return <p>Loading...</p>;
  if (error || data === undefined) return <p>Error :(</p>;

  try {
    setCurrentUserState({
      id: data.userOne._id,
      firstName: data.userOne.firstName,
      lastName: data.userOne.lastName,
      email: data.userOne.email,
    });
  } catch (e) {
    console.warn('userOne data not loaded');
  }

  return (
    <div>
      <GlobalHeader />
      <div style={styles.leftNavAndScreenContent}>
        <LeftNav />
        <ScreenContent />
      </div>
    </div>
  );
};

export default HomeScreen;

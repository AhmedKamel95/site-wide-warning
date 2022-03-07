import React from 'react';
import {useQuery, gql} from '@apollo/client';
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

  if (loading) return <p>Loading...</p>;
  if (error || data === undefined) return <p>Error :(</p>;

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

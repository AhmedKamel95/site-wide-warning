import React from 'react';
import {useQuery, gql} from '@apollo/client';
import {useSetRecoilState, useRecoilState} from 'recoil';
import ChangeUserDropdown from './ChangeUserDropdown';
import {currentUserState, nextUserState} from '../atoms/UserState';
import {showDropdownState} from '../atoms/ChangeUserDropdownState';
import {showModalState} from '../atoms/ChangeUserModalState';
import {showSettingsMenuState} from '../atoms/SettingsMenuState';
import DownArrow from '../assets/down-arrow.png';
import {User, UserGQLResponse} from '../models/User';
import Logger from '../utils/Logger';

interface UserManyData {
  userMany: UserGQLResponse[];
}

interface UserManyVars {
  limit: number;
}

export const GET_USERS = gql`
  query GetUser($limit: Int!) {
    userMany(limit: $limit) {
      _id
      firstName
      lastName
      email
    }
  }
`;

const styles: {[key: string]: React.CSSProperties} = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    left: '0',
    top: '0',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
  },
  modal: {
    width: '500px',
    height: '300px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: '#414141',
  },
  dropdownButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#C6C6C6',
    borderRadius: '5px',
    borderStyle: 'solid',
    borderWidth: '1px',
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '450px',
    height: '60px',
  },
  rotate180: {
    transform: 'rotate(180deg)',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '450px',
    padding: '20px',
    fontWeight: 600,
  },
  cancelButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    width: '140px',
    height: '50px',
    borderRadius: '5px',
    marginRight: '15px',
    cursor: 'default',
  },
  changeUserButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ABEFEB',
    width: '140px',
    height: '50px',
    borderRadius: '5px',
    cursor: 'default',
  },
};

const ChangeUserModal = () => {
  const {loading, error, data} = useQuery<UserManyData, UserManyVars>(
    GET_USERS,
    {variables: {limit: 100}}
  );
  const setShowModal = useSetRecoilState(showModalState);
  const [showDropdown, setShowDropdown] = useRecoilState(showDropdownState);
  const [showSettingsMenu, setShowSettingsMenu] = useRecoilState(
    showSettingsMenuState
  );
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [nextUser, setNextUser] = useRecoilState(nextUserState);

  if (loading) return <p data-testid="loading">Loading...</p>;
  if (error) return <p data-testid="error">Error :(</p>;

  return (
    <div style={styles.root} data-testid="change_user_modal">
      <div style={styles.modal}>
        <h1>
          Logged in as {currentUser.firstName} {currentUser.lastName}
        </h1>
        <h4>Change User</h4>
        <div
          style={styles.dropdownButton}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div>
            {nextUser?.firstName} {nextUser?.lastName}
          </div>
          <img
            src={DownArrow}
            alt="DownArrow"
            width={18}
            height={18}
            style={showDropdown ? styles.rotate180 : {}}
          />
        </div>
        {showDropdown ? (
          <ChangeUserDropdown
            users={
              data
                ? data.userMany.map(({_id, firstName, lastName, email}) => {
                    return {id: _id, firstName, lastName, email} as User;
                  })
                : []
            }
            onSelect={user => {
              setShowDropdown(!showDropdown);
              setNextUser(user);
            }}
          />
        ) : null}
        <div style={styles.footer}>
          <div
            style={styles.cancelButton}
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </div>
          <div
            style={styles.changeUserButton}
            onClick={() => {
              setShowModal(false);
              setCurrentUser(nextUser);
              setNextUser({
                id: '',
                firstName: '',
                lastName: '',
                email: '',
              });
              Logger.info(
                'Switched user to ' +
                  nextUser.firstName +
                  ' ' +
                  nextUser.lastName
              );
              setShowSettingsMenu(!showSettingsMenu);
            }}
          >
            Change User
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserModal;

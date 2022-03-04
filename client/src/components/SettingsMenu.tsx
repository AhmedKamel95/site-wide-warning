import React from 'react';
import {useSetRecoilState} from 'recoil';

import {showModalState} from '../atoms/ChangeUserModalState';

const styles: {[key: string]: React.CSSProperties} = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: 'calc(100vw - 220px)',
    top: '90px',
    width: '180px',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: '5px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#C6C6C6',
    padding: '10px',
    backgroundColor: '#FFFFFF',
  },
  menuItem: {
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'default',
  },
};

const SettingsMenuItemType = Object.freeze({
  SETTINGS: 'SETTINGS',
  HELP: 'HELP',
  CHANGE_USER: 'CHANGE_USER',
});

const SettingsMenuItemConfigs = [
  {
    type: SettingsMenuItemType.SETTINGS,
    label: 'Settings',
    onClick: () => {},
  },
  {
    type: SettingsMenuItemType.HELP,
    label: 'Help',
    onClick: () => {},
  },
  {
    type: SettingsMenuItemType.CHANGE_USER,
    label: 'Change User',
    onClick: (setShowChangeUserModal: (value: boolean) => void) =>
      setShowChangeUserModal(true),
  },
];

const SettingsMenu = () => {
  const setShowChangeUserModal = useSetRecoilState(showModalState);

  return (
    <div style={styles.root}>
      {SettingsMenuItemConfigs.map((menuItem, idx) => (
        <div
          key={idx}
          style={styles.menuItem}
          onClick={() => {
            menuItem.onClick(setShowChangeUserModal);
          }}
        >
          {menuItem.label}
        </div>
      ))}
    </div>
  );
};

export default SettingsMenu;

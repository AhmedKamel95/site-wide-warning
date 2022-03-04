import {useRecoilValue} from 'recoil';

import './App.css';
import {showModalState} from './atoms/ChangeUserModalState';
import ChangeUserModal from './components/ChangeUserModal';
import HomeScreen from './containers/HomeScreen';

const App = () => {
  const showChangeUserModal = useRecoilValue(showModalState);

  return (
    <div className="App">
      <HomeScreen />
      {showChangeUserModal ? <ChangeUserModal /> : null}
    </div>
  );
};

export default App;

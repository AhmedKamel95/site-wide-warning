import {atom} from 'recoil';
import {User} from '../models/User';

const currentUserState = atom<User>({
  key: 'currentUser',
  default: {id: '', firstName: '', lastName: '', email: ''},
});

const nextUserState = atom<User>({
  key: 'nextUser',
  default: {id: '', firstName: '', lastName: '', email: ''},
});

export {currentUserState, nextUserState};

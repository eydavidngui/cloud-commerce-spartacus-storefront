import * as fromUserToken from './user-token.reducer';
import * as fromActions from './../actions/user-token.action';
import { UserToken } from '../../models/token-types.model';

fdescribe('UserToken reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserToken;
      const action = {} as any;
      const state = fromUserToken.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USER_TOKEN_SUCCESS action', () => {
    it('should store a user token', () => {
      const testToken: UserToken = {
        access_token: 'xxx',
        token_type: 'bearer',
        refresh_token: 'xxx',
        expires_in: 1000,
        scope: ['xxx'],
        username: 'xxx'
      };
      const { initialState } = fromUserToken;

      const action = new fromActions.LoadUserTokenSuccess(testToken);
      const state = fromUserToken.reducer(initialState, action);

      expect(state.token).toEqual(testToken);
    });
  });
});
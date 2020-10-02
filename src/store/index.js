import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index';
import requestsModule from './modules/requests/index';

const store = createStore({
  modules: {
    //   naming the modules so when you access any files inside of the module
    //   you need to reference the key
    coaches: coachesModule,
    requests: requestsModule
  },
  //   global state
  state() {
    return {
      userId: 'c3'
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});

export default store;

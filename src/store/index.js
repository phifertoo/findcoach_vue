import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index';

const store = createStore({
  modules: {
    //   naming the modules so when you access any files inside of the module
    //   you need to reference the key
    coaches: coachesModule
  }
});

export default store;

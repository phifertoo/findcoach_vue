export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(state, getters, rootState, rootGetters) {
    //   references the coaches getter shown above
    const coaches = getters.coaches;
    // references the userId getter in store/index.js
    const userId = rootGetters.userId;
    return coaches.some(coach => coach.id === userId);
  }
};

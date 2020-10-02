export default {
  requests(state, getters, rootState, rootGetters) {
    const coachId = rootGetters.userId;
    console.log(
      'requests',
      state.requests,
      coachId,
      state.requests.filter(req => req.coachId === coachId)
    );
    return state.requests.filter(req => req.coachId === coachId);
  },
  hasRequests(state, getters) {
    return getters.requests && getters.requests.length > 0;
  }
};

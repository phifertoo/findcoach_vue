export default {
  registerCoach(context, data) {
    const coachData = {
      // accessing the getter in the root/global in store/index.js
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    // calling the coachData mutation function registerCoach
    context.commit('registerCoach', coachData);
  }
};

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      // accessing the getter in the root/global in store/index.js
      //   id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    // fetch(`https://findcoach-77c05.firebaseio.com/coaches/${userId}.json`, {
    //   method: 'PUT',
    //   body: JSON.stringify(coachData)
    // }).then();

    const response = await fetch(
      `https://findcoach-77c05.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    // calling the registerCoach mutation and pass in coachData
    // as the payload
    context.commit('registerCoach', { ...coachData, id: userId });
  },
  async loadCoaches(context) {
    //   get request
    const response = await fetch(
      // `https://findcoach-77c05.firebaseio.com/coaches.json`

      `https://findcoach-77c05.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      // handle error
    }

    const coaches = [];

    for (let key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
  }
};

<template>
  <section>
    <base-card>
      <h2>Register as a coach now</h2>
      <!-- when we receive a save-data event, the saveData method is called -->
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm';
export default {
  components: {
    CoachForm
  },
  methods: {
    saveData(data) {
      // coaches = module name in /store/index.js
      // registerCoach = name of mutation in /store/modules/coaches/mutations.js
      this.$store.dispatch('coaches/registerCoach', data);
      //   forwarded to the /coaches page
      //  this is the same as this.$router.push('/coaches')
      this.$router.replace('/coaches');
    }
  }
};
</script>

<style></style>

<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Regsiter as Coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      <!-- <li v-for="coach in filteredCoaches" :key="coach.id">
        {{ coach.firstName }}
      </li> -->
      <coach-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      ></coach-item>
    </ul>
    <h3 v-else>No coaches found</h3>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem';

export default {
  components: { CoachItem },
  computed: {
    filteredCoaches() {
      // first coaches = module name in /store/index.js
      // second coaches = name of getter in /store/modules/coaches/getters.js
      return this.$store.getters['coaches/coaches'];
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    }
  }
};
</script>

<style></style>

<template>
  <div>
    <!-- !!error turns the string into a boolean -->
    <base-dialog
      :show="!!error"
      title="An error has occurred
  "
      @close="handleError"
    >
      <!-- use the default slot -->
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <!-- the component emits a change-filter event so we are listening for the change filter event -->
      <!-- the emitted event from the child can pass a payload which can be accessed by setFilters -->
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
          <base-button v-if="!isCoach && !isLoading" link to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
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
            :id="coach.id"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem';
import CoachFilter from '../../components/coaches/CoachFilter';

export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  computed: {
    filteredCoaches() {
      // first coaches = module name in /store/index.js
      // second coaches = name of getter in /store/modules/coaches/getters.js
      const coaches = this.$store.getters['coaches/coaches'];
      //   note the filter function returns a new array so the original
      // coaches array will not be mutated
      console.log(coaches);
      const newArray = coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
      return newArray;
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      // module = coaches in store/index.js
      // isCoach = getter in store/coaches/getters.js
      return this.$store.getters['coaches/isCoach'];
    }
  },
  create() {
    this.loadCoaches();
  },
  /*setFilters is fired when a change-filter event is received from the child component
  the change-filter event contains a payload which is accessed by default a parameter which we name
 "updatedFilters" */
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches() {
      this.isLoading = true;

      try {
        // coaches modules / loadCoaches action
        await this.$store.dispatch('coaches/loadCoaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }

      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

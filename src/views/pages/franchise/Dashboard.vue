<template>
  <div>
    <div v-if="!loadingState">
      <b-row>
        <b-col>
          <statistic-card-horizontal
            icon="PackageIcon"
            color="success"

            :statistic="stats.in + stats.out"
            statistic-title="Total Orders for Today"
          />
        </b-col>
        <b-col>
          <statistic-card-horizontal
            icon="ArrowDownLeftIcon"
            color="warning"

            :statistic="stats.in"
            statistic-title="Incoming Orders"
          />
        </b-col>
        <b-col>
          <statistic-card-horizontal
            icon="ArrowUpRightIcon"
            color="danger"

            :statistic="stats.out"
            statistic-title="Outgoing Orders"
          />
        </b-col>
      </b-row>
    </div>
    <div v-if="loadingState">
      <div class="d-flex justify-content-center mb-1">
        <b-spinner
          variant="danger"
          label="Loading..."
        />
      </div>
    </div>
  </div>
</template>
<script>
import { BRow, BCol, BSpinner } from 'bootstrap-vue'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import { getUserData } from '@/auth/utils'

export default {
  components: {
    BRow,
    BCol,
    BSpinner,
    StatisticCardHorizontal,
  },
  data() {
    return {
      stats: {},
      post:{},
      loadingState: true,
    }
  },
  created() {
    this.fetchStats()
  },
  methods: {
    fetchStats() {
      const self = this
      self.loadingState = true
      this.user = getUserData()
      this.post.franchise_id = this.user.franchiseData.id
      // get setting e.i - George town etc. and postcode
      this.$http.post(`${this.$appURL}stats/franchise`, this.post).then(response => {
        self.stats = response.data.data
        self.loadingState = false
      })
    },

  },
}
</script>

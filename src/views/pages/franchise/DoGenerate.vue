<template>
  <div>
    <div v-if="!loadingState">
      <b-card class="filters">
        <b-row>
          <b-col
            md="6"
          >

            <b-form-group
              label="Pickup Date"
            >
              <b-input-group size="sm">
                <flat-pickr
                  v-model="pickup_date"
                  class="form-control"
                  :config="{mode: 'range', onClose:applyFilter}"
                />
              </b-input-group>

            </b-form-group>

          </b-col>
          <b-col
            md="6"
            class="text-right"
          >

            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-1"
              :disabled="loading"
              @click="print"
            >
              <b-spinner
                v-if="loading"
                small
              />
              Print
            </b-button>

          </b-col>
        </b-row>
      </b-card>
      <b-col
        v-if="items.length<1"
        class="px-2"
      >
        <b-alert
          class="p-2"
          variant="warning"
          show
        >
          No records found
        </b-alert>

      </b-col>
      <b-row id="printMe">
        <b-col
          v-for="(order,index) in items"
          :key="index"
          class="breakme"
          lg="4"
          md="6"
        >
          <b-card
            no-body
            class="text-center"
          >
            <b-card-body>
              <vuexy-logo class="float-left" />
            </b-card-body>
            <hr>
            <b-card-body>
              <img
                class="barcode"
                :src="$s3URL+order.barcode"
                alt="Barcode"
              >
              <h3>{{ order.order_id }}</h3>
            </b-card-body>
            <b-card-body class="border-top">
              {{ order.from_franchise }}
              {{ order.pickup_address }}
            </b-card-body>
            <b-card-body class="border-top">
              {{ order.dropoff_name }} ({{ order.dropoff_phone }})
            </b-card-body>
            <b-card-body class="border-top">
              {{ order.dropoff_address }} {{ order.dropoff_postal }}
            </b-card-body>
            <b-row class="border-top">
              <b-col
                sm="6"
                class="border-right p-1"
              >
                {{ order.remarks }}
              </b-col>
              <b-col
                sm="6"
                class="p-1"
              >
                QTY: {{ order.qty }}
              </b-col>
            </b-row>
          </b-card>
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
import {
  BAlert, BCardBody, BRow, BCol, BBadge, BFormGroup, BButton, BSpinner, BTable, BPagination,
  BInputGroup, BFormInput, BInputGroupAppend, BDropdown, BDropdownItem,
  BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import flatPickr from 'vue-flatpickr-component'

import moment from 'moment'
import store from '@/store/index'
import { getUserData } from '@/auth/utils'

export default {
  directives: {
    Ripple,
  },
  components: {
    flatPickr,
    VuexyLogo,
    BAlert,
    BCard,
    BCardBody,
    BSpinner,
    BButton,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    vSelect,
    BTable,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BDropdown,
    BDropdownItem,
    BCard,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      post: {
        pickup_date: moment().format('YYYY-MM-DD'),
      },
      pickup_date: moment().format('YYYY-MM-DD'),
      submitting: false,
      loadingState: true,
      totalRows: 0,
      filter: null,
      filterOn: [],
      items: [],
      loading: false,
    }
  },
  watch: {
    'post.pickup_date': function () {
      this.getFranchisers()
    },
  },
  created() {
    this.getFranchisers()
  },
  mounted() {
    this.totalRows = this.items.length
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getFranchisers() {
      const self = this
      self.loadingState = true
      this.user = getUserData()
      this.post.franchise_id = this.user.franchiseData.id
      // get setting e.i - George town etc. and postcode
      this.$http.post(`${this.$appURL}orders`, this.post).then(response => {
        self.items = response.data.data
        self.totalRows = self.items.length
        self.loadingState = false
      })
    },
    applyFilter(selected) {
      this.post.pickup_date = selected[0]
      this.post.end_pickup_date = selected[1]
      this.getFranchisers()
    },
    print() {
      window.print()
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
<style>
.barcode{
  height:150px;
  width:60%;
}
@media print {
  h3{
    font-size: 200%;
  }
  #printMe{
    font-size: 300%;
  }
  .row {
    display: block;
  }

  .breakme{
    border:5px solid black;
    display: block;
page-break-after: always;
max-width: 100%;
  }
  .breakme .col-sm-6{
    max-width: 49%;
  }
  .breakme .row.border-top{
    display: flex;
  }
  .breadcrumbs-top,.filters,.main-menu,.navbar{
    display: none;
  }
  .pagebreak {
        clear: both;

    }
}
</style>

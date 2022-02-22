<template>
  <div>
    <b-card
      no-body
    >
      <b-row v-if="!loadingState">
        <b-col
          md="12"
          class="my-1"
        >

          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0 mr-2 searchInput"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filterInput"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              />
              <b-input-group-append>
                <b-button
                  :disabled="!filter"
                  @click="filter = ''"
                >
                  Clear
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-table
            striped
            hover
            responsive
            :per-page="perPage"
            :current-page="currentPage"
            :items="items"
            :fields="fields"
            :filter="filter"
            :filter-included-fields="filterOn"
            @filtered="onFiltered"
          >
          <template v-slot:cell(actions)="slot">
            <span class="text-nowrap">
               <span>
                <b-dropdown
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret
                >
                  <template v-slot:button-content>
                    <feather-icon
                      icon="MoreVerticalIcon"
                      size="16"
                      class="text-body align-middle mr-25"
                    />
                  </template>
                  <b-dropdown-item>
                    <feather-icon
                      icon="Edit2Icon"
                      class="mr-50"
                    />
                    <span>Modify Pickup</span>
                  </b-dropdown-item>
                  <b-dropdown-item
                    @click="showOrders(slot.item.id)"
                  >
                    <feather-icon
                      icon="EyeIcon"
                      class="mr-50"
                    />
                    <span>Show Orders</span>
                  </b-dropdown-item>
                </b-dropdown>
              </span>
            </span>
          </template>
        </b-table>
      </b-col>
         <b-col
      cols="12"
    >
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="center"
        size="sm"
        class="my-1"
      />
    </b-col>
    </b-row>
    <div v-if="loadingState">
      <div class="d-flex justify-content-center mb-1">
        <b-spinner
          variant="danger"
          label="Loading..."
        />
      </div>
    </div>
    </b-card>
  </div>

</template>

<script>
import {
  BRow, BCol, BFormGroup, BButton, BSpinner, BTable, BPagination, 
  BInputGroup, BFormInput, BInputGroupAppend, BDropdown, BDropdownItem,
  BCard
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import axios from '@axios'
import store from '@/store/index'

export default {
  components: {
    BCard,
    BSpinner,
    BButton,
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
    BCard
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      submitting: false,
      loadingState: true,
      totalRows: 0,
      filter: null,
      filterOn: [],
      perPage: 10,
      pageOptions: [10, 30, 50],
      totalRows: 1,
      currentPage: 1,
      fields: [
        'user_id',
        'franchise_name',
        'franchise_area',
        'pickup_address',
        'pickup_area',
        'pickup_postal',
        'actions',
      ],
      items: [],
    }
  },
  created() {
    this.getFranhisers()
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
    getFranhisers() {
      const self = this
      // get setting e.i - George town etc. and postcode
      axios.get(`${this.$appURL}franchisers`).then(response => {
        self.items = response.data.data
        self.totalRows = self.items.length
        self.loadingState = false
      })
    },
    showOrders(id){
      this.$router.push({ name: "franchise_orders", params: {id:id}});
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.searchInput {
  float: right !important;
}
</style>

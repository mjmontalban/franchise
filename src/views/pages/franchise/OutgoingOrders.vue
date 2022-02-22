<template>
  <div>
    <b-card
      no-body
      class="py-1"
    >
      <b-row v-if="!loadingState">
        <b-col
          md="12"
        >
          <h3 class="m-1">
            Total Orders: {{ items.length }}
          </h3>
        </b-col>
        <b-col
          md="6"
          class="my-1"
        >

          <b-form-group
            class="ml-2"
          >
            <b-input-group size="sm">
              <flat-pickr
                v-model="post.pickup_date"
                class="form-control"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col
          md="6"
          class="my-1"
        >
          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0 mr-2 float-right"
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
            <template #cell(order_id)="data">
              <b-badge variant="dark">
                F{{ data.value }}
              </b-badge>
              <a
                v-if="data.item.golog_id"
              ><b-badge variant="danger">
                D{{ data.item.golog_id }}
              </b-badge>
              </a>
            </template>
            <template #cell(status)="data">
              <b-badge :variant="status[0][data.value]">
                {{ status[1][data.value] }}
              </b-badge>
            </template>
            <template #cell(actions)="data">
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
                    <b-dropdown-item
                      @click="viewTracking(data.item.order_id)"
                    >
                      <feather-icon
                        icon="ListIcon"
                        class="mr-50"
                      />
                      <span>View Tracking</span>
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="viewDetails(data.index)"
                    >
                      <feather-icon
                        icon="EyeIcon"
                        class="mr-50"
                      />
                      <span>Quick View</span>
                    </b-dropdown-item>
                    <b-dropdown-divider v-if="data.item.status < 2" />
                    <b-dropdown-item
                      v-if="data.item.status < 2"
                      @click="cancelOrder(data.item.order_id)"
                    >
                      <feather-icon
                        icon="XSquareIcon"
                        class="mr-50"
                      />
                      <span>Cancel Order</span>
                    </b-dropdown-item>
                  </b-dropdown>
                </span>
              </span>
            </template>
          </b-table>

        </b-col>
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
        <b-col
          cols="12"
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"
            size="sm"
            class="my-0"
          />
        </b-col>
      </b-row>
      <b-modal
        id="modal-xl"
        hide-footer
        centered
        :title="selected.id"
      >
        <b-card
          title="Order Details"
        >
          <p>
            ID: <b><b-badge variant="dark">
              F{{ selected.order_id }}
            </b-badge></b><br>
            STATUS: <b-badge :variant="status[0][selected.status]">
              {{ status[1][selected.status] }}
            </b-badge><br>
            DATE CREATED: <b>{{ selected.order_date }}</b><br>
            PICKUP DATE: <b>{{ selected.pickup_date }}</b><br>
            QUANTITY: <b>{{ selected.qty }}</b><br>
            REMARKS: <b>{{ selected.remarks }}</b>
            <br>
            BARCODE: <span class="text-nowrap">
              <img
                :src="$s3URL+'uploads/distributor/'+selected.barcode"
                alt="Barcode"
              >
            </span>
          </p>
        </b-card>
        <b-row>
          <b-col>
            <b-card
              title="Origin"
            >
              <p>
                Franchise: <b>{{ selected.from_franchise }}</b><br>
                Name: <b>{{ selected.pickup_name }}</b><br>
                Phone: <b>{{ selected.pickup_phone }}</b><br>
                Address: <b>{{ selected.pickup_address }} {{ selected.pickup_postal }}</b>
              </p>
            </b-card>
          </b-col>
          <b-col>
            <b-card
              title="Destination"
            >
              <p>
                Franchise: <b>{{ selected.to_franchise }}</b><br>
                Name: <b>{{ selected.dropoff_name }}</b><br>
                Phone: <b>{{ selected.dropoff_phone }}</b><br>
                Address: <b>{{ selected.dropoff_address }} {{ selected.dropoff_postal }}</b>
              </p>
            </b-card>
          </b-col>
        </b-row>

      </b-modal>
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
  BAlert, BRow, BCol, BBadge, BFormGroup, BButton, BSpinner, BTable, BPagination,
  BInputGroup, BFormInput, BInputGroupAppend, BDropdown, BDropdownItem, BDropdownDivider,
  BCard,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import axios from '@axios'
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'
import store from '@/store/index'
import { getUserData } from '@/auth/utils'

export default {
  components: {
    flatPickr,
    BAlert,
    BDropdownDivider,
    BCard,
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
      selected: {},
      submitting: false,
      loadingState: true,
      totalRows: 0,
      filter: null,
      filterOn: [],
      perPage: 10,
      pageOptions: [10, 30, 50],
      totalRows: 1,
      currentPage: 1,
      status: [['danger', 'dark', 'info', 'warning', 'success', 'dark', 'warning', 'success', 'info', 'danger', 'danger'],
        ['invalid', 'Active', 'For Transfer', 'Picked by Lorry', 'Transferred', 'Assigned to Driver', 'For Last Mile', 'In Warehouse', 'For Pickup by Lorry', 'invalid', 'Cancelled']],
      fields: [
        {
          key: 'order_id',
          label: 'ID',
          sortable: true,
        },
        {
          key: 'pickup_name',
          label: 'Sender Name',
        },
        'to_franchise',
        'dropoff_name',
        'dropoff_address',
        'dropoff_postal',
        'qty',
        'status',
        {
          key: 'pickup_date',
          label: 'Pickup Date',
          sortable: true,
        },
        'delivery_date',
        'actions',
      ],
      items: [],
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
    viewTracking(id) {
      this.$router.push({ name: 'order', params: { id } })
    },
    viewDetails(id) {
      this.selected = this.items[id]
      this.$bvModal.show('modal-xl')
    },
    cancelOrder(id) {
      const self = this
      this.$swal({
        title: 'Are you sure to set this order to CANCELLED ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$http.get(`${this.$appURL}cancelOrder/${id}`)
            .then(response => {
              const res = response.data
              // if (res.status) {
              self.getFranchisers()
              self.$toast({
                component: ToastificationContent,
                props: {
                  title: res.message,
                  icon: 'ThumbsUpIcon',
                  variant: 'success',
                },
              })
              // }
            })
        }
      })
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

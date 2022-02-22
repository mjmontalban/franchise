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
            <template #cell(id)="data">
              <b-badge variant="dark">
                {{ data.value }}
              </b-badge>
            </template>
            <template #cell(shipment_id)="data">
              <b-badge v-if="data.value" variant="success">
                Generated
              </b-badge>
               <b-badge v-if="!data.value" variant="dark">
                Not Generated
              </b-badge>
            </template>
            
            <template #cell(actions)="data">
              <b-badge v-if="data.item.status === 10" variant="danger">
                Cancelled
              </b-badge>
              <span v-if="data.item.status != 10" class="text-nowrap">
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
                      v-if="data.item.shipment_id"
                      @click="viewTracking(data.item.deliveryid)"
                    >
                      <feather-icon
                        icon="ListIcon"
                        class="mr-50"
                      />
                      <span>View Tracking</span>
                    </b-dropdown-item>
                    <b-dropdown-item
                       v-if="!data.item.shipment_id"
                       @click="generateShippingLabel(data.item.deliveryid)"
                    >
                      <feather-icon
                        icon="MoreVerticalIcon"
                        class="mr-50"
                      />
                      <span>Generate Label</span>
                    </b-dropdown-item>
                    <b-dropdown-item
                       v-if="data.item.shipment_id"
                       @click="printLabel(data.item.label)"
                    >
                      <feather-icon
                        icon="PrinterIcon"
                        class="mr-50"
                      />
                      <span>Download Label</span>
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="!data.item.shipment_id"
                      @click="cancelOrder(data.item.id)"
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
        title="Tracking Information"
      > 
        <ul v-for="(track,index) in tracking"
          :key="index">
            <li>{{track.description}} <br> <small>{{track.dateTime}}</small></li>
        </ul>
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
    <!-- <b-overlay
        :show="showOverlay"
        no-wrap
      /> -->
  </div>

</template>

<script>
import {
  BAlert, BRow, BCol, BBadge, BFormGroup, BButton, BSpinner, BTable, BPagination,
  BInputGroup, BFormInput, BInputGroupAppend, BDropdown, BDropdownItem, BDropdownDivider,
  BCard,
  // BOverlay
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
    // BOverlay,
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
      // showOverlay: false,
      tracking : [],
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
        ['invalid', 'Active', 'invalid', 'Assigned to Driver', 'Picked', 'Delivered', 'Completed', 'invalid', 'invalid', 'invalid', 'Cancelled']],
      fields: [
        {
          key: 'id',
          label: 'ORDER ID',
          sortable: true,
        },
        {
          key: 'shipment_id',
          label: 'Shipment',
        },
        {
          key: 'name',
          label: 'Receiver Name',
        },
        {
          key: 'address',
          label: 'Receiver Address',
        },
        'postcode',
        'qty',
        {
          key: 'pickup_datetime',
          label: 'Pickup Date',
          sortable: true,
        },
        'actions',
      ],
      items: [],
    }
  },
  watch: {
    'post.pickup_date': function () {
      this.getDhlOrders()
    },
  },
  created() {
    this.getDhlOrders()
  },
  mounted() {
    this.totalRows = this.items.length
  },
  methods: {
    printLabel(link){
      window.open(link, '_blank');
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getDhlOrders() {
      const self = this
      self.loadingState = true
      this.user = getUserData()
      this.post.user_id = this.user.user_id
    
      this.$http.post(`${this.$appURL}dhl_orders`, this.post).then(response => {
        self.items = response.data.data
        self.totalRows = self.items.length
        self.loadingState = false
      })
    },
    viewTracking(id) {
      let self = this;
      this.$http.get(`${this.$appURL}trackOrder/${id}`)
            .then(response => {
              const res = response.data
              if(!res.status){
                self.$toast({
                  component: ToastificationContent,
                  props: {
                    title: res.message,
                    icon: 'ThumbsDownIcon',
                    variant: 'danger',
                  },
                })
              }else{
                self.tracking = res.data.shipmentItems[0].events;
              this.$bvModal.show('modal-xl');
              }
              // }
            })
    },
    generateShippingLabel(id){
      const self = this
      // self.showOverlay = true;
      this.$swal({
        title: 'Are you sure to generate shipping label ?',
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
          this.$http.get(`${this.$appURL}generateLabel/${id}`)
            .then(response => {
              const res = response.data
              // if (res.status) {
              // self.showOverlay = false;
              self.getDhlOrders()
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
              self.getDhlOrders()
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

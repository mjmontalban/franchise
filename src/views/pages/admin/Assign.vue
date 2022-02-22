<template>
  <div>
    <b-card
      no-body
      class="mb-2"
    >
      <div
        v-if="!loadingState"
        class="my-2"
      >
        <b-row class="mx-1">
          <b-col md="4">
            <b-form-group>
              <v-select
                v-model="selected"
                label="name"
                :options="option"
                :on-change="getCoverage"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group>
              <v-select
                v-model="selectedPostal"
                label="postcode"
                :options="optionPostal"
              />
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              block
              variant="primary"
              :disabled="submitting"
              @click="assignToFranchise"
            >
              <b-spinner
                v-if="submitting"
                small
                class="float-left"
                label="Floated Right"
              />
              Add
            </b-button>
          </b-col>
        </b-row>
        <b-row class="mx-1">
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
              class="mb-0 searchInput"
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
        </b-row>
        <b-row>
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
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="danger"
                    @click="deleteConfirm(slot.item.id)"
                  >
                    <feather-icon icon="Trash2Icon" />
                  </b-button>
                </span>
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-row>
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
      </div>
      <div v-if="loadingState">
        <div class="d-flex justify-content-center my-2">
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
  BCard, BRow, BCol, BFormGroup, BButton, BSpinner, BTable, BPagination, BInputGroup, BFormInput, BInputGroupAppend,
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
        'franchise',
        'postcode',
        'post_office',
        'state_code',
        { key: 'zone_id', label: 'Zone' },
        'actions',
      ],
      selected: {
        id: null,
        name: null,
      },
      option: [],
      optionPostal: [],
      selectedPostal: {
        id: null,
        postcode: null,
      },
      items: [],
    }
  },
  created() {
    this.getdata()
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
    deleteConfirm(id) {
      const self = this
      this.$swal({
        title: 'Are you sure to remove assigned postal ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$http.post(`${this.$appURL}removeAssign`, {
            id,
          })
            .then(response => {
              const res = response.data
              if (res.status) {
                self.getdata()

                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: res.message,
                    icon: 'ThumbsUpIcon',
                    variant: 'success',
                  },
                })
              }
            })
        }
      })
    },
    assignToFranchise() {
      const self = this
      self.submitting = true
      const data = {
        franchise_id: self.selected.id,
        postcode: self.selectedPostal.postcode,
      }
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${store.state.authConfig.userdata.token}`,
      }
      axios.post(`${this.$appURL}assignPostal`, data, { headers })
        .then(response => {
          if (response.data.status) {
            self.submitting = false

            self.getdata() // get updated data

            this.$toast({
              component: ToastificationContent,
              props: {
                title: response.data.message,
                icon: 'ThumbsUpIcon',
                variant: 'success',
              },
            })
          }
        })
    },
    getCoverage() {
      const self = this
      // get setting e.i - George town etc. and postcode
      axios.get(`${this.$appURL}getCoverage`).then(response => {
        self.items = response.data.data
        self.totalRows = self.items.length
      })
    },
    getdata() {
      const self = this
      // get setting e.i - George town etc. and postcode
      axios.get(`${this.$appURL}getSettings`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${store.state.authConfig.userdata.token}`,
        },
      }).then(response => {
        self.selected.id = response.data.franchise[0].id
        self.selected.name = response.data.franchise[0].name
        self.option = response.data.franchise

        self.selectedPostal.postcode = response.data.franchise[0].postcode
        self.optionPostal = response.data.postcode
        self.loadingState = false
        self.getCoverage()
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.searchInput {
  float: right !important;
}
</style>

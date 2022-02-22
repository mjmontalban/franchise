<template>
  <div>
    <b-card
      title="Order Creation"
    >

      <b-form @submit.prevent="formSubmitted">
        <validation-observer
          ref="accountRules"
          tag="form"
        >
          <b-row>
            <b-col md="6">
              <b-form-group
                label="Pickup Date"
                label-for="pickup_date"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Pickup Date"
                  rules="required"
                >
                  <flat-pickr
                    v-model="post.pickup_date"
                    class="form-control"
                    :config="{ enableTime: true, dateFormat: 'Y-m-d H:i', minDate: mindate}"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Pickup Address"
                label-for="fr_Address"
              >
                <!-- <b v-if="user.franchiseData.id==13">59, Jalan Ros Merah 2/2, Taman Johor Jaya, 81100 Johor Bahru, Johor</b> -->
                <!-- <b>Lot 8076, JP 12/24, Jalan Perdana 12, 83700 Yong Peng, Johor</b> -->
                <b>{{ user.franchiseData.address }}</b>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                Sender
              </h5>
            </b-col>
            <b-col md="3">
              <b-form-group
                label="Name"
                label-for="origin_name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Sender Name"
                  rules="required"
                >
                  <b-form-input
                    id="origin_name"
                    v-model="post.origin_name"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Name"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group
                label="Phone"
                label-for="origin_phone"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Sender Phone"
                  rules="required|integer"
                >
                  <b-form-input
                    id="origin_phone"
                    v-model="post.origin_phone"
                    type="phone"
                    :state="errors.length > 0 ? false:null"
                    placeholder="60000000000"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group
                label="Email"
                label-for="origin_email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Sender Email"
                  rules="email"
                >
                  <b-form-input
                    id="origin_email"
                    v-model="post.origin_email"
                    type="email"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Email"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                label="Address"
                label-for="origin_address"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Sender Address"
                  rules="required"
                >
                  <b-form-input
                    id="origin_address"
                    v-model="post.origin_address"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Address"
                    @change="addressChangedOrigin"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="1">
              <b-form-group
                label="Postal"
                label-for="origin_postal"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Sender Postal"
                  rules="required|integer"
                >
                  <b-form-input
                    id="origin_postal"
                    v-model="post.origin_postal"
                    type="postal"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Postal"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                Destination
              </h5>
            </b-col>
            <b-col md="3">
              <b-form-group
                label="Name"
                label-for="destination_name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Destination Name"
                  rules="required"
                >
                  <b-form-input
                    id="destination_name"
                    v-model="post.destination_name"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Name"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group
                label="Phone"
                label-for="destination_phone"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Destination Phone"
                  rules="required|integer"
                >
                  <b-form-input
                    id="destination_phone"
                    v-model="post.destination_phone"
                    type="phone"
                    :state="errors.length > 0 ? false:null"
                    placeholder="65000000000"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group
                label="Email"
                label-for="destination_email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Destination Email"
                  rules="email"
                >
                  <b-form-input
                    id="destination_email"
                    v-model="post.destination_email"
                    type="email"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Email"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                label="Address"
                label-for="destination_address"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Destination Address"
                  rules="required"
                >
                  <b-form-input
                    id="destination_address"
                    v-model="post.destination_address"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Address"
                    @change="addressChangedDestination"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

            </b-col>
            <b-col md="1">
              <b-form-group
                label="Postal"
                label-for="destination_postal"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Destination Postal"
                  rules="required|integer"
                >
                  <b-form-input
                    id="destination_postal"
                    v-model="post.destination_postal"
                    type="number"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Postal"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <GmapMap
              v-if="post.destination_address"
              :center="locations.destination.center"
              :zoom="locations.destination.center.zoom"
              map-type-id="terrain"
              style="width:100%;height:300px"
            >
              <GmapMarker
                :key="'destmarker'"
                :position="locations.destination.position"
                :clickable="true"
                :draggable="true"
                @drag="updateCoordinatesDestination"
              />
            </GmapMap>
          </b-row>
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                Parcel Details
              </h5>
            </b-col>
            <b-col md="4">
              <b-form-group
                label="SKU"
                label-for="sku"
              >
                <validation-provider
                  #default="{ errors }"
                  name="SKU"
                >
                  <b-form-input
                    id="sku"
                    v-model="post.sku"
                    :state="errors.length > 0 ? false:null"
                    placeholder="SKU"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                label="Remarks"
                label-for="remarks"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Remarks"
                >
                  <b-form-input
                    id="remarks"
                    v-model="post.remarks"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Remarks"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                label="Quantity"
                label-for="quantity"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Quantity"
                  rules="required"
                >
                  <b-form-input
                    id="quantity"
                    v-model="post.qty"
                    :state="errors.length > 0 ? false:null"
                    placeholder="1"
                    type="number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>

        </validation-observer>
        <b-row>
          <b-col cols="12">
            <div class="form-group">
              <div class="border p-2 mt-3">
                <label for="myfile">Image Upload</label>
                <input
                  ref="myfile"
                  type="file"
                  accept="image/*"
                  class="form-control-file"
                  @change="previewImage"
                >
                <template v-if="preview">
                  <p class="mb-0">
                    size: {{ post.photo.size/1024 }}KB
                  </p>

                  <img
                    height="200"
                    :src="preview"
                    class=""
                  >
                  <button
                    class="btn btn-sm btn-danger"
                    @click="resetButton"
                  >
                    Remove
                  </button>
                </template>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              :disabled="loading"
            >
              <b-spinner
                v-if="loading"
                small
              />
              Submit
            </b-button>
          </b-col>
        </b-row>
      </b-form></b-card></div>
</template>

<script>
import moment from 'moment'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import Ripple from 'vue-ripple-directive'
import {
  BSpinner,
  BRow,
  BCard,
  BCol,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import flatPickr from 'vue-flatpickr-component'
import { getUserData } from '@/auth/utils'

export default {
  components: {
    Ripple,
    flatPickr,
    BSpinner,
    BCard,
    ValidationProvider,
    ValidationObserver,
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      mindate: moment().format('YYYY-MM-DD HH:mm'),
      preview: null,
      post: {
        photo: {},
        qty: 1,
        destination_postal: '',
      },
      locations: {
        origin: {
          center: {
            zoom: 7,
            lat: 2.72,
            lng: 101.9,
          },
          position: {
            lat: 0.0,
            lng: 0.0,
          },
        },
        destination: {
          center: {
            zoom: 7,
            lat: 2.72,
            lng: 101.9,
          },
          position: {
            lat: 0.0,
            lng: 0.0,
          },
        },
      },
      user: {},
      loading: false,
    }
  },
  created() {
    this.user = getUserData()
  },
  methods: {
    updateCoordinatesDestination(location) {
      this.locations.destination.position = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      }
    },
    resetButton() {
      this.post.photo = null
      this.preview = null
      this.$refs.myfile.value = null
    },
    previewImage(event) {
      const input = event.target
      if (input.files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.preview = e.target.result
        }
        this.post.photo = input.files[0]
        reader.readAsDataURL(input.files[0])
      } else {
        this.resetButton()
      }
    },
    addressChangedOrigin() {
      const self = this
      const bodyFormData = new FormData()
      bodyFormData.append('address', this.post.origin_address)
      this.$http.post(`${this.$processingURL}geocoding/server`, bodyFormData)
        .then(response => {
          const res = response.data
          if (res.status) {
            self.post.origin_postal = res.data.postal_code
            self.post.origin_area = res.data.area
            this.$toast({
              component: ToastificationContent,
              props: {
                title: res.status,
                icon: 'ThumbsUpIcon',
                variant: 'success',
              },
            })
          }
        })
    },
    addressChangedDestination() {
      const self = this
      const bodyFormData = new FormData()
      bodyFormData.append('address', this.post.destination_address)
      this.$http.post(`${this.$processingURL}geocoding/server`, bodyFormData)
        .then(response => {
          const res = response.data
          if (res.status) {
            self.locations.destination.center.lat = parseFloat(res.data.lat)
            self.locations.destination.center.lng = parseFloat(res.data.lng)
            self.locations.destination.center.zoom = 16
            self.post.destination_postal = res.data.postal_code
            self.post.destination_area = res.data.area
            self.locations.destination.position.lat = parseFloat(res.data.lat)
            self.locations.destination.position.lng = parseFloat(res.data.lng)
            this.$toast({
              component: ToastificationContent,
              props: {
                title: res.status,
                icon: 'ThumbsUpIcon',
                variant: 'success',
              },
            })
          }
        })
    },
    formSubmitted() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules.validate().then(success => {
          if (success) {
            const formData = new FormData()
            this.loading = true
            this.post.franchise_id = this.user.franchiseData.id
            this.post.user_id = this.user.user_id

            this.post.destination_lat = this.locations.destination.position.lat
            this.post.destination_lng = this.locations.destination.position.lng
            for (const key in this.post) {
              formData.append(key, this.post[key])
            }
            this.$http.post(`${this.$appURL}create_order_singapore`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
              },
            })
              .then(response => {
                this.loading = false
                const res = response.data
                if (res.status) {
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: res.message,
                      icon: 'ThumbsUpIcon',
                      variant: 'success',
                    },
                  })
                  location.reload()
                }
              })
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
  },
}
</script>
<style lang="scss">
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

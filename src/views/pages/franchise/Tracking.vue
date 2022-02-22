<template>
  <div>
    <div v-if="loading">
      <div class="d-flex justify-content-center mb-1">
        <b-spinner
          variant="danger"
          label="Loading..."
        />
      </div>
    </div>
    <div v-else>
      <b-row v-if="!selected.order_id">
        <b-col>
          <b-alert
            class="p-2"
            variant="danger"
            show
          >
            Order Invalid
          </b-alert>
        </b-col>

      </b-row>
      <b-row v-else>
        <b-col>
          <b-card
            title="Order Details"
          >
            <p>
              ID: <b><b-badge variant="dark">
                {{ selected.order_id }}
              </b-badge></b><br>
              STATUS: <b-badge :variant="status[0][selected.status]">
                {{ status[1][selected.status] }}
              </b-badge><br>
              DATE CREATED: <b>{{ selected.order_date }}</b><br>
              PICKUP DATE: <b>{{ selected.pickup_date }}</b><br>
              QUANTITY: <b>{{ selected.qty }}</b>
              <br>
              REMARKS: <b>{{ selected.remarks }}</b>
              <br>
              BARCODE: <span class="text-nowrap">
                <img
                  :src="$s3URL+selected.barcode"
                  alt="Barcode"
                >
              </span>
            </p>
          </b-card>
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
        <b-col>
          <b-card title="Tracking">
            <app-timeline>
              <app-timeline-item
                v-for="(event,index) in tracking"
                :key="index"
                :title="event.title"
                :subtitle="event.subtitle"
                :icon="event.icon"
                :time="event.time"
                :variant="event.variant"
              />
            </app-timeline>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {
  BCard, BCol, BRow, BBadge, BAlert, BSpinner,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'

export default {
  components: {
    BAlert,
    BSpinner,
    BCard,
    BCol,
    BRow,
    BBadge,
    AppTimeline,
    AppTimelineItem,
  },
  data() {
    return {
      loading: true,
      selected: {},
      tracking: [],
      status: [['danger', 'dark', 'info', 'warning', 'success', 'dark','warning','success','danger','danger','danger'],
        ['invalid', 'Active', 'For Transfer', 'Picked by Lorry', 'Transferred', 'Assigned to Driver','Picked by Driver','In Warehouse','invalid','invalid','Cancelled']],
    }
  },
  created() {
    this.fetchOrder()
  },
  methods: {
    fetchOrder() {
      const self = this
      // get setting e.i - George town etc. and postcode
      this.$http.get(`${this.$appURL}order/${this.$route.params.id}`).then(response => {
        self.loading = false
        const details = response.data.data
        self.addEvent('Order Created', `Order added by ${details.order.creator_name}`, details.order.order_date, 'FilePlusIcon', 'warning')
        self.selected = details.order

        details.assignlogs.forEach(log => {
          self.addEvent('Order Assigned', `Assigned from ${log.fromfranchise} to ${log.tofranchise}`, log.add_date, 'RepeatIcon', 'success')
        })
        details.scanlogs.forEach(log => {
          self.addEvent(`Order ${log.description}`, `${log.description} ${log.scannerUserType} ${log.scanner_name} [${log.scanned_franchiser_place ?? 'Lorry'}]`, log.scanned_date, 'CameraIcon', 'info')
        })

        self.tracking.sort((a, b) => new Date(b.time) - new Date(a.time))
      })
    },
    addEvent(event, details, date, icon, variant) {
      const self = this
      self.tracking.push({
        title: event,
        subtitle: details,
        time: date,
        icon,
        variant,
      })
    },
  },
}
</script>

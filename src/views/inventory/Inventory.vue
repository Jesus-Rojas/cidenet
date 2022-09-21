<template>
  <b-card
    no-body
  >
    <add-inventory 
      :datos="dataForms"
      @close="messageForms($event); addModal = false;"
      v-if="addModal"
    />
    <!-- <edit-inventory 
      :datos="dataForms"
      @close="messageForms($event); editModal = false;"
      v-if="editModal"
    /> -->

    <div class="m-2">
      <b-row>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <b-button
            variant="primary"
            @click="addModal = true"
          >
            Add Inventory
          </b-button>
        </b-col>

        <b-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="search"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
          </div>
        </b-col>
      </b-row>

    </div>

    <b-table
      :items="items"
      responsive
      :fields="columns"
      show-empty
      empty-text="No matching records found"
      class="position-relative"
    >

      <template #cell(detail)="row">
        <b-form-checkbox
          v-model="row.detailsShowing"
          @change="row.toggleDetails"
        >
          {{ row.detailsShowing ? 'Hide' : 'Show' }}
        </b-form-checkbox>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="pt-md-1">
            <b-col cols="12" md="3">
              Manufacturer: <span class="ml-2">{{ row.item.manufacturer }}</span>
            </b-col>
            <b-col cols="12" md="3">
              Storage System: <span class="ml-2">{{ row.item.storage_system }}</span>
            </b-col>
            <b-col cols="12" md="3">
              Condition: <span class="ml-2">{{ row.item.condition }}</span>
            </b-col>
          </b-row>

          <b-row class="pt-md-1">
            <b-col cols="12" md="3">
              I Max: <span class="ml-2">{{ row.item.i_max }}</span>
            </b-col>
            <b-col cols="12" md="3">
              I B: <span class="ml-2">{{ row.item.i_b }}</span>
            </b-col>
            <b-col cols="12" md="3">
              I N: <span class="ml-2">{{ row.item.i_n }}</span>
            </b-col>
            <b-col cols="12" md="3">
              Seals: <span class="ml-2">{{ row.item.seals }}</span>
            </b-col>
          </b-row>

          <b-row class="py-md-1">
            <b-col cols="12" md="6">
              Purchase: <span class="ml-2">{{ row.item.purchase }}</span>
            </b-col>
            <b-col cols="12" md="6">
              Created At: <span class="ml-2">{{ row.item.created_at }}</span>
            </b-col>
          </b-row>

          <b-row class="py-md-1">
            <b-col cols="12" md="6">
              Updated At: <span class="ml-2">{{ row.item.updated_at }}</span>
            </b-col>
          </b-row>


          <b-button
            size="sm"
            class="mt-2"
            variant="outline-secondary"
            @click="row.toggleDetails"
          >
            Hide Detail
          </b-button>
        </b-card>
      </template>

      <template #cell(actions)="data">
        <div class="text-nowrap">

          <b-dropdown
            variant="link"
            toggle-class="p-0"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item @click="editModal(data.item.id)">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>
            <b-dropdown-item>
              <feather-icon icon="TrashIcon" @click="deleteModal(data.item.id)"/>
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </template>
    </b-table>

    <div class="mx-2 mb-2">
      <b-row>

        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
        </b-col>
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >

          <b-pagination
            v-model="currentPage"
            :total-rows="totalItems"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>

        </b-col>

      </b-row>
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormCheckbox,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

import AddInventory from './AddInventory.vue'
// import EditInventory from './EditInventory.vue'

export default {
  components: {
    BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
    BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormCheckbox,
    vSelect,
    AddInventory, 
    // EditInventory,
  },
  methods: {
    async getMeters() {
      const res = await fetch(`${process.env.VUE_APP_RUTA}/meters?size=10&page=0`)
      const { items, pages, page, total } = await res.json()
      this.items = items
    },
    messageForms(condicion){
      if (condicion) {
        // Update table
      }
    },
  },
  data() {
    const transformData = (arr) => { 
      return arr.map(value => ({ value }))
    }

    const connectionOptions = transformData([ 'directa', 'semi-directa', 'indirecta' ])
    const conditionOptions = transformData([ 'nuevo', 'usado' ])
    const storageOptions = transformData([ 'interno', 'externo' ])
    const ownerOptions = transformData([ 'RF', 'OR' ])

    return {
      dataForms: {
        connectionOptions,
        conditionOptions,
        storageOptions,
        ownerOptions,
      },
      items: [],
      columns: [
        'detail',
        'id',
        'serial',
        'connection_type',
        'owner',
        'location',
        'actions',
      ],
      addModal: false,
      editModal: false,
      search: '',
      currentPage: 1,
      totalItems: 1,
      perPage: 10,
      dataMeta: {
        from: 1,
        to: 1,
        of: 1
      },
    }
  },
  created(){
    this.getMeters()
  }
}
</script>

<style>

</style>
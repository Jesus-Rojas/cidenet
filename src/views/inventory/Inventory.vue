<template>
  <b-card
    no-body
  >
    <add-inventory 
      :datos="dataForms"
      @close="messageForms({ condicion: $event, type: 'add' });"
      v-if="addModal"
    />
    <edit-inventory 
      :datos="dataForms"
      :inventory="inventory"
      @close="messageForms({ condicion: $event, type: 'edit' });"
      v-if="editModal"
    />

    <Toast ref="toast" />

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
              placeholder="Search Location"
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
            <b-col cols="12" class="d-md-none">
              <span class="w-50 d-inline-block">Id:</span>
              <span class="w-50 d-inline-block">{{ row.item.id }}</span>
            </b-col>
            <b-col cols="12" class="d-md-none">
              <span class="w-50 d-inline-block">Location:</span>
              <span class="w-50 d-inline-block">{{ row.item.location }}</span>
            </b-col>
            <b-col cols="12" class="d-md-none">
              <span class="w-50 d-inline-block">Serial:</span>
              <span class="w-50 d-inline-block">{{ row.item.serial }}</span>
            </b-col>
            <b-col cols="12" class="d-lg-none">
              <span class="w-50 d-inline-block">Connection Type:</span>
              <span class="w-50 d-inline-block">{{ row.item.connection_type }}</span>
            </b-col>
            <b-col cols="12" md="6">
              <span class="w-50 d-inline-block">Manufacturer:</span>
              <span class="w-50 d-inline-block">{{ row.item.manufacturer }}</span>
            </b-col>
            <b-col cols="12" md="6">
              <span class="w-50 d-inline-block">Storage System:</span>
              <span class="w-50 d-inline-block">{{ row.item.storage_system }}</span>
            </b-col>
            <b-col cols="12" md="6">
              <span class="w-50 d-inline-block">Condition:</span>
              <span class="w-50 d-inline-block">{{ row.item.condition }}</span>
            </b-col>

            <b-col cols="12" md="6">
              <span class="w-50 d-inline-block">I Max:</span>
              <span class="w-50 d-inline-block">{{ row.item.i_max }}</span>
            </b-col>
            <b-col cols="12" md="6">
              <span class="w-50 d-inline-block">I B:</span>
              <span class="w-50 d-inline-block">{{ row.item.i_b }}</span>
            </b-col>
            <b-col cols="12" md="6">
              <span class="w-50 d-inline-block">I N:</span>
              <span class="w-50 d-inline-block">{{ row.item.i_n }}</span>
            </b-col>
            <b-col cols="12" md="6">
              <span class="w-50 d-inline-block">Seals:</span>
              <span class="w-50 d-inline-block">{{ row.item.seals }}</span>
            </b-col>
            <b-col cols="12" md="6">
              <span class="w-50 d-inline-block">Purchase:</span>
              <span class="w-50 d-inline-block">{{ row.item.purchase }}</span>
            </b-col>
            <b-col cols="12" md="6">
              <span class="w-50 d-inline-block">Created At:</span>
              <span class="w-50 d-inline-block">{{ row.item.created_at }}</span>
            </b-col>
            <b-col cols="12" md="6">
              <span class="w-50 d-inline-block">Updated At:</span>
              <span class="w-50 d-inline-block">{{ row.item.updated_at }}</span>
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
            <b-dropdown-item @click="inventory = data.item; editModal = true">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>
            <b-dropdown-item @click="deleteModal(data.item.id)">
              <feather-icon icon="TrashIcon"/>
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
            @change="getMeters"
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
// Librerias
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormCheckbox,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Toast from "@core/components/toast";

// Custom
import AddInventory from './AddInventory.vue'
import EditInventory from './EditInventory.vue'

// Services
import api from '@/services/inventory'

export default {
  components: {
    BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
    BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormCheckbox,
    vSelect,
    AddInventory, EditInventory,
    Toast,
  },
  watch: {
    search() {
      this.getMeters()
    }
  },
  methods: {
    async getMeters(page = 1) {
      console.log(page);
      let params = `size=${this.perPage}&page=${page - 1}`
      if (this.search) {
        params += `&location=${this.search}`
      }

      const { items, total } = await api.get(params)
      this.items = items
      this.currentPage = page
      this.totalItems = total
      this.dataMeta = {
        from: ((page - 1) * this.perPage) + 1 ,
        to: page  * this.perPage,
        of: total,
      }
    },
    messageForms({ condicion, type }){
      if (condicion) {
        this.getMeters()
        if (type == 'edit') {
          this.editModal = false;
          return this.$refs.toast.success({ text: 'El registro se actualizo' })
        }
        this.addModal = false;
        return this.$refs.toast.success({ text: 'El registro se creo' })
      }
      this.editModal = false;
      this.addModal = false;
    },
    async deleteModal(id) {
      const { isConfirmed } = await this.$swal({
        title: 'Eliminar',
        text: 'Desea continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger ml-1',
        },
        buttonsStyling: false,
      })

      if (isConfirmed) {
        await api.remove(id)
        this.$refs.toast.success({ text: 'El registro se elimino' })
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
      inventory: {},
      items: [],
      columns: [
        { key: 'detail' },
        { key: 'id', thClass: 'd-none d-sm-table-cell', tdClass: 'd-none d-sm-table-cell' },
        { key: 'serial', thClass: 'd-none d-md-table-cell', tdClass: 'd-none d-md-table-cell' },
        { key: 'connection_type', thClass: 'd-none d-lg-table-cell', tdClass: 'd-none d-lg-table-cell' },
        { key: 'owner' },
        { key: 'location', thClass: 'd-none d-md-table-cell', tdClass: 'd-none d-md-table-cell' },
        { key: 'actions' },
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
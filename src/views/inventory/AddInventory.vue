<template>
  <b-modal
    centered
    size="xl"
    v-model="show"
    @hide="onHide"
    no-close-on-backdrop
    no-close-on-esc
  >
    <validation-observer ref="simpleRules">
      <b-form class="pt-2 pl-2 pr-2" @submit.prevent>
        <b-row>
          <b-col md="3">
            <validation-provider
              #default="{ errors }"
              name="connection type"
              rules="required"
            >
              <b-form-group label="Connection Type" label-for="tipo">
                <v-select
                  v-model="form.connection"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="datos.connectionOptions"
                  label="value"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="3">
            <validation-provider
              #default="{ errors }"
              name="storage system"
              rules="required"
            >
              <b-form-group label="Storage System" label-for="tipo">
                <v-select
                  v-model="form.storage"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="datos.storageOptions"
                  label="value"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="3">
            <validation-provider
              #default="{ errors }"
              name="condition"
              rules="required"
            >
              <b-form-group label="Condition" label-for="tipo">
                <v-select
                  v-model="form.condition"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="datos.conditionOptions"
                  label="value"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="3">
            <validation-provider
              #default="{ errors }"
              name="owner"
              rules="required"
            >
              <b-form-group label="Owner" label-for="tipo">
                <v-select
                  v-model="form.owner"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="datos.ownerOptions"
                  label="value"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col md="3">
            <validation-provider
              #default="{ errors }"
              name="serial"
              rules="required"
            >
              <b-form-group label="Serial" label-for="tipo">
                <b-form-input
                  :state="errors.length ? false : null"
                  trim
                  v-model="form.serial"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="3">
            <validation-provider
              #default="{ errors }"
              name="location"
              rules="required"
            >
              <b-form-group label="Location" label-for="tipo">
                <b-form-input
                  :state="errors.length ? false : null"
                  trim
                  v-model="form.location"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="3">
            <validation-provider
              #default="{ errors }"
              name="manufacturer"
              rules="required"
            >
              <b-form-group label="Manufacturer" label-for="tipo">
                <b-form-input
                  :state="errors.length ? false : null"
                  trim
                  v-model="form.manufacturer"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="3">
            <validation-provider
              #default="{ errors }"
              name="purchase"
              rules="required"
            >
              <b-form-group label="Purchase" label-for="tipo">
                <DateTimePicker
                  v-model.trim="form.purchase"
                  :config="configFlatPick"
                  class="form-control"
                  placeholder="Purchase"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col md="3">
            <validation-provider
              #default="{ errors }"
              name="i max"
              rules="required"
            >
              <b-form-group label="I Max" label-for="tipo">
                <b-form-input
                  type="number"
                  :state="errors.length ? false : null"
                  trim
                  v-model="form.iMax"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="3">
            <validation-provider
              #default="{ errors }"
              name="i b"
              rules="required"
            >
              <b-form-group label="I B" label-for="tipo">
                <b-form-input
                  type="number"
                  :state="errors.length ? false : null"
                  trim
                  v-model="form.iB"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="3">
            <validation-provider
              #default="{ errors }"
              name="i n"
              rules="required"
            >
              <b-form-group label="I N" label-for="tipo">
                <b-form-input
                  type="number"
                  :state="errors.length ? false : null"
                  trim
                  v-model="form.iN"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="3">
            <validation-provider
              #default="{ errors }"
              name="seals"
              rules="required"
            >
              <b-form-group label="Seals" label-for="tipo">
                <b-form-input
                  type="number"
                  :state="errors.length ? false : null"
                  trim
                  v-model="form.seals"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

    <template #modal-footer>
      <div class="w-100">
        <b-button
          variant="primary"
          @click="validationForm"
          type="button"
          class="float-right ml-1"
        >
          <span class="text-nowrap">Agregar</span>
        </b-button>
        <b-button
          variant="secondary"
          @click="onHide"
          type="button"
          class="float-right ml-1"
        >
          <span class="text-nowrap">Cancelar</span>
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>

import {
  BSidebar, BForm, BRow, BInputGroup, BCol, BFormGroup, BFormCheckbox, BFormInput, 
  BFormInvalidFeedback, BButton, BInputGroupAppend, BModal,
} from "bootstrap-vue";
import { required } from "@validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import DateTimePicker from "vue-flatpickr-component";

// Services
import api from '@/services/inventory'

export default {
  components: {
    BSidebar, BForm, BRow, BInputGroup, BCol, BFormGroup, BFormCheckbox, BFormInput, 
    BFormInvalidFeedback, BButton, BInputGroupAppend, BModal,
    ValidationProvider, ValidationObserver, 
    vSelect,
    DateTimePicker,
  },
  props: {
    datos: {
      required: true,
      type: Object,
      default: () => {}
    },
  },
  methods: {
    onHide() {
      this.$emit('close')
    },
    async validationForm() {
      const condicion = await this.$refs.simpleRules.validate()

      if (!condicion) return

      const datos = {
        // Selects
        connection_type: this.form.connection.value,
        storage_system: this.form.storage.value,
        condition: this.form.condition.value,
        owner: this.form.owner.value,
        // Strings
        serial: this.form.serial,
        location: this.form.location,
        manufacturer: this.form.manufacturer,
        // Numbers
        i_max: parseFloat(this.form.iMax),
        i_b: parseFloat(this.form.iB),
        i_n: parseFloat(this.form.iN),
        seals: parseFloat(this.form.seals),
        // Date
        purchase: this.form.purchase,
      }

      await api.add(datos)
      this.$emit('close', true)
    },
  },
  data() {

    return {
      show: true,
      form: {
        connection: null,
        condition: null,
        storage: null,
        owner: null,
        serial: '',
        manufacturer: '',
        location: '',
        purchase: '',
        iMax: null,
        iB: null,
        iN: null,
        seals: null,
      },
      configFlatPick: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i:S',
        enableSeconds: true,
        position: 'auto center',
      },
    }
  }
}
</script>

<style>

</style>
<template>
  <div></div>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    ToastificationContent,
  },
  methods: {
    danger({ text = '', title = 'Advertencia', icon = 'InfoIcon' }) {
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title,
            icon,
            text,
            variant: 'danger',
          },
        },
        {
          position: "bottom-right",
        }
      );
    },
    success({ text = '', title = 'Advertencia', icon = 'InfoIcon' }) {
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title,
            icon,
            text,
            variant: 'success',
          },
        },
        {
          position: "bottom-right",
        }
      );
    },
    warning({ text = '', title = 'Advertencia', icon = 'InfoIcon' }) {
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title,
            icon,
            text,
            variant: 'warning',
          },
        },
        {
          position: "bottom-right",
        }
      );
    },
  },
};
</script>
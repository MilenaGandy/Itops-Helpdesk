<template>
  <v-footer
    app
    class="pa-4"
    color="grey-lighten-4"
  >
    <v-row align="center" justify="center" no-gutters>
      <v-col
        class="text-body-2 text-center text-md-left mb-2 mb-md-0"
        cols="12"
        md="auto"
      >
        &copy; {{ new Date().getFullYear() }} ITOPS Helpdesk. Todos los derechos reservados.
        <span class="mx-2 d-none d-md-inline-block">|</span>
        <span>Versión 1.0</span>
      </v-col>

      <v-spacer class="d-none d-md-block" />

      <v-col
        class="text-center text-md-right"
        cols="12"
        md="auto"
      >
        <v-btn
          v-for="link in links"
          :key="link.title"
          class="mx-2"
          color="white"
          :href="link.href"
          size="small"
          variant="text"
        >
          {{ link.title }}
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
  const links = [
    {
      title: 'Soporte',
      href: '/principal',
    },
    {
      title: 'Documentación',
      href: '#/principal',
    },
  ]
</script>

<style scoped>
  .v-footer {
    background-color: #858383 !important;
  }
  .v-footer .text-body-2 {
    color: #ffffff; /* Color del texto del pie de página */
  }

  .text-body-2 {
    font-size: 0.875rem;
  }
</style>

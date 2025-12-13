<template>
  <v-app-bar color="amber" density="compact">
    <template #prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </template>

    <v-app-bar-title class="font-weight-bold">HELPDESK</v-app-bar-title>

    <template #append>
      Yessica Mendoza
      <v-btn icon="mdi-account-circle" />
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" color="black">
    <v-list nav>
      <v-list-item href="#/principal" prepend-icon="mdi-home" title="Inicio" />
      <v-list-item href="#/tickets" prepend-icon="mdi-ticket-confirmation-outline" title="Tickets" />
      <v-list-item prepend-icon="mdi-account-group-outline" title="Clientes" />
      <v-list-item prepend-icon="mdi-check-decagram-outline" title="Mi Gestión" />
      <v-list-item prepend-icon="mdi-chart-bar" title="Dashboard" />
      <v-list-group value="OpcionesAnidadas">
        <template #activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-cog-outline" title="Configuración" />
        </template>

        <v-list-item prepend-icon="mdi-chevron-right" title="Usuario" />
        <v-list-item prepend-icon="mdi-chevron-right" title="Contraseña" />
      </v-list-group>
      <v-divider />
      <v-list-item prepend-icon="mdi-help-circle" title="Ayuda" />
      <v-list-item href="#" prepend-icon="mdi-logout" title="Cerrar Sesión" />
    </v-list>
  </v-navigation-drawer>
</template>
<script setup>
  import { ref } from 'vue';

  const drawer = ref(true);
</script>

<template>
  <AppHeader />

  <v-main style="min-height: 100vh; background-color: #f5f5f5;">
    <v-container>
      <p class="text-center text-h5 font-weight-bold font-family-roboto  mt-4">
        Bienvenido al sistema de Helpdesk.
      </p>
      <p class="text-center mb-8">
        Selecciona una opción del menú para comenzar.
      </p>
      <v-row>
        <v-col
          v-for="card in menuCards"
          :key="card.title"
          class="justify-center align-center"
          cols="12"
          md="4"
          sm="6"
        >
          <v-card
            class="d-flex flex-column justify-center align-center pa-4"
            color="amber"
            height="120"
            hover
            rounded="lg"
            :to="card.route"
          >
            <v-icon class="mb-2" :icon="card.icon" size="40" />
            <v-card-title class="font-weight-bold pa-0">
              {{ card.title }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <AppFooter />
</template>

<script setup>
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
  import { ref } from 'vue';

  // Datos para generar las tarjetas del menú principal
  const menuCards = ref([
    { title: 'TICKETS', icon: 'mdi-ticket-confirmation-outline', route: '/tickets' },
    { title: 'CLIENTES', icon: 'mdi-account-group-outline' },
    { title: 'MI GESTIÓN', icon: 'mdi-check-decagram-outline' },
    { title: 'DASHBOARD', icon: 'mdi-chart-bar' },
    { title: 'CONFIGURACIÓN', icon: 'mdi-cog-outline' },
    { title: 'AYUDA', icon: 'mdi-help-circle' },
  ]);
</script>

<style scoped>
p {
  font-family: 'Roboto Slab', serif;
}
</style>

<template>
  <AppHeader />
  <v-main>
    <v-container fluid>
      <p class="text-h5 font-weight-bold">Crear Nuevo Ticket</p>
      <v-card class="pt-5 px-4 pb-4 mb-4" rounded="lg">
        <v-form ref="form" @submit.prevent="createTicket">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="ticketData.solicitante"
                dense
                label="Nombre del Solicitante *"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="ticketData.cliente"
                label="Cliente *"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="ticketData.email"
                label="Correo Electrónico *"
                :rules="[rules.required, rules.emailFormat]"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="ticketData.telefono"
                label="Teléfono *"
                :rules="[rules.required, rules.onlyNumbers]"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="ticketData.categoria"
                :items="categories"
                label="Categoría *"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="ticketData.estado"
                :items="statuses"
                label="Estado *"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="ticketData.agente"
                :items="agents"
                label="Agente Asignado *"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="ticketData.prioridad"
                :items="priorities"
                label="Prioridad *"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="ticketData.descripcion"
                label="Descripción del Problema *"
                no-resize
                rows="5"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex justify-end" cols="12">
              <v-btn
                class="mr-4"
                size="large"
                variant="outlined"
                @click="goBack"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="amber"
                size="large"
                type="submit"
              >
                Crear
              </v-btn>
            </v-col>
          </v-row>

        </v-form>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const form = ref(null);

  // Datos del formulario
  const ticketData = reactive({
    solicitante: '',
    cliente: '',
    email: '',
    telefono: '',
    categoria: null,
    estado: 'Abierto', // Valor por defecto
    agente: null,
    prioridad: null,
    descripcion: '',
  });

  // Opciones para los campos de selección
  const categories = ref(['Hardware', 'Software', 'Redes', 'Acceso de Usuario']);
  const statuses = ref(['Abierto', 'En Progreso', 'En Espera', 'Cerrado']);
  const agents = ref(['Agente 1', 'Agente 2', 'Equipo de Soporte General']);
  const priorities = ref(['Baja', 'Media', 'Alta', 'Urgente']);

  // Reglas de validación
  const rules = {
    required: value => !!value || 'Este campo es requerido.',
    onlyNumbers: value => /^[0-9]+$/.test(value) || 'Este campo solo acepta números.',
    emailFormat: value => /.+@.+\..+/.test(value) || 'Debe ser un email válido.',
  };

  // Funciones de los botones
  const createTicket = async () => {
    const { valid } = await form.value.validate();
    if (valid) {
      alert('Ticket Creado con Éxito!');
      console.log('Datos del Ticket:', ticketData);
      router.push('/tickets'); // Redirige a la lista de tickets
    } else {
      console.log('Formulario inválido.');
    }
  };

  const goBack = () => {
    router.back();
  };
</script>

<style scoped>
/* Estilos para asegurar que el título y botones se vean bien */
.v-container {
  background-color: #f5f5f5;
  min-height: 100%;
}
p {
  margin-bottom: 20px;
  font-family: 'Roboto Slab', serif !important;
}
</style>

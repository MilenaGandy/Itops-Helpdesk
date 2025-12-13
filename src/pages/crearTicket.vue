<template>
  <AppHeader />
  <v-main>
    <v-container class="fill-height" fluid>
      <v-card elevation="4" class="pa-6 w-100 rounded-lg">

        <v-card-title class="text-h5 font-weight-bold mb-2">
          <v-icon icon="mdi-lifebuoy" start />
          Crear Nuevo Ticket
        </v-card-title>

        <v-card-subtitle class="mb-4">
          Por favor completa la información detallada para ayudarte más rápido.
        </v-card-subtitle>

        <v-divider class="mb-6"></v-divider>

        <v-form ref="formRef" v-model="isValid" @submit.prevent="submitTicket">

          <v-row dense class="pa-3 rounded mb-4">
            <v-col cols="12" md="6">
              <v-text-field label="Solicitante" model-value="Juan Perez" variant="outlined"
                prepend-inner-icon="mdi-account" density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Empresa" model-value="Meteocolombia" variant="outlined"
                prepend-inner-icon="mdi-domain" density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field v-model="form.subject" label="Asunto del Incidente"
                placeholder="Ej: No puedo acceder al VPN" density="compact" variant="outlined" :rules="[rules.required, rules.max100]"
                counter="100" required></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select v-model="form.category" :items="categories" label="Categoría" density="compact" variant="outlined"
                :rules="[rules.required]" prepend-inner-icon="mdi-shape"></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select v-model="form.priority" :items="priorities" label="Prioridad / Urgencia" item-title="text"
                item-value="value" density="compact" variant="outlined" :rules="[rules.required]">
                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props">
                    <template v-slot:prepend>
                      <v-icon :color="item.raw.color" icon="mdi-circle-small"></v-icon>
                    </template>
                  </v-list-item>
                </template>
                <template v-slot:selection="{ item }">
                  <span :class="`text-${item.raw.color}`" class="font-weight-bold">
                    {{ item.raw.text }}
                  </span>
                </template>
              </v-select>
            </v-col>

            <v-col cols="12" md="12">
              <v-textarea v-model="form.description" label="Descripción Detallada"
                placeholder="Describe paso a paso qué estabas haciendo cuando ocurrió el error..." density="compact" variant="outlined"
                rows="5" auto-grow :rules="[rules.required, rules.min20]" counter></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-file-input v-model="form.files" label="Adjuntar Capturas o Logs (Opcional)" density="compact" variant="outlined"
                prepend-icon="" prepend-inner-icon="mdi-paperclip" chips multiple show-size
                hint="Formatos permitidos: .jpg, .png, .pdf (Max 5MB)" persistent-hint></v-file-input>
            </v-col>
          </v-row>

          <v-card-actions class="mt-4 px-0 justify-end">
            <v-btn variant="text" color="grey" @click="resetForm">
              Limpiar
            </v-btn>
            <v-btn class="mt-4 text-black" elevation="4" color="amber" type="submit" size="large" variant="elevated" :loading="isLoading"
              :disabled="!isValid">
              Crear Ticket
              <v-icon end icon="mdi-send"></v-icon>
            </v-btn>
          </v-card-actions>

        </v-form>
      </v-card>

      <v-snackbar v-model="showSnackbar" color="success" timeout="3000">
        <v-icon start icon="mdi-check-circle"></v-icon>
        Ticket creado exitosamente. ID: #{{ createdTicketId }}
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

// --- Estado ---
const formRef = ref(null);
const isValid = ref(false);
const isLoading = ref(false);
const showSnackbar = ref(false);
const createdTicketId = ref(null);

// Datos del formulario
const form = reactive({
  subject: '',
  category: null,
  priority: null,
  description: '',
  files: []
});

// --- Datos Estáticos (Mockups) ---
const categories = [
  'Hardware', 
  'Software', 
  'Redes / Internet', 
  'Accesos / Cuentas', 
  'Otro'
];

// Prioridades con código de color para UX visual
const priorities = [
  { text: 'Baja (Consulta general)', value: 'low', color: 'green' },
  { text: 'Media (Afecta mi trabajo pero puedo continuar)', value: 'medium', color: 'orange' },
  { text: 'Alta (Sistema caído / No puedo trabajar)', value: 'high', color: 'red' }
];

// --- Reglas de Validación ---
const rules = {
  required: value => !!value || 'Este campo es obligatorio.',
  max100: value => (value && value.length <= 100) || 'Máximo 100 caracteres.',
  min20: value => (value && value.length >= 20) || 'Por favor detalla un poco más (mínimo 20 caracteres).'
};

// --- Métodos ---
const submitTicket = async () => {
  // Validación extra por seguridad
  const { valid } = await formRef.value.validate();
  
  if (valid) {
    isLoading.value = true;

    // SIMULACIÓN DE ENVÍO AL BACKEND (POST)
    // Aquí iría tu fetch/axios: await axios.post('/api/tickets', form)
    setTimeout(() => {
      console.log('Enviando Payload:', JSON.parse(JSON.stringify(form)));
      
      isLoading.value = false;
      createdTicketId.value = Math.floor(Math.random() * 10000); // ID Simulado
      showSnackbar.value = true;
      resetForm();
    }, 1500);
  }
};

const resetForm = () => {
  formRef.value.reset();
  // Restaurar valores por defecto si es necesario
  form.priority = null;
};
</script>

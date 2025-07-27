<template>
  <v-container class="fill-height pa-0" fluid>

    <v-row class="fill-height" no-gutters>
      <ImagenInicial />

      <v-col class="d-flex align-center justify-center" cols="12" md="6" style="background-color: #E0E0E0;">
        <v-card class="pa-sm-8 pa-4 registration-card" elevation="10" max-width="500" width="100%">
          <v-card-title class="text-h4 font-weight-bold text-center mb-2 card-title">
            Registrar Usuario
          </v-card-title>
          <v-card-subtitle class="text-center mb-8">
            Ingresa tus datos
          </v-card-subtitle>

          <v-form ref="form" @submit.prevent="register">
            <v-text-field
              v-model="formData.nombre"
              class="mb-4"
              density="compact"
              label="Nombre *"
              rounded="lg"
              :rules="[rules.required]"
              variant="outlined"
            />

            <v-text-field
              v-model="formData.apellidos"
              class="mb-4"
              density="compact"
              label="Apellidos *"
              rounded="lg"
              :rules="[rules.required]"
              variant="outlined"
            />

            <v-text-field
              v-model="formData.cedula"
              class="mb-4"
              density="compact"
              label="Cédula *"
              rounded="lg"
              :rules="[rules.required, rules.onlyNumbers]"
              variant="outlined"
            />

            <v-text-field
              v-model="formData.fechaNacimiento"
              class="mb-4"
              density="compact"
              label="Fecha de Nacimiento *"
              placeholder="DD/MM/AAAA"
              prepend-inner-icon="mdi-calendar"
              rounded="lg"
              :rules="[rules.required, rules.dateFormat]"
              variant="outlined"
            />

            <v-text-field
              v-model="formData.email"
              class="mb-4"
              density="compact"
              label="Email *"
              rounded="lg"
              :rules="[rules.required, rules.emailFormat]"
              type="email"
              variant="outlined"
            />

            <v-btn
              block
              class="mt-4 text-black"
              color="amber"
              elevation="4"
              rounded="lg"
              size="large"
              type="submit"
            >
              <span class="font-weight-bold">Crear Usuario</span>
            </v-btn>
            <div class="text-center mt-6">
              <a class="link-style mt-2 d-inline-block" href="#/registro" @click.prevent="goBack"><v-icon icon="mdi-arrow-left" start />Volver</a>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
  import { reactive, ref } from 'vue'; // 1. Importa 'ref'
  import ImagenInicial from '@/components/imagenInicial.vue';
  import { useRouter } from 'vue-router';

  // Instancia del router
  const router = useRouter();

  // 2. Crea la referencia para conectar con el <v-form ref="form">
  const form = ref(null);

  // Objeto reactivo para almacenar los datos del formulario
  const formData = reactive({
    nombre: '',
    apellidos: '',
    cedula: '',
    fechaNacimiento: '',
    email: '',
  });

  // Reglas de validación (esto ya lo tenías bien)
  const rules = {
    required: value => !!value || 'Este campo es requerido.',
    onlyNumbers: value => /^[0-9]+$/.test(value) || 'Este campo solo acepta números.',
    emailFormat: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Debe ser un email válido.';
    },
    dateFormat: value => {
      const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
      return pattern.test(value) || 'El formato debe ser DD/MM/AAAA.';
    },
  };

  // 3. Esta es la función 'register' corregida
  const register = async () => {
    // Llama al método validate() del formulario y espera el resultado
    const { valid } = await form.value.validate();

    // Si el resultado es 'valid', entonces procede
    if (valid) {
      console.log('Formulario válido. Datos enviados:', formData);
      alert(`Usuario ${formData.nombre} registrado con éxito!`);
    } else {
      console.log('Formulario inválido. Hay errores que corregir.');
    }
  };

  const goBack = () => {
    // Este método te lleva a la página anterior en el historial de navegación
    router.back();
  };

</script>

<style scoped>
/* Importamos una fuente tipo "Slab" para que se parezca al mockup */
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap');

.helpdesk-title {
  font-size: clamp(3rem, 10vw, 5rem);
  /* Tamaño de fuente adaptable */
  letter-spacing: 0.1em;
  font-weight: 700;
}

.registration-card {
  border-radius: 16px !important;
  border: 1px solid #9E9E9E;
  /* Borde gris como en el mockup */
  background-color: #F5F5F5 !important;
  /* Fondo gris claro para el card */
}

.card-title {
  /* Usamos la fuente importada para el título del formulario */
  font-family: 'Roboto Slab', serif;
}

/* Oculta la columna del banner en pantallas pequeñas */
@media (max-width: 960px) {
  .d-none.d-md-flex {
    display: none !important;
  }
}
</style>

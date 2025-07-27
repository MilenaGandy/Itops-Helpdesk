<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row class="fill-height" no-gutters>

      <ImagenInicial />

      <v-col class="d-flex align-center justify-center" cols="12" md="6" style="background-color: #E0E0E0;">
        <v-card class="pa-sm-8 pa-4 login-card" elevation="10" max-width="450" width="100%">

          <v-card-title class="text-h4 font-weight-bold text-center card-title">
            Iniciar Sesión
          </v-card-title>
          <v-card-subtitle class="text-center">
            Ingresa tu usuario y contraseña
          </v-card-subtitle>

          <v-alert
            v-if="showError"
            class="my-4"
            closable
            text="El usuario o la contraseña son incorrectos."
            title="Error de Autenticación"
            type="error"
            @click:close="showError = false"
          />

          <v-form ref="form" @submit.prevent="login">
            <v-text-field
              v-model="credentials.email"
              class="mt-4"
              density="compact"
              label="Usuario (Email)"
              rounded="lg"
              :rules="[rules.required]"
              variant="outlined"
            />

            <v-text-field
              v-model="credentials.password"
              class="mb-4"
              density="compact"
              label="Contraseña"
              rounded="lg"
              :rules="[rules.required]"
              type="password"
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
              <span class="font-weight-bold">Entrar</span>
            </v-btn>

            <div class="text-center mt-6">
              <a class="link-style" href="#" @click.prevent="forgotPassword">¿Olvidaste tu contraseña?</a>
              <br>
              <a class="link-style mt-2 d-inline-block" href="#" @click.prevent="goToRegister">Regístrate</a>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import ImagenInicial from '@/components/imagenInicial.vue';

  const router = useRouter();
  const form = ref(null);
  const showError = ref(false); // Controla la visibilidad de la alerta

  // 1. USUARIO Y CONTRASEÑA FICTICIOS
  const mockUser = {
    email: 'test@itops.com',
    password: 'password123',
  };

  const credentials = reactive({
    email: '',
    password: '',
  });

  // Reglas de validación (solo necesitamos la de 'requerido')
  const rules = {
    required: value => !!value || 'Este campo es requerido.',
  };

  // 2. LÓGICA DE LOGIN
  const login = async () => {
    showError.value = false; // Oculta la alerta al intentar de nuevo

    // Valida que los campos no estén vacíos
    const { valid } = await form.value.validate();
    if (!valid) return; // Si no es válido, detiene la función

    // Si los campos están llenos, compara con el usuario ficticio
    if (credentials.email === mockUser.email && credentials.password === mockUser.password) {
      // ÉXITO
      alert('¡Inicio de sesión exitoso!');
      router.push('/principal');
    } else {
      // ERROR
      showError.value = true;
    }
  };

  const goToRegister = () => router.push('/registro');
  const forgotPassword = () => alert('Funcionalidad no implementada.');
</script>

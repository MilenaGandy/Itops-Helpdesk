<template>
    <v-container class="fill-height">
      <v-responsive>
        <v-card class="login-card d-flex flex-column align-center mx-auto pa-5" max-width="400" elevation="10">
          <!--<v-img src="@/assets/img/logo.png" width="160" class="pt-10"></v-img>-->
          <v-card-title class="text-h4 font-weight-bold">HELPDESK</v-card-title>
          <v-card-subtitle class="text-h6 font-weight-normal">Iniciar Sesión</v-card-subtitle>
          <v-form class="login-form">
            <v-card-text>
              <v-text-field 
              v-model="email"
              label="Email"
              variant="underlined"/>
              <v-text-field
              v-model="password"
              label="Password"
              type="password"
              variant="underlined" />
            </v-card-text>    
            <v-row>
              <v-col cols="12">
                <v-btn
                  class="login-button"
                  color="success"
                  elevated
                  size="large"
                  block 
                  density="compact"
                  href="/#/principal"
                >Login
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn 
                  color="blue-darken-4"
                  variant= "plain"
                  size="small"
                  block 
                  @click="forgotPassword"
                >¿Olvidó su contraseña?
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn 
                  color="blue-darken-4"
                  variant= "plain"
                  size="small"
                  block 
                  @click="register"
                >Regístrate
                </v-btn>
              </v-col>  
            </v-row>    
          </v-form>
        </v-card>
      </v-responsive>
    </v-container>
  </template>
  <script>
  
  </script>
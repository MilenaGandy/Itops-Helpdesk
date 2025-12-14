<template>
  <AppHeader />
  <v-main>
    <v-container>
      <h1 class="card-title">Mis Tickets</h1>
      <v-card class="pt-5 px-4 pb-0 mb-4" rounded="lg">
        <v-row align="center" class="mb-4">
          <v-col cols="12" md="8">
            <v-text-field
              v-model="search"
              background-color="white"
              density="compact"
              hide-details
              label="Buscar ticket por asunto o ID"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
            />
          </v-col>
          <v-col class="text-md-right" cols="12" md="4">
            <v-btn color="amber" href="#/tickets/crear-ticket" prepend-icon="mdi-plus" size="large">
              Nuevo Ticket
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <v-card rounded="lg">
        <v-data-table
          :headers="headers"
          hover
          item-value="id"
          :items="tickets"
          :items-per-page="25"
          :search="search"
        >
          <template #item.status="{ value }">
            <v-chip class="font-weight-bold" :color="getStatusColor(value)" size="small">
              {{ value }}
            </v-chip>
          </template>

          <template #item.priority="{ value }">
            <v-chip class="font-weight-bold" :color="getPriorityColor(value)" size="small">
              {{ value }}
            </v-chip>
          </template>

          <template #item.actions="{ item }">
            <v-btn
              class="mr-2"
              color="amber"
              icon="mdi-eye-outline"
              size="x-small"
              @click="viewTicket(item)"
            />
            <v-btn color="amber" icon="mdi-pencil-outline" size="x-small" @click="editTicket(item)" />
          </template>

        </v-data-table>
      </v-card>

    </v-container>
  </v-main>
</template>

<script setup>
  import { ref } from 'vue';

  // Variable para el campo de búsqueda
  const search = ref('');

  // Definición de las columnas de la tabla
  const headers = ref([
    { title: 'ID', key: 'id', align: 'start' },
    { title: 'Asunto', key: 'subject', align: 'start' },
    { title: 'Estado', key: 'status', align: 'center' },
    { title: 'Prioridad', key: 'priority', align: 'center' },
    { title: 'Fecha de Creación', key: 'createdDate', align: 'start' },
    { title: 'Agente', key: 'agent', align: 'start' },
    { title: 'Acciones', key: 'actions', sortable: false, align: 'center' },
  ]);

  // Datos de ejemplo para la tabla
  const tickets = ref([
    { id: 'TK-00001', subject: 'Falla de conexión a la red interna', status: 'Abierto', priority: 'Alta', createdDate: '2025-07-26', agent: 'Yessica Mendoza' },
    { id: 'TK-00002', subject: 'Error 503 en el servidor de producción', status: 'En Progreso', priority: 'Urgente', createdDate: '2025-07-26', agent: 'Yessica Mendoza' },
    { id: 'TK-00003', subject: 'Solicitud de acceso a carpeta compartida', status: 'Cerrado', priority: 'Baja', createdDate: '2025-07-25', agent: 'Andres Medina' },
    { id: 'TK-00004', subject: 'Correo electrónico bloqueado por spam', status: 'Abierto', priority: 'Media', createdDate: '2025-07-25', agent: 'Yessica Mendoza' },
    { id: 'TK-00005', subject: 'La impresora no responde', status: 'En Progreso', priority: 'Media', createdDate: '2025-07-24', agent: 'Yessica Mendoza' },
    { id: 'TK-00006', subject: 'Instalación de software de diseño', status: 'Cerrado', priority: 'Baja', createdDate: '2025-07-23', agent: 'Yessica Mendoza' },
    { id: 'TK-00007', subject: 'Actualización de antivirus requerida', status: 'Abierto', priority: 'Alta', createdDate: '2025-07-22', agent: 'Yessica Mendoza' },
    { id: 'TK-00008', subject: 'Problema con la VPN', status: 'En Progreso', priority: 'Urgente', createdDate: '2025-07-21', agent: 'Andres Medina' },
    { id: 'TK-00009', subject: 'Solicitud de nuevo equipo de cómputo', status: 'Cerrado', priority: 'Media', createdDate: '2025-07-20', agent: 'Yessica Mendoza' },
    { id: 'TK-00010', subject: 'Fallo en la sincronización de archivos en la nube', status: 'Abierto', priority: 'Baja', createdDate: '2025-07-19', agent: 'Yessica Mendoza' },
    { id: 'TK-00011', subject: 'Problema con la cámara web', status: 'En Progreso', priority: 'Media', createdDate: '2025-07-18', agent: 'Yessica Mendoza' },
    { id: 'TK-00012', subject: 'Solicitud de capacitación en software nuevo', status: 'Cerrado', priority: 'Alta', createdDate: '2025-07-17', agent: 'Andres Medina' },
    { id: 'TK-00013', subject: 'Error de impresión en la impresora de red', status: 'Abierto', priority: 'Urgente', createdDate: '2025-07-16', agent: 'Yessica Mendoza' },
    { id: 'TK-00014', subject: 'Problema con la conexión a la base de datos', status: 'En Progreso', priority: 'Alta', createdDate: '2025-07-15', agent: 'Yessica Mendoza' },
    { id: 'TK-00015', subject: 'Solicitud de cambio de contraseña', status: 'Cerrado', priority: 'Baja', createdDate: '2025-07-14', agent: 'Yessica Mendoza' },
    { id: 'TK-00016', subject: 'Fallo en la actualización del sistema operativo', status: 'Abierto', priority: 'Media', createdDate: '2025-07-13', agent: 'Yessica Mendoza' },
    { id: 'TK-00017', subject: 'Problema con el software de gestión de proyectos', status: 'En Progreso', priority: 'Alta', createdDate: '2025-07-12', agent: 'Yessica Mendoza' },
    { id: 'TK-00018', subject: 'Solicitud de acceso a la red Wi-Fi', status: 'Cerrado', priority: 'Baja', createdDate: '2025-07-11', agent: 'Yessica Mendoza' },
    { id: 'TK-00019', subject: 'Error en la configuración del correo electrónico', status: 'Abierto', priority: 'Media', createdDate: '2025-07-10', agent: 'Yessica Mendoza' },
    { id: 'TK-00020', subject: 'Problema con el escáner de documentos', status: 'En Progreso', priority: 'Urgente', createdDate: '2025-07-09', agent: 'Yessica Mendoza' },
    { id: 'TK-00021', subject: 'Solicitud de instalación de software de seguridad', status: 'Cerrado', priority: 'Alta', createdDate: '2025-07-08', agent: 'Andres Medina' },
    { id: 'TK-00022', subject: 'Fallo en la conexión a la impresora de red', status: 'Abierto', priority: 'Media', createdDate: '2025-07-07', agent: 'Yessica Mendoza' },
    { id: 'TK-00023', subject: 'Problema con el acceso a la intranet', status: 'En Progreso', priority: 'Baja', createdDate: '2025-07-06', agent: 'Yessica Mendoza' },
    { id: 'TK-00024', subject: 'Solicitud de actualización de hardware', status: 'Cerrado', priority: 'Alta', createdDate: '2025-07-05', agent: 'Yessica Mendoza' },
    { id: 'TK-00025', subject: 'Error en la sincronización de archivos compartidos', status: 'Abierto', priority: 'Urgente', createdDate: '2025-07-04', agent: 'Yessica Mendoza' },
    { id: 'TK-00026', subject: 'Problema con la conexión a la red local', status: 'En Progreso', priority: 'Media', createdDate: '2025-07-03', agent: 'Andres Medina' },
  ]);

  // Funciones para asignar colores a los chips de estado y prioridad
  const getStatusColor = status => {
    switch (status) {
      case 'Abierto': return 'success';
      case 'En Progreso': return 'warning';
      case 'Cerrado': return 'grey';
      default: return 'default';
    }
  };

  const getPriorityColor = priority => {
    switch (priority) {
      case 'Urgente': return 'error';
      case 'Alta': return 'orange';
      case 'Media': return 'info';
      case 'Baja': return 'grey-lighten-1';
      default: return 'default';
    }
  };

  // Funciones para los botones de acción
  const viewTicket = item => alert(`Viendo ticket: ${item.id}`);
  const editTicket = item => alert(`Editando ticket: ${item.id}`);
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

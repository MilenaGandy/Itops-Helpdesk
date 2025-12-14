<template>
    <AppHeader />
    <v-main>
        <v-container>
            <v-row class="mb-4 align-center">
                <v-col cols="12" md="6">
                    <h1 class="card-title">Gestión de Tickets</h1>
                    <p class="text-subtitle-1 text-grey-darken-1">Revisa y gestiona las solicitudes de soporte.</p>
                </v-col>
                <v-col cols="12" md="6" class="text-md-right">
                    <v-btn color="amber" prepend-icon="mdi-plus" size="large" to="/tickets/create"
                        class="font-weight-bold elevation-2">
                        Nuevo Ticket
                    </v-btn>
                </v-col>
            </v-row>

            <v-card elevation="2" class="rounded-lg">

                <v-card-title class="d-flex align-center flex-wrap py-4 px-4 bg-white">

                    <v-text-field v-model="search" prepend-inner-icon="mdi-magnify"
                        label="Buscar por asunto, ID o solicitante..." variant="outlined" density="compact" hide-details
                        class="mr-4" style="min-width: 300px; max-width: 400px;"></v-text-field>

                    <v-spacer class="d-none d-md-block"></v-spacer>

                    <v-select v-model="statusFilter" :items="['Todos', 'Abierto', 'En Progreso', 'Resuelto', 'Cerrado']"
                        label="Filtrar por Estado" variant="outlined" density="compact" hide-details
                        class="mt-2 mt-md-0" style="min-width: 180px;"></v-select>

                    <v-btn icon variant="text" color="grey" class="ml-2" @click="fetchTickets">
                        <v-icon>mdi-refresh</v-icon>
                        <v-tooltip activator="parent" location="top">Actualizar lista</v-tooltip>
                    </v-btn>
                </v-card-title>

                <v-divider></v-divider>

                <v-data-table :headers="headers" :items="filteredTickets" :loading="isLoading" :search="search" hover
                    density="comfortable" no-data-text="No se encontraron tickets">
                    <template v-slot:loading>
                        <v-skeleton-loader type="table-row@6"></v-skeleton-loader>
                    </template>

                    <template v-slot:item.id="{ item }">
                        <a href="#" class="text-decoration-none font-weight-bold text-primary"
                            @click.prevent="goToDetail(item.id)">
                            #{{ item.id }}
                        </a>
                    </template>

                    <template v-slot:item.subject="{ item }">
                        <div class="font-weight-medium text-truncate" style="max-width: 250px;">
                            {{ item.subject }}
                        </div>
                        <div class="text-caption text-grey">{{ item.category }}</div>
                    </template>

                    <template v-slot:item.status="{ item }">
                        <v-chip size="small" :color="getStatusColor(item.status)"
                            class="font-weight-bold text-uppercase" label>
                            {{ item.status }}
                        </v-chip>
                    </template>

                    <template v-slot:item.priority="{ item }">
                        <div class="d-flex align-center">
                            <v-icon :color="getPriorityColor(item.priority)" icon="mdi-circle-small" size="large"
                                class="mr-1"></v-icon>
                            <span :class="`text-${getPriorityColor(item.priority)}`">
                                {{ item.priority }}
                            </span>
                        </div>
                    </template>

                    <template v-slot:item.requester="{ item }">
                        <div class="d-flex align-center py-2">
                            <v-avatar size="32" color="grey-lighten-2" class="mr-3">
                                <span class="text-caption font-weight-bold text-grey-darken-3">
                                    {{ getInitials(item.requester) }}
                                </span>
                            </v-avatar>
                            <div>
                                <div class="text-body-2">{{ item.requester }}</div>
                                <div class="text-caption text-grey">Hace {{ getTimeAgo(item.created_at) }}</div>
                            </div>
                        </div>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <v-btn icon="mdi-eye-outline" variant="text" color="grey-darken-1" size="small"
                            @click="goToDetail(item.id)">
                        </v-btn>
                    </template>

                </v-data-table>
            </v-card>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getTicketsService } from '@/services/ticketService'; // Importamos el servicio

const router = useRouter();

// --- ESTADO ---
const tickets = ref([]);
const isLoading = ref(true);
const search = ref('');
const statusFilter = ref('Todos');

// Encabezados de la tabla (Vuetify)
const headers = [
    { title: 'ID', key: 'id', align: 'start', width: '80px' },
    { title: 'Asunto / Categoría', key: 'subject', align: 'start' },
    { title: 'Solicitante', key: 'requester', align: 'start' },
    { title: 'Estado', key: 'status', align: 'center' },
    { title: 'Prioridad', key: 'priority', align: 'start' },
    { title: '', key: 'actions', align: 'end', sortable: false },
];

// --- LOGICA ---

// Obtener datos del API
const fetchTickets = async () => {
    isLoading.value = true;
    try {
        // 1. Llamada real al servicio
        // const data = await getTicketsService();
        // tickets.value = data;

        // 2. MOCKUP (Simulación para que veas como queda)
        setTimeout(() => {
            tickets.value = [
                { id: 101, subject: 'Falla en impresora piso 2', category: 'Hardware', requester: 'Juan Pérez', status: 'Abierto', priority: 'Media', created_at: new Date(Date.now() - 3600000) },
                { id: 102, subject: 'Error 500 en sistema contable', category: 'Software', requester: 'Maria Gomez', status: 'En Progreso', priority: 'Alta', created_at: new Date(Date.now() - 86400000) },
                { id: 103, subject: 'Solicitud de nuevo mouse', category: 'Periféricos', requester: 'Carlos Ruiz', status: 'Resuelto', priority: 'Baja', created_at: new Date(Date.now() - 172800000) },
                { id: 104, subject: 'Caída de servidor principal', category: 'Infraestructura', requester: 'Gerencia TI', status: 'Abierto', priority: 'Critica', created_at: new Date() },
            ];
            isLoading.value = false;
        }, 1000);

    } catch (error) {
        console.error(error);
        isLoading.value = false;
    }
};

// Filtrado computado (Búsqueda + Filtro Dropdown)
const filteredTickets = computed(() => {
    let data = tickets.value;

    // Filtro por Estado (Dropdown)
    if (statusFilter.value !== 'Todos') {
        data = data.filter(t => t.status.toLowerCase() === statusFilter.value.toLowerCase());
    }

    // Nota: El filtro de 'search' lo maneja automáticamente el v-data-table,
    // pero si quisieras lógica manual iría aquí.
    return data;
});

// Navegación
const goToDetail = (id) => {
    router.push(`/tickets/${id}`);
};

// --- UTILIDADES VISUALES (Helpers) ---

const getStatusColor = (status) => {
    const map = {
        'abierto': 'blue',
        'en progreso': 'orange',
        'resuelto': 'green',
        'cerrado': 'grey'
    };
    return map[status.toLowerCase()] || 'grey';
};

const getPriorityColor = (priority) => {
    const map = {
        'baja': 'green',
        'media': 'blue-grey',
        'alta': 'orange',
        'critica': 'red'
    };
    return map[priority.toLowerCase()] || 'grey';
};

const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const getTimeAgo = (date) => {
    // Lógica simple para "hace X horas"
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 3600) return Math.floor(seconds / 60) + ' min';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' horas';
    return Math.floor(seconds / 86400) + ' días';
};

// Ciclo de vida
onMounted(() => {
    fetchTickets();
});
</script>

<style scoped>
/* Un poco de estilo para que los enlaces se sientan interactivos */
a:hover {
    text-decoration: underline !important;
}
</style>
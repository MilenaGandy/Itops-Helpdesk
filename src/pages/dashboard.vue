<template>
    <AppHeader />
    <v-main>
        <v-container>

            <v-row class="mb-8">
                <v-col cols="12" class="d-flex justify-space-between align-center">
                    <div>
                        <h1 class="card-title">Hola, Yessica 👋</h1>
                        <p class="text-subtitle-1 text-grey-darken-1">Aquí está lo que necesitas saber hoy.</p>
                    </div>
                    <v-btn class="mt-4 text-black" color="amber" prepend-icon="mdi-refresh" @click="loadDashboardData">
                        Actualizar
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-for="(kpi, index) in kpiData" :key="index">
                    <v-card elevation="2" class="rounded-lg">
                        <v-card-text class="d-flex justify-space-between align-center">
                            <div>
                                <div class="text-overline mb-1 font-weight-bold">{{ kpi.title }}</div>
                                <div class="text-h4 font-weight-black">{{ kpi.value }}</div>
                            </div>
                            <v-avatar :color="kpi.color" size="48" rounded="lg" variant="tonal">
                                <v-icon :icon="kpi.icon" size="24"></v-icon>
                            </v-avatar>
                        </v-card-text>
                        <v-divider></v-divider>
                        <div class="px-4 py-2 text-caption text-grey">
                            {{ kpi.footer }}
                        </div>
                    </v-card>
                </v-col>
            </v-row>

            <v-divider class="mb-2"></v-divider>

            <v-row class="mt-8">
                <v-col cols="12" md="4">
                    <v-card elevation="2" class="h-100 rounded-lg">
                        <v-card-title class="font-weight-bold">Distribución de Tickets</v-card-title>
                        <v-card-subtitle>Tus tickets asignados por estado</v-card-subtitle>

                        <v-card-text class="d-flex justify-center align-center pt-4"
                            style="height: 300px; position: relative;">
                            <Doughnut v-if="chartData.datasets" :data="chartData" :options="chartOptions" />

                            <div v-else class="text-center text-grey">
                                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                            </div>
                        </v-card-text>

                        <v-divider></v-divider>
                        <v-card-actions class="justify-center">
                            <v-btn variant="text" size="small" color="primary" to="/tickets">Ver todos mis
                                tickets</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="12" md="8">
                    <v-card elevation="2" class="h-100 rounded-lg">
                        <div class="d-flex justify-space-between align-center pa-4">
                            <div>
                                <h3 class="text-h6 font-weight-bold text-red-darken-2">
                                    <v-icon icon="mdi-alert-circle-outline" start></v-icon>
                                    Atención Inmediata
                                </h3>
                                <p class="text-caption text-grey">Tickets críticos o con SLA por vencer</p>
                            </div>
                            <v-chip color="red" variant="flat" size="small" class="font-weight-bold">
                                {{ urgentTickets.length }} Pendientes
                            </v-chip>
                        </div>

                        <v-table hover>
                            <thead>
                                <tr>
                                    <th class="text-left text-grey-darken-1">ID</th>
                                    <th class="text-left text-grey-darken-1">Asunto</th>
                                    <th class="text-left text-grey-darken-1">Prioridad</th>
                                    <th class="text-left text-grey-darken-1">Tiempo Restante (SLA)</th>
                                    <th class="text-right text-grey-darken-1">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ticket in urgentTickets" :key="ticket.id">
                                    <td class="font-weight-bold text-grey">#{{ ticket.id }}</td>
                                    <td>
                                        <div class="font-weight-medium text-truncate" style="max-width: 200px;">
                                            {{ ticket.subject }}
                                        </div>
                                        <div class="text-caption text-grey">{{ ticket.requester }}</div>
                                    </td>
                                    <td>
                                        <v-chip size="x-small" color="red" variant="tonal"
                                            class="font-weight-bold text-uppercase">
                                            {{ ticket.priority }}
                                        </v-chip>
                                    </td>
                                    <td>
                                        <div class="d-flex align-center text-red font-weight-bold">
                                            <v-icon icon="mdi-clock-alert-outline" size="small" start></v-icon>
                                            {{ ticket.sla_hours }}h restantes
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <v-btn size="small" color="primary" variant="tonal"
                                            prepend-icon="mdi-arrow-right" @click="goToTicket(ticket.id)">
                                            Atender
                                        </v-btn>
                                    </td>
                                </tr>
                                <tr v-if="urgentTickets.length === 0">
                                    <td colspan="5" class="text-center py-4 text-grey">
                                        <v-icon icon="mdi-check-circle-outline" color="success" size="large"
                                            class="mb-2"></v-icon>
                                        <div>¡Todo bajo control! No hay tickets críticos pendientes.</div>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Importaciones para Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const router = useRouter();

// --- ESTADO ---
const kpiData = ref([]);
const urgentTickets = ref([]);
const chartData = ref({});
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'bottom' }
    }
};

// --- SIMULACIÓN DE DATOS (Mocks) ---
const loadDashboardData = () => {
    // 1. Cargar KPIs
    kpiData.value = [
        { title: 'Asignados a mí', value: 12, icon: 'mdi-ticket-account', color: 'blue', footer: 'Total activos' },
        { title: 'Pendientes', value: 5, icon: 'mdi-clock-outline', color: 'orange', footer: 'Esperando respuesta' },
        { title: 'Resueltos Hoy', value: 3, icon: 'mdi-check-circle', color: 'green', footer: '+1 vs ayer' },
        { title: 'Críticos', value: 2, icon: 'mdi-fire', color: 'red', footer: 'Requieren acción ya' },
    ];

    // 2. Cargar Lista de Urgentes (Filtrado por prioridad Alta/Critica)
    urgentTickets.value = [
        { id: 4501, subject: 'Servidor de producción caído', requester: 'Gerencia TI', priority: 'Critica', sla_hours: 1 },
        { id: 4505, subject: 'No puedo facturar', requester: 'Ana Ventas', priority: 'Alta', sla_hours: 3 },
        { id: 4512, subject: 'VPN desconectada', requester: 'Carlos Remoto', priority: 'Alta', sla_hours: 4 },
    ];

    // 3. Cargar Datos para la Gráfica
    chartData.value = {
        labels: ['Abierto', 'En Progreso', 'Esperando Cliente'],
        datasets: [
            {
                backgroundColor: ['#42A5F5', '#FFA726', '#EF5350'], // Colores Vuetify (Blue, Orange, Red)
                data: [7, 4, 1] // Cantidad de tickets por estado
            }
        ]
    };
};

const goToTicket = (id) => {
    console.log(`Navegando al ticket ${id}`);
    router.push(`/tickets/${id}`);
};

// Cargar datos al montar
onMounted(() => {
    loadDashboardData();
});
</script>

<style scoped>
/* Ajuste para que la tabla no se vea apretada */
.v-table th {
    font-size: 0.85rem !important;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
</style>
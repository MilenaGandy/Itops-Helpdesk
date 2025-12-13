<template>
    <AppHeader />
    <v-main>
        <v-container class="fill-height">
            <v-row class="mt-0">
                <v-col cols="12" md="8">
                    <div class="d-flex align-center">
                        <h1 class="text-h4 font-weight-bold mr-4">
                            Ticket #{{ ticket.id }}
                        </h1>
                        <v-chip :color="getStatusColor(ticket.status)" class="font-weight-bold" label>
                            {{ ticket.status.toUpperCase() }}
                        </v-chip>
                    </div>
                    <div v-if="isEditing" class="mt-2">
                        <v-text-field v-model="editedTicket.subject" label="Asunto" density="compact"
                            variant="outlined"></v-text-field>
                    </div>
                    <div v-else class="text-h6 text-grey-darken-1 mt-1">
                        {{ ticket.subject }}
                    </div>
                </v-col>
                <v-col cols="12" md="4" class="text-md-right">
                    <template v-if="isEditing">
                    <v-btn color="error" variant="text" class="mr-2" @click="cancelEdit">
                        Cancelar
                    </v-btn>
                    <v-btn color="success" prepend-icon="mdi-content-save" @click="saveChanges">
                        Guardar Cambios
                    </v-btn>
                    </template>
                    <template v-else>
                    <v-btn color="amber" class="mt-4 text-black" prepend-icon="mdi-pencil" @click="startEdit">
                        Editar Ticket
                    </v-btn>
                    </template>
                </v-col>   
            </v-row>



            <v-divider class="mb-2"></v-divider>

            <v-row class="mt-0">
                <v-col cols="12" md="8">

                    <v-card variant="flat" class="bg-grey-lighten-4 mb-6">
                        <v-card-title class="text-subtitle-1 font-weight-bold">
                            Descripción del Incidente
                        </v-card-title>
                        <v-card-text class="pt-2">
                            <v-textarea v-if="isEditing" v-model="editedTicket.description" variant="outlined"
                                bg-color="white" auto-grow rows="4"></v-textarea>
                            <p v-else style="white-space: pre-line;">{{ ticket.description }}</p>
                        </v-card-text>
                    </v-card>

                    <h3 class="text-h6 mb-4">
                        <v-icon icon="mdi-history" start /> Actividad y Avances
                    </h3>

                    <v-card elevation="2" class="mb-6 pa-4 border-s-lg border-primary">
                        <v-textarea v-model="newComment" label="Agregar un comentario o actualización..."
                            variant="outlined" rows="3" auto-grow hide-details class="mb-3"></v-textarea>
                        <div class="d-flex justify-end align-center">
                            <v-checkbox v-model="isInternalNote" label="Nota interna (Solo técnicos)" density="compact"
                                hide-details class="mr-4"></v-checkbox>
                            <v-btn color="amber" class="mt-4 text-black" prepend-icon="mdi-send"
                                @click="postComment">
                                Publicar
                            </v-btn>
                        </div>
                    </v-card>

                    <v-timeline density="compact" side="end" class="custom-timeline">
                        <v-timeline-item v-for="activity in ticket.history" :key="activity.id"
                            :dot-color="activity.type === 'status_change' ? 'info' : 'grey'" size="x-small"
                            width="100%">
                            <template v-slot:opposite>
                                <span class="text-caption text-grey font-weight-light">
                                    {{ formatDate(activity.date) }}
                                </span>
                            </template>

                            <v-card class="elevation-1 border">
                                <div class="d-flex justify-space-between bg-grey-lighten-5 px-2 py-1">
                                    <span class="text-caption font-weight-bold">{{ activity.author }}</span>
                                </div>
                                <div class="pa-2 text-caption text-high-emphasis">
                                    {{ activity.content }}
                                </div>
                            </v-card>
                        </v-timeline-item>
                    </v-timeline>

                </v-col>


                <v-col cols="12" md="4">

                    <v-card elevation="2" class="pa-4">
                        <h3 class="text-subtitle-1 font-weight-bold mb-4 text-uppercase text-grey-darken-1">
                            Detalles
                        </h3>

                        <v-list density="compact">
                            <v-list-item class="px-0">
                                <template v-slot:title><span
                                        class="text-caption font-weight-bold">Estado</span></template>
                                <v-select v-if="isEditing" v-model="editedTicket.status"
                                    :items="['abierto', 'en_progreso', 'resuelto', 'cerrado']" density="compact"
                                    variant="outlined" hide-details></v-select>
                                <div v-else class="mt-1">{{ formatString(ticket.status) }}</div>
                            </v-list-item>

                            <v-list-item class="px-0 mt-2">
                                <template v-slot:title><span
                                        class="text-caption font-weight-bold">Prioridad</span></template>
                                <v-select v-if="isEditing" v-model="editedTicket.priority"
                                    :items="['baja', 'media', 'alta', 'critica']" density="compact" variant="outlined"
                                    hide-details></v-select>
                                <div v-else class="mt-1 d-flex align-center">
                                    <v-icon :color="getPriorityColor(ticket.priority)" icon="mdi-circle-small"
                                        start></v-icon>
                                    {{ formatString(ticket.priority) }}
                                </div>
                            </v-list-item>

                            <v-list-item class="px-0 mt-2">
                                <template v-slot:title><span
                                        class="text-caption font-weight-bold">Categoría</span></template>
                                <v-select v-if="isEditing" v-model="editedTicket.category"
                                    :items="['Hardware', 'Software', 'Redes']" density="compact" variant="outlined"
                                    hide-details></v-select>
                                <div v-else class="mt-1">{{ ticket.category }}</div>
                            </v-list-item>

                            <v-divider class="my-3"></v-divider>

                            <v-list-item class="px-0">
                                <template v-slot:title><span
                                        class="text-caption font-weight-bold">Solicitante</span></template>
                                <div class="d-flex align-center mt-1">
                                    <v-avatar size="24" color="primary" class="mr-2 text-caption">JP</v-avatar>
                                    {{ ticket.requester }}
                                </div>
                            </v-list-item>

                            <v-list-item class="px-0 mt-2">
                                <template v-slot:title><span class="text-caption font-weight-bold">Creado
                                        el</span></template>
                                <div class="mt-1">{{ formatDate(ticket.created_at) }}</div>
                            </v-list-item>
                        </v-list>
                    </v-card>
                    <v-card elevation="2" class="pa-4 mt-6">

                        <div class="mb-5">
                            <h3 class="text-subtitle-2 font-weight-bold text-uppercase text-grey-darken-1 mb-2">
                                Agente Asignado
                            </h3>

                            <div v-if="isEditing">
                                <v-autocomplete v-model="editedTicket.assigned_agent_id" :items="agentsList"
                                    item-title="name" item-value="id" label="Buscar Agente..." variant="outlined"
                                    density="compact" prepend-inner-icon="mdi-account-search" hide-details clearable>
                                    <template v-slot:item="{ props, item }">
                                        <v-list-item v-bind="props" :prepend-avatar="item.raw.avatar"
                                            :title="item.raw.name">
                                            <template v-slot:subtitle>
                                                <span class="text-caption">{{ item.raw.role }}</span>
                                            </template>
                                        </v-list-item>
                                    </template>
                                </v-autocomplete>
                            </div>

                            <div v-else>
                                <div v-if="ticket.assigned_agent_id"
                                    class="d-flex align-center bg-blue-lighten-5 pa-2 rounded border border-blue-lighten-4">
                                    <v-avatar size="32" :image="getAgentInfo(ticket.assigned_agent_id).avatar"
                                        class="mr-3"></v-avatar>
                                    <div>
                                        <div class="font-weight-bold text-body-2 text-primary">
                                            {{ getAgentInfo(ticket.assigned_agent_id).name }}
                                        </div>
                                        <div class="text-caption text-grey-darken-1">
                                            {{ getAgentInfo(ticket.assigned_agent_id).role }}
                                        </div>
                                    </div>
                                </div>

                                <div v-else class="text-center py-2 border rounded border-dashed bg-grey-lighten-4">
                                    <v-icon icon="mdi-account-off" color="grey" class="mb-1"></v-icon>
                                    <div class="text-caption text-grey mb-2">Sin agente asignado</div>
                                    <v-btn size="small" color="primary" variant="flat" @click="selfAssign">
                                        Asignarme a mí
                                    </v-btn>
                                </div>
                            </div>
                        </div>

                        <v-divider class="mb-4"></v-divider>

                        <h3 class="text-subtitle-2 font-weight-bold text-uppercase text-grey-darken-1 mb-3">
                            Clasificación
                        </h3>

                        <v-list density="compact" class="pa-0">

                            <v-list-item class="px-0 mb-2">
                                <template v-slot:title>
                                    <span class="text-caption font-weight-bold text-grey-darken-2">Departamento
                                        (Área)</span>
                                </template>

                                <v-select v-if="isEditing" v-model="editedTicket.department_id" :items="departmentsList"
                                    item-title="name" item-value="id" density="compact" variant="outlined" hide-details
                                    bg-color="white" @update:model-value="onDepartmentChange"></v-select>

                                <div v-else class="mt-1 d-flex align-center">
                                    <v-icon icon="mdi-domain" size="small" class="mr-2 text-grey"></v-icon>
                                    <span class="font-weight-medium">
                                        {{ getDepartmentName(ticket.department_id) }}
                                    </span>
                                </div>
                            </v-list-item>

                            <v-list-item class="px-0 mb-2">
                                <template v-slot:title>
                                    <span class="text-caption font-weight-bold text-grey-darken-2">Estado Actual</span>
                                </template>
                                <v-select v-if="isEditing" v-model="editedTicket.status"
                                    :items="['abierto', 'en_progreso', 'resuelto', 'cerrado']" density="compact"
                                    variant="outlined" hide-details></v-select>
                                <div v-else class="mt-1">
                                    <v-chip size="small" :color="getStatusColor(ticket.status)" label
                                        class="font-weight-bold">
                                        {{ ticket.status.toUpperCase() }}
                                    </v-chip>
                                </div>
                            </v-list-item>

                            <v-list-item class="px-0">
                                <template v-slot:title>
                                    <span class="text-caption font-weight-bold text-grey-darken-2">Prioridad</span>
                                </template>
                                <v-select v-if="isEditing" v-model="editedTicket.priority"
                                    :items="['baja', 'media', 'alta', 'critica']" density="compact" variant="outlined"
                                    hide-details></v-select>
                                <div v-else class="mt-1 d-flex align-center">
                                    <v-icon :color="getPriorityColor(ticket.priority)" icon="mdi-circle-small"
                                        start></v-icon>
                                    {{ ticket.priority }}
                                </div>
                            </v-list-item>

                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, reactive } from 'vue';

// --- ESTADO ---
const isEditing = ref(false);
const newComment = ref('');
const isInternalNote = ref(false);
const currentUser = { id: 10, name: 'Milena Gandy', role: 'Admin', avatar: 'https://i.pravatar.cc/150?u=milena' };

// Lista de Agentes (Mock)
const agentsList = [
    { id: 10, name: 'Milena Gandy', role: 'Soporte Nivel 2', avatar: 'https://i.pravatar.cc/150?u=milena' },
    { id: 22, name: 'Carlos Pérez', role: 'Redes', avatar: 'https://i.pravatar.cc/150?u=carlos' },
    { id: 35, name: 'Ana Gómez', role: 'DevOps', avatar: 'https://i.pravatar.cc/150?u=ana' },
];

// Lista de Departamentos (Mock)
const departmentsList = [
    { id: 1, name: 'Mesa de Ayuda (L1)' },
    { id: 2, name: 'Infraestructura y Redes' },
    { id: 3, name: 'Desarrollo / Ingeniería' },
    { id: 4, name: 'Recursos Humanos' }
];


// Datos Mock del Ticket (Esto vendría de tu API: await fetch(`/api/tickets/${id}`))
const ticket = reactive({
    id: 4590,
    subject: "Error al conectar a la VPN",
    description: "Desde ayer intento conectarme al servidor VPN y me aparece un error 'Timeout'. Ya reinicié el router y mi laptop pero persiste.",
    status: "abierto",
    priority: "alta",
    category: "Redes",
    requester: "Juan Perez",
    created_at: "2023-10-25T09:30:00",
    assigned_agent_id: 22, // ID de Carlos Pérez
    department_id: 2,      // Infraestructura
    history: [
        {
            id: 1,
            type: "status_change",
            author: "Sistema",
            content: "Ticket creado con estado 'Abierto'",
            date: "2023-10-25T09:30:00",
            internal: false
        },
        {
            id: 2,
            type: "comment",
            author: "Soporte TI (Yessica M.)",
            content: "Realicé un reinicio del servicio VPN en el servidor. Se le indica al cliente que debe intentar nuevamente.",
            date: "2023-10-25T10:15:00",
            internal: false
        },
        {
            id: 1,
            type: "status_change",
            author: "Sistema",
            content: "Ticket creado con estado 'Abierto'",
            date: "2023-10-25T09:30:00",
            internal: false
        },
        {
            id: 2,
            type: "comment",
            author: "Soporte TI (Yessica M.)",
            content: "Realicé un reinicio del servicio VPN en el servidor. Por favor intenta nuevamente.",
            date: "2023-10-25T10:15:00",
            internal: false
        }
    ]
});

// Copia para edición (para poder cancelar cambios)
const editedTicket = reactive({});

// --- MÉTODOS ---

// Iniciar modo edición: clonamos los datos actuales
const startEdit = () => {
    Object.assign(editedTicket, JSON.parse(JSON.stringify(ticket)));
    isEditing.value = true;
};

// Cancelar edición
const cancelEdit = () => {
    isEditing.value = false;
};

// Guardar cambios del ticket (PUT request)
const saveChanges = async () => {
    // Aquí llamada API: await fetch('/api/tickets/4590', { method: 'PUT', body: editedTicket })

    // Detectar cambios clave para el historial
    if (editedTicket.department_id !== ticket.department_id) {
        const oldDept = getDepartmentName(ticket.department_id);
        const newDept = getDepartmentName(editedTicket.department_id);
        addHistoryLog(`Ticket transferido de ${oldDept} a ${newDept}`);
    }

    if (editedTicket.assigned_agent_id !== ticket.assigned_agent_id) {
        const newAgent = getAgentInfo(editedTicket.assigned_agent_id);
        const name = newAgent ? newAgent.name : 'Sin Asignar';
        addHistoryLog(`Ticket reasignado a: ${name}`);
    }

    // Actualizamos la vista local
    Object.assign(ticket, editedTicket);

    // Agregamos un log al historial automáticamente si no se generó uno por transferencia/reasignación
    if (ticket.history[0]?.content !== `Ticket reasignado a: ${getAgentInfo(editedTicket.assigned_agent_id)?.name || 'Sin Asignar'}` && ticket.history[0]?.content !== `Ticket transferido de ${getDepartmentName(ticket.department_id)} a ${getDepartmentName(editedTicket.department_id)}`) {
        addHistoryLog("Información del ticket actualizada", "Milena Gandy", false);
    }


    isEditing.value = false;
};

// Publicar Comentario
const postComment = async () => {
    if (!newComment.value.trim()) return;

    // Aquí llamada API para guardar comentario

    const newEntry = {
        id: Date.now(),
        type: "comment",
        author: "Milena Gandy", // Usuario Logueado
        content: newComment.value,
        date: new Date().toISOString(),
        internal: isInternalNote.value
    };

    // Push al inicio del array para que salga arriba (o abajo según preferencia)
    ticket.history.push(newEntry);

    newComment.value = '';
    isInternalNote.value = false;
};

// Acción rápida: Asignarme a mí mismo
const selfAssign = () => {
    ticket.assigned_agent_id = currentUser.id;
    addHistoryLog(`Ticket tomado por ${currentUser.name}`);
};

// Lógica de Transferencia
const onDepartmentChange = (newDeptId) => {
    // UX: Si cambiamos de departamento, a menudo el agente actual ya no es válido.
    // Limpiamos el agente para forzar una nueva asignación en esa área.
    editedTicket.assigned_agent_id = null;

    // Opcional: Mostrar una alerta visual o un mensaje toast indicando esto.
    console.log('Departamento cambiado. Agente desasignado.');
};


// --- HELPERS / UTILS ---

const getAgentInfo = (id) => {
    return agentsList.find(a => a.id === id) || { name: 'Desconocido', avatar: '', role: '' };
};

const getDepartmentName = (id) => {
    const dept = departmentsList.find(d => d.id === id);
    return dept ? dept.name : 'General';
};

const addHistoryLog = (message, author = "Sistema", internal = true) => {
    ticket.history.unshift({
        id: Date.now(),
        type: "status_change",
        author: author,
        content: message,
        date: new Date().toISOString(),
        internal: internal
    });
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES', {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    });
};

const formatString = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).replace('_', ' ');
};

const getStatusColor = (status) => {
    const colors = {
        abierto: 'blue',
        en_progreso: 'orange',
        resuelto: 'green',
        cerrado: 'grey'
    };
    return colors[status] || 'grey';
};

const getPriorityColor = (priority) => {
    const colors = { baja: 'green', media: 'orange', alta: 'red', critica: 'purple' };
    return colors[priority] || 'grey';
};

</script>

<style scoped>
/* Pequeño ajuste para que el timeline se vea limpio */
.v-timeline--vertical.v-timeline--side-end .v-timeline-item__body {
    padding-left: 16px;
}

/* TRUCO CSS: Sobrescribir estilos de Vuetify */
.custom-timeline :deep(.v-timeline-item__body) {
    padding-bottom: 0px !important;
    /* Ajusta este número a tu gusto */
}
</style>

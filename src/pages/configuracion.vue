<template>
    <AppHeader />
    <v-main>
        <v-container>

            <v-row class="mb-4 align-center">
                <v-col cols="12" md="8">
                    <h1 class="card-title">Usuarios y Accesos</h1>
                    <p class="text-subtitle-1 text-grey-darken-1">Gestiona los miembros del equipo, roles y permisos.
                    </p>
                </v-col>
                <v-col cols="12" md="4" class="text-md-right">
                    <v-btn color="amber" prepend-icon="mdi-account-plus" size="large" class="elevation-2"
                        @click="openDialog()">
                        Nuevo Usuario
                    </v-btn>
                </v-col>
                <v-col cols="12">
                    <v-card elevation="2" class="rounded-lg">

                        <v-card-title class="d-flex align-center py-4 px-4">
                            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="Buscar usuario..."
                                variant="outlined" density="compact" hide-details
                                style="max-width: 350px;"></v-text-field>

                            <v-spacer></v-spacer>

                            <v-chip-group v-model="roleFilter" selected-class="text-primary" filter mandatory>
                                <v-chip value="all" variant="outlined">Todos</v-chip>
                                <v-chip value="admin" filter-icon="mdi-shield-account">Admins</v-chip>
                                <v-chip value="agent" filter-icon="mdi-face-agent">Agentes</v-chip>
                            </v-chip-group>
                        </v-card-title>

                        <v-divider></v-divider>

                        <v-data-table :headers="headers" :items="filteredUsers" :search="search" :loading="isLoading"
                            hover>
                            <template v-slot:item.name="{ item }">
                                <div class="d-flex align-center py-2">
                                    <v-avatar size="40" :color="item.avatar ? '' : 'primary'" variant="tonal"
                                        class="mr-3">
                                        <v-img v-if="item.avatar" :src="item.avatar" alt="Avatar"></v-img>
                                        <span v-else class="font-weight-bold">{{ getInitials(item.name) }}</span>
                                    </v-avatar>
                                    <div>
                                        <div class="font-weight-bold text-body-1">{{ item.name }}</div>
                                        <div class="text-caption text-grey">{{ item.email }}</div>
                                    </div>
                                </div>
                            </template>

                            <template v-slot:item.role="{ item }">
                                <v-chip :color="getRoleColor(item.role)" size="small"
                                    class="font-weight-bold text-uppercase" variant="flat">
                                    <v-icon start size="small" :icon="getRoleIcon(item.role)"></v-icon>
                                    {{ item.role }}
                                </v-chip>
                            </template>

                            <template v-slot:item.department="{ item }">
                                <span class="text-body-2 text-grey-darken-2">
                                    {{ item.department || '—' }}
                                </span>
                            </template>

                            <template v-slot:item.status="{ item }">
                                <v-switch v-model="item.isActive" color="success" hide-details density="compact" inset
                                    :label="item.isActive ? 'Activo' : 'Inactivo'"
                                    @update:model-value="toggleUserStatus(item)"></v-switch>
                            </template>

                            <template v-slot:item.actions="{ item }">
                                <div class="d-flex justify-end">
                                    <v-tooltip text="Restablecer Contraseña" location="top">
                                        <template v-slot:activator="{ props }">
                                            <v-btn icon v-bind="props" variant="text" color="grey-darken-1" size="small"
                                                @click="resetPassword(item)">
                                                <v-icon>mdi-lock-reset</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-tooltip>

                                    <v-tooltip text="Editar Usuario" location="top">
                                        <template v-slot:activator="{ props }">
                                            <v-btn icon v-bind="props" variant="text" color="primary" size="small"
                                                class="ml-1" @click="openDialog(item)">
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-tooltip>
                                </div>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>

            <v-dialog v-model="dialog" max-width="600px" persistent>
                <v-card class="rounded-lg">
                    <v-card-title class="text-h5 font-weight-bold pa-4 bg-black text-white">
                        <v-icon :icon="editedIndex === -1 ? 'mdi-account-plus' : 'mdi-account-edit'" start></v-icon>
                        {{ formTitle }}
                    </v-card-title>

                    <v-card-text class="pt-6">
                        <v-form ref="formRef" v-model="valid">
                            <v-row dense>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="editedItem.name" label="Nombre Completo" variant="outlined"
                                        :rules="[rules.required]" prepend-inner-icon="mdi-account"></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="editedItem.email" label="Correo Electrónico"
                                        variant="outlined" :rules="[rules.required, rules.email]"
                                        prepend-inner-icon="mdi-email"></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-select v-model="editedItem.role" :items="['Admin', 'Agent', 'User']"
                                        label="Rol / Permisos" variant="outlined" :rules="[rules.required]"
                                        prepend-inner-icon="mdi-shield-account"></v-select>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-select v-model="editedItem.department"
                                        :items="['TI', 'RRHH', 'Ventas', 'Contabilidad']" label="Departamento"
                                        variant="outlined" prepend-inner-icon="mdi-domain"></v-select>
                                </v-col>

                                <v-col cols="12" v-if="editedIndex === -1">
                                    <v-alert type="info" variant="tonal" density="compact" class="text-caption">
                                        Se enviará un correo al usuario con una contraseña temporal.
                                    </v-alert>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="grey-darken-1" variant="text" @click="closeDialog">Cancelar</v-btn>
                        <v-btn color="amber" variant="elevated" @click="save" :disabled="!valid"><v-icon>mdi-content-save</v-icon>Guardar
                            Usuario</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
                {{ snackbar.text }}
            </v-snackbar>

        </v-container>
    </v-main>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

// --- ESTADO ---
const search = ref('');
const isLoading = ref(false);
const dialog = ref(false);
const valid = ref(false);
const roleFilter = ref('all');
const users = ref([]);
const formRef = ref(null);

const snackbar = reactive({ show: false, text: '', color: 'success' });

// Configuración de Tabla
const headers = [
    { title: 'Usuario', key: 'name', align: 'start' },
    { title: 'Rol', key: 'role', align: 'start' },
    { title: 'Departamento', key: 'department', align: 'start' },
    { title: 'Estado', key: 'status', align: 'center', width: '150px' },
    { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
];

// Estado del Formulario
const editedIndex = ref(-1);
const defaultItem = {
    name: '',
    email: '',
    role: 'User',
    department: '',
    isActive: true,
    avatar: null
};
const editedItem = reactive({ ...defaultItem });

// Reglas de Validación
const rules = {
    required: v => !!v || 'Campo requerido',
    email: v => /.+@.+\..+/.test(v) || 'E-mail inválido',
};

// --- COMPUTED ---
const formTitle = computed(() => editedIndex.value === -1 ? 'Nuevo Usuario' : 'Editar Usuario');

const filteredUsers = computed(() => {
    if (roleFilter.value === 'all') return users.value;
    // Mapeo simple para el filtro (ajusta según tus valores reales del backend)
    const map = { 'admin': 'Admin', 'agent': 'Agent' };
    return users.value.filter(u => u.role === map[roleFilter.value]);
});

// --- MÉTODOS ---

const fetchUsers = async () => {
    isLoading.value = true;
    // Simulación Fetch
    setTimeout(() => {
        users.value = [
            { id: 1, name: 'Milena Gandy', email: 'milena@empresa.com', role: 'Admin', department: 'TI', isActive: true, avatar: 'https://i.pravatar.cc/150?u=milena' },
            { id: 2, name: 'Juan Perez', email: 'juan@empresa.com', role: 'Agent', department: 'Soporte', isActive: true, avatar: null },
            { id: 3, name: 'Ana Gomez', email: 'ana@empresa.com', role: 'User', department: 'Ventas', isActive: false, avatar: 'https://i.pravatar.cc/150?u=ana' },
        ];
        isLoading.value = false;
    }, 800);
};

// Acciones CRUD
const openDialog = (item) => {
    if (item) {
        editedIndex.value = users.value.indexOf(item);
        Object.assign(editedItem, item);
    } else {
        editedIndex.value = -1;
        Object.assign(editedItem, defaultItem);
    }
    dialog.value = true;
};

const closeDialog = () => {
    dialog.value = false;
    // Pequeño delay para resetear el form visualmente después de cerrar
    setTimeout(() => {
        editedIndex.value = -1;
        Object.assign(editedItem, defaultItem);
        formRef.value?.resetValidation();
    }, 300);
};

const save = async () => {
    const { valid } = await formRef.value.validate();
    if (!valid) return;

    // LÓGICA DE GUARDADO (POST/PUT)
    if (editedIndex.value > -1) {
        // Editar existente
        Object.assign(users.value[editedIndex.value], editedItem);
        showSnackbar('Usuario actualizado correctamente');
    } else {
        // Crear nuevo
        users.value.push({ ...editedItem, id: Date.now() });
        showSnackbar('Usuario creado y credenciales enviadas');
    }
    closeDialog();
};

const toggleUserStatus = (item) => {
    // Aquí llamada al API (PATCH /users/{id}/status)
    const status = item.isActive ? 'activado' : 'desactivado';
    showSnackbar(`Usuario ${item.name} ha sido ${status}`, 'info');
};

const resetPassword = (item) => {
    // Llamada al API
    showSnackbar(`Link de recuperación enviado a ${item.email}`, 'warning');
};

const showSnackbar = (text, color = 'success') => {
    snackbar.text = text;
    snackbar.color = color;
    snackbar.show = true;
};

// Helpers Visuales
const getRoleColor = (role) => {
    if (role === 'Admin') return 'purple-darken-2';
    if (role === 'Agent') return 'blue-darken-2';
    return 'grey-darken-1';
};

const getRoleIcon = (role) => {
    if (role === 'Admin') return 'mdi-shield-crown';
    if (role === 'Agent') return 'mdi-face-agent';
    return 'mdi-account';
};

const getInitials = (name) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

onMounted(() => {
    fetchUsers();
});
</script>
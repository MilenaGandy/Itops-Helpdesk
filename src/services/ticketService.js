// services/ticketService.js

const API_URL = 'https://tu-api-backend.com/api/tickets'; // Reemplaza con tu URL real

/**
 * Envía un nuevo ticket al backend.
 * @param {Object} ticketData - Objeto con los datos del formulario Vue
 * @returns {Promise<Object>} - La respuesta del servidor
 */
export const createTicketService = async (ticketData) => {
  try {
    // 1. Crear instancia de FormData para manejar archivos + texto
    const formData = new FormData();

    // 2. Agregar campos de texto
    formData.append('subject', ticketData.subject);
    formData.append('category', ticketData.category);
    formData.append('priority', ticketData.priority);
    formData.append('description', ticketData.description);
    
    // Agregamos datos fijos del usuario (simulados o traídos de tu store de Pinia/Vuex)
    formData.append('requester_id', '102'); 

    // 3. Agregar Archivos
    // v-file-input devuelve un array, iteramos para añadirlos
    if (ticketData.files && ticketData.files.length > 0) {
      ticketData.files.forEach((file) => {
        // 'attachments' debe coincidir con el nombre que espera tu backend (ej: req.files['attachments'])
        formData.append('attachments', file);
      });
    }

    // 4. Configurar la petición Fetch
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        // NOTA IMPORTANTE: Al usar FormData, NO debes poner el header 'Content-Type'.
        // El navegador lo detecta y añade el 'boundary' automáticamente.
        
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}` // Si usas token
      },
      body: formData
    });

    // 5. Manejo manual de errores HTTP (Fetch no rechaza 404 o 500 por defecto)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error del servidor: ${response.status}`);
    }

    // 6. Retornar respuesta exitosa
    return await response.json();

  } catch (error) {
    console.error('Error en createTicketService:', error);
    throw error; // Re-lanzar para manejarlo en el componente
  }
};

export const getTicketsService = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudieron cargar los tickets`);
    }

    return await response.json(); 
  } catch (error) {
    console.error('Error en getTicketsService:', error);
    throw error;
  }
};
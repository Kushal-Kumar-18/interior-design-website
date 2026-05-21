import axios from "axios";

// ============================================================
// BASE URL
// ============================================================
const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "http://127.0.0.1:5000/api";

// ============================================================
// AXIOS INSTANCE
// ============================================================
const api = axios.create({
  baseURL: BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,

  timeout: 15000,
});

// ============================================================
// REQUEST INTERCEPTOR
// ============================================================
api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================
api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem(
        "token"
      );
    }

    return Promise.reject(error);
  }
);

// ============================================================
// HELPERS
// ============================================================

// ------------------------------------------------------------
// GET
// ------------------------------------------------------------
export const apiGet = async (
  endpoint,
  params = {}
) => {

  const response =
    await api.get(
      endpoint,
      { params }
    );

  return response.data;
};

// ------------------------------------------------------------
// POST
// ------------------------------------------------------------
export const apiPost = async (
  endpoint,
  data = {}
) => {

  const response =
    await api.post(
      endpoint,
      data
    );

  return response.data;
};

// ------------------------------------------------------------
// PUT
// ------------------------------------------------------------
export const apiPut = async (
  endpoint,
  data = {}
) => {

  const response =
    await api.put(
      endpoint,
      data
    );

  return response.data;
};

// ------------------------------------------------------------
// DELETE
// ------------------------------------------------------------
export const apiDelete = async (
  endpoint
) => {

  const response =
    await api.delete(
      endpoint
    );

  return response.data;
};

// ============================================================
// AUTH APIs
// ============================================================
export const authAPI = {

  signup: async (
    data
  ) => {

    return await apiPost(
      "/auth/register",
      data
    );
  },

  login: async (
    data
  ) => {

    return await apiPost(
      "/auth/login",
      data
    );
  },

  getProfile: async () => {

    return await apiGet(
      "/auth/profile"
    );
  },
};

// ============================================================
// PROJECT APIs
// ============================================================
export const projectAPI = {

  getProjects: async (
    params = {}
  ) => {

    return await apiGet(
      "/projects",
      params
    );
  },

  getProjectById: async (
    id
  ) => {

    return await apiGet(
      `/projects/${id}`
    );
  },
};

// ============================================================
// SERVICE APIs
// ============================================================
export const serviceAPI = {

  getServices: async () => {

    return await apiGet(
      "/services"
    );
  },
};

// ============================================================
// TESTIMONIAL APIs
// ============================================================
export const testimonialAPI = {

  getTestimonials: async (
    params = {}
  ) => {

    return await apiGet(
      "/testimonials",
      params
    );
  },
};

// ============================================================
// CONTACT APIs
// ============================================================
export const contactAPI = {

  sendMessage: async (
    data
  ) => {

    return await apiPost(
      "/contact",
      data
    );
  },
};

// ============================================================
// BOOKING APIs
// ============================================================
export const bookingAPI = {

  createBooking: async (
    data
  ) => {

    return await apiPost(
      "/bookings",
      data
    );
  },
};

// ============================================================
// EXPORT
// ============================================================
export default api;
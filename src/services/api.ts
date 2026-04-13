const API_BASE_URL = 'http://localhost:5000/api';

// 通用请求函数
async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json();
}

// 产品相关API
export const productApi = {
  // 获取产品列表
  getProducts: async (params?: { category?: string; sort?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    return fetchApi(endpoint);
  },

  // 获取产品详情
  getProductById: async (id: string) => {
    return fetchApi(`/products/${id}`);
  },

  // 获取精选产品
  getFeaturedProducts: async () => {
    return fetchApi('/products/featured/all');
  },
};

// 客户相关API
export const customerApi = {
  // 提交客户表单
  submitForm: async (data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject?: string;
    message: string;
  }) => {
    return fetchApi('/customers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// 用户相关API
export const userApi = {
  // 登录
  login: async (email: string, password: string) => {
    return fetchApi('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // 注册
  register: async (name: string, email: string, password: string) => {
    return fetchApi('/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },
};
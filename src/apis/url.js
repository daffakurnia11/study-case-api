export const baseURL = () => "https://test.employee.tokoweb.xyz/api";

export const LoginUrl = () => `/login/`;

export const LogoutUrl = () => `/logout/`;

export const ProductUrl = () => `/product/`;

export const ProductShowUrl = (id) => `/product/show?product_id=${id}`;

export const ProductCreateUrl = () => `/product/store`;

export const ProductUpdateUrl = () => `/product/update`;

export const ProductDeleteUrl = (id) => `/product/${id}`;

export interface IPaginationResponse<T> {
  data: T;
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

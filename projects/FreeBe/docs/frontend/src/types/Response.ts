export type Message = "success" | "err_param" | "err_internal" | "empty_user" | "err_no_permission";

export interface XtxResponse<T> {
  data: T,
  message: Message,
  status: number
}

export interface Pagination<T> {
  page: number;
  pages: number;
  pageSize: number;
  counts: number;
  items: T[];
}

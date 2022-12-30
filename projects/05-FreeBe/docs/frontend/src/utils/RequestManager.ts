import { useUserStore } from '@/stores/userStore';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios, { AxiosError } from 'axios';
// import { getCurrentInstance } from "vue";

interface FreeAxiosInstance extends AxiosInstance {
  request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T>;
}

export default class FreeRequestManager {
  private static _singletonInstance: FreeRequestManager;
  // 用于保存 axios 实例对象
  private readonly _intance: FreeAxiosInstance;
  // 用于保存 useStore 实例
  private _userStore = useUserStore();
  // 接口请求地址
  public static baseURL = "/api"

  private constructor() {
    this._intance = axios.create({
      baseURL: FreeRequestManager.baseURL,
    });
    // 注册请求拦截器
    this._intance.interceptors.request.use(
      // 在请求头中加入token
      this._addTokenToRequestHeader.bind(this)
    );
    // 注册响应拦截器
    this._intance.interceptors.response.use(
      // this._responseHeader,
      // 响应的成功态, 剥离响应对象
      this._peelOffAxiosResponse,
      // 响应的失败态, 处理未授权的情况
      this._unauthorized.bind(this)
    );
  }
  // 用于获取单例对象的
  static get instance() {
    // 判断单例对象是否存在
    if (typeof FreeRequestManager._singletonInstance === 'undefined') {
      // 如果不存在 创建该对象
      FreeRequestManager._singletonInstance = new FreeRequestManager();
    }
    // 返回单例对象
    return FreeRequestManager._singletonInstance;
  }
  // 在请求头中加入token
  private _addTokenToRequestHeader(config: AxiosRequestConfig) {
    // config.headers = { contentType: "application/x-www-form-urlencoded" }
    return config;
    // // 我们期望该方法中的 this 关键字指向当前类的实例
    // const token = this._userStore.profile.result.token;
    // // 如果 token 存在 将 token 加入到请求头中
    // if (token) config.headers = { Authorization: `Bearer ${token}` };
    // // 返回 config 否则报错
    // return config;
  }
  // 剥离响应对象 直接为调用者返回服务器端的数据
  private _peelOffAxiosResponse(response: AxiosResponse) {
    return response.data;
  }
  // private _responseHeader(response: AxiosResponse) {
  //   response.config.headers = "Access-Control-Allow-Origin", "*"
  // }
  // 统一的错误处理 (未授权)
  private _unauthorized(error: unknown) {
    // 检测 error 参数是否为 axios 封装的 error 对象

    // router.push(`/login?return=${encodeURIComponent(router.currentRoute.value.fullPath)}`);
    // if (error instanceof AxiosError) {
    //   // 401 表示未授权
    //   if (error.response?.status === 401) {
    //     // 清空本地用户信息
    //     this._userStore.$reset();
    //     // 跳转到登录页面
    //     router.replace('/login');
    //   }
    // }
    return Promise.reject(error);
  }
  // 添加一个外部用于发送请求的方法
  public request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T> {
    // 由于我们调用的是 axios 实例下的 request 方法, 这个方法他的参数被要求是 AxiosRequestConfig leixing
    return this._intance.request<T, D>(config);
  }
}

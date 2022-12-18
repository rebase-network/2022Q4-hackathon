import type { UserBaseInfo } from '@/types/User';
import { defineStore } from 'pinia';
import type { Status } from '@/types/Status';
import { AxiosError } from 'axios';
import { UserAPI } from '@/api/Login/LoginAPI';

type States = {
  // 用户信息
  profile: {
    // 记录用户信息
    result: Partial<UserBaseInfo>;
    // 记录登录请求的请求状态
    status: Status;
    // 记录登录失败的错误信息
    error: string;
  };
};

type Getters = {};
type Actions = { login(arg: UserBaseInfo): Promise<void>; };

export const useUserStore = defineStore<'user', States, Getters, Actions>('user', {
  state: () => ({
    profile: {
      result: {},
      status: 'idle',
      error: '',
    },
  }),
  actions: {
    async login(arg) {
      this.profile.status = 'loading';
      try {
        const response = await UserAPI.getUserLogin(arg);
        console.log(response);

        if (response.message == "success") {
          this.profile.status = 'success';
          this.profile.result = arg;
          this.profile.result.head_image === "test" ? this.profile.result.head_image = "http://free-be.xyz/static/metamask_wallet_element.3f2fbdea.svg" : ""
          return
        }
      } catch (error) {
        this.profile.status = 'error';
        if (error instanceof AxiosError) {
          this.profile.error = error.response?.data.message;
        } else if (error instanceof Error) {
          this.profile.error = error.message;
        }
      }
    },
  },
  persist: true,
});

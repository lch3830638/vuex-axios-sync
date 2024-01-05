import { Store } from "vuex";
import { AxiosInstance } from "axios";

export interface VuexAxiosSyncOptions { 
  moduleName?: string;
  minRequestTime?: string;
}

export default function (store: Store<Record<string,unknown>>, axios: AxiosInstance, options?: VuexAxiosSyncOptions): void;

import { Store } from "vuex";
import { AxiosInstance } from "axios";

export interface VuexAxiosSyncOptions { 
  moduleName?: string;
  minRequestTime?: string;
}

export default function (store: Store, axios: AxiosInstance, options?: VuexAxiosSyncOptions): void;

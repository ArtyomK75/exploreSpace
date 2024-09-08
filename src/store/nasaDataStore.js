import {defineStore} from "pinia";
import axiosInstance from "@/../services/axios.js";
import useGlobalStore from "@/store/globalStore.js";
import {DEPT_OF_DAYS} from "@/main.js";

export const useNasaDataStore = defineStore('nasaDataStore', {
    state: () => ({
        picturesState: [],
        quantityDaysStore: DEPT_OF_DAYS,
    }),
    getters: {
        pictures: (state) => state.picturesState,
        quantityDays: (state) => state.quantityDaysStore,
    },
    actions: {
        async getPictures() {
            let lDate= new Date();
            lDate.setDate(lDate.getDate() - this.quantityDaysStore);
            const url = `/apod?api_key=${useGlobalStore().getApiKey}&start_date=${getFormatedDate(lDate)}`;
            try {
                const response = await axiosInstance.get(url);
                this.picturesState = response.data;
            } catch (error) {
                console.log(error);
            }

            function getFormatedDate(fromDate) {
                return fromDate.getFullYear() + "-" + fromDate.getMonth() + "-" + fromDate.getDate();
            }
        },
    },
})

export default useNasaDataStore;
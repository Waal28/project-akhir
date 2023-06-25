import axios from "axios";
import { useLocalStorage } from "../../5.hooks/localStorage";

export const prefix = "iwal";
const useClient = () => {
  const [creds] = useLocalStorage("credential");
  const client = axios.create({
    baseURL: `https://msib-feb3-objectstorage.productzillaacademy.com/collections`,
    headers: {
      Authorization: `Bearer ${creds}`,
    },
  });

  return client;
};
export default useClient;

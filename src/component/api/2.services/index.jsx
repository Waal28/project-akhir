import { useState } from "react";
import useClient from "../1.rest-client";

export const usePostService = () => {
  const client = useClient();
  const [loading, setLoading] = useState(false);

  const getData = async (collection) => {
    if (loading) return setLoading(true);
    return client
      .get(collection)
      .then((response) => {
        return response.data.reverse();
      })
      .finally(() => {
        setLoading(false);
        console.log("ini get data");
      });
  };
  const getDataById = async (collection, id) => {
    if (loading) return setLoading(true);
    return client
      .get(`${collection}/id/${id}`)
      .then((response) => {
        return response.data;
      })
      .finally(() => {
        setLoading(false);
        console.log("ini get data");
      });
  };
  const createData = async (collection, dataForm) => {
    if (loading) return setLoading(true);
    return client
      .post(collection, dataForm)
      .then((response) => {
        return response.data;
      })
      .finally(() => {
        setLoading(false);
        console.log("ini create data");
      });
  };
  const deleteData = async (collection, id) => {
    if (loading) return setLoading(true);
    return client
      .delete(`${collection}/id/${id}`)
      .then((response) => {
        return response.data;
      })
      .finally(() => {
        setLoading(false);
        console.log("ini delete data");
      });
  };
  const updateData = async (collection, id, dataForm) => {
    if (loading) return setLoading(true);
    return client
      .put(`${collection}/id/${id}`, dataForm)
      .then((response) => {
        return response.data;
      })
      .finally(() => {
        setLoading(false);
        console.log("ini update data");
      });
  };
  return { getData, getDataById, createData, deleteData, updateData, loading };
};
export default usePostService;

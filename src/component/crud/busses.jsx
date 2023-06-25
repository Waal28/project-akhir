import usePostService from "../api/2.services";
import { useDispatch } from "react-redux";
import { setDataBusses, setDataById } from "../0.Store/busses";

export const CRUD_busses = () => {
  const collection = "iwal_busses";
  const dispatch = useDispatch();
  const { getData, getDataById, createData, deleteData, updateData } =
    usePostService();

  const fetchData_Busses = async () => {
    const data = await getData(collection);
    dispatch(setDataBusses(data));
  };
  const fetchDataById_Busses = async (id) => {
    const data = await getDataById(collection, id);
    dispatch(setDataById(data));
  };
  const createData_Busses = async (dataForm) => {
    await createData(collection, dataForm);
    await fetchData_Busses();
  };
  const deleteData_Busses = async (id) => {
    await deleteData(collection, id);
    await fetchData_Busses();
  };
  const updateData_Busses = async (id, dataForm) => {
    await updateData(collection, id, dataForm);
    await fetchData_Busses();
  };
  return {
    fetchData_Busses,
    fetchDataById_Busses,
    createData_Busses,
    deleteData_Busses,
    updateData_Busses,
  };
};

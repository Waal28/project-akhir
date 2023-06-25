import usePostService from "../api/2.services";
import { useDispatch } from "react-redux";
import { setDataRoutes, setDataById } from "../0.Store/routes";

export const CRUD_Routes = () => {
  const collection = "iwal_routes";
  const dispatch = useDispatch();
  const { getData, getDataById, createData, deleteData, updateData } =
    usePostService();

  const fetchData_Routes = async () => {
    const data = await getData(collection);
    dispatch(setDataRoutes(data));
  };
  const fetchDataById_Routes = async (id) => {
    const data = await getDataById(collection, id);
    dispatch(setDataById(data));
  };
  const createData_Routes = async (dataForm) => {
    await createData(collection, dataForm);
    await fetchData_Routes();
  };
  const deleteData_Routes = async (id) => {
    await deleteData(collection, id);
    await fetchData_Routes();
  };
  const updateData_Routes = async (id, dataForm) => {
    await updateData(collection, id, dataForm);
    await fetchData_Routes();
  };
  return {
    fetchData_Routes,
    fetchDataById_Routes,
    createData_Routes,
    deleteData_Routes,
    updateData_Routes,
  };
};

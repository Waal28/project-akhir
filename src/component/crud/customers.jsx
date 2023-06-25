import usePostService from "../api/2.services";
import { useDispatch } from "react-redux";
import { setDataRoutes, setDataById } from "../0.Store/routes";

export const CRUD_Customers = () => {
  const collection = "iwal_customers";
  const dispatch = useDispatch();
  const { getData, getDataById, createData, deleteData, updateData } =
    usePostService();

  const fetchData_Customers = async () => {
    const data = await getData(collection);
    dispatch(setDataRoutes(data));
  };
  const fetchDataById_Customers = async (id) => {
    const data = await getDataById(collection, id);
    dispatch(setDataById(data));
  };
  const createData_Customers = async (dataForm) => {
    await createData(collection, dataForm);
    await fetchData_Customers();
  };
  const deleteData_Customers = async (id) => {
    await deleteData(collection, id);
    await fetchData_Customers();
  };
  const updateData_Customers = async (id, dataForm) => {
    await updateData(collection, id, dataForm);
    await fetchData_Customers();
  };
  return {
    fetchData_Customers,
    fetchDataById_Customers,
    createData_Customers,
    deleteData_Customers,
    updateData_Customers,
  };
};

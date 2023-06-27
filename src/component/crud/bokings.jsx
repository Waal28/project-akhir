import usePostService from "../api/2.services";
import { useDispatch } from "react-redux";
import { setDataBokings, setDataById } from "../0.Store/bokings";

export const CRUD_Bokings = () => {
  const collection = "iwal_bokings";
  const dispatch = useDispatch();
  const { getData, getDataById, createData, deleteData, updateData } =
    usePostService();

  const fetchData_Bokings = async () => {
    const data = await getData(collection);
    dispatch(setDataBokings(data));
  };
  const fetchDataById_Bokings = async (id) => {
    const data = await getDataById(collection, id);
    dispatch(setDataById(data));
  };
  const createData_Bokings = async (dataForm) => {
    await createData(collection, dataForm);
    await fetchData_Bokings();
  };
  const deleteData_Bokings = async (id) => {
    await deleteData(collection, id);
    await fetchData_Bokings();
  };
  const updateData_Bokings = async (id, dataForm) => {
    await updateData(collection, id, dataForm);
    await fetchData_Bokings();
  };
  return {
    fetchData_Bokings,
    fetchDataById_Bokings,
    createData_Bokings,
    deleteData_Bokings,
    updateData_Bokings,
  };
};

import axios from "axios";
import { PatientsEntry, NewPatient } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<PatientsEntry[]>(
    `${apiBaseUrl}/patients`
  );
  return data;
};

const create = async (object: NewPatient) => {
  const { data } = await axios.post<PatientsEntry>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const singlePatient = async (id: string) => {
  const { data } = await axios.get<PatientsEntry>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
}

export default {
  getAll, create, singlePatient
};


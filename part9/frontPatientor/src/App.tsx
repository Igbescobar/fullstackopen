import { useState, useEffect } from "react";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { DiagnosesEntry, PatientsEntry } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import SinglePatientInfo from "./components/SinglePatientInfo";
import diagnosesService from "./services/diagnoses";

const App = () => {
  const [patients, setPatients] = useState<PatientsEntry[]>([]);
  const [diagnoses, setDiagnoses] = useState<DiagnosesEntry[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();

    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses)
    }
    void fetchDiagnosesList()
  }, []);

  const match = useMatch('/patients/:id')

  const patient = match
    ? patients.find(p => p.id === match.params.id)
    : null



  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          <Route path="/patients/:id" element={<SinglePatientInfo patient={patient} diagnoses={diagnoses} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;

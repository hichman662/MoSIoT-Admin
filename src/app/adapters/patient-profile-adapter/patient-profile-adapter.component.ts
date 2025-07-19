import { Component, OnInit } from '@angular/core';
import { AccessMode } from 'src/app/models/Patient Profile/access-mode';
import { Condition } from 'src/app/models/Patient Profile/condition';
import { Disability } from 'src/app/models/Patient Profile/disability';
import { NewAccessMode } from 'src/app/models/Patient Profile/new-access-mode';
import { NewCondition } from 'src/app/models/Patient Profile/new-condition';
import { NewDisability } from 'src/app/models/Patient Profile/new-disability';
import { NewPatientProfile } from 'src/app/models/Patient Profile/new-patient-profile';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';

@Component({
  selector: 'app-patient-profile-adapter',
  templateUrl: './patient-profile-adapter.component.html',
  styleUrls: ['./patient-profile-adapter.component.scss']
})
export class PatientProfileAdapterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  newPatientProfile(patientProfile: PatientProfile): NewPatientProfile{
    let newPatient: NewPatientProfile;

    newPatient = {
      description: patientProfile.description,
      hazardAvoidance: patientProfile.hazardAvoidance,
      name: patientProfile.name,
      preferredLanguage: patientProfile.preferredLanguage,
      region: patientProfile.region
    }

    return newPatient;
  }

  newAccessMode(accessMode: AccessMode, patientId: number, disabilityId: number): NewAccessMode{
    let newAccessMode:NewAccessMode;

    newAccessMode = {
      patient_oid: patientId,
      description: accessMode.description,
      disability_oid: disabilityId,
      name: accessMode.name,
      typeAccessMode: accessMode.typeAccessMode
    }

    return newAccessMode;
  }

  newCondition(condition: Condition, patientId: number): NewCondition{
    let newCondition:NewCondition;

    newCondition = {
      patientProfile_oid: patientId,
      clinicalStatus: condition.clinicalStatus,
      description: condition.description,
      disease: condition.disease,
      name: condition.name
    }

    return newCondition;
  }

  newDisability(disability: Disability, patientId: number): NewDisability{
    let newDisability:NewDisability;

    newDisability = {
      patient_oid: patientId,
      description: disability.description,
      name: disability.name,
      severity: disability.severity,
      type: disability.type
    }

    return newDisability;
  }

}

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
      Description: patientProfile.Description,
      HazardAvoidance: patientProfile.HazardAvoidance,
      Name: patientProfile.Name,
      PreferredLanguage: patientProfile.PreferredLanguage,
      Region: patientProfile.Region
    }

    return newPatient;
  }

  newAccessMode(accessMode: AccessMode, patientId: number, disabilityId: number): NewAccessMode{
    let newAccessMode:NewAccessMode;

    newAccessMode = {
      Patient_oid: patientId,
      Description: accessMode.Description,
      Disability_oid: disabilityId,
      Name: accessMode.Name,
      TypeAccessMode: accessMode.TypeAccessMode
    }

    return newAccessMode;
  }

  newCondition(condition: Condition, patientId: number): NewCondition{
    let newCondition:NewCondition;

    newCondition = {
      PatientProfile_oid: patientId,
      ClinicalStatus: condition.ClinicalStatus,
      Description: condition.Description,
      Disease: condition.Disease,
      Name: condition.Name
    }

    return newCondition;
  }

  newDisability(disability: Disability, patientId: number): NewDisability{
    let newDisability:NewDisability;

    newDisability = {
      Patient_oid: patientId,
      Description: disability.Description,
      Name: disability.Name,
      Severity: disability.Severity,
      Type: disability.Type
    }

    return newDisability;
  }

}

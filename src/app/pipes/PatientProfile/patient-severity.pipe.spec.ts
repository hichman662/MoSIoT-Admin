import { PatientSeverityPipe } from './patient-severity.pipe';

describe('PatientSeverityPipe', () => {
  it('create an instance', () => {
    const pipe = new PatientSeverityPipe();
    expect(pipe).toBeTruthy();
  });
});

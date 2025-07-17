import { ClinicalStatusPipe } from './clinical-status.pipe';

describe('ClinicalStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new ClinicalStatusPipe();
    expect(pipe).toBeTruthy();
  });
});

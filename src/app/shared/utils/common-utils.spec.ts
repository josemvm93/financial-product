import { CommonUtils } from './common-utils';

describe('CommonUtils', () => {
  it('should call trackid and return the correct id', () => {
    const id = 'test';
    const idTrack = CommonUtils.trackById(id);
    expect(idTrack).toBe(id);
  });
  it('should call transformText and return the correct value', () => {
    const txt = 'test Test';
    const textTransform = CommonUtils.tranformText(txt);
    expect(textTransform).toBe(txt.trim().toLocaleLowerCase());
  });
  it('should call transformDateWithoutHour and return the correct value', () => {
    const date = new Date();
    const dateTransform = CommonUtils.transformDateWithoutHour(date);
    expect(dateTransform.getDate()).toBe(date.getDate());
  });
  it('should call transformDateWithoutHour and add day', () => {
    const date = new Date();
    const addDay = true;
    const dateTransform = CommonUtils.transformDateWithoutHour(date, addDay);
    expect(dateTransform.getDate()).toBe(date.getDate() + 1);
  });
  it('should call addYearsToDate and return the correct value', () => {
    const date = new Date();
    const dateTransform = CommonUtils.addYearsToDate(date);
    expect(dateTransform).toEqual(date);
  });
  it('should call addYearsToDate and add n years', () => {
    const date = new Date();
    const dateWithoutModified = new Date(date);
    const years = 2;
    CommonUtils.addYearsToDate(date, years);
    expect(date.getFullYear()).toBe(dateWithoutModified.getFullYear() + years);
  });
});

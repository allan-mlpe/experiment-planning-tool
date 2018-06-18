import {PcvtConstants} from "./pcvt-constants";

export class PcvtUtils {

  public static checkUndefinedOrEmptyObjects(...objects): boolean {
    for(let obj of objects) {
      if(obj === undefined)
        return true;

      for(let value of Object.values(obj)) {
        if(value === undefined || value === '')
          return true;
      }
    }

    return false;
  }

  public static isCharacterizationInstrumentComplete(characteristicsObject: any): boolean {
    const INSTRUMENT_QUESTIONS = PcvtConstants.CHARACTERIZATION_QUESTIONS;

    if(characteristicsObject !== undefined) {
      if (Object.values(characteristicsObject).length !==
            INSTRUMENT_QUESTIONS.length)
        return false;

      return !this.containsEmptyNullOrUndefinedValues(characteristicsObject);
    }

    return false;
  }

  public static isPlanningInstrumentComplete(detailsObject: any): boolean {
    const PLANNING_QUESTIONS = PcvtConstants.INSTRUMENT_QUESTIONS;

    if(detailsObject !== undefined) {
      if (Object.values(detailsObject).length !==
        PLANNING_QUESTIONS.length)
        return false;

      return !this.containsEmptyNullOrUndefinedValues(detailsObject);
    }

    return false;
  }

  public static containsEmptyNullOrUndefinedValues(obj: any): boolean {
    try {
      const values = Object.values(obj);
      for(let value of values) {
        if(value === '' || value === undefined || value === null)
          return true;
      }
    } catch(e) {
      return false;
    }
    return false;
  }
}

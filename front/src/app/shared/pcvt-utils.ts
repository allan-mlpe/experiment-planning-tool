import {PcvtConstants} from "./pcvt-constants";
import {THREAT_OPTIONS} from "../model/threat-options";

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
    const INSTRUMENT_QUESTIONS = PcvtConstants.CHARACTERIZATION_QUESTIONS
    const TOTAL_QUESTIONS = INSTRUMENT_QUESTIONS.reduce((len, item) => len += item.questions.length, 0);

    if(characteristicsObject !== undefined) {
      if (Object.values(characteristicsObject).length !==
            TOTAL_QUESTIONS)
        return false;

      return !this.containsEmptyNullOrUndefinedValues(characteristicsObject);
    }

    return false;
  }

  public static isPlanningInstrumentComplete(detailsObject: any): boolean {
    const PLANNING_QUESTIONS = PcvtConstants.INSTRUMENT_QUESTIONS;
    const TOTAL_QUESTIONS = PLANNING_QUESTIONS.reduce((len, item) => len += item.questions.length, 0);

    if(detailsObject !== undefined) {
      if (Object.values(detailsObject).length !==
        TOTAL_QUESTIONS)
        return false;

      return !this.containsEmptyNullOrUndefinedValues(detailsObject);
    }

    return false;
  }

  public static isThreatClassificationComplete(threatsObject): boolean {
    const propertiesLength: number = THREAT_OPTIONS.length;

    if(threatsObject !== undefined) {
      const values = Object.values(threatsObject);
      for(let value of values) {
        if(value === {} || Object.values(value).length !== propertiesLength)
          return false;
      }
    }

    return true;
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

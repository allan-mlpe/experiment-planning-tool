import {PcvtConstants} from "./pcvt-constants";
import {THREAT_OPTIONS} from "../model/threat-options";
import {Magnitude} from "../model/magnitude.enum";

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
      if(values.length === 0)
        return false;

      for(let value of values) {
        if(value === {} || Object.values(value).length !== propertiesLength)
          return false;
      }
    } else {
      return false;
    }

    return true;
  }

  public static calculateThreatMagnitude(impact: number, urgency: number, trend: number): Magnitude {
    const value: number = impact * 1000 + urgency * 100 + trend * 10;

    if(value >= 3210) {
      return Magnitude.VERY_HIGH;
    } else if(value >= 2310) {
      return Magnitude.HIGH;
    } else if(value >= 2110) {
      return Magnitude.MODERATE;
    } else if(value >= 1210) {
      return Magnitude.LOW;
    } else {
      return Magnitude.VERY_LOW;
    }
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

export interface StateDTO {
  state: string;
  positive: number;
  negative: number;
  hospitalizedCurrently: number;
  recovered: number;
  lastUpdateEt: string;
  death: number;
  total: number;
  totalTestResults: number;
}
export type StatesDTO = Array<StateDTO>;

import { genericMapToBackend, genericMapToState } from "./commonMapper";

export const mapLegalPageStateToBackend = (state: any, key: string) => genericMapToBackend(state, key);
export const mapBackendToLegalPageState = (backendData: any, currentState: any, key: string) => genericMapToState(backendData, currentState, key);

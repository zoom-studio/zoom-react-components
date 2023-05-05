import { ZoomProviderNS } from '../components';
export declare namespace UseZoomContextNS {
    type ReturnType = Required<Omit<ZoomProviderNS.ProviderValue, 'children'>>;
}
export declare const useZoomContext: () => UseZoomContextNS.ReturnType;

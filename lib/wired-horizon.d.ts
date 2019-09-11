import { WiredBase, TemplateResult, CSSResult } from "wired-lib/lib/wired-base";
export declare class WiredHorizon extends WiredBase {
    series: never[];
    labels: never[];
    bands: number;
    min: number;
    max: number;
    private box?;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    updated(): void;
}

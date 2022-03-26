/// <reference types="react" />
interface CellProps {
    height: number;
    start: Date;
    end: Date;
    resourceKey: string;
    resourceVal: string | number;
    children?: JSX.Element;
}
declare const Cell: ({ height, start, end, resourceKey, resourceVal, children, }: CellProps) => JSX.Element;
export { Cell };

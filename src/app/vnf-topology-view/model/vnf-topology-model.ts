export enum DataType {
    ZONE, HOST, VM
}


export class TypeData {
    type: DataType;
    name: string;
    img: string;
}

export class ViewData {
    label: string;
    type: DataType;
}
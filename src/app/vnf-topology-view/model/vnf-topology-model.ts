export enum DataType {
    ZONE = 'ZONE',
    HOST = 'HOST',
    VM = 'VM'
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

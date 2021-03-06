import { Injectable } from '@angular/core';
import { TypeData, DataType } from './model/vnf-topology-model';

@Injectable({
  providedIn: 'root'
})
export class EmbeddedMemoryService {

  hosts: TypeData[] = [
    {
      type: DataType.HOST,
      name: 'Super Host 1',
      img: 'https://image.flaticon.com/icons/svg/148/148820.svg'
    }
  ];

  zones: TypeData[] = [
    {
      type: DataType.ZONE,
      name: 'Local Zone',
      img: 'https://image.flaticon.com/icons/svg/758/758593.svg'
    }
  ];

  vms: TypeData[] = [
    {
      type: DataType.VM,
      name: 'VM 1',
      img: 'assets/images/clear.svg'
    },
    {
      type: DataType.VM,
      name: 'VM 2',
      img: 'https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/3525127881551941184-128.png'
    },
    {
      type: DataType.VM,
      name: 'VM 3',
      img: 'https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/18978671401536125450-128.png'
    },
    {
      type: DataType.VM,
      name: 'VM 4',
      img: 'data:image/png;base64,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'
    }
  ];

  constructor() { }

  addType(type: TypeData) {
    switch (type.type) {
      case DataType.ZONE: this.zones.push(type);
        break;
      case DataType.HOST: this.hosts.push(type);
        break;
      case DataType.VM: this.vms.push(type);
        break;
    }
  }
}

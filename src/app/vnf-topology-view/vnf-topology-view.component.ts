import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatList, MatSliderChange, MatDialog, MatSnackBar } from '@angular/material';
import { mxgraph, mxgraphFactory } from 'mxgraph-factory';
import { VnfTopologyGraph } from './model/vnf-topology-graph';
import { CdkDragMove, CdkDragDrop, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { DataType, TypeData } from './model/vnf-topology-model';
import { EmbeddedMemoryService } from './embedded-memory.service';
import { AddNewDialogComponent } from './dialogs/add-new-dialog/add-new-dialog.component';
import { ZoneDropDialogComponent } from './dialogs/zone-drop-dialog/zone-drop-dialog.component';
import { HostVnfDropDialogComponent } from './dialogs/host-vnf-drop-dialog/host-vnf-drop-dialog.component';

const { mxGraph, mxGraphModel, mxOutline, mxConstants, mxPerimeter, mxUtils, mxEvent, mxVertexHandler,
  mxPoint, mxImage, mxCellTracker, mxCellHighlight, mxRubberband, mxKeyHandler, mxCellOverlay, mxMultiplicity } = mxgraphFactory({
    mxLoadResources: false,
    mxLoadStylesheets: false,
  });

@Component({
  selector: 'app-vnf-topology-view',
  templateUrl: './vnf-topology-view.component.html',
  styleUrls: ['./vnf-topology-view.component.scss']
})
export class VnfTopologyViewComponent implements OnInit, AfterViewInit {

  @ViewChild('graphContainer', { static: false }) graphContainer: ElementRef;

  @ViewChild(MatList, { static: false, read: ElementRef }) child: ElementRef;

  graph: VnfTopologyGraph;

  dropX: number;
  dropY: number;

  graphX;
  graphY;

  hosts: TypeData[];
  zones: TypeData[];
  vms: TypeData[];

  constructor(
    private embeddedMemoryService: EmbeddedMemoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.hosts = this.embeddedMemoryService.hosts;
    this.zones = this.embeddedMemoryService.zones;
    this.vms = this.embeddedMemoryService.vms;
  }

  ngAfterViewInit() {
    const model: mxgraph.mxGraphModel = new mxGraphModel();
    this.graph = new VnfTopologyGraph(this.graphContainer.nativeElement, model);

    // Overwrite alert message
    mxUtils.alert = (message: string) => {
      this.snackBar.open(message);
    };


    const outline = document.getElementById('outlineContainer');
    // Creates the outline (navigator, overview) for moving
    // around the graph in the top, right corner of the window.
    const outln = new mxOutline(this.graph, outline);
    outln.setZoomEnabled(false);

  }

  dragEnded($event: CdkDragEnd) {
    // console.log($event.source.getFreeDragPosition());
    const { offsetLeft, offsetTop } = $event.source.element.nativeElement;
    // console.log(offsetLeft + ',' + offsetTop);
    // this.drop_x = offsetLeft;
    // this.drop_y = offsetTop;
  }

  dragMove($event: CdkDragMove) {
    // console.log($event.pointerPosition);
  }

  dragStart($event: CdkDragStart) {
    // this._currentIndex = this.types.indexOf(event.source.data); // Get index of dragged type
    // this._currentField = this.child.nativeElement.children[this._currentIndex]; // Store HTML field
  }


  moved(event: CdkDragMove) {
    // Check if stored HTML field is as same as current field
    // if (this.child.nativeElement.children[this._currentIndex] !== this._currentField) {
    // Replace current field, basically replaces placeholder with old HTML content
    // this.child.nativeElement.replaceChild(this._currentField, this.child.nativeElement.children[this._currentIndex]);
    // }

    this.dropX = event.pointerPosition.x;
    this.dropY = event.pointerPosition.y;

    const mouseEvent: MouseEvent = event.event as MouseEvent;
    let location: mxgraph.mxPoint = this.graph.getPointForEvent(mouseEvent, false);
    this.graphX = location.x;
    this.graphY = location.y;
    

    // this.position = `> Position X: ${event.pointerPosition.x} - Y: ${event.pointerPosition.y}`;
  }

  itemDropped(event: CdkDragDrop<TypeData>) {
    // const isTypeOf = Mapping.isTypeOf(event.item.data, HostData.;
    // const isTypeOfVm = Mapping.isTypeOf(event.item.data, VmData);

    // const isTypeOf = (event.item.data as HostData).type !== undefined;

    // const data: HostData = event.item.data;
    // const dataVm: VmData = <VmData> event.item.data;
    // console.log(event.item.data instanceof VmData);
    // console.log(event.item.data instanceof HostData);



    if (event.previousContainer === event.container) {

    } else {

      // event.container.element.nativeElement.offsetParent.offsetLeft
      // event.container.element.nativeElement.offsetParent.offsetParent.offsetTop
      // const x = event.distance.x;
      // const y = event.distance.y;
      // const x = this.drop_x - event.container.element.nativeElement.offsetLeft;
      // const y = this.drop_y - event.container.element.nativeElement.offsetTop;

      const parent: any = event.container.element.nativeElement.offsetParent;
      // const x = this.dropX - parent.offsetLeft;
      // const y = this.dropY - parent.offsetParent.offsetTop;

      const viewTranslate = this.graph.view.getTranslate();
      let x = this.graphX;
      let y = this.graphY;

      // const { x, y } = mxUtils.convertPoint(this.graph.container, this.dropX, this.dropY);

      const data: TypeData = event.item.data;

      if (data.type === DataType.HOST) {
        x += viewTranslate.x;
        y += viewTranslate.y;
        const parentCell: mxgraph.mxCell = this.graph.getCellAt(x, y);
        if (parentCell && mxUtils.isNode(parentCell.value, 'TypeData')) {
          const typeDrop: DataType = parentCell.value.getAttribute('type') as DataType;
          if (typeDrop == DataType.ZONE) {
            // x and y relative to parent
            const xx = parentCell ? x - this.graph.getView().getState(parentCell).x : x;
            const yy = parentCell ? y - this.graph.getView().getState(parentCell).y : y;
            this.dropHost(parentCell, data, xx, yy);
            // console.log(data.type);
            // this.graph.addHost(parentCell, data, xx, yy, 10);
          } else {
            this.snackBar.open('Not valid container, HOST to ZONE need');
          }
        } else {
          this.snackBar.open('Not valid container, HOST to ZONE need');
        }

      } else if (data.type === DataType.VM) {
        x += viewTranslate.x;
        y += viewTranslate.y;
        const parentCell: mxgraph.mxCell = this.graph.getCellAt(x, y);
        if (parentCell && mxUtils.isNode(parentCell.value, 'TypeData')) {
          const typeDrop: DataType = parentCell.value.getAttribute('type') as DataType;
          if (typeDrop == DataType.HOST) {
            // x and y relative to parent
            const xx = parentCell ? x - this.graph.getView().getState(parentCell).x : x;
            const yy = parentCell ? y - this.graph.getView().getState(parentCell).y : y;
            // console.log(data.name);
            this.dropVnf(parentCell, data, xx, yy);
            // const img = data.img.startsWith('data') ? this.mxGraphBase64Image(data.img) : data.img;
            // this.graph.addCircleVm(parentCell, data, xx, yy, 40, img, 10);
          } else {
            this.snackBar.open('Not valid container, VM to HOST need');
          }
        } else {
          this.snackBar.open('Not valid container, VM to HOST need');
        }

      } else if (data.type === DataType.ZONE) {
        this.dropZone(data, x, y);
        // this.graph.addZone(data, x, y);
      }
    }
  }

  private mxGraphBase64Image(imageBase64: string): string {
    return imageBase64.replace(';base64', '');
  }

  zoomChange($event: MatSliderChange) {
    console.log($event.value);
    this.graph.zoomTo($event.value / 100, null);
  }

  zoomReset() {
    this.graph.zoomActual();
  }

  openInNewTab(url: string) {
    const win: Window = window.open(url, '_blank');
    win.focus();
  }

  addNew(type: DataType): void {
    const dialogRef = this.dialog.open(AddNewDialogComponent, {
      width: '250px',
      data: { type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.embeddedMemoryService.addType(result as TypeData);
      }
    });
  }

  dropZone(data: TypeData, x: number, y: number): void {
    const dialogRef = this.dialog.open(ZoneDropDialogComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const cellData: TypeData = {
          type: data.type,
          name: result.name,
          img: data.img
        };
        this.graph.addZone(cellData, x, y);
        // this.embeddedMemoryService.addType(result as TypeData);
      }
    });
  }

  dropHost(parentCell: mxgraph.mxCell, data: TypeData, x: number, y: number): void {
    const dialogRef = this.dialog.open(HostVnfDropDialogComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const cellData: TypeData = {
          type: data.type,
          name: result.name,
          img: data.img
        };
        this.graph.addHost(parentCell, cellData, x, y, result.ports);
      }
    });
  }

  dropVnf(parentCell: mxgraph.mxCell, data: TypeData, x: number, y: number): void {
    const dialogRef = this.dialog.open(HostVnfDropDialogComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const cellData: TypeData = {
          type: data.type,
          name: result.name,
          img: data.img
        };
        const img = data.img.startsWith('data') ? this.mxGraphBase64Image(data.img) : data.img;
        this.graph.addCircleVm(parentCell, cellData, x, y, 40, img, result.ports);
      }
    });
  }
}

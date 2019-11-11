import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatList, MatSliderChange } from '@angular/material';
import { mxgraph, mxgraphFactory } from 'mxgraph-factory';
import { VnfTopologyGraph } from './model/vnf-topology-graph';
import { CdkDragMove, CdkDragDrop, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { DataType, TypeData } from './model/vnf-topology-model';
import { EmbeddedMemoryService } from './embedded-memory.service';

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

  hosts: TypeData[];
  zones: TypeData[];
  vms: TypeData[];

  constructor(
    private embeddedMemoryService: EmbeddedMemoryService
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
      console.error(message);
    };


    const outline = document.getElementById('outlineContainer');
    // Creates the outline (navigator, overview) for moving
    // around the graph in the top, right corner of the window.
    const outln = new mxOutline(this.graph, outline);
    outln.setZoomEnabled(false);

  }

  dragEnded($event: CdkDragEnd) {
    console.log($event.source.getFreeDragPosition());
    const { offsetLeft, offsetTop } = $event.source.element.nativeElement;
    console.log(offsetLeft + ',' + offsetTop);
    // this.drop_x = offsetLeft;
    // this.drop_y = offsetTop;
  }

  dragMove($event: CdkDragMove) {
    console.log($event.pointerPosition);
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
      const x = this.dropX - parent.offsetLeft;
      const y = this.dropY - parent.offsetParent.offsetTop;

      const data: TypeData = event.item.data;

      if (data.type === DataType.HOST) {
        const parentCell: mxgraph.mxCell = this.graph.getCellAt(x, y);
        if (parentCell && mxUtils.isNode(parentCell.value, 'TypeData')) {
          const typeDrop: DataType = parentCell.value.getAttribute('type') as DataType;
          if (typeDrop == DataType.ZONE) {
            // x and y relative to parent
            const xx = parentCell ? x - this.graph.getView().getState(parentCell).x : x;
            const yy = parentCell ? y - this.graph.getView().getState(parentCell).y : y;
            console.log(data.type);
            this.graph.addHost(parentCell, data, xx, yy, 10);
          } else {
            console.log('Not valid container, HOST to ZONE need');
          }
        }

      } else if (data.type === DataType.VM) {
        const parentCell: mxgraph.mxCell = this.graph.getCellAt(x, y);
        if (parentCell && mxUtils.isNode(parentCell.value, 'TypeData')) {
          const typeDrop: DataType = parentCell.value.getAttribute('type') as DataType;
          if (typeDrop == DataType.HOST) {
            // x and y relative to parent
            const xx = parentCell ? x - this.graph.getView().getState(parentCell).x : x;
            const yy = parentCell ? y - this.graph.getView().getState(parentCell).y : y;
            console.log(data.name);
            const img = data.img.startsWith('data') ? this.mxGraphBase64Image(data.img) : data.img;
            this.graph.addCircleVm(parentCell, data, xx, yy, 40, img, 10);
          } else {
            console.log('Not valid container, VM to HOST need');
          }
        }

      } else if (data.type === DataType.ZONE) {
        this.graph.addZone(data, x, y);
      }

      this.graph.refresh();
    }
  }

  private mxGraphBase64Image(imageBase64: string): string {
    return imageBase64.replace(';base64', '');
  }

  zoomChange($event: MatSliderChange) {
    console.log($event.value);
    this.graph.zoomTo($event.value / 100, null);
  }

  openInNewTab(url: string) {
    const win: Window = window.open(url, '_blank');
    win.focus();
  }
}

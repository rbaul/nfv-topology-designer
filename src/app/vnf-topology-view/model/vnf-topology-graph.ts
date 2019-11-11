import { mxgraph, mxgraphFactory } from 'mxgraph-factory';
import { VnfTopologyVertexHandler } from './vnf-topology-vertex-handler';
import { DataType, TypeData } from './vnf-topology-model';

const { mxClient, mxGraph, mxGraphModel, mxConstants, mxPerimeter, mxUtils, mxEvent, mxVertexHandler, mxStylesheet, renderingHint,
    mxPoint, mxImage, mxPanningHandler, mxEdgeStyle,
    mxCellTracker, mxCellHighlight, mxRubberband, mxKeyHandler, mxCellOverlay, mxMultiplicity } = mxgraphFactory({
        mxLoadResources: false,
        mxLoadStylesheets: false,
    });

export class VnfTopologyGraph extends mxGraph {

    xmlDocument;

    constructor(container?: Element, model?: mxgraph.mxGraphModel, renderHint?: mxgraph.renderingHint, stylesheet?: mxgraph.mxStylesheet) {
        super(container, model, renderHint, stylesheet);

        this.xmlDocument = mxUtils.createXmlDocument();

        // Prevent remove cells from perent
        this.graphHandler.setRemoveCellsFromParent(false);
        // Disable select
        this.graphHandler.setSelectEnabled(true);
        // This will automatically disable the highlighting of the source vertex.
        this.connectionHandler.connectImage = new mxImage(null, 5, 5);

        // Drag & Drop Between hosts
        this.setDropEnabled(true);

        // Disable edge move disconnect
        this.setAllowDanglingEdges(false);

        // No size handles, please...
        this.setCellsResizable(true);

        // Enable connections
        this.setConnectable(true);

        // Hover color
        const highlight: mxgraph.mxCellTracker = new mxCellTracker(this, '#4D4D4D', null);

        // Enables rubberband selection
        const rubber: mxgraph.mxRubberband = new mxRubberband(this);

        // ************** Keyboard Listener ********************
        const keyHandler: mxgraph.mxKeyHandler = new mxKeyHandler(this);
        keyHandler.bindKey(46, (evt) => {
            console.log(evt);
            if (this.isEnabled()) {
                this.removeCells();
            }
        });

        const highlight0: mxgraph.mxCellHighlight = new mxCellHighlight(this, '#ff0000', 20, null);

        // Changes some default colors
        mxConstants.HANDLE_FILLCOLOR = '#99ccff';
        mxConstants.HANDLE_STROKECOLOR = '#0088cf';
        mxConstants.VERTEX_SELECTION_COLOR = '#00a8ff';
        mxConstants.EDGE_SELECTION_COLOR = '#00a8ff';

        // Apply default styles
        this.configureStylesheet(this);

        // this.setPanning(true);
        // this.panningHandler = new mxPanningHandler(this);
        // this.panningHandler.useLeftButtonForPanning = true;
        // this.panningHandler.ignoreCell = true;

        // Enables panning with left mouse button
        // this.panningHandler.useLeftButtonForPanning = true;
        // this.panningHandler.ignoreCell = true;
        // this.container.style.cursor = 'move';
        // this.setPanning(true);
        // this.panningHandler.isPanningTrigger = (me) => {
        //     console.log(me);
        //     return true;
        // };

        // this.panningHandler.mouseDownEvent = (me) => {
        //     console.log(me);
        //     return true;
        // };


        // Target needs exactly one incoming connection from Source (VM_PORT <-> VM_PORT, HOST_PORT)
        this.multiplicities.push(new mxMultiplicity(
            true, 'HOST_PORT', null, null, 0, 1, ['HOST_PORT'],
            'Target Must Have 1 Source',
            'Target Must Connect From Source'));
    }

    isValidDropTarget(cell: any, cells: any, evt: any): boolean {
        // const parentCell: mxCell = this.graph.getCellAt(evt.x, evt.y);
        console.log(cell);
        console.log(cells);
        if (mxUtils.isNode(cell.value, 'TypeData') && mxUtils.isNode(cells[0].value, 'TypeData')) {
            const typeDrop: DataType = cell.value.getAttribute('type') as DataType;

            const typeDrag: DataType = cells[0].value.getAttribute('type') as DataType;

            const result = (typeDrop == DataType.HOST && typeDrag == DataType.VM) ||
                (typeDrop == DataType.ZONE && typeDrag == DataType.HOST);

            console.log(typeDrag + ' -> ' + typeDrop + ' : ' + result);
            // TODO: remove edges if moved to another container
            if (result) {
                console.log(cells[0].getParent().id + ' : ' + cell.id);
                if (cells[0].getParent().id !== cell.id) {
                    console.log('Need to delete edges');
                } else {
                    console.log('No Need to delete edges');
                }
            }

            return result;
        } else {
            return false;
        }

        // console.log(cell);
        // console.log(cells);
        // console.log(this.model.getParent(cell));
        return true; // Check if is valid to drop
        // return this.model.getChildCount(cell) > 3;
    }

    convertValueToString(cell: any): string {
        // if (cell.value && cell.value.name) {
        //   return cell.value.name;
        // } else {
        //   return cell.value;
        // }
        if (mxUtils.isNode(cell.value, 'TypeData')) {
            return cell.getAttribute('label', '');
        }
    }

    isPort(cell: mxgraph.mxCell): boolean {
        // Ports are not used as terminals for edges, they are
        // only used to compute the graphical connection point
        const geo = this.getCellGeometry(cell);

        return (geo != null) ? geo.relative : false;
    }

    isCellFoldable(cell: any, collapse: any): boolean {
        // Removes the folding icon and disables any folding (No Collapse)
        return false;
    }

    createVertexHandler(state: any): mxgraph.mxVertexHandler {
        if (state != null &&
            this.model.isVertex(state.cell)) {
            return new VnfTopologyVertexHandler(state);
        }
        return super.createVertexHandler(state);
    }

    private configureStylesheet(graph: mxgraph.mxGraph): void {
        // edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;
        // exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;
        // entryDx=0;entryDy=0;endArrow=none;endFill=0;shadow=0;comic=0;jumpStyle=none;
        const defaultStyle = graph.getStylesheet().getDefaultEdgeStyle();
        defaultStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.OrthConnector;
        defaultStyle[mxConstants.STYLE_ENDARROW] = 'none';
        defaultStyle[mxConstants.STYLE_JETTY_SIZE] = 'auto';
        defaultStyle[mxConstants.STYLE_ROUNDED] = 1;
        // defaultStyle[mxConstants.STYLE_CURVED] = 1;
        defaultStyle[mxConstants.STYLE_ORTHOGONAL_LOOP] = 1;



        const style: Object = new Object();

        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
        // style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_ROUNDED] = '1';
        style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
        // style[mxConstants.STYLE_SHADOW] = '0';
        // style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#ffffff';
        // style[mxConstants.STYLE_LABEL_BORDERCOLOR] = '#000000';
        // style[mxConstants.STYLE_FLIPV] = '1';
        // style[mxConstants.STYLE_GRADIENTCOLOR] = 'none';
        style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';

        style[mxConstants.STYLE_ARCSIZE] = '100';
        style[mxConstants.STYLE_IMAGE_ASPECT] = '1';
        style[mxConstants.STYLE_IMAGE_WIDTH] = '40';
        style[mxConstants.STYLE_IMAGE_HEIGHT] = '40';
        style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
        // style[mxConstants.STYLE_GLASS] = '0';
        style[mxConstants.STYLE_STROKEWIDTH] = '4';
        style[mxConstants.STYLE_STROKECOLOR] = '#E6E6E6';
        style[mxConstants.STYLE_RESIZABLE] = false;
        // style[mxConstants.STYLE_FONTCOLOR] = '#7EA6E0';
        // style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = 'bottom';
        style[mxConstants.STYLE_NOLABEL] = true;

        graph.getStylesheet().putCellStyle('vm', style);

        // style = mxUtils.clone(style); // for next
        const portStyle: Object = new Object();
        portStyle[mxConstants.STYLE_RESIZABLE] = false;
        portStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
        portStyle[mxConstants.STYLE_STROKECOLOR] = 'none';
        portStyle[mxConstants.STYLE_FILLCOLOR] = '#A9C4EB';
        graph.getStylesheet().putCellStyle('port', portStyle);

        // style = mxUtils.clone(style); // for next
        const hostPortStyle: Object = new Object();
        hostPortStyle[mxConstants.STYLE_RESIZABLE] = false;
        // hostPortStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
        hostPortStyle[mxConstants.STYLE_STROKECOLOR] = 'none';
        hostPortStyle[mxConstants.STYLE_FILLCOLOR] = '#BBBBBB';
        graph.getStylesheet().putCellStyle('host-port', hostPortStyle);

        // ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeColor=none;fillColor=#CCCCCC;

        const hostStyle: Object = new Object();
        hostStyle[mxConstants.STYLE_RESIZABLE] = true;
        // hostStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
        // hostStyle[mxConstants.STYLE_ROUNDED] = '1';
        // hostStyle[mxConstants.STYLE_STARTSIZE] = '20';
        hostStyle[mxConstants.STYLE_FILLCOLOR] = '#E6E6E6';
        hostStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = 'top';
        hostStyle[mxConstants.STYLE_ALIGN] = 'center';
        hostStyle[mxConstants.STYLE_LABEL_POSITION] = 'center';
        hostStyle[mxConstants.STYLE_VERTICAL_ALIGN] = 'bottom';
        graph.getStylesheet().putCellStyle('host', hostStyle);

        const zoneStyle: Object = new Object();
        zoneStyle[mxConstants.STYLE_RESIZABLE] = true;
        zoneStyle[mxConstants.STYLE_FILLCOLOR] = 'none';
        zoneStyle[mxConstants.STYLE_DASHED] = '1';
        zoneStyle[mxConstants.STYLE_DASH_PATTERN] = '1';
        zoneStyle[mxConstants.STYLE_STROKECOLOR] = '#7EA6E0';
        zoneStyle[mxConstants.STYLE_FONTCOLOR] = '#7EA6E0';
        zoneStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = 'bottom';
        zoneStyle[mxConstants.STYLE_ALIGN] = 'center';
        zoneStyle[mxConstants.STYLE_LABEL_POSITION] = 'center';
        zoneStyle[mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
        // zoneStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CLOUD;
        // zoneStyle[mxConstants.STYLE_ROUNDED] = '1';
        // zoneStyle[mxConstants.STYLE_STARTSIZE] = '20';
        // zoneStyle[mxConstants.STYLE_FILLCOLOR] = '#CCCCCC';
        graph.getStylesheet().putCellStyle('zone', zoneStyle);
    }



    /**
     * Add Host
     */
    public addHost(parent: mxgraph.mxCell, value: TypeData,
        x: number, y: number, numberPorts?: number): mxgraph.mxCell {
        const width: number = 250;
        const height: number = 250;

        // Create value of cell
        const node = this.createValueElement(value);

        const host = this.insertVertex(parent, null, node, x - width / 2, y - height / 2, width, height, 'host');
        host.setConnectable(false);
        for (let index = 0; index < numberPorts; index++) {
            const space = 1 / numberPorts;
            const port_width = 10;
            const port_height = 10;
            const relative_x = space / 2 + index * space - port_width / (host.getGeometry().width * 2);

            const hostPortNode = this.xmlDocument.createElement('HOST_PORT');
            const port: mxgraph.mxCell = this.insertVertex(host, null, hostPortNode,
                relative_x, 1 - port_height / (host.getGeometry().height * 2), port_width, port_height, 'host-port');
            // port.geometry.offset = new mxPoint(port_y / 2, port_y / 2);
            port.geometry.relative = true;
            port.setConnectable(true);
        }
        return host;
    }

    /**
     * Add Zone
     */
    public addZone(value: TypeData, x: number, y: number): mxgraph.mxCell {
        const width: number = 400;
        const height: number = 400;

        // Create value of cell
        const node = this.createValueElement(value);

        const zone = this.insertVertex(null, null, node, x - width / 2, y - height / 2, width, height, 'zone');
        zone.setConnectable(false);
        return zone;
    }


    private createValueElement(value: TypeData) {
        const doc = mxUtils.createXmlDocument();
        const node = doc.createElement('TypeData');
        node.setAttribute('label', value.name);
        node.setAttribute('type', value.type);
        return node;
    }

    /**
     * Add Circle VM
     */
    public addCircleVm(parent: mxgraph.mxCell, value: TypeData,
        x: number, y: number, radius: number, image?: string, numberPorts?: number): mxgraph.mxCell {
        // Create value of cell
        const doc = mxUtils.createXmlDocument();
        const node = doc.createElement('TypeData');
        node.setAttribute('label', value.name);
        node.setAttribute('type', value.type);

        const vm: mxgraph.mxCell = this.insertVertex(parent, null, node, x - radius, y - radius, 2 * radius, 2 * radius, 'vm');
        if (image) { this.setCellStyles(mxConstants.STYLE_IMAGE, image, [vm]); }
        for (let index = 0; index < numberPorts; index++) {
            const ration_port_vm = 6;
            const radius_port = radius / ration_port_vm;
            const alfa = 2 * Math.PI * index / numberPorts;
            const x: number = 0.5 + 0.5 * Math.cos(alfa);
            const y: number = 0.5 - 0.5 * Math.sin(alfa);
            const delta = 2;
            const offset_x: number = -radius_port + (radius_port + delta) * Math.cos(alfa);
            const offset_y: number = -radius_port - (radius_port + delta) * Math.sin(alfa);
            // const offset: mxPoint = new mxPoint(-10, -10);
            const offset: mxgraph.mxPoint = new mxPoint(offset_x, offset_y);
            // const offset: mxgraph.mxPoint = new mxPoint(0, 0);
            this.addCirclePort(vm, x, y, radius_port, offset);
        }
        vm.setConnectable(false);
        return vm;
    }

    /**
     * Add Circle port
     */
    private addCirclePort(parent: mxgraph.mxCell,
        x: number, y: number, radius: number, offset: mxgraph.mxPoint, image?: string): mxgraph.mxCell {
        const vmPortNode = this.xmlDocument.createElement('VM_PORT');
        const port: mxgraph.mxCell = this.insertVertex(parent, null, vmPortNode, x, y, 2 * radius, 2 * radius, 'port');
        if (image) { this.setCellStyles(mxConstants.STYLE_IMAGE, image, [port]); }
        port.geometry.offset = offset;
        port.geometry.relative = true;
        port.setConnectable(true);
        return port;
    }

}


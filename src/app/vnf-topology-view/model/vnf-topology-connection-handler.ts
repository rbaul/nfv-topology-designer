import { mxgraph, mxgraphFactory } from 'mxgraph-factory';


const { mxClient, mxConnectionHandler, mxGraph, mxGraphModel, mxConstants, mxPerimeter,
     mxUtils, mxEvent, mxVertexHandler, mxStylesheet, renderingHint,
    mxPoint, mxImage, mxPanningHandler, mxEdgeStyle,
    mxCellTracker, mxCellHighlight, mxRubberband, mxKeyHandler, mxCellOverlay, mxMultiplicity } = mxgraphFactory({
        mxLoadResources: false,
        mxLoadStylesheets: false,
    });

export class VnfTopologyConnectionHandler extends mxConnectionHandler {

    constructor(graph?: any, factoryMethod?: any) {
        super(graph, factoryMethod);
    }


    validateConnection(source: any, target: any): any {
        const errors = super.validateConnection(source, target);
        console.log(errors);
        return errors;
    }
}

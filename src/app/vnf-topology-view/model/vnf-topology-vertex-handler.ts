import { mxgraph, mxgraphFactory } from 'mxgraph-factory';

const { mxClient, mxGraph, mxGraphModel, mxConstants, mxPerimeter, mxUtils, mxEvent, mxVertexHandler,
    mxPoint, mxImage, mxCellTracker, mxCellHighlight, mxRubberband, mxKeyHandler, mxCellOverlay, mxMultiplicity } = mxgraphFactory({
        mxLoadResources: false,
        mxLoadStylesheets: false,
    });

export class VnfTopologyVertexHandler extends mxVertexHandler {

    domNode: HTMLDivElement;

    constructor(state: any) {
        super(state);
    }

    init(): void {
        super.init();
        // In this example we force the use of DIVs for images in IE. This
        // handles transparency in PNG images properly in IE and fixes the
        // problem that IE routes all mouse events for a gesture via the
        // initial IMG node, which means the target vertices
        this.domNode = document.createElement('div');
        this.domNode.style.position = 'absolute';
        this.domNode.style.whiteSpace = 'nowrap';

        // Delete
        const img = this.createImage('assets/images/clear.svg');
        img.setAttribute('title', 'Delete');
        img.style.cursor = 'pointer';
        img.style.width = '10px';
        img.style.height = '10px';
        // mxEvent.addGestureListeners(img,
        //     mxUtils.bind(this, function(evt)
        //     {
        //         // Disables dragging the image
        //         mxEvent.consume(evt);
        //     })
        // );
        mxEvent.addListener(img, 'click',
            mxUtils.bind(this, (evt) => {
                this.graph.removeCells([this.state.cell]);
                mxEvent.consume(evt);
            })
        );
        this.domNode.appendChild(img);

        this.state.view.graph.container.appendChild(this.domNode);
        this.redrawTools();
    }

    redraw(): void {
        super.redraw();
        this.redrawTools();
    }

    redrawTools(): void {
        if (this.state != null && this.domNode != null) {
            const dy = (mxClient.IS_VML && document.compatMode == 'CSS1Compat') ? 20 : 4;
            // this.domNode.style.left = (this.state.x + this.state.width - 56) + 'px';
            // this.domNode.style.top = (this.state.y + this.state.height + dy) + 'px';
            this.domNode.style.left = (this.state.x + this.state.width) + 'px';
            this.domNode.style.top = (this.state.y + this.state.height) + 'px';
        }
    }

    destroy(): void {
        super.destroy();
        if (this.domNode != null) {
            this.domNode.parentNode.removeChild(this.domNode);
            this.domNode = null;
        }
    }

    // Workaround for event redirection via image tag in quirks and IE8
    createImage(src): any {
        if (mxClient.IS_IE && !mxClient.IS_SVG) {
            const img = document.createElement('div');
            img.style.backgroundImage = 'url(' + src + ')';
            img.style.backgroundPosition = 'center';
            img.style.backgroundRepeat = 'no-repeat';
            img.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';
            return img;
        } else {
            return mxUtils.createImage(src);
        }
    }

}


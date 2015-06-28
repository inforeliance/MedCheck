(function () {
    
    var quaggaService = function () {
        var state = {
            inputStream: {
                type: "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facing: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 4,
            decoder: {
                readers: ["upc_reader"]
            },
            locate: true
        };
        
        function start() {
            Quagga.init(state, function () {
                Quagga.start();
            });
        }
        
        Quagga.onProcessed(function (result) {
            var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;
            
            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                    });
                }
                
                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
                }
                
                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                }
            }
        });
        
        
        
        function stop(){
            Quagga.stop();
        };
        
        function onDetected(callback) {
            Quagga.onDetected(callback);
        };

        return  {
            start : start,
            stop: stop,
            onDetected: onDetected
        }
    };
    
    var quag = quaggaService();
    
    angular.module("medCheckApp").factory("quagga", function () { 
        return quag;
    });
    
})();
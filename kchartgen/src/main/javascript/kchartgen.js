/**
 * 
 */
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

var KChartGen;
(function(KChartGen){
	var snap,
		width, height,
		title,
		xAxis,yAxis,
		seriesA,seriesB,
		seriesALegend,seriesBLegend,
		chartDimension;
	
	function Point(x,y){
		this.x = x;
		this.y = y;
	}
	
	KChartGen.Constants = {
		MARGIN: 20,
		SERIES_STROKE_WIDTH: 3,
		SERIES_SPLIT_OFFSET: 5
	};
	
	KChartGen.generate = function(data, dimension){
		KChartGen.init(dimension);
		KChartGen.build(data);
	};
	
	KChartGen.init = function(container){
		if(typeof container === 'string'){
			snap = new Snap(container);
			width = $(container).width();
			height = $(container).height();
		} else if(typeof container === 'object'){
			snap = new Snap(width=container.width,height=container.height);  
		} else {
			snap = new Snap(width=400,height=400);
		}
		
		chartDimension = {
			topLeft : new Point(KChartGen.Constants.MARGIN, 100),
			bottomRight: new Point(width-KChartGen.Constants.MARGIN, height-KChartGen.Constants.MARGIN),
		
			height: function(){return this.topLeft.y-this.bottomRight.y},
			width: function(){return this.topLeft.x-this.bottomRight.x}
		};
	};
	
	function getXAxisWidth(){
		return width-2*KChartGen.Constants.MARGIN;
	}
	
	function getXAxisHeight(){
		return height-KChartGen.Constants.MARGIN;
	}
	
	function drawLegend(color, text, fontSize, position){
		var seriesAIconLine = snap.line(position.x, position.y, position.x + 16, position.y);
		seriesAIconLine.attr({
			stroke: color,
			strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		
		var seriesAIconCircle = snap.circle(position.x + 8, position.y, KChartGen.Constants.SERIES_STROKE_WIDTH);
		seriesAIconCircle.attr({
			fill: "#fff",
		    stroke: color,
		    strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		
		var seriesALegendText = snap.text(position.x + 30, position.y + fontSize/2, text);
		seriesALegendText.attr({
			'font-size': fontSize,
			'font-weight': 'bold',
			fill: color
		});
		
		var seriesAIcon = snap.group(seriesAIconLine, seriesAIconCircle);
		
		return snap.group(seriesAIcon, seriesALegendText);
	}
	
	function drawSeries(color, begin, end){
		var lineA = snap.line(begin.x, begin.y, end.x, end.y);
		lineA.attr({
			stroke: color,
			strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		var beginLineA = snap.circle(begin.x, begin.y, KChartGen.Constants.SERIES_STROKE_WIDTH);
		beginLineA.attr({
			fill: "#fff",
		    stroke: color,
		    strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		var endLineA = snap.circle(end.x, end.y, KChartGen.Constants.SERIES_STROKE_WIDTH);
		endLineA.attr({
			fill: "#fff",
		    stroke: color,
		    strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		
		return snap.group(lineA, beginLineA, endLineA);
	}
	
	function preprocess(data){
//		assert(data.seriesA.end == data.seriesB.begin);
		var splitPos = getXAxisWidth() * data.xAxis.splitPosition;
		
		data.seriesA.end = {
				x: splitPos - KChartGen.Constants.SERIES_SPLIT_OFFSET,
				y: getXAxisHeight()
		};
		data.seriesB.begin = {
				x: splitPos + KChartGen.Constants.SERIES_SPLIT_OFFSET,
				y: getXAxisHeight()
		};
		
		if(!data.seriesA.begin.x){
			data.seriesA.begin.x = KChartGen.Constants.MARGIN - KChartGen.Constants.SERIES_SPLIT_OFFSET;
		}
		if(!data.seriesB.end.x){
			data.seriesB.end.x = width - KChartGen.Constants.MARGIN + KChartGen.Constants.SERIES_SPLIT_OFFSET;
		}
		
		var aY = data.seriesA.begin.y;
		var bY = data.seriesB.end.y;
		if(aY <= 1){
			data.seriesA.begin.y = Math.abs(chartDimension.height() * (1-aY)) + chartDimension.topLeft.y; 
		}
		if(bY <= 1){
			data.seriesB.end.y = Math.abs(chartDimension.height() * (1-bY)) + chartDimension.topLeft.y; 
		}
	}
	
	KChartGen.build = function(data){
		preprocess(data);
		
		title = snap.text(KChartGen.Constants.MARGIN, 20, data.title);
		title.attr({
			'font-size': 18,
			'font-weight': 'bold',
			fill: '#000'
		});
		
		var seriesALegendPos = new Point(KChartGen.Constants.MARGIN, 40);
		var seriesBLegendPos = new Point(KChartGen.Constants.MARGIN, 60);
		
		seriesALegend = drawLegend(data.seriesA.color, data.seriesA.label, data.seriesA.fontSize, seriesALegendPos);
		seriesBLegend = drawLegend(data.seriesB.color, data.seriesB.label, data.seriesB.fontSize, seriesBLegendPos);
		
		var xAxisLine = snap.line(KChartGen.Constants.MARGIN, height-KChartGen.Constants.MARGIN, 
							width-KChartGen.Constants.MARGIN, height-KChartGen.Constants.MARGIN);
		xAxisLine.attr({
			stroke: '#666',
			strokeWidth: 1
		});
//		Axis tick, does not exist on original chart
//		var xAxisSplitter = snap.line(250,290,250,310);
//		xAxisSplitter.attr({
//			stroke: '#000',
//			strokeWidth: 2
//		});
		var xAxisLabel = snap.text(data.seriesA.end.x-10, data.seriesA.end.y+20, data.xAxis.splitLabel);
		xAxis = snap.group(xAxisLine,xAxisLabel);
		
		seriesA = drawSeries(data.seriesA.color, data.seriesA.begin, data.seriesA.end);
		seriesB = drawSeries(data.seriesB.color, data.seriesB.begin, data.seriesB.end);
	};
	
	function setSeriesColor(series, legend, color){
		series['0'].attr({stroke: color});
		series['1'].attr({stroke: color});
		series['2'].attr({stroke: color});
		
		legend['0']['0'].attr({stroke: color});
		legend['0']['1'].attr({stroke: color});
		legend['1'].attr({fill: color});
	}
	
	KChartGen.setSeriesAColor = function(color){
		setSeriesColor(seriesA, seriesALegend, color);
	};
	
	KChartGen.setSeriesBColor = function(color){
		setSeriesColor(seriesB, seriesBLegend, color);
	};
	
	KChartGen.setSeriesALegendText = function(label){
		seriesALegend['1'].attr({text: label});
	}
	
	KChartGen.setSeriesBLegendText = function(label){
		seriesBLegend['1'].attr({text: label});
	}
	
	KChartGen.setSeriesABegin = function(pos){
		var p = Math.abs(chartDimension.height() * (1-pos)) + chartDimension.topLeft.y;
		
		seriesA['0'].animate({y1: p}, 100);
		seriesA['1'].animate({cy: p}, 100);
	}
	
	KChartGen.setSeriesBEnd = function(pos){
		var p = Math.abs(chartDimension.height() * (1-pos)) + chartDimension.topLeft.y;
		
		seriesB['0'].animate({y2: p}, 100);
		seriesB['2'].animate({cy: p}, 100);
	}
	
	KChartGen.setTitle = function(label){
		title.attr({text: label});
	}
	
	KChartGen.setXAxisLabelText = function(label){
		xAxis['2'].attr({text : label});
	};
	
	KChartGen.setXAxisLabelPos = function(pos){
		var splitPoint = KChartGen.Constants.MARGIN + (width - 2*KChartGen.Constants.MARGIN) * pos;
		
		seriesA['0'].animate({x2: splitPoint-KChartGen.Constants.SERIES_SPLIT_OFFSET}, 100);
		seriesA['2'].animate({cx: splitPoint-KChartGen.Constants.SERIES_SPLIT_OFFSET}, 100);
		
		seriesB['0'].animate({x1: splitPoint+KChartGen.Constants.SERIES_SPLIT_OFFSET}, 100);
		seriesB['1'].animate({cx: splitPoint+KChartGen.Constants.SERIES_SPLIT_OFFSET}, 100);
		
//		Axis tick, does not exist on original chart
//		xAxis['1'].animate({x1: splitPoint}, 100);
//		xAxis['1'].animate({x2: splitPoint}, 100);
		xAxis['1'].animate({x: splitPoint-10}, 100);
	};
	
	KChartGen.exportSvgBase64 = function(){
		return btoa(unescape(encodeURIComponent(snap.toString())));
	};
	
	KChartGen.exportSvgRaw = function(){
		return snap.toString();
	};
	
	KChartGen.updateSvgLink = function($link){
		return btoa(unescape(encodeURIComponent(snap.toString())));
		 // Works in Firefox 3.6 and Webit and possibly any browser which supports the data-uri
		$link.attr('href', 'data:image/svg+xml;base64,\n'+data);
	};
	
})(KChartGen = KChartGen || {});
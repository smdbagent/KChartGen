/**
 * 
 */
var KChartGen;
(function(KChartGen){
	var snap, 
		xAxis,yAxis,
		seriesA,seriesB;
	
	KChartGen.Constants = {			
		MARGIN: 50,
		SERIES_STROKE_WIDTH: 3,
		SERIES_A_COLOR: "#DD1111",
		
		SERIES_B_COLOR: "#E5E284"
	};
	
	KChartGen.init = function(container){
		if(container){
			snap = new Snap(container);
		} else {
			snap = new Snap(400,400);  
		}
	};
	
	KChartGen.demo = function(){
		var xAxisLine = snap.line(KChartGen.Constants.MARGIN,300,350,300);
		xAxisLine.attr({
			stroke: '#000',
			strokeWidth: 2
		});
		
		var xAxisSplitter = snap.line(250,290,250,310);
		xAxisSplitter.attr({
			stroke: '#000',
			strokeWidth: 2
		});
		
		var xAxisLabel = snap.text(240, 320, '2014');
		
		xAxis = snap.group(xAxisLine,xAxisSplitter,xAxisLabel);
		
		var lineA = snap.line(KChartGen.Constants.MARGIN,200,245,300);
		lineA.attr({
			stroke: KChartGen.Constants.SERIES_A_COLOR,
			strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		var beginLineA = snap.circle(KChartGen.Constants.MARGIN,200,KChartGen.Constants.SERIES_STROKE_WIDTH);
		beginLineA.attr({
			fill: "#fff",
		    stroke: KChartGen.Constants.SERIES_A_COLOR,
		    strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		var endLineA = snap.circle(245,300,KChartGen.Constants.SERIES_STROKE_WIDTH);
		endLineA.attr({
			fill: "#fff",
		    stroke: KChartGen.Constants.SERIES_A_COLOR,
		    strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		
		seriesA = snap.group(lineA,beginLineA,endLineA);
		
		var lineB = snap.line(255,300,350,KChartGen.Constants.MARGIN);
		lineB.attr({
			stroke: KChartGen.Constants.SERIES_B_COLOR,
			strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		var beginLineB = snap.circle(255,300,KChartGen.Constants.SERIES_STROKE_WIDTH);
		beginLineB.attr({
			fill: "#fff",
		    stroke: KChartGen.Constants.SERIES_B_COLOR,
		    strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		var endLineB = snap.circle(350,KChartGen.Constants.MARGIN,KChartGen.Constants.SERIES_STROKE_WIDTH);
		endLineB.attr({
			fill: "#fff",
		    stroke: KChartGen.Constants.SERIES_B_COLOR,
		    strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		
		seriesB = snap.group(lineB,beginLineB,endLineB);
	};
	
	KChartGen.setSeriesAColor = function(color){
		seriesA['0'].attr({stroke: color});
		seriesA['1'].attr({stroke: color});
		seriesA['2'].attr({stroke: color});
	};
	
	KChartGen.setSeriesBColor = function(color){
		seriesB['0'].attr({stroke: color});
		seriesB['1'].attr({stroke: color});
		seriesB['2'].attr({stroke: color});
	};
	
	KChartGen.setXAxisLabelText = function(label){
		xAxis['2'].attr({text : label});
	};
	
	KChartGen.setXAxisLabelPos = function(pos){
		seriesA['0'].animate({x2: KChartGen.Constants.MARGIN + 300*(pos/100)-5}, 100);
		seriesA['2'].animate({cx: KChartGen.Constants.MARGIN + 300*(pos/100)-5}, 100);
		
		seriesB['0'].animate({x1: KChartGen.Constants.MARGIN + 300*(pos/100)+5}, 100);
		seriesB['1'].animate({cx: KChartGen.Constants.MARGIN + 300*(pos/100)+5}, 100);
		
		xAxis['1'].animate({x1: KChartGen.Constants.MARGIN + 300*(pos/100)}, 100);
		xAxis['1'].animate({x2: KChartGen.Constants.MARGIN + 300*(pos/100)}, 100);
		xAxis['2'].animate({x: KChartGen.Constants.MARGIN + 300*(pos/100)-10}, 100);
	};
	
})(KChartGen = KChartGen || {});
/**
 * 
 */
var KChartGen;
(function(KChartGen){
	var snap, 
		xAxis,yAxis,
		seriesA,seriesB,
		seriesALabel,seriesBLabel,
		title;
	
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
		title = snap.text(KChartGen.Constants.MARGIN, 20, 'A SZEGEDI EMBEREK SZEMÉLYES ÉLETMINŐSÉGE');
		title.attr({
			'font-size': 18,
			'font-weight': 'bold',
			fill: '#000'
		});
		
		var seriesAIconLine = snap.line(KChartGen.Constants.MARGIN, 40, KChartGen.Constants.MARGIN + 16, 40);
		seriesAIconLine.attr({
			stroke: KChartGen.Constants.SERIES_A_COLOR,
			strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		
		var seriesAIconCircle = snap.circle(KChartGen.Constants.MARGIN+8, 40, KChartGen.Constants.SERIES_STROKE_WIDTH);
		seriesAIconCircle.attr({
			fill: "#fff",
		    stroke: KChartGen.Constants.SERIES_A_COLOR,
		    strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		
		var seriesALabelText = snap.text(KChartGen.Constants.MARGIN + 30, 45, 'Botka László');
		seriesALabelText.attr({
			'font-size': 12,
			'font-weight': 'bold',
			fill: KChartGen.Constants.SERIES_A_COLOR
		});
		
		var seriesAIcon = snap.group(seriesAIconLine, seriesAIconCircle);
		
		seriesALabel = snap.group(seriesAIcon, seriesALabelText);
		
		
		var seriesBIconLine = snap.line(KChartGen.Constants.MARGIN, 60, KChartGen.Constants.MARGIN + 16, 60);
		seriesBIconLine.attr({
			stroke: KChartGen.Constants.SERIES_B_COLOR,
			strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		
		var seriesBIconCircle = snap.circle(KChartGen.Constants.MARGIN+8, 60, KChartGen.Constants.SERIES_STROKE_WIDTH);
		seriesBIconCircle.attr({
			fill: "#fff",
		    stroke: KChartGen.Constants.SERIES_B_COLOR,
		    strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		
		var seriesBIcon = snap.group(seriesBIconLine, seriesBIconCircle);
		
		var seriesBLabelText = snap.text(KChartGen.Constants.MARGIN + 30, 67, 'Kothencz János');
		seriesBLabelText.attr({
			'font-size': 14,
			'font-weight': 'bold',
			fill: KChartGen.Constants.SERIES_B_COLOR
		});
		
		seriesBLabel = snap.group(seriesBIcon, seriesBLabelText);
		
		var xAxisLine = snap.line(KChartGen.Constants.MARGIN,350,350,350);
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
		
		var xAxisLabel = snap.text(240, 370, '2014');
		
		xAxis = snap.group(xAxisLine,xAxisLabel);
		
		var lineA = snap.line(KChartGen.Constants.MARGIN,250,245,350);
		lineA.attr({
			stroke: KChartGen.Constants.SERIES_A_COLOR,
			strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		var beginLineA = snap.circle(KChartGen.Constants.MARGIN,250,KChartGen.Constants.SERIES_STROKE_WIDTH);
		beginLineA.attr({
			fill: "#fff",
		    stroke: KChartGen.Constants.SERIES_A_COLOR,
		    strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		var endLineA = snap.circle(245,350,KChartGen.Constants.SERIES_STROKE_WIDTH);
		endLineA.attr({
			fill: "#fff",
		    stroke: KChartGen.Constants.SERIES_A_COLOR,
		    strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		
		seriesA = snap.group(lineA,beginLineA,endLineA);
		
		var lineB = snap.line(255,350,350,KChartGen.Constants.MARGIN+50);
		lineB.attr({
			stroke: KChartGen.Constants.SERIES_B_COLOR,
			strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		var beginLineB = snap.circle(255,350,KChartGen.Constants.SERIES_STROKE_WIDTH);
		beginLineB.attr({
			fill: "#fff",
		    stroke: KChartGen.Constants.SERIES_B_COLOR,
		    strokeWidth: KChartGen.Constants.SERIES_STROKE_WIDTH
		});
		var endLineB = snap.circle(350,KChartGen.Constants.MARGIN + 50,KChartGen.Constants.SERIES_STROKE_WIDTH);
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
		
		seriesALabel['0']['0'].attr({stroke: color});
		seriesALabel['0']['1'].attr({stroke: color});
		seriesALabel['1'].attr({fill: color});
	};
	
	KChartGen.setSeriesBColor = function(color){
		seriesB['0'].attr({stroke: color});
		seriesB['1'].attr({stroke: color});
		seriesB['2'].attr({stroke: color});
		
		seriesBLabel['0']['0'].attr({stroke: color});
		seriesBLabel['0']['1'].attr({stroke: color});
		seriesBLabel['1'].attr({fill: color});
	};
	
	KChartGen.setSeriesALabelText = function(label){
		seriesALabel['1'].attr({text: label});
	}
	
	KChartGen.setSeriesBLabelText = function(label){
		seriesBLabel['1'].attr({text: label});
	}
	
	KChartGen.setTitle = function(label){
		title.attr({text: label});
	}
	
	KChartGen.setXAxisLabelText = function(label){
		xAxis['2'].attr({text : label});
	};
	
	KChartGen.setXAxisLabelPos = function(pos){
		seriesA['0'].animate({x2: KChartGen.Constants.MARGIN + 300*(pos/100)-5}, 100);
		seriesA['2'].animate({cx: KChartGen.Constants.MARGIN + 300*(pos/100)-5}, 100);
		
		seriesB['0'].animate({x1: KChartGen.Constants.MARGIN + 300*(pos/100)+5}, 100);
		seriesB['1'].animate({cx: KChartGen.Constants.MARGIN + 300*(pos/100)+5}, 100);
		
//		Axis tick, does not exist on original chart
//		xAxis['1'].animate({x1: KChartGen.Constants.MARGIN + 300*(pos/100)}, 100);
//		xAxis['1'].animate({x2: KChartGen.Constants.MARGIN + 300*(pos/100)}, 100);
		xAxis['1'].animate({x: KChartGen.Constants.MARGIN + 300*(pos/100)-10}, 100);
	};
	
})(KChartGen = KChartGen || {});
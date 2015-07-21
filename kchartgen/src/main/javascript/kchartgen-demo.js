/**
 * 
 */
var KChartGen;
(function(KChartGen){
	KChartGen.DemoData = {			
		TITLE: 'A SZEGEDI EMBEREK SZEMÉLYES ÉLETMINŐSÉGE',
		XAXIS_SPLITLABEL: '2014',
		XAXIS_SPLITPOS: 0.75,
		SERIES_A_COLOR: "#DD1111",
		SERIES_A_LABEL: 'Botka László',
		SERIES_B_COLOR: "#E5E284",
		SERIES_B_LABEL: 'Kothencz János'
	};
	
	KChartGen.demo = function(container){
		var data = {
				title: KChartGen.DemoData.TITLE,
				xAxis: {
					splitLabel: KChartGen.DemoData.XAXIS_SPLITLABEL,
					splitPosition: KChartGen.DemoData.XAXIS_SPLITPOS
				},
				seriesA:{
					fontSize: 12,
					color: KChartGen.DemoData.SERIES_A_COLOR,
					label: KChartGen.DemoData.SERIES_A_LABEL,
					begin: {
//						x: 15,
//						y: 300
						y: 0.2
					}
//					end: {
//						x: 350,
//						y: 380
//					}
				},
				seriesB:{
					fontSize: 14,
					color: KChartGen.DemoData.SERIES_B_COLOR,
					label: KChartGen.DemoData.SERIES_B_LABEL,
//					begin: {
//						x: 350,
//						y: 380
//					},
					end: {
//						x: 585,
//						y: 80
						y: 1
					}
				}
		}
		
		KChartGen.init(container);
		KChartGen.build(data);
	};
})(KChartGen = KChartGen || {});
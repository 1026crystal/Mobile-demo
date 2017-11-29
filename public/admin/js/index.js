$(function(){
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.querySelector('.chart_left'));
        // 指定图表的配置项和数据
        var option1 = {
            title: {
                text: '2017年注册人数'
            },
            tooltip: {},
            legend: {
                data:['人数']
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月"]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                data: [999, 1500, 3000, 2499, 1899, 1000]
            }]
        };
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);

    var myChart2 = echarts.init(document.querySelector('.chart_right'));
    // 指定图表的配置项和数据
    option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪达斯','李宁','安踏','新百伦','特步']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:666, name:'阿迪达斯'},
                    {value:234, name:'李宁'},
                    {value:135, name:'安踏'},
                    {value:948, name:'新百伦'},
                    {value:366, name:'特步'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);




});
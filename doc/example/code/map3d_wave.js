$.ajax({
    url: './data/wave.json',
    success: function (data) {
        var field = [];
        var p = 0;
        for (var j = 0; j < data.ny; j++) {
            field[j] = [];
            for (var i = 0; i < data.nx; i++, p++) {
                data.data[p][0] /= data.max;
                data.data[p][1] /= data.max;
                field[j][i] = data.data[p];
            }
        }
        myChart.setOption({
            title: {
                text: 'Surface Wave Field Visualization',
                subtext: 'Data from http://earth.nullschool.net',
                sublink: 'http://earth.nullschool.net',
                x: 'center',
                textStyle: {
                    color: 'white'
                }
            },
            legend: {
                show: true,
                data: ['wave'],
                x: 'left',
                orient: 'vertical',
                textStyle: {
                    color: 'white'
                }
            },
            tooltip: {
                formatter: '{b}'
            },
            series: [{
                type: 'map3d',

                baseLayer: {
                    backgroundColor: '#136dae',
                    quality: 'high',

                    heightImage: 'asset/elev_bump.jpg'
                },

                light: {
                    enable: true,
                    // Use the system time
                    time: '',
                    sunIntensity: 0.6,
                    ambientIntensity: 0.7
                },

                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: '#d99524',
                        areaStyle: {
                            color: '#d99524'
                        }
                    }
                },
                data: [{}]
            }, {
                name: 'wave',
                type: 'map3d',

                surfaceLayers: [{
                    type: 'particle',
                    distance: 0.5,
                    size: [4096, 2048],
                    particle: {
                        vectorField: field,
                        color: 'white',
                        speedScaling: 0.2,
                        sizeScaling: 2,
                        number: 512 * 512,
                        motionBlurFactor: 0.97
                    }
                }]
            }]
        });
    }
});
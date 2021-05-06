//三十六小時天氣預報
axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-00139A44-161C-4C36-8071-0C0D26A80D86')
    .then(function(response){
    console.log(response.data);
    });

//臺灣各縣市鄉鎮未來1週逐12小時天氣預報
axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-00139A44-161C-4C36-8071-0C0D26A80D86')
    .then(function(response){
    console.log(response.data);
    });

//空氣品質預報資料
axios.get('https://data.epa.gov.tw/api/v1/aqf_p_01?api_key=1710ecd6-f199-47f4-a54e-fa29b8eea7f0')
    .then(function(response){
    console.log(response.data);
    });

//空氣品質指標(AQI)
axios.get('https://data.epa.gov.tw/api/v1/aqx_p_432?api_key=1710ecd6-f199-47f4-a54e-fa29b8eea7f0')
    .then(function(response){
    console.log(response.data);
    });

//紫外線即時監測資料
axios.get('https://data.epa.gov.tw/api/v1/uv_s_01?api_key=1710ecd6-f199-47f4-a54e-fa29b8eea7f0')
    .then(function(response){
    console.log(response.data);
    });

    
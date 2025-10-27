/* eslint-disable */

export const getQueryString = (name) => {
  var query = '';
  var locationQuery = [];
  var queryStr = window.location.href.split('?')[1];
  if (!queryStr) return '';
  if (queryStr.indexOf('#')) {
    queryStr = queryStr.split('#')[0];
  }
  locationQuery = queryStr.split('&');
  for (var i = 0; i < locationQuery.length; i++) {
    if (locationQuery[i].indexOf(name) > -1) {
      query = locationQuery[i].split('=')[1];
    }
  }
  console.log(query);
  return query;
}

export const getIpAddress = () => {
  let protocol = window.location.protocol;
  let queryStr = window.location.host.split(':')[0];
  if (!queryStr) return '';
  console.info(protocol + queryStr);
  if (queryStr) {
      return protocol + '//' + queryStr + ':';
  }
};
export const  deepClone = obj => {
  //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
  var objClone = Array.isArray(obj) ? [] : {};
  //进行深拷贝的不能为空，并且是对象或者是
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}
const setCookie = function(key, value, expiresHours) {
    let cookieString = key + '=' + value
    if (expiresHours) {
        var date = new Date()
        date.setTime(date.getTime + expiresHours * 3600 * 1000)
        cookieString = cookieString + '; expires=' + date.toGMTString()
    }
    document.cookie = cookieString + '; path=/;'
}
const getCookie = function(key) {
    var name = key + '='
    var ca = document.cookie.split(';')
    for (var i = 0, len = ca.length; i < len; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1)
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return 'user_token_29237cb3-a49f-4d7a-a5bb-5510e0ddf966'
}

export function loadGaodeMapScript(key) {
    const mapUrl = `https://webapi.amap.com/maps?v=2.0&key=${key}&callback=onMapCallback`
    return new Promise((resolve, reject) => {
        if (typeof AMap !== 'undefined') {
            resolve(AMap)
            return
        }
        // 百度地图异步加载回调处理
        window.onMapCallback = function() {
            console.log('百度地图脚本初始化成功...')
            resolve(AMap)
        }
        // 创建一个新的script标签
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.charset = 'utf-8'
        script.src = mapUrl
        // 将script标签添加到DOM中
        document.body.appendChild(script)
    })
}

// 高德转百度（火星坐标gcj02ll–>百度坐标bd09ll）
export function gaoDeToBaidu(gd_lon, gd_lat) {
    var PI = (3.14159265358979324 * 3000.0) / 180.0
    var x = gd_lon,
        y = gd_lat
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * PI)
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * PI)
    var bd_lng = z * Math.cos(theta) + 0.0065
    var bd_lat = z * Math.sin(theta) + 0.006
    return {
        lng: bd_lng,
        lat: bd_lat
    }
}

// 百度转高德（百度坐标bd09ll–>火星坐标gcj02ll）
export function baiduToGaoDe(lng, lat) {
    var X_PI = (Math.PI * 3000.0) / 180.0
    var x = lng - 0.0065,
        y = lat - 0.006
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI)
    var bd_lng = z * Math.cos(theta)
    var bd_lat = z * Math.sin(theta)
    return {
        lng: bd_lng,
        lat: bd_lat
    }
}

// 百度和高德经纬度互转
export function BaiduGaoDeLngLatConvert(objInfo, curType, type = 'building') {
    let { positionType } = objInfo
    if ([null, undefined, ''].includes(positionType)) {
        positionType = 1
    }
    if (positionType === curType) {
        return objInfo
    }
    // 百度转高德
    if (positionType === 1 && curType === 2) {
        if (type === 'building') {
            let buildingPosition = objInfo.buildingPosition
            if (buildingPosition) {
                let [lng, lat] = buildingPosition.split(',').map(x => x * 1)
                let res = baiduToGaoDe(lng, lat)
                objInfo.buildingPosition = `${res.lng},${res.lat}`
            }
        } else if (type === 'device') {
            let { lng, lat } = objInfo
            let res = baiduToGaoDe(lng, lat)
            objInfo.lng = res.lng
            objInfo.lat = res.lat
        }
        objInfo.positionType = curType
    }
    // 高德转百度
    if (positionType === 2 && curType === 1) {
        if (type === 'building') {
            let buildingPosition = objInfo.buildingPosition
            if (buildingPosition) {
                let [lng, lat] = buildingPosition.split(',').map(x => x * 1)
                let res = gaoDeToBaidu(lng, lat)
                objInfo.buildingPosition = `${res.lng},${res.lat}`
            }
        } else if (type === 'device') {
            let { lng, lat } = objInfo
            let res = gaoDeToBaidu(lng, lat)
            objInfo.lng = res.lng
            objInfo.lat = res.lat
        }
        objInfo.positionType = curType
    }
    return objInfo
}

export default {
  setCookie,
  getCookie,
  getQueryString,
  getIpAddress,
  deepClone
}

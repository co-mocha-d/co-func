/**
 * 腾讯经纬度转百度地图经纬度
 * @param {Object} lng
 * @param {Object} lat
 */
export function qqMapTransBMap(lng, lat) {
  let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  let x = lng;
  let y = lat;
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  let lngs = z * Math.cos(theta) + 0.0065;
  let lats = z * Math.sin(theta) + 0.006;
  return {
    lng: lngs,
    lat: lats,
  };
}
/**
 * 百度地图经纬度转腾讯地图经纬度
 * @param {Object} lng
 * @param {Object} lat
 */
export function bMapTransQQMap(lng, lat) {
  let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  let x = lng - 0.0065;
  let y = lat - 0.006;
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  let lngs = z * Math.cos(theta);
  let lats = z * Math.sin(theta);
  return {
    lng: lngs,
    lat: lats,
  };
}

/**
 * 高德地图坐标转百度地图坐标
 * @param {number} lng - 高德地图经度
 * @param {number} lat - 高德地图纬度
 * @returns {Array} - 百度地图经度、纬度数组
 */
export function aMapTransBMap(lng, lat) {
  var pi = (3.14159265358979324 * 3000.0) / 180.0;
  var x = lng;
  var y = lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * pi);
  var bd_lng = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  return {
    lng: bd_lng.toFixed(6),
    lat: bd_lat.toFixed(6),
  };
}

/**
 * 将百度地图坐标转换为高德地图坐标
 * @param {number} bdLng - 百度地图经度
 * @param {number} bdLat - 百度地图纬度
 * @returns {Object} - 包含转换后的高德地图经度(lng)和纬度(lat)的对象
 */
export function bMapTransAMap(bdLng, bdLat) {
  var bd_lng = bdLng;
  var bd_lat = bdLat;
  var pi = (3.14159265358979324 * 3000.0) / 180.0;
  var x = bd_lng - 0.0065;
  var y = bd_lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi);
  var gd_lng = z * Math.cos(theta);
  var gd_lat = z * Math.sin(theta);

  return {
    lng: gd_lng,
    lat: gd_lat,
  };
}

/**
 * 计算两个经纬度点之间的距离（单位：米）
 * @param {number} lat1 - 第一个点的纬度（腾讯地图格式）
 * @param {number} lon1 - 第一个点的经度（腾讯地图格式）
 * @param {number} lat2 - 第二个点的纬度（腾讯地图格式）
 * @param {number} lon2 - 第二个点的经度（腾讯地图格式）
 * @return {number} 距离（米）
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // 地球半径（米）
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  // Haversine公式
  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // 返回距离（米）
  return distance;
}

export default {
  qqMapTransBMap,
  bMapTransQQMap,
  aMapTransBMap,
  bMapTransAMap,
  haversineDistance,
};

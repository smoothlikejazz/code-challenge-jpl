function _toRadians(num) { return num * Math.PI / 180; }

/**
 * Using Haversine formula to calculate distance
 * https://en.wikipedia.org/wiki/Haversine_formula
 * @param lat1
 * @param long1
 * @param lat2
 * @param long2
 * @returns {number}
 */
export default(lat1, long1, lat2, long2) => {
    console.log(lat1, long1, lat2, long2)
    const R = 6371; // km
    const x1 = lat2-lat1;
    const dLat = _toRadians(x1);
    const x2 = long2-long1;
    const dLon = _toRadians(x2);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(_toRadians(lat1)) * Math.cos(_toRadians(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    return d;
}
export const kmToMiles = (km) => { return (km * 0.62137).toFixed(2);}




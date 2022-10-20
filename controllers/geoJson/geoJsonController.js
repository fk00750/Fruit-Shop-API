const FruitFarm_geoJson = require("../../models/geoJson");

const get_fruitFarm = async (req, res, next) => {
  try {
    const fruitFarm = await FruitFarm_geoJson.find();

    res.status(200).json({
      success: "true",
      fruitFarmCount: fruitFarm.length,
      fruitFarm: fruitFarm,
    });
  } catch (error) {
    console.log(error);
  }
};

const create_fruitFarm = async (req, res, next) => {
  try {
    const fruitFarm = await FruitFarm_geoJson.create(req.body);

    res.status(201).json({
      success: true,
      data: fruitFarm,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  get_fruitFarm,
  create_fruitFarm,
};

// "name":"san",
// "location" : {
// "type" : "Point",
// "coordinates" : [
//   -122.5,
//   37.7
// ]
// }

// const geo = {
// "geometry" : {
//   "type":"Point",
//   "coordinates": [79.0882, 21.1458]
// },
// "properties": {
//   "item": "Orange",
//   "phone": "2022347336",
//   "address": "1471 P St NW",
//   "city": "Nagpur",
//   "country": "India",
// },
//}

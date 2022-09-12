class APIFeatures {
    constructor(query, queryString) {
      this.query = query; // the "find" query -- Fruits_Model.find()
      this.queryString = queryString; // the query string -- req.query
    }
  
    filter() {
      const queryObj = { ...this.queryString };
  
      // delete uncessary queries
      const dlt_UncessaryQueries = ["page", "sort", "limit", "field"];
      dlt_UncessaryQueries.forEach((dlt) => delete queryObj[dlt]);
  
      this.query = this.query.find(queryObj);
  
      return this;
    }
  
    // sort the data
    sort() {
      if (this.queryString.sort) {
        const SortList = this.queryString.sort.split(",").join(" "); // split by , and join by " " space
        this.query = this.query.sort(SortList);
      } else {
        this.query = this.query.sort("-createdAt");
      }
  
      return this;
    }
  
    //   get the specified field
    field() {
      if (this.queryString.field) {
        const FieldList = this.queryString.field.split(",").join(" ");
        this.query = this.query.select(FieldList);
      } else {
        this.query = this.query.select("-__v");
      }
  
      return this;
    }
  
    pagination() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 10;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
   
      return this
    }
  }
  
  module.exports = APIFeatures;
  
import axios from "axios";

export default {
  getParties: function() {
    return axios.get("/findparties");
  }
};

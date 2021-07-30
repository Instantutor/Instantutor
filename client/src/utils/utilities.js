function removeReqDups(requests) {
  var byId = {};
  for (var i in requests) {
    const id = requests[i]._id;
    byId[id] = requests[i];
  }
  var ret = [];
  const ids = Object.keys(byId);
  for (var i in ids) {
    const id = ids[i];
    ret.push(byId[id]);
  }
  return ret;
}

module.exports = {
  removeReqDups: removeReqDups,
};

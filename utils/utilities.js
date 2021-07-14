const Profile = require("../models/Profile");

function partialMatch(profileName, queryName) {
  //True if segment of profileName contains queryName
  /*Want the length of the segment to be at least 3
    unless profile name is particularly short*/
  var minLength = profileName.length <= 3 ? profileName.length - 1 : 3;
  for (var i = minLength; i <= profileName.length; i++) {
    var substr = profileName.substring(0, i);
    if (substr == queryName) {
      return true;
    }
  }
  return false;
}
async function getTutorMatches(requestFields) {
  //Brute force for now, just return first 5 tutors by id
  const tutors = await Profile.find(
    { role: { $in: ["Tutor", "Both"] } },
    { _id: 1 }
  ).limit(5);
  //max of 5 tutors at the momentreq.user.id
  var tutorArr = [];
  for (var i in tutors) {
    tutorArr.push(tutors[i]["_id"]);
  }
  return tutorArr;
}
module.exports = {
  partialMatch: partialMatch,
  getTutorMatches: getTutorMatches,
};

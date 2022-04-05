const Profile = require("../models/Profile");

//Durstenfeld shuffle
//http://en.wikipedia.org/wiki/Fisher-Yates_shuffle#The_modern_algorithm
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
}

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
async function getTutorMatches(requestFields, currentUserID) {
  //TODO: Make course selection limited so a non-existent course cannot be entered
  //Brute force for now, just return first 5 tutors by id

  //Inputs: Request and user id for the request
  const {
    request,
    course,
    grade,
    topic,
    help_time,
    availability,
    number_sessions,
  } = requestFields;

  var queryArr = [];
  //2 Relevent Request Params
  if (course) queryArr.push({ area: course });
  if (grade) queryArr.push({ degree: grade });
  //Checks user profiles of tutors (role in [Tutor, Both]). This is where
  //it's determined if a tutor can match the request

  const tutors = shuffle(await Profile.find({
    role: { $in: ["Tutor", "Both"] },
    expertise: {
      $elemMatch: { $or: queryArr },
    },
  })
    .populate("user", ["name", "avatar"]))
  // console.log(tutors);
  
  //TODO: Resolve edge case of no tutors that could fill the request
  
  //max of 10 tutors at the moment
  let tutorLimit = 10;
  var tutorArr = [];

  //Fill tutorArr with every tutor that could match the request
  for (var i in tutors) {
    //Don't add if id equal to current user's
    // const user_id = tutors[i]["user"];
    if (tutors[i].user._id != currentUserID) {
      returnField = {
        _id: tutors[i].user._id,
        name: tutors[i].user.name,
        avatar: tutors[i].user.avatar,
        bio: tutors[i].bio,
        state: "UNSEND",
      };
      tutorArr.push(returnField);
    }
    if (tutorArr.length >= tutorLimit) {
      break;
    }
  }
  console.log("MATCHES:")
  console.log(tutorArr)
  //Returns edges from the request to every
  //matchable tutor in the set of tutors
  return tutorArr;
}
module.exports = {
  partialMatch: partialMatch,
  getTutorMatches: getTutorMatches,
};

getTutorMatches({request: "hi", course: "Math"}, "60c103daecc2741050528c66");
module.exports = function partialMatch(profileName, queryName){
    //True if segment of profileName contains queryName
    /*Want the length of the segment to be at least 3
    unless profile name is particularly short*/
    var minLength = profileName.length <= 3 ? profileName.length -1 : 3;
    for(var i = minLength;i<=profileName.length; i++){
        var substr = profileName.substring(0,i);
        if(substr == queryName){
            return true;
        }        
    }
    return false;
}

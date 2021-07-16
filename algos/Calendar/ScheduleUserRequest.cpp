
#include <stdio.h>
#include <iostream>
#include <vector>
#include <map> 
#include <string>

using namespace std;


class ScheduleUserRequest 
{
    public:
       ~ScheduleUserRequest();
        ScheduleUserRequest(vector <int>);
        bool Insert(vector <int>);

    private:
        map <int,int> schedule;

};


ScheduleUserRequest :: ScheduleUserRequest (vector <int> user_request)
{   
    schedule.insert( {user_request[0], user_request[1]} );
};  


bool ScheduleUserRequest :: Insert ( vector <int> tutor_time) 
{
    auto next = schedule.lower_bound(tutor_time[0]);
    if (next != schedule.end() && next->first < tutor_time[1]) return false;
    if (next != schedule.begin() && (--next) -> second > tutor_time[0]) return false;
    schedule[tutor_time[0]] = tutor_time[1];
    return true;
};


int main()
{
    vector <int> vect;
    vector <int> vect2;
    vect.push_back(10);
    vect.push_back(20);
    ScheduleUserRequest *user = new ScheduleUserRequest(vect);
    vect2.push_back(15);
    vect2.push_back(40);
    // cout << "hello";
    cout << user->Insert(vect2) << endl;
}
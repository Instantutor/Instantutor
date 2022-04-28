# -*- coding: utf-8 -*-
"""
Created on Thu Apr 21 21:25:53 2022

@author: Benjamin#2
"""
import json
import time
import os
import pickle
def get_database():
    from pymongo import MongoClient
    import pymongo

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://Adm:instutor@cluster0.s0gxd.mongodb.net/test_db?retryWrites=true&w=majority"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['test_db']



def print_calendar(email, dbname):
    from gcsa.google_calendar import GoogleCalendar
    from gcsa.serializers.event_serializer import EventSerializer

    gc = GoogleCalendar(email, credentials_path='./credentials.json')
    cal_json_list = []
    for events in gc:
        cal_json_list.append(EventSerializer.to_json(events))
    #for i in range(len(cal_json_list)):
    with open('output.json', 'w') as outfile:
        json.dump(cal_json_list[0], outfile)
    add_json(dbname, file_name)

def add_json(dbname, file_name):
    from dateutil import parser
    collection_name  = dbname["test_user_cal"]
    with open(file_name) as file:
        file_data = json.load(file)
    collection_name.insert_one(file_data)
    #f=open(file_name, 'r+')
    #f.seek(0)
    #f.truncate()

if __name__ == "__main__":
    file_name = 'output.json'
    dbname = get_database()
    print_calendar('dino.benj@gmail.com', dbname)
    add_json(dbname, file_name)

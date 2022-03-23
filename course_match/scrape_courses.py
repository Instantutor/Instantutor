import json


class Subject():
    def __init__(self, name="", code="", courses=list()):
        self.name = name
        self.code = code
        self.courses = courses
        
class Course():
    def __init__(self, title="", subj="", crse="", ID="", sections=list()):
        self.title = title
        self.subj = subj
        self.crse = crse
        self.id = ID
        self.sections = sections
        
class Section():
    def __init__(self, crn:int, subj:str, crse, sec):
        self.crn = crn
        self.subj = subj
        self.crse = crse
        self.sec = sec
        
        #TODO Finish attributes
        
        
        
        

def main():
    print("Starting")
    scraped = dict()
    
    with open("../server/config/courses.json", "r") as file:
        scraped = json.load(file)
    
    with open("subj_and_codes.json", "w") as file:
        #subjects = [scraped[i]["name"] for i in range(len(scraped))]
        subjdict = [{"name": scraped[i]["name"], "code": scraped[i]["code"]} for i in range(len(scraped))]
        file.write(json.dumps(subjdict))
        
    with open("subject_list.json", "w") as file:
        subjects = [scraped[i]["name"] for i in range(len(scraped))]
        #subjdict = [{"name": scraped[i]["name"], "code": scraped[i]["code"]} for i in range(len(scraped))]
        file.write(json.dumps(subjects))

    with open("subj_and_courses.json", "w") as file:
        final_list = {"subject_list": [scraped[i]["name"] for i in range(len(scraped))]}
        final_list["course_list"] = {}
        for i in range(len(scraped)):
            final_list["course_list"][scraped[i]["name"]] = [scraped[i]["courses"][j]["title"] for j in range(len(scraped[i]["courses"]))]
        #subjdict = [{"name": scraped[i]["name"], "code": scraped[i]["code"]} for i in range(len(scraped))]
        file.write(json.dumps(final_list))
        
    with open("../client/src/course_list.json", "w") as file:
        final_list = {"subject_list": [scraped[i]["name"] for i in range(len(scraped))]}
        final_list["course_list"] = {}
        for i in range(len(scraped)):
            final_list["course_list"][scraped[i]["name"]] = [scraped[i]["courses"][j]["title"] for j in range(len(scraped[i]["courses"]))]
        #subjdict = [{"name": scraped[i]["name"], "code": scraped[i]["code"]} for i in range(len(scraped))]
        file.write(json.dumps(final_list))
    
    return scraped
    

if __name__ == "__main__":
    """
    name, code, courses
    
    'title', 'subj', 'crse', 'id', 'sections'
    """
    scraped = main()
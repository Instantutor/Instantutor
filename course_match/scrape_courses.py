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
    
    with open("courses.json", "r") as file:
        scraped = json.load(file)
    
    with open("subj_and_codes.json", "w") as file:
        #subjects = [scraped[i]["name"] for i in range(len(scraped))]
        subjdict = [{"name": scraped[i]["name"], "code": scraped[i]["code"]} for i in range(len(scraped))]
        file.write(json.dumps(subjdict))
        
    with open("subject_list.json", "w") as file:
        subjects = [scraped[i]["name"] for i in range(len(scraped))]
        #subjdict = [{"name": scraped[i]["name"], "code": scraped[i]["code"]} for i in range(len(scraped))]
        file.write(json.dumps(subjects))
        
    
    return scraped
    

if __name__ == "__main__":
    """
    name, code, courses
    
    'title', 'subj', 'crse', 'id', 'sections'
    """
    scraped = main()
import json
import random as r

class Person:
    ex_subjects = {"MATH", "CSCI", "PHYS", "COGS", "CHEM"}
    def __init__(self, subj):
        self.subjects = subj.copy()
        
    def match(self, other):
        return len(self.subjects.intersection(other.subjects)) == len(other.subjects)
    
    def __str__(self):
        return str(self.subjects)


class BPG:
    def fromjson(filename="bpgdata.json"):
        with open(filename) as json_file:
            bpgdata = json.load(json_file)
        A = [Person(set(bpgdata["tutors"][i]["subjects"])) for i in range(len(bpgdata["tutors"]))] 
        B = [Person(set(bpgdata["students"][i]["subjects"])) for i in range(len(bpgdata["students"]))] 
                
        return (A, B)
        
    def __init__(self, A, B):
        #O(V+E)
        self.A = A.copy()
        self.B = B.copy()
        self.edges = self.makeEdges()
        # Edges is a list of edges from a to b. Len(edges) = len(A)
        # Len(edges[i]) = len(B)
        
    def makeEdges(self):
        edges = [[None for j in range(len(self.B))] for i in range(len(self.A))]
        for i in range(len(self.A)):
            for j in range(len(self.B)):
                #print(*self.A)
                #print(*self.B)
                edges[i][j] = int(self.A[i].match(self.B[j]))
        return edges
    
    def __getitem__(self, index):
        return self.edges[index]
    
    def __str__(self):
        return str(self.edges)

# https://www.geeksforgeeks.org/maximum-bipartite-matching/

class GFG:
    def __init__(self,graph):
        self.graph = graph
        self.tutors = len(graph)
        self.students = len(graph[0])
        
    def bpm(self, u, matchR, seen, edgedict):
        for v in range(self.students):
            if self.graph[u][v] and seen[v] == False:
                seen[v] = True
                if matchR[v] == None or self.bpm(matchR[v], matchR, seen, edgedict):
                    #print(f"{matchR[v] == None}")
                    matchR[v] = u                    
                    #print(f"v: {v}\nu: {u}")
                    edgedict[v] = u
                    return True
        return False

    def maxBPM(self):
        matchR = [None] * self.students
        result = 0
        edges = dict()
        for i in range(self.tutors):
            seen = [False] * self.students
            if self.bpm(i, matchR, seen, edges):
                result += 1
        return result, edges
    
def printmat(mat):
    for i in mat:
        print(i)

def matchlist(bpg, ans):
    #print(ans[1])
    for i in ans[1].keys():
        #print("i:", i)
        #print("ans[1][i]:", ans[1][i])
        #print(f"{i}:{bpg.A[i]} -> {ans[1][i]}:{bpg.B[ans[1][i]]}")
        print(f"{i}:{bpg.A[ans[1][i]]} -> {ans[1][i]}:{bpg.B[i]}")

def genBPG(n):
    chopped = r.choice(range(0, n-1))
    asize = chopped+1
    bsize = n-chopped-1
    A = [None]*asize
    B = [None]*bsize
    ex = Person.ex_subjects
    
    for i in range(asize):
        subjnum = r.choice(range(len(ex)))+1
        subjects = set(r.sample(ex, subjnum))
        A[i] = Person(subjects)
    
    for i in range(bsize):
        B[i] = Person(set(r.sample(ex, 1)))
    
    return BPG(A, B)

def scanBPG(bpg):
    b = GFG(bpg.edges)
    ans = b.maxBPM()
    printmat(b.graph)
    print("Maximum number of matches is %d " % ans[0])
    matchlist(bpg, ans)

def main():
    og = BPG(*BPG.fromjson())
    
    #scanBPG(og)
    
    for i in range(100):
        testbpg = genBPG(30)
        #print(testbpg)
        scanBPG(testbpg)
    
    
if __name__ == "__main__":
    #r.seed(2)
    main()
# This data structure allows me to search the names of the profiles in the current database quickly in O(n) time. As of right now, I have tailored the data structure to only get the suggested names,  but to increase the speed of the search querry for the user we can look at confirming if the search is correct, return a boolean value and retrieving a proper profile from the database
# ---------------------------------------------------------------------------------------------------------------------------------#

from collections import defaultdict
import sys
import json

# Declaration for nodes of the Trie
class TrieNode:
    def __init__(self):
        self.children = defaultdict(TrieNode)
        self.confirmation = False
        self.parent = None
        
    def __str__(self):
        ans = "\t"
        for child in self.children.keys():
            childnode = self.children[child]
            add = str(self.children[child])
            if len(self.children) == 0:
                add = ""
            ans += '\n"' + str(child) + '":[\n' 
            assert(childnode)
            ans += str(childnode.confirmation).lower() + ", \n{ " + add + "}],"
        
        return str(ans)        


# Tree-Based Data Structure that takes in letters and points it to a respective node using a Default Dictionary. There will be more functions that will be included into this structure as the project progresses (Macine Learning, Heap Frequency List Suggestion, and Persistency, Caching, and more)

class Trie: 

    "Prototypes: Constructor, Build, PrintAll, autosuggestion, serialize, deserialize "

    # Constructor; Establishes the root node of the entire Tree/Trie
    def __init__(self):
        self.root = TrieNode()
        
    
    def __str__(self):
        return "{"+str(self.root)[:-1]+"\n}"

    # This function builds the Trie by iterating through the word and creating respective pointers to other TreeNodes by inserting it as a key:value pair. It iterates through the word and with a traversal pointer and confirms that the word exists by having a boolean storage. Moreover, I pointed a node to its parent in order to go back (this is important for my Serialization Algorithim and establishing levels)

    def Build(self, word: str) -> None:
        curr = self.root  
        for k,i in enumerate(word): curr, curr.parent = curr.children[i], curr 
        curr.confirmation = True 


    # Prints all the words in the DS utilizing Depth First Search (can be shortened for better reading purposes, i.e. creating a DFS function)

    def printAll(self) -> None:
        curr = self.root
        words, dfs = [], [[curr.children, ""]]
        while dfs:
            kids,appender = dfs.pop()
            for i in kids:
                dfs.append( [ kids[i].children , appender + i ] )
                if kids[i].confirmation: words.append( appender + i )
        print(words)


    # This algorithim takes a prefix (inputed through the search bar), goes through it and finds the current pointer. If there is no match, for now, it returns [] (I will code the rest of the algo later and update this comment when I do so). Same DFS algo, will find a way to rewrite this to shorten and read it properly 

    def autosuggestion(self, prefix: str) -> list:
        curr, words = self.root, []
        for letter in prefix:
            if letter not in curr.children: return []
            else: curr = curr.children[ letter ]
        if curr.confirmation: words.append( prefix )
        dfs = [[curr.children, ""]]
        while dfs:
            kids,appender = dfs.pop()
            for kid in kids:
                dfs.append([ kids[ kid ].children, appender + kid ])
                if kids[ kid ].confirmation: words.append( prefix + appender + kid )
        return words


    # *** I wrote an algorithinm that sort of encrypts this Trie into a string and stored in this same folder (serializedtrie.txt) FOR NOW. The original idea is to convert this file into bits and stored Disk or Cache so we can retrieve the file quickly from memory. We can definitely use MongoDB In Storage Memory Store or even push this file into the Data Base in JSON. Having the file here is temporary, so it makes the entire process slow and I need to find a way to create a Persistent Trie/Data Structure which will be difficult. I need to do this in order to quickly update the previous Trie instead of going through the entire process of serializing and deserializng the DS over and over. There will need to be automation for when there is an updated profile to the trie, so this is extremely important to do. As of right now, the names of the profiles have been hardcoded. I am going to leave it as is and come back to it later

    def serialize(self) -> str:
        f = open("./algos/SearchBar/serializedtrie.json","w")
        f.write(str(self))
        f.close()

    #Returns children, adds T/F to child, and links a parent to it
    def convertdict(self, trie, par):
        curr = TrieNode()
        if not trie.keys():
            return curr
        curr.parent = par
        for key in trie.keys():
            #assert(curr)
            curr.children[key] = self.convertdict(trie[key][1], curr)
            curr.confirmation = trie[key][0]
            #assert(curr)
        return curr
        
        
    # Deserializes the string from the file. Need to find a better way code this in a clean format.
    def deserialize(self):
        curr = self.root
        f = open("./algos/SearchBar/serializedtrie.json","r")
        
        
        trie = json.loads(f.read())
        #Rendundant
        for key in trie.keys():
            curr.children[key] = self.convertdict(trie[key][1], curr)
            curr.confirmation = trie[key][0]
        
        f.close()


# Driver for now, when there are more Tries for different search bars I will fix this. Too lazy for now
def main():
    obj = Trie()
    obj.deserialize()
    #print(obj)
    """
    print(obj)
    with open("sample.json", "w") as outfile:
        outfile.write(str(obj))
        outfile.close()
    """
    if len(sys.argv) == 2: print(",".join(obj.autosuggestion(sys.argv[1])))
    elif len(sys.argv) > 2:
        obj.Build(sys.argv[1])
        obj.serialize()
    obj.serialize()
if __name__=="__main__":
    main()



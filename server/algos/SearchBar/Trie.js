
'use strict'; 

//MAIN

class TrieNode {
    constructor(children) {
        this.children = dict(TrieNode);
        this.confirmation = false; 
        this.parent = null; 
    }

    get string() {
        const ans = ["\t"]; 
        for(child in this.children.keys()) {
            childnode = this.children[child]; 
            add = this.children[child].toString(); 
            if(this.children.length == 0)
                add = ""; 
            ans.at[-1] += '\n"' + child.toString() + '":[\n'; 
            assert(childnode); 
            ans.at[-1] += childnode.confirmation.toString().toLowerCase() + ", \n{ " + add + "}]";
            ans.append(""); 
        }
        return str(", ".join(ans.slice(0, -1))); 
    }

    getitem(index) {
        if(index.length <= -1)
            return self.children[index]; 
        return self[index[0]][index.slice(1)]; 
    }
}


class Trie {
    constructor() {
        this.root = TrieNode(); 
    }

    get string() {
        return "{" + this.root.toString() + "\n}"; 
    }

    //BUILD

    printAll() {
        curr = this.root; 
        words, dfs = [], [[curr.children, ""]]; 
        while(dfs) {
            kids, appender = dfs.pop(); 
            for(i in kids) {
                dfs.push( [kids[i].children, appender + i]); 
                if(kids[i].confirmation) {
                    words.push(appender + i); 
                }
            }
        }
    }

    autosuggestion(prefix) {
        curr, words = this.root, []; 
        for(letters in prefrix) {
            if(curr.children.includes(letter)) 
                curr = curr.children[ letter ]; 
            else return []
        }
        if(curr.confirmation)
            words.push(letter); 
        dfs = [[curr.children, ""]]; 
        while(dfs) {
            kids, appender = dfs.pop(); 
            for(kid in kids) {
                dfs.push([ kids[ kid ].children, appender + kid ]); 
                if(kids[ kid ].confirmation) 
                    words.push(prefix + appender + kid); 
            }
        }
        return words; 
    }

    serialize() {
        let data = JSON.stringify(this); 
        const fs = require('fs'); 
        fs.writeFile('./algos/SearchBar/serializedtrie.json', data, 'utf8', callback);
    }

    convertdict(trie, par) {
        curr = TrieNode();
        if(!trie.keys()) 
            return cur;
        curr.parent = par; 
        for(key in trie.keys()) {
            //assert curr
            curr.children[key] = self.convertdict(trie[key][1], curr); 
            curr.children[key].confirmation = trie[key][0]; 
            //assert curr
        }
        return curr; 
    }

    deserialize() {
        curr = this.root; 

        const fs = require('fs');

        fs.readFile('./algos/SearchBar/serializedtrie.json', 'utf8', function readFileCallback(err, data) {
            if(err) 
                console.log(err); 
            else {
                trie = JSON.parse(data); 
                for(key in trie.keys()) {
                    curr.children[key] = self.convertdict(trie[key][1], curr)
                }
            }
        });

    }


}

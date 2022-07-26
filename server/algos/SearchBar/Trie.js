
'use strict'; 
const fs = require('fs');
const { readFileSync } = require('fs');

class TrieNode {
    constructor(children) {
        this.children = {};
        this.confirmation = false; 
        this.parent = null; 
    }

    toObject() {
        var result = [this.confirmation, {}]
        let keys = Object.keys(this.children)
        for(let i in keys) 
            result[1][keys[i]] = this.children[keys[i]].toObject()
        return result
    }

}


class Trie {
    constructor() {
        this.root = new TrieNode(); 
    }

    Build(word) {
        var curr = this.root;
        for(let i = 0; i < word.length; i++) {
            var old = curr;
            if(!Object.keys(curr.children).find(elem => elem == word[i])) {
                curr.children[word[i]] = new TrieNode();
                curr.children[word[i]].parent = curr;
                curr.children[word[i]].confirmation = false; 
            }
            curr = curr.children[word[i]]; 
            curr.parent = old; 
        }
        curr.confirmation = true;
    }

    autosuggestion(prefix) {
        var curr = this.root;
        var words = [];
        var temp_word = []

        // Traversing the structure based on prefix
        for(var i in prefix) {
            // Checking if current prefix letter is in children of current node and traversing/pushing to temp words
            if(Object.keys(curr.children).find(elem => elem == prefix[i])) {
                curr = curr.children[prefix[i]];
                temp_word.push(prefix[i])
            }
            else
                return []; 
        }

        // Edge case for if we've already reached a valid word
        if(curr.confirmation)
            words.push(prefix); 

        // DFS
        var dfs = [[curr.children, ""]]; 
        while(dfs.length > 0) {
            var [kids, appender] = dfs.pop();
            for(var kid in kids) {
                dfs.push([ kids[ kid ].children, appender + kid ]); 
                if(kids[ kid ].confirmation) 
                    words.push(prefix + appender + kid); 
            }
        }
        return words; 
    }

    serialize() {
        var data = this.root.toObject(); 
        data = JSON.stringify(data[1], null, 1);
        fs.writeFile('./serializedtrie.json', data, 'utf8', (err) => {
            if(err)
                console.log(err);
            else {
                console.log("File written succesfully\n");
            }
        })
    }

    convertdict(trie, par) {
        var curr = new TrieNode();
        if(Object.keys(trie).length == 0) 
            return curr;
        curr.parent = par;
        for(var key in trie) {
            curr.children[key] = this.convertdict(trie[key][1], curr); 
            curr.children[key].confirmation = trie[key][0];
        }
        return curr; 
    }

    deserialize() {
        let curr = this.root;
        const data = readFileSync('./serializedtrie.json');
        var trie = (JSON.parse(data));
        for(var key in trie) {
            curr.children[key] = this.convertdict(trie[key][1], curr)
        }
    }
}

if(require.main === module) {
    main();
}

function main() {
    var obj = new Trie();  
    obj.deserialize(); 
    if(process.argv.length == 3) {
        console.log(obj.autosuggestion(process.argv[2])); 
    } else if(process.argv.length > 3) {
        obj.Build(process.argv[2]);
        obj.serialize();
    }
    
}

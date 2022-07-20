
'use strict'; 
const DefaultMap = require('./DefaultMap');
const fs = require('fs');
const { readFileSync } = require('fs');

class TrieNode {
    constructor(children) {
        this.children = new DefaultMap((TrieNode) => []);
        this.confirmation = false; 
        this.parent = null; 
    }

    get string() {
        const ans = ["\t"]; 
        for(child in this.children.keys()) {
            childnode = this.children[child]; 
            add = this.children[child].toString(); 
            if(this.children.size == 0)
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
        this.root = new TrieNode(); 
    }

    get string() {
        return "{" + this.root.toString() + "\n}"; 
    }

    //BUILD
    Build(word) {
        let curr = this.root;
        for(let i = 0; i < word.length; i++) {
            let old = curr;
            curr = curr.children[i]; //undefined
            curr.parent = old; 
        }
        curr.confirmation = true;
    }

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
        fs.writeFile('./serializedtrie.json', data, 'utf8', callback);
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
        let curr = this.root;

        const data = readFileSync('./serializedtrie.json');
        //let trie = new Trie;
        var trie = (JSON.parse(data));
        console.log(trie);
        console.log(trie['t']);
        console.log(trie['t'][1]);
        //console.log(trie.keys.length());
        for(keys in trie) console.log(keys);

        // for(let key = ''; i < trie.) {
        //     console.log('hi');
        //     //console.log(key); 
        //     //curr.children[key] = this.convertdict(trie[key][1], curr);
        // }

        
        // fs.readFileSync('./serializedtrie.json', 'utf8', function readFileCallback(err, data) {
        //     console.log('hi');
        //     if(err)
        //         console.log(err); 
        //     else {
        //         let trie = JSON.parse(data); 
        //         console.log(trie);
        //         for(key in trie.keys()) {
        //             curr.children[key] = self.convertdict(trie[key][1], curr)
        //         }
        //     }
        // });


    }


}

//MAIN
if(require.main === module) {
    main();
}

function main() {
    var obj = new Trie();
    obj.deserialize();

    if(process.argv.length == 2) {
        console.log(",".autosuggestion(process.argv[1]));
    } else if(process.argv.length > 2) {
        obj.Build(process.argv[1]);
        obj.serialize();
    }
    
}


'use strict'; 
const DefaultMap = require('./DefaultMap');
const fs = require('fs');
const { readFileSync } = require('fs');

class TrieNode {
    constructor(children) {
        this.children = {}
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
            return this.children[index]; 
        return this[index[0]][index.slice(1)]; 
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
        var curr = this.root;
        var words = [];

        for(var letter in prefix) {
            console.log(curr.children);
            if(curr.children.find(elem => {
                return Object.keys(elem)[0] == letter
            })) {
                console.log("found"); 
                //curr = curr.children[letter];
            }
            else return []; 
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
        var curr = new TrieNode();
        if(!trie) 
            return curr;
        curr.parent = par; 
        for(var key in trie) {
            //assert curr
            curr.children[key] = this.convertdict(trie[key][1], curr); 
            // curr.children[key].confirmation = trie[key][0];
            //assert curr
        }
        return curr; 
    }

    deserialize() {
        let curr = this.root;

        const data = readFileSync('./serializedtrie.json');
        //let trie = new Trie;
        var trie = (JSON.parse(data));
        // console.log(trie);
        // console.log(trie['t']);
        // console.log(trie['t'][1]);
        for(var key in trie) {
            // console.log(trie[key]);
            // console.log('\n');
            // console.log(trie[key][1]);
            curr.children[key] = this.convertdict(trie[key][1], curr)
        }

        //console.log(curr); 
        // console.log(curr.children['P'].children); 

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

    if(process.argv.length == 3) {
        //console.log(",".autosuggestion(process.argv[1]));
        console.log(obj.autosuggestion(process.argv[2])); 
    } else if(process.argv.length > 3) {
        obj.Build(process.argv[2]);
        obj.serialize();
    }
    
}

# ejson-mark
ejson is a new markup language by ls.  
It's easily, light and quickly.  
Example`Test/main.ejson` :
```
hello : hello
# This is a line of comments
# hello is a string
world : "world"
# of course, u can also use " to represent a string
array : @Test/array.ejson
# include a file as var array
```
Example`Test/array.ejson` :
```
hello
"world"
```
Script example`Test/index.ls` :
```ls
{ ejson } = require "../ejson"
# Test Parse
json = ejson.toJSON "./Test/main.ejson", 0, 4
# u can use ejson.parse to parse ejson to js object
console.log json

# Test stringify
ejson.stringify { json : json }, "./Test/testout.ejson"
```
run :
```json
{
    "hello": "hello",
    "world": "world",
    "array": [
        "hello",
        "world"
    ]
}
```

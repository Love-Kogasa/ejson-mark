{ ejson } = require "../ejson"
# Test Parse
json = ejson.toJSON "./Test/main.ejson", 0, 4
console.log json

# Test stringify
ejson.stringify { json : json }, "./Test/testout.ejson"

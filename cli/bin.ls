args = process.argv.slice 2
{ejson} = require "ejson-mark"
require! chroma
require! fs
log = ->
  console.log  chroma.cyan it
if args.0 is "-p"
  for fname in args.slice 1
    fs.writeFileSync do
      "#fname.json"
      ejson.toJSON "#fname.ejson"
else if args.0 is "-s"
  for fname in args.slice 1
    ejson.stringify do
      JSON.parse  fs.readFileSync "#fname.json"
      "#fname.ejson"
else
  log chroma.green( "Ejson-Lang Command Line Tool V1.0.0" )
  log "  -h help"
  log "  -p <...fname> parse file to json"
  log "  -s <...fname> make json to ejson"
  #log "  -d <...dirname> make dir to json"
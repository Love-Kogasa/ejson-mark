require! fs
export ejson =
  parse : ( file ) ->
    data = fs.readFileSync( file ).toString "utf-8"
    allline = data.split "\n"
    retv = {}
    if allline[0].indexOf(":") is -1
      retv = []
      for line in allline
        lin = line.trim!
        if lin.indexOf("#") is 0 then continue
        retv ++= if lin.indexOf("@") is 0
          @parse( lin.slice 1 )
        else
          try
            JSON.parse lin
          catch err
            lin
    else
      for line in allline
        [ name, value ] = line.split ":"
        if name.trim!.indexOf("#") is 0 then continue
        name = name.trim!
        value = value.trim!
        retv[ name ] = if value.indexOf( "@" ) is 0
          @parse( value.slice 1 )
        else
          try
            JSON.parse value
          catch err
            value
    retv
  stringify : ( data, fname ) ->
    writeString = []
    if Array.isArray data
      for key, line of data
        if typeof value is "object"
          writeString.push "@#key.ejson"
          @stringify value, "#key.ejson"
        else
          writeString.push JSON.stringify(line)
    else
      for key in Object.keys data
        value = data[ key ]
        if typeof value is "object" and Array.isArray value is no
          writeString.push "#key : @#key.ejson"
          @stringify value, "#key.ejson"
        else
          writeString.push "#key : #{JSON.stringify(value)}"
    fs.writeFileSync fname, writeString.join( "\n" )
    writeString.join( "\n" )
  toJSON : ( file, x, g ) ->
    JSON.stringify @parse( file ), x, g
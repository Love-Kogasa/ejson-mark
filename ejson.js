// Generated by LiveScript 1.6.0
(function(){
  var fs, ejson, out$ = typeof exports != 'undefined' && exports || this;
  fs = require('fs');
  out$.ejson = ejson = {
    parse: function(file){
      var data, allline, retv, i$, len$, line, lin, err, ref$, name, value;
      data = fs.readFileSync(file).toString("utf-8");
      allline = data.split("\n");
      retv = {};
      if (allline[0].indexOf(":") === -1) {
        retv = [];
        for (i$ = 0, len$ = allline.length; i$ < len$; ++i$) {
          line = allline[i$];
          lin = line.trim();
          if (lin.indexOf("#") === 0) {
            continue;
          }
          retv = retv.concat(lin.indexOf("@") === 0
            ? this.parse(lin.slice(1))
            : (fn$()));
        }
      } else {
        for (i$ = 0, len$ = allline.length; i$ < len$; ++i$) {
          line = allline[i$];
          ref$ = line.split(":"), name = ref$[0], value = ref$[1];
          if (name.trim().indexOf("#") === 0) {
            continue;
          }
          name = name.trim();
          value = value.trim();
          retv[name] = value.indexOf("@") === 0
            ? this.parse(value.slice(1))
            : (fn1$());
        }
      }
      return retv;
      function fn$(){
        try {
          return JSON.parse(lin);
        } catch (e$) {
          err = e$;
          return lin;
        }
      }
      function fn1$(){
        try {
          return JSON.parse(value);
        } catch (e$) {
          err = e$;
          return value;
        }
      }
    },
    stringify: function(data, fname){
      var writeString, key, line, i$, ref$, len$, value;
      writeString = [];
      if (Array.isArray(data)) {
        for (key in data) {
          line = data[key];
          if (typeof value === "object") {
            writeString.push("@" + key + ".ejson");
            this.stringify(value, key + ".ejson");
          } else {
            writeString.push(JSON.stringify(line));
          }
        }
      } else {
        for (i$ = 0, len$ = (ref$ = Object.keys(data)).length; i$ < len$; ++i$) {
          key = ref$[i$];
          value = data[key];
          if (typeof value === "object" && Array.isArray(value === false)) {
            writeString.push(key + " : @" + key + ".ejson");
            this.stringify(value, key + ".ejson");
          } else {
            writeString.push(key + " : " + JSON.stringify(value));
          }
        }
      }
      fs.writeFileSync(fname, writeString.join("\n"));
      return writeString.join("\n");
    },
    toJSON: function(file, x, g){
      return JSON.stringify(this.parse(file), x, g);
    }
  };
}).call(this);

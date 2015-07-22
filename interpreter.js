function interpret() {
    var inp = getInput();
    var code = getCode();

    var out = bf(code, inp);

    document.getElementsByName("output")[0].value = out.join(" ");
}
function getInput() {
    return document.getElementsByName("input")[0].value.split(" ");
}
function getCode() {
    return document.getElementsByName("code")[0].value;
}
function bf(code, inp){
  var dp = i = 0, cmd, data = [0], len = code.length, out = [];
  
  // -- get loops --
  var loopStarts = {}, loopEnds = {};
  for( var i=0, tmp=[], c$, t; i< len; i++ ){
    c$ = code[i];
    if( c$=="[" ){ tmp.push(i) }
    if( c$=="]" ){ t=tmp.pop(); loopStarts[i] = t; loopEnds[t] = i }
  }
  
  i=0;
  while(i<len){
    cmd = code[i];
    switch(cmd){
      case ">" : dp++; data[dp]=data[dp]||0; break;
      case "<" : dp--; break;
      case "+" : data[dp]=(data[dp]+1)%256; break;
      case "-" : data[dp]=(data[dp]+255)%256; break;
      case "." : out.push(String.fromCharCode(data[dp])); break;
      case ":" : out.push(data[dp]); break;
      case "," : data[dp]=inp.shift().charCodeAt(0); break;
      case ";" : data[dp]=+inp.shift(); break;
      case "[" : i = data[dp] ? i : loopEnds[i]; break;
      case "]" : i = data[dp] ? loopStarts[i]-1 : i; break;
    }
    i++
  }
  
  return out;
}
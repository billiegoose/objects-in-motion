function P(x) { document.getElementById('console').innerHTML += JSON.stringify(x)+'\n' }
function Resource(o){
  this.o = o
}
Resource.options = {
  create: {
    method: 'POST'
  },
  read: {
    method: 'GET'
  },
  update: {
    method: 'PUT'
  },
  delete: {
    method: 'DELETE'
  }  
}
Resource.URImap = new WeakMap()
Resource.prototype.url = function(url){
  Resource.URImap.set(this.o, url)
}
Resource.getJSON = function(o, path, options){
  return window.fetch(path, options)
  .then(response => response.json())
  .then(data => Object.assign(o,data))
}
Resource.prototype.read = function(override_options={}){
  let options = Object.assign({}, Resource.options.read, override_options)
  return Resource.getJSON(o, Resource.URImap.get(o), options)
}
Resource.prototype.update = function(override_options={}){
  let options = {
    body: JSON.stringify(o)
  }
  Object.assign(options, Resource.options.update, override_options)
  return Resource.getJSON(o, Resource.URImap.get(o), options)
}
P('hello')
var o ={}
let r = new Resource(o)
r.url('http://jsonplaceholder.typicode.com/todos/1')
r.read()

setTimeout(() => P(o), 1000)
setTimeout(() => {o.completed = true; r.update()}, 2000)
setTimeout(() => P(o), 3000)
setTimeout(() => {r.read()}, 4000)
setTimeout(() => P(o), 5000)

let b = new Resource(o)
console.log(b)

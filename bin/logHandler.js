
function Watch(data = {}, watchCallback = []) {
    let watchMap = new Map();
    let properties = {
      default: {}
    };
    let useId = '';
    watchCallback.forEach(data => {
      watchMap.set(data.name, {
        type: data.type == 'undefined' ? 'all' : data.type,
        key: data.key,
        method: data.method
      })
    })
    let $this = {};
    var logHandler = {
      get: function (target, key) {
        const watch = watchMap.get(key) || {};
        if (watch.key && (watch.type == 'get' || watch.type == 'all')) {
          if ($this) {
            $this[watch.key]({ type: 'get' })
          } else {
            watch.method({ type: 'get' })
          }
        }
        if (properties[useId] && properties[useId][key]) return properties[useId][key]
        return target[key]
      },
      set: function (target, key, value) {
        if (key == '$$this' && !$this[value.__wxExparserNodeId__]) {
          $this[value.__wxExparserNodeId__] = value;
          properties[value.__wxExparserNodeId__] = {};
          return true;
        }
        const watch = watchMap.get(key) || {};
        if (watch.key && (watch.type == 'set' || watch.type == 'all')) {
          if ($this) {
            $this[watch.key]({ type: 'set', value })
          } else {
            watch.method({ type: 'set', value })
          }
        }
  
        if (properties[useId]) {
          properties[useId][key] = value;
        } else {
          properties.default[key] = value;
        }
  
        $this[useId] && $this[useId].setData({
          [key]: value
        })
        return true;
      }
    };
  
    return {
      setParams: function (id) {
        useId = id;
      },
      proxy: new Proxy(data, logHandler)
    }
  
  }
  module.exports = function (com = {}) {
  
    let properties = {};
    for (let proper in com.properties) {
      properties[proper] = com.properties[proper].value
    }
    const { proxy, setParams } = Watch({ ...properties, ...com.data }, com.watchCallback);
    com.data = proxy;
    com.targetWithLog = com.data;
    com.methods.targetWithLog = function (id) {
      setParams(id)
      return com.data
    };
    com.lifetimes = com.lifetimes || {};
    if (com.lifetimes.ready) {
      const $ready = com.lifetimes.ready;
      com.lifetimes.ready = function () {
        com.data.$$this = this;
  
        $ready.apply(this, arguments);
      }
    } else {
      com.lifetimes.ready = function () {
  
        com.data.$$this = this;
      }
    }
  
    return com;
  
  }
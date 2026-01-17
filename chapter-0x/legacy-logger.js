function log(msg) {
  console.log("[Legacy] " + msg);
}

log.warning = function (msg) {
  console.log("[Legacy WARN] " + msg);
};

// The Critical Part: assigning directly to module.exports
module.exports = log;

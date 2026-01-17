// import * as log from "./legacy-logger.js"; 
// This is called namespace import. Works but conceptually wrong. The Specification Rule: According to the official ECMAScript spec, a "Namespace Object" (the log in import * as log) is never allowed to be a function. It must be a plain object. TS translates import * as log from '...' into a raw require() call

// import log = require("./legacy-logger"); 
// Equivalent of require() in TS. But unlike require which returns any, this imports and maintains correct types. 
// If module config property is set to ESNext or NodeNext which means ES style module, this will throw an error - 
// Import assignment cannot be used when targeting ECMAScript modules. Consider using 'import * as ns from "mod"', 'import {a} from "mod"', 'import d from "mod"', or another module format instead.ts(1202)

import log from "./legacy-logger.js";
// If esModuleInterOp is false, 
// Module '"/Users/armanlalani/Developer/graphql/graphql-tutorial/chapter-0x/legacy-logger"' 
// can only be default-imported using the 'esModuleInterop' flagts(1259) legacy-logger.js(10, 1): 
// This module is declared with 'export =', and can only be used with a default import 
// when using the 'esModuleInterop' flag.

log.warning("Something is wrong");

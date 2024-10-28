function cov_2gpynutubm() {
  var path = "C:\\Users\\aleja\\OneDrive\\Documentos\\maestria\\Ciclo 8\\abcall-web\\src\\main.ts";
  var hash = "d82b3ec056321826805e846d67a66d0c529019e4";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\aleja\\OneDrive\\Documentos\\maestria\\Ciclo 8\\abcall-web\\src\\main.ts",
    statementMap: {
      "0": {
        start: {
          line: 9,
          column: 20
        },
        end: {
          line: 9,
          column: 63
        }
      },
      "1": {
        start: {
          line: 10,
          column: 2
        },
        end: {
          line: 10,
          column: 39
        }
      },
      "2": {
        start: {
          line: 13,
          column: 0
        },
        end: {
          line: 17,
          column: 38
        }
      },
      "3": {
        start: {
          line: 17,
          column: 18
        },
        end: {
          line: 17,
          column: 36
        }
      }
    },
    fnMap: {
      "0": {
        name: "getLocale",
        decl: {
          start: {
            line: 8,
            column: 9
          },
          end: {
            line: 8,
            column: 18
          }
        },
        loc: {
          start: {
            line: 8,
            column: 21
          },
          end: {
            line: 11,
            column: 1
          }
        },
        line: 8
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 17,
            column: 9
          },
          end: {
            line: 17,
            column: 10
          }
        },
        loc: {
          start: {
            line: 17,
            column: 18
          },
          end: {
            line: 17,
            column: 36
          }
        },
        line: 17
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 10,
            column: 9
          },
          end: {
            line: 10,
            column: 38
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 10,
            column: 9
          },
          end: {
            line: 10,
            column: 30
          }
        }, {
          start: {
            line: 10,
            column: 34
          },
          end: {
            line: 10,
            column: 38
          }
        }],
        line: 10
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "d82b3ec056321826805e846d67a66d0c529019e4"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2gpynutubm = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2gpynutubm();
/// <reference types="@angular/localize" />

import { enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import '@angular/localize/init';
function getLocale() {
  cov_2gpynutubm().f[0]++;
  const urlParams = (cov_2gpynutubm().s[0]++, new URLSearchParams(window.location.search));
  cov_2gpynutubm().s[1]++;
  return (cov_2gpynutubm().b[0][0]++, urlParams.get('lang')) || (cov_2gpynutubm().b[0][1]++, 'en');
}
cov_2gpynutubm().s[2]++;
platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [{
    provide: LOCALE_ID,
    useValue: getLocale()
  }]
}).catch(err => {
  cov_2gpynutubm().f[1]++;
  cov_2gpynutubm().s[3]++;
  return console.error(err);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMmdweW51dHVibSIsImFjdHVhbENvdmVyYWdlIiwiZW5hYmxlUHJvZE1vZGUiLCJMT0NBTEVfSUQiLCJwbGF0Zm9ybUJyb3dzZXJEeW5hbWljIiwiQXBwTW9kdWxlIiwiZ2V0TG9jYWxlIiwiZiIsInVybFBhcmFtcyIsInMiLCJVUkxTZWFyY2hQYXJhbXMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNlYXJjaCIsImIiLCJnZXQiLCJib290c3RyYXBNb2R1bGUiLCJwcm92aWRlcnMiLCJwcm92aWRlIiwidXNlVmFsdWUiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJlcnJvciJdLCJzb3VyY2VzIjpbIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJAYW5ndWxhci9sb2NhbGl6ZVwiIC8+XHJcblxyXG5pbXBvcnQgeyBlbmFibGVQcm9kTW9kZSwgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xyXG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL2FwcC9hcHAubW9kdWxlJztcclxuaW1wb3J0ICdAYW5ndWxhci9sb2NhbGl6ZS9pbml0JztcclxuXHJcbmZ1bmN0aW9uIGdldExvY2FsZSgpIHtcclxuICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG4gIHJldHVybiB1cmxQYXJhbXMuZ2V0KCdsYW5nJykgfHwgJ2VuJztcclxufVxyXG5cclxucGxhdGZvcm1Ccm93c2VyRHluYW1pYygpXHJcbiAgLmJvb3RzdHJhcE1vZHVsZShBcHBNb2R1bGUsIHtcclxuICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTE9DQUxFX0lELCB1c2VWYWx1ZTogZ2V0TG9jYWxlKCkgfV0sXHJcbiAgfSlcclxuICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlo7O0FBRUEsU0FBU0UsY0FBYyxFQUFFQyxTQUFTLFFBQVEsZUFBZTtBQUN6RCxTQUFTQyxzQkFBc0IsUUFBUSxtQ0FBbUM7QUFDMUUsU0FBU0MsU0FBUyxRQUFRLGtCQUFrQjtBQUM1QyxPQUFPLHdCQUF3QjtBQUUvQixTQUFTQyxTQUFTQSxDQUFBLEVBQUc7RUFBQU4sY0FBQSxHQUFBTyxDQUFBO0VBQ25CLE1BQU1DLFNBQVMsSUFBQVIsY0FBQSxHQUFBUyxDQUFBLE9BQUcsSUFBSUMsZUFBZSxDQUFDQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDO0VBQUNiLGNBQUEsR0FBQVMsQ0FBQTtFQUM5RCxPQUFPLENBQUFULGNBQUEsR0FBQWMsQ0FBQSxVQUFBTixTQUFTLENBQUNPLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBQWYsY0FBQSxHQUFBYyxDQUFBLFVBQUksSUFBSTtBQUN0QztBQUFDZCxjQUFBLEdBQUFTLENBQUE7QUFFREwsc0JBQXNCLENBQUMsQ0FBQyxDQUNyQlksZUFBZSxDQUFDWCxTQUFTLEVBQUU7RUFDMUJZLFNBQVMsRUFBRSxDQUFDO0lBQUVDLE9BQU8sRUFBRWYsU0FBUztJQUFFZ0IsUUFBUSxFQUFFYixTQUFTLENBQUM7RUFBRSxDQUFDO0FBQzNELENBQUMsQ0FBQyxDQUNEYyxLQUFLLENBQUVDLEdBQUcsSUFBSztFQUFBckIsY0FBQSxHQUFBTyxDQUFBO0VBQUFQLGNBQUEsR0FBQVMsQ0FBQTtFQUFBLE9BQUFhLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDRixHQUFHLENBQUM7QUFBRCxDQUFDLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=
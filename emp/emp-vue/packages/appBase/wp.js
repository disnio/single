module.exports={
  "cache": {
    "version": "1.7.15-noGit-dev",
    "type": "filesystem",
    "cacheDirectory": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\packages\\appBase\\node_modules\\.cache\\webpack",
    "buildDependencies": {
      "config": [
        "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\@efox\\emp-cli\\webpack\\config\\common.js",
        "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\packages\\appBase\\emp-config.js"
      ]
    }
  },
  "watchOptions": {
    "ignored": [
      "**/.git/**",
      "**/node_modules/**"
    ]
  },
  "experiments": {
    "topLevelAwait": true,
    "asyncWebAssembly": true,
    "syncWebAssembly": true
  },
  "mode": "development",
  "devtool": "cheap-module-source-map",
  "output": {
    "path": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\packages\\appBase\\dist",
    "filename": "static/js/[name].[contenthash:8].js",
    "assetModuleFilename": "static/asset/[name].[contenthash:8][ext][query]",
    "publicPath": "http://localhost:3000/",
    "environment": {
      "arrowFunction": false,
      "bigIntLiteral": false,
      "const": false,
      "destructuring": false,
      "forOf": false,
      "dynamicImport": false,
      "module": false
    }
  },
  "resolve": {
    "alias": {
      "src": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\packages\\appBase\\src",
      "@common": "src/components"
    },
    "extensions": [
      ".js",
      ".jsx",
      ".mjs",
      ".ts",
      ".tsx",
      ".css",
      ".less",
      ".scss",
      ".sass",
      ".json",
      ".wasm",
      ".vue",
      ".svg",
      ".svga"
    ],
    "modules": [
      "node_modules",
      "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\packages\\appBase\\node_modules",
      "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\packages\\appBase\\src"
    ]
  },
  "devServer": {
    "port": 3000,
    "firewall": false,
    "historyApiFallback": true,
    "hot": false,
    "headers": {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    "static": [
      {
        "directory": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\packages\\appBase\\public",
        "publicPath": "/"
      }
    ],
    "overlay": true
  },
  "module": {
    "rules": [
      {
        "test": {},
        "exclude": [
          {}
        ],
        "use": [
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\style-loader\\dist\\cjs.js"
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\css-loader\\dist\\cjs.js",
            "options": {
              "modules": false
            }
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\@efox\\emp-cli\\node_modules\\postcss-loader\\dist\\cjs.js",
            "options": {
              "postcssOptions": {
                "hideNothingWarning": true
              }
            }
          }
        ]
      },
      {
        "test": {},
        "use": [
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\style-loader\\dist\\cjs.js"
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\css-loader\\dist\\cjs.js",
            "options": {
              "modules": {
                "localIdentName": "[path][name]-[local]-[hash:base64:5]"
              }
            }
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\@efox\\emp-cli\\node_modules\\postcss-loader\\dist\\cjs.js",
            "options": {
              "postcssOptions": {
                "hideNothingWarning": true
              }
            }
          }
        ]
      },
      {
        "test": {},
        "use": [
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\style-loader\\dist\\cjs.js"
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\css-loader\\dist\\cjs.js",
            "options": {
              "modules": {
                "localIdentName": "[path][name]-[local]-[hash:base64:5]"
              }
            }
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\@efox\\emp-cli\\node_modules\\postcss-loader\\dist\\cjs.js",
            "options": {
              "postcssOptions": {
                "hideNothingWarning": true
              }
            }
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\sass-loader\\dist\\cjs.js",
            "options": {
              "implementation": {
                "info": "dart-sass\t1.32.8\t(Sass Compiler)\t[Dart]\ndart2js\t2.10.5\t(Dart Compiler)\t[Dart]",
                "types": {},
                "NULL": {},
                "TRUE": {
                  "value": true
                },
                "FALSE": {
                  "value": false
                }
              },
              "sourceMap": true
            }
          }
        ]
      },
      {
        "test": {},
        "exclude": [
          {}
        ],
        "use": [
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\style-loader\\dist\\cjs.js"
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\css-loader\\dist\\cjs.js",
            "options": {
              "modules": false
            }
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\@efox\\emp-cli\\node_modules\\postcss-loader\\dist\\cjs.js",
            "options": {
              "postcssOptions": {
                "hideNothingWarning": true
              }
            }
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\sass-loader\\dist\\cjs.js",
            "options": {
              "implementation": {
                "info": "dart-sass\t1.32.8\t(Sass Compiler)\t[Dart]\ndart2js\t2.10.5\t(Dart Compiler)\t[Dart]",
                "types": {},
                "NULL": {},
                "TRUE": {
                  "value": true
                },
                "FALSE": {
                  "value": false
                }
              },
              "sourceMap": true
            }
          }
        ]
      },
      {
        "test": {},
        "exclude": [
          {}
        ],
        "use": [
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\style-loader\\dist\\cjs.js"
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\css-loader\\dist\\cjs.js",
            "options": {
              "modules": false
            }
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\@efox\\emp-cli\\node_modules\\postcss-loader\\dist\\cjs.js",
            "options": {
              "postcssOptions": {
                "hideNothingWarning": true
              }
            }
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\less-loader\\dist\\cjs.js",
            "options": {
              "lessOptions": {
                "javascriptEnabled": true
              }
            }
          }
        ]
      },
      {
        "test": {},
        "use": [
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\style-loader\\dist\\cjs.js"
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\css-loader\\dist\\cjs.js",
            "options": {
              "modules": {
                "localIdentName": "[path][name]-[local]-[hash:base64:5]"
              }
            }
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\@efox\\emp-cli\\node_modules\\postcss-loader\\dist\\cjs.js",
            "options": {
              "postcssOptions": {
                "hideNothingWarning": true
              }
            }
          },
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\less-loader\\dist\\cjs.js"
          }
        ]
      },
      {
        "test": {},
        "use": [
          {
            "loader": "url-loader",
            "options": {
              "esModule": false
            }
          }
        ]
      },
      {
        "test": {},
        "type": "asset"
      },
      {
        "test": {},
        "type": "asset/resource"
      },
      {
        "test": {},
        "type": "asset/resource"
      },
      {
        "test": {},
        "resolve": {
          "fullySpecified": false
        }
      },
      {
        "test": {},
        "exclude": [
          {}
        ],
        "use": [
          {
            "loader": "babel-loader",
            "options": {
              "presets": [
                [
                  null,
                  {
                    "useBuiltIns": "entry",
                    "debug": false,
                    "corejs": 3,
                    "bugfixes": true,
                    "exclude": [
                      "transform-typeof-symbol"
                    ]
                  }
                ],
                "@babel/preset-typescript"
              ],
              "plugins": [
                [
                  null,
                  {
                    "corejs": false,
                    "helpers": true,
                    "version": "7.13.10",
                    "regenerator": true,
                    "useESModules": false,
                    "absoluteRuntime": false
                  }
                ],
                [
                  null,
                  {
                    "legacy": true
                  }
                ],
                [
                  null,
                  {
                    "loose": true
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        "test": {},
        "use": [
          {
            "loader": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\vue-loader\\lib\\index.js"
          }
        ]
      }
    ]
  },
  "optimization": {
    "chunkIds": "named",
    "minimize": false,
    "usedExports": true
  },
  "plugins": [
    {
      "keys": [
        "MODE_ENV",
        "EMP_ENV"
      ],
      "defaultValues": {
        "MODE_ENV": "development",
        "EMP_ENV": "dev"
      }
    },
    {
      "definitions": {
        "process.env.ALLUSERSPROFILE": "\"C:\\\\ProgramData\"",
        "process.env.APPDATA": "\"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\"",
        "process.env.CLion": "\"C:\\\\Program Files\\\\JetBrains\\\\CLion 2019.1\\\\bin;\"",
        "process.env.CommonProgramFiles": "\"C:\\\\Program Files\\\\Common Files\"",
        "process.env.CommonProgramFiles(x86)": "\"C:\\\\Program Files (x86)\\\\Common Files\"",
        "process.env.CommonProgramW6432": "\"C:\\\\Program Files\\\\Common Files\"",
        "process.env.COMPUTERNAME": "\"PC-201701081730\"",
        "process.env.ComSpec": "\"C:\\\\WINDOWS\\\\system32\\\\cmd.exe\"",
        "process.env.DriverData": "\"C:\\\\Windows\\\\System32\\\\Drivers\\\\DriverData\"",
        "process.env.HOMEDRIVE": "\"C:\"",
        "process.env.HOMEPATH": "\"\\\\Users\\\\Administrator\"",
        "process.env.INIT_CWD": "\"D:\\\\www\\\\noda\\\\spa\\\\single\\\\emp\\\\emp-vue\\\\packages\\\\appBase\"",
        "process.env.LOCALAPPDATA": "\"C:\\\\Users\\\\Administrator\\\\AppData\\\\Local\"",
        "process.env.LOGONSERVER": "\"\\\\\\\\PC-201701081730\"",
        "process.env.NODE": "\"C:\\\\Program Files\\\\nodejs\\\\node.exe\"",
        "process.env.npm_config_argv": "\"{\\\"remain\\\":[],\\\"cooked\\\":[\\\"run\\\",\\\"dev\\\"],\\\"original\\\":[\\\"dev\\\"]}\"",
        "process.env.npm_config_bin_links": "\"true\"",
        "process.env.npm_config_ignore_optional": "\"\"",
        "process.env.npm_config_ignore_scripts": "\"\"",
        "process.env.npm_config_init_license": "\"MIT\"",
        "process.env.npm_config_init_version": "\"1.0.0\"",
        "process.env.npm_config_registry": "\"https://regisry.npm.taobao.org\"",
        "process.env.npm_config_save_prefix": "\"^\"",
        "process.env.npm_config_strict_ssl": "\"true\"",
        "process.env.npm_config_user_agent": "\"yarn/1.22.4 npm/? node/v14.15.4 win32 x64\"",
        "process.env.npm_config_version_commit_hooks": "\"true\"",
        "process.env.npm_config_version_git_message": "\"v%s\"",
        "process.env.npm_config_version_git_sign": "\"\"",
        "process.env.npm_config_version_git_tag": "\"true\"",
        "process.env.npm_config_version_tag_prefix": "\"v\"",
        "process.env.npm_execpath": "\"C:\\\\Program Files (x86)\\\\Yarn\\\\bin\\\\yarn.js\"",
        "process.env.npm_lifecycle_event": "\"dev\"",
        "process.env.npm_lifecycle_script": "\"emp dev -wl wp.js\"",
        "process.env.npm_node_execpath": "\"C:\\\\Program Files\\\\nodejs\\\\node.exe\"",
        "process.env.npm_package_dependencies_axios": "\"^0.19.2\"",
        "process.env.npm_package_dependencies_clipboard": "\"^2.0.5\"",
        "process.env.npm_package_dependencies_codemirror": "\"^5.52.0\"",
        "process.env.npm_package_dependencies_connect": "\"^3.7.0\"",
        "process.env.npm_package_dependencies_driver": "\"^1.0.0\"",
        "process.env.npm_package_dependencies_echarts": "\"^4.6.0\"",
        "process.env.npm_package_dependencies_element_ui": "\"^2.13.0\"",
        "process.env.npm_package_dependencies_file_saver": "\"^2.0.2\"",
        "process.env.npm_package_dependencies_globby": "\"^11.0.2\"",
        "process.env.npm_package_dependencies_html2canvas": "\"^1.0.0-rc.5\"",
        "process.env.npm_package_dependencies_increase_memory_limit": "\"^1.0.7\"",
        "process.env.npm_package_dependencies_jsencrypt": "\"^3.0.0-rc.1\"",
        "process.env.npm_package_dependencies_jsonlint": "\"^1.6.3\"",
        "process.env.npm_package_dependencies_jspdf": "\"^2.1.1\"",
        "process.env.npm_package_dependencies_js_cookie": "\"^2.2.1\"",
        "process.env.npm_package_dependencies_loadjs": "\"^4.2.0\"",
        "process.env.npm_package_dependencies_lodash": "\"^4.17.20\"",
        "process.env.npm_package_dependencies_mathjs": "\"^6.6.1\"",
        "process.env.npm_package_dependencies_minireset_css": "\"0.0.6\"",
        "process.env.npm_package_dependencies_moment": "\"^2.24.0\"",
        "process.env.npm_package_dependencies_nprogress": "\"^0.2.0\"",
        "process.env.npm_package_dependencies_performant_array_to_tree": "\"^1.7.1\"",
        "process.env.npm_package_dependencies_screenfull": "\"^4.0.0\"",
        "process.env.npm_package_dependencies_sortablejs": "\"^1.12.0\"",
        "process.env.npm_package_dependencies_vue": "\"^2.6.12\"",
        "process.env.npm_package_dependencies_vuex": "\"^3.6.2\"",
        "process.env.npm_package_dependencies_vue_router": "\"^3.5.1\"",
        "process.env.npm_package_devDependencies_node_polyfill_webpack_plugin": "\"^1.0.3\"",
        "process.env.npm_package_devDependencies_serve": "\"^11.3.2\"",
        "process.env.npm_package_devDependencies_stream_browserify": "\"^3.0.0\"",
        "process.env.npm_package_devDependencies__efox_emp_cli": "\"^1.4.0\"",
        "process.env.npm_package_devDependencies__efox_emp_vue2": "\"^1.2.0\"",
        "process.env.npm_package_license": "\"MIT\"",
        "process.env.npm_package_main": "\"index.js\"",
        "process.env.npm_package_name": "\"appBase\"",
        "process.env.npm_package_private": "\"true\"",
        "process.env.npm_package_scripts_build": "\"emp build --env prod\"",
        "process.env.npm_package_scripts_dev": "\"emp dev -wl wp.js\"",
        "process.env.npm_package_scripts_emp": "\"emp\"",
        "process.env.npm_package_scripts_start": "\"emp serve\"",
        "process.env.npm_package_scripts_stat": "\"emp build --analyze\"",
        "process.env.npm_package_version": "\"1.0.0\"",
        "process.env.NUMBER_OF_PROCESSORS": "\"4\"",
        "process.env.OneDrive": "\"C:\\\\Users\\\\Administrator\\\\OneDrive\"",
        "process.env.OS": "\"Windows_NT\"",
        "process.env.Path": "\"C:\\\\Users\\\\ADMINI~1\\\\AppData\\\\Local\\\\Temp\\\\yarn--1615904829572-0.497144123518817;D:\\\\www\\\\noda\\\\spa\\\\single\\\\emp\\\\emp-vue\\\\packages\\\\appBase\\\\node_modules\\\\.bin;C:\\\\Users\\\\Administrator\\\\AppData\\\\Local\\\\Yarn\\\\Data\\\\link\\\\node_modules\\\\.bin;D:\\\\www\\\\noda\\\\spa\\\\single\\\\emp\\\\emp-vue\\\\node_modules\\\\.bin;C:\\\\Program Files\\\\libexec\\\\lib\\\\node_modules\\\\npm\\\\bin\\\\node-gyp-bin;C:\\\\Program Files\\\\lib\\\\node_modules\\\\npm\\\\bin\\\\node-gyp-bin;C:\\\\Program Files\\\\nodejs\\\\node_modules\\\\npm\\\\bin\\\\node-gyp-bin;C:\\\\WINDOWS\\\\system32;C:\\\\WINDOWS;C:\\\\WINDOWS\\\\System32\\\\Wbem;C:\\\\WINDOWS\\\\System32\\\\WindowsPowerShell\\\\v1.0\\\\;c:\\\\Python27;c:\\\\Python27\\\\Scripts;c:\\\\Program Files\\\\MongoDB\\\\Server\\\\3.4\\\\bin;C:\\\\Program Files\\\\Microsoft SQL Server\\\\Client SDK\\\\ODBC\\\\110\\\\Tools\\\\Binn\\\\;E:\\\\Software\\\\Tool\\\\cmder;C:\\\\WINDOWS\\\\System32\\\\OpenSSH\\\\;C:\\\\Users\\\\Administrator\\\\AppData\\\\Local\\\\Yarn\\\\bin;C:\\\\Program Files\\\\Microsoft SQL Server\\\\Client SDK\\\\ODBC\\\\170\\\\Tools\\\\Binn\\\\;C:\\\\Program Files\\\\TortoiseGit\\\\bin;C:\\\\Program Files (x86)\\\\mingw-w64\\\\i686-8.1.0-posix-dwarf-rt_v6-rev0\\\\mingw32\\\\bin;C:\\\\Program Files\\\\CMake\\\\bin;C:\\\\Program Files\\\\Git;C:\\\\Program Files (x86)\\\\Yarn\\\\bin\\\\;C:\\\\Program Files\\\\Microsoft VS Code\\\\bin;C:\\\\Program Files\\\\nodejs\\\\;C:\\\\Users\\\\Administrator\\\\AppData\\\\Local\\\\Microsoft\\\\WindowsApps;C:\\\\Program Files\\\\JetBrains\\\\WebStorm 2018.3.2\\\\bin;C:\\\\Program Files\\\\JetBrains\\\\CLion 2019.1\\\\bin;E:\\\\Program Files (x86)\\\\Microsoft VS Code\\\\bin;C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\npm\"",
        "process.env.PATHEXT": "\".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JSE;.WSF;.WSH;.MSC;.CPL\"",
        "process.env.PROCESSOR_ARCHITECTURE": "\"AMD64\"",
        "process.env.PROCESSOR_IDENTIFIER": "\"AMD64 Family 16 Model 5 Stepping 3, AuthenticAMD\"",
        "process.env.PROCESSOR_LEVEL": "\"16\"",
        "process.env.PROCESSOR_REVISION": "\"0503\"",
        "process.env.ProgramData": "\"C:\\\\ProgramData\"",
        "process.env.ProgramFiles": "\"C:\\\\Program Files\"",
        "process.env.ProgramFiles(x86)": "\"C:\\\\Program Files (x86)\"",
        "process.env.ProgramW6432": "\"C:\\\\Program Files\"",
        "process.env.PROMPT": "\"$P$G\"",
        "process.env.PSModulePath": "\"C:\\\\Users\\\\Administrator\\\\Documents\\\\WindowsPowerShell\\\\Modules;C:\\\\Program Files\\\\WindowsPowerShell\\\\Modules;C:\\\\WINDOWS\\\\system32\\\\WindowsPowerShell\\\\v1.0\\\\Modules\"",
        "process.env.PUBLIC": "\"C:\\\\Users\\\\Public\"",
        "process.env.SystemDrive": "\"C:\"",
        "process.env.SystemRoot": "\"C:\\\\WINDOWS\"",
        "process.env.TEMP": "\"C:\\\\Users\\\\ADMINI~1\\\\AppData\\\\Local\\\\Temp\"",
        "process.env.TMP": "\"C:\\\\Users\\\\ADMINI~1\\\\AppData\\\\Local\\\\Temp\"",
        "process.env.USERDOMAIN": "\"PC-201701081730\"",
        "process.env.USERDOMAIN_ROAMINGPROFILE": "\"PC-201701081730\"",
        "process.env.USERNAME": "\"Administrator\"",
        "process.env.USERPROFILE": "\"C:\\\\Users\\\\Administrator\"",
        "process.env.VS140COMNTOOLS": "\"C:\\\\Program Files (x86)\\\\Microsoft Visual Studio 14.0\\\\Common7\\\\Tools\\\\\"",
        "process.env.WEBPACK_DEV_SERVER": "\"true\"",
        "process.env.WebStorm": "\"C:\\\\Program Files\\\\JetBrains\\\\WebStorm 2018.3.2\\\\bin;\"",
        "process.env.windir": "\"C:\\\\WINDOWS\"",
        "process.env.WSLENV": "\"WT_SESSION::WT_PROFILE_ID\"",
        "process.env.WT_PROFILE_ID": "\"{61c54bbd-c2c6-5271-96e7-009a87ff44bf}\"",
        "process.env.WT_SESSION": "\"97727125-f17e-4c2c-9891-1ee8b4abf550\"",
        "process.env.YARN_WRAP_OUTPUT": "\"false\"",
        "process.env": "{}"
      }
    },
    {
      "dangerouslyAllowCleanPatternsOutsideProject": false,
      "dry": false,
      "verbose": false,
      "cleanStaleWebpackAssets": true,
      "protectWebpackAssets": true,
      "cleanAfterEveryBuildPatterns": [],
      "cleanOnceBeforeBuildPatterns": [
        "**/*"
      ],
      "currentAssets": [],
      "initialClean": false,
      "outputPath": ""
    },
    {
      "patterns": [
        {
          "from": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\packages\\appBase\\public",
          "to": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\packages\\appBase\\dist",
          "globOptions": {
            "ignore": [
              "*.DS_Store",
              "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\@efox\\emp-cli\\template\\public\\index.html",
              "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\@efox\\emp-cli\\template\\public\\favicon.ico"
            ]
          },
          "noErrorOnMissing": true
        }
      ],
      "options": {}
    },
    {
      "userOptions": {
        "title": "app Base",
        "template": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\@efox\\emp-cli\\template\\public\\index.html",
        "favicon": "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\node_modules\\@efox\\emp-cli\\template\\public\\favicon.ico",
        "files": {
          "css": [],
          "js": []
        },
        "minify": false
      },
      "version": 5
    },
    {
      "_options": {
        "name": "appBase",
        "filename": "emp.js",
        "exposes": {
          "./store": "./src/store/index",
          "@common": "./src/components"
        },
        "remotes": {
          "@app2": "app2@http://localhost:3002/emp.js",
          "@app1": "app1@http://localhost:3001/emp.js"
        },
        "shared": [
          "vue/dist/vue.esm.js",
          "vue-router",
          "vuex"
        ]
      }
    },
    {
      "profile": false,
      "modulesCount": 5000,
      "dependenciesCount": 10000,
      "showEntries": true,
      "showModules": true,
      "showDependencies": true,
      "showActiveModules": true,
      "options": {
        "name": "webpack",
        "color": "green",
        "reporters": [
          "fancy"
        ],
        "reporter": null,
        "profile": true
      },
      "reporters": [
        {}
      ]
    },
    {},
    {}
  ],
  "entry": {
    "index": [
      "D:\\www\\noda\\spa\\single\\emp\\emp-vue\\packages\\appBase\\src\\main.js"
    ]
  }
}
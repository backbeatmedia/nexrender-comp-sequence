# nexrender-action-sequence-comps

This plugin causes comps in the target project to be combined into one comp before rendering

## Install

`npm install nexrender-comp-sequence`

## How to use

1. Add this module as a pre-download action
2. Add an array of comps to sequence as `sequence`. They will be sequenced in the order you list them
3. The target comp you name in the job definition will be used as a template, so it must exist in the AE project




```json
{
    "template": {
        "src": "http://www.foo.com/template.aep",
        "composition": "used-as-a-template"
    },
    "actions": {
        "predownload": [
            {
                "module": "nexrender-comp-sequence",
                "sequence": [
                    {
                        "comp": "first-comp"
                    },
                    {
                        "comp": "second-comp",
                        "extend": true // if true - all layers' out-points & comp work area duration will be extended so that the longest piece of footage is fully used
                    },
                    { 
                        "comp": "third-comp"
                    }
                ]
            }
        ],

```

## Notes

The new comp will only contain the work areas - other parts will be trimmed off

This plugin is based on the excellent MOGRT action which you can find here
https://github.com/vonstring/nexrender-action-mogrt-template


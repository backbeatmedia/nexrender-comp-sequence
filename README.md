# nexrender-action-sequence-comps

This plugin causes comps in the target project to be combined into one comp before rendering

## Install

`npm install nexrender-comp-sequence`

## How to use

1. Add this module as the last pre-render action
2. Add an array of comps to sequence as `sequence`. They will be sequenced in the order you list them
3. The target comp you supply will be used as a template




```json
{
    "template": {
        "src": "http://www.foo.com/template.aep",
        "composition": "used-as-a-template"
    },
    "actions": {
        "prerender": [
            {
                "module": "nexrender-comp-sequence",
                "sequence": [
                    "first-comp-to-be-added",
                    "second-comp",
                    "third-comp" 
                ]
            }
        ],

```

## Notes

The new comp will only contain the work areas - other parts will be trimmed off


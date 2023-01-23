# nexrender-action-sequence-comps

This plugin causes comps in the target projkect to be combined into one comp before rendering

## Install

`npm install nexrender-action-sequence-comps`

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
                "module": "nexrender-action-sequence-comps",
                "sequence": [
                    "first-comp-to-be-added",
                    "second-comp",
                    "third-comp" 
                ]
            }
        ],

```

## Notes



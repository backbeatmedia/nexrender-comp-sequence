const path = require('path');
const url = require('url');

module.exports = async (job, settings, options, type) => {
    settings.logger = settings.logger ?? console;
    const jsxUrl = url.pathToFileURL(path.join(__dirname, 'sequenceComps.jsx')).toString();
    
    settings.logger.log(`path to script = ${jsxUrl}`)
    
    // module runs in predownload mode only
    if (type == 'predownload') {

        // if a sequence of comps has been defined ...
        if (typeof options.sequence !== 'undefined') {
            
            // ... add the AE script as an asset to be run at render time ...
            job.assets.push({
                src: jsxUrl,
                keyword: '_sequence',
                type: 'script',

                // ... with the supplied sequence as a parameter
                // and the original comp as a template
                parameters: [
                    {
                        key: 'sequence',
                        value: options.sequence
                    },
                    {
                        key: "template",
                        value: job.template.composition
                    }
                ]
            })
        }    

        // and change the supplied render sequence to the name which will be generated by the AE script
        job.template.composition = '__sequence__';

        return job;

    } else {

        throw Error("'nexrender-comp-sequence' module should be used only in 'predownload' section");
    }
}
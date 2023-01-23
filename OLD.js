const StreamZip = require('node-stream-zip');
const path = require('path');
const url = require('url');
const fs = require('fs/promises');

module.exports = async (job, settings, options, type) => {
    settings.logger = settings.logger ?? console;
    const jsxUrl = url.pathToFileURL(path.join(__dirname, 'applyEssentialValues.jsx')).toString();
    if (type === 'predownload') {
        if (typeof options.essentialParameters !== 'undefined') {
            job.assets.push({
                src: jsxUrl,
                keyword: '_essential',
                type: 'script',
                parameters: [
                    {
                        key: 'essentialParameters',
                        value: Object.assign({}, options.essentialParameters)
                    }
                ]
            })
        }

        // self-add this module as prerender action as well
        if (!job.actions.prerender) {
            job.actions.prerender = [];
        }
        job.actions.prerender.push({...options,
            module: __filename,
            automaticallyAdded: true
        });
        job.template.composition = '__mogrt__';
        return job;
    } else if (type === 'prerender' && options.automaticallyAdded) {
        if(path.extname(job.template.dest).toLowerCase() !== ".mogrt"){
            settings.logger.log(`[${job.uid}] [action-mogrt-template] skipping - template file should have .mogrt extension`);
            return job;
        }    

        const { Mogrt } = await import('mogrt');
        const mogrt = new Mogrt(job.template.dest);
        await mogrt.init();

        if (!mogrt.isAfterEffects()) {
            throw Error('[action-mogrt-template] ERROR - .mogrt was not made with After Effects');
        }
        const manifest = await mogrt.getManifest();
        const compName = manifest.sourceInfoLocalized.en_US.name;

        const asset = job.assets.find(a => a.src === jsxUrl);
        asset.parameters.push({
            key: 'composition',
            value: compName
        });
        
        const filenames = await mogrt.extractTo(job.workpath);
        const template = filenames.find(fn => path.extname(fn).toLowerCase() === '.aep');
        if (!template) {
            throw Error(`[${job.uid}] [action-mogrt-template] ERROR - no AE file found in the .mogrt (extension .aep)`);
        }

        settings.logger.log(`[${job.uid}] [action-mogrt-template] setting new template path to: ${template}`);

        job.template.dest = template;
        job.template.extension = "aep";
        return job;
    } else {
        throw Error("'action-mogrt-template' module should be used only in 'predownload' section");
    }
}
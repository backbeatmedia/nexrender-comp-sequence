    (function () {
    function emptyDuplicate(comp, name) {
        return app.project.items.addComp(name, comp.width, comp.height, comp.pixelAspect, comp.duration, comp.frameRate);
    }

    function compByName(name) {
        for (var i = 1; i <= app.project.items.length; i++) {
            var item = app.project.items[i];
            if (item instanceof CompItem && item.name === name) {
                return item;
            }
        }
    }

    // get the name of the original comp supplied to nexrender
    var templateCompName = typeof _sequence!== 'undefined' && _sequence.get('template') || 'Comp 1';

    // get the template comp itself
    var templateComp = compByName(templateCompName);

    // make an emply duplicate with the same name as has been left with nexrender
    var comp = emptyDuplicate(templateComp, "__sequence__");
    
    // get the sequence of comps to create
    var sequenceParameters = typeof _sequence!== 'undefined' && _sequence.get('sequence') || [];

    // beginning at the top of the new empty comp
    var insertTime = 0;

    // for each comp referenced in the list
    for (var i = 0; i < sequenceParameters.length; i++) {

        // get it from the app
        var addComp = compByName(sequenceParameters[i]);
  
        // add it 
        var newLayer = comp.layers.add(addComp);
        
        // and to the bottom of the stack
        newLayer.moveToEnd();
        
        //move it back if required to the current start point, accounting for the working area of the new comp
        newLayer.startTime = insertTime - addComp.workAreaStart;
        
        // trim the layer in point to the edit point
        newLayer.inPoint = insertTime;
        
        // trim the layer outpoint to the end of the new added comp work area
        newLayer.outPoint = insertTime + addComp.workAreaDuration;
        
        // remember where we ended
        insertTime = insertTime + addComp.workAreaDuration;
     
    }

    // extend the new comp to fit in all the added layers
    comp.displayStartTime = 0;
   

    comp.duration = insertTime;
 

    comp.workAreaDuration = insertTime;
 

})();
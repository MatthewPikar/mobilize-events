/**
 * Created by mattpiekarczyk on 11/4/15.
 */
"use strict"

var _ = require('lodash')
var options = {}

for(var i= 2, len=process.argv.length; i<len; i++){
    var argument = process.argv[i].split(':')
    options[argument[0]] = argument[1]
}

_.extend(options, {
    resourceName: 'events',
    resourceFormat: {
        required$: ['sourceId','name'],
        only$: ['id','sourceId','name','created','modified','date','duration','location','description'],
        id: 'string$',
        sourceId: 'string$',
        name: 'string$',
        created: 'string$',
        modified: 'string$',
        date: 'string$',
        duration: 'integer$',
        location: 'string$',
        description: 'string$'
    }
})

var resourceService = require('resource-service')
require('seneca')()
    .use('redis-transport')
    .use(resourceService, options)
    .listen({type:'redis', pin:'role:events,cmd:get'})
    .listen({type:'redis', pin:'role:events,cmd:query'})
    .listen({type:'redis', pin:'role:events,cmd:add'})
    .listen({type:'redis', pin:'role:events,cmd:modify'})
    .listen({type:'redis', pin:'role:events,cmd:delete'})
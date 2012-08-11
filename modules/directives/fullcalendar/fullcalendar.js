/*
*  Implimentation of JQuiery FullCalendar inspired by http://arshaw.com/fullcalendar/
*
*  Calendar Directive that takes in live events as attributes and then calls fullCalendar(attrs) to render the events correctly. 
*  fullCalendar.js is refrenced in ../../common/fullcalendar.js 
*/

angular.module('ui.directives').directive('fullCalendar',['ui.config', function (uiConfig) {
    'use strict';

    uiConfig.fullcalendar = uiConfig.fullcalendar || {};
    //returns the fullcalendar
    return {
                restrict : "A",
                replace : true,
                transclude : true,
                scope: {
                  events: '='
                },   

    template : 
                //Simple template
                "<div id=\"calendar\" style=\"height:550px;width:100%\"></div>",
                
                link : function( scope,$element, $attrs ) {

                       //render the urls for the events. Adds a link to the event object inserted into the attribute. 
                       //This is where the events can be manipulated if need be. 
                       for(var i = 0;i < scope.events.length;i++){

                         scope.events[i].url =  "http://www.angularjs.org";
                         
                        } 
                        //Call the fullCalendar method with whatever attributes needed. 
                        scope.calendar = $('#calendar').fullCalendar({
                            theme: true,
                            header: {
                                left: 'prev,next today',
                                center: 'title',
                                right: 'month,agendaWeek,agendaDay'
                            },
        
                            editable: true,
                            slotMinutes: 15,

                            // add event name to title attribute on mouseover. Dont really need this, but its cool. 
                            eventMouseover: function(event, jsEvent, view) {
                                if (view.name !== 'agendaDay') {
                                    $(jsEvent.target).attr('title', event.title);
                                }
                            },

                            // Calling the events from the scope.  :)
                            events: scope.events,
                        });
                    }
                }
            }]);

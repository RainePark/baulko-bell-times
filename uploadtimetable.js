// code is obfuscated to prevent stealing sorry :(
// if you have a valid reason for needing to see the code, please contact ergret@pm.me
var _0x39b3eb=_0x1057;function _0x1057(_0x1861fd,_0x17ebe4){var _0x55d7c3=_0x55d7();return _0x1057=function(_0x10575f,_0xd49c5b){_0x10575f=_0x10575f-0x11d;var _0x58f58e=_0x55d7c3[_0x10575f];return _0x58f58e;},_0x1057(_0x1861fd,_0x17ebe4);}(function(_0x3b1772,_0x32a79d){var _0x224423=_0x1057,_0x39c36d=_0x3b1772();while(!![]){try{var _0x560c33=-parseInt(_0x224423(0x120))/0x1*(-parseInt(_0x224423(0x149))/0x2)+parseInt(_0x224423(0x12d))/0x3*(-parseInt(_0x224423(0x13c))/0x4)+-parseInt(_0x224423(0x131))/0x5*(parseInt(_0x224423(0x133))/0x6)+parseInt(_0x224423(0x13b))/0x7*(parseInt(_0x224423(0x143))/0x8)+-parseInt(_0x224423(0x145))/0x9+-parseInt(_0x224423(0x11d))/0xa+parseInt(_0x224423(0x146))/0xb;if(_0x560c33===_0x32a79d)break;else _0x39c36d['push'](_0x39c36d['shift']());}catch(_0x1001b5){_0x39c36d['push'](_0x39c36d['shift']());}}}(_0x55d7,0x55c2e));var myFile=document[_0x39b3eb(0x13e)](_0x39b3eb(0x129)),jcaldata,jsontimetable,days=[_0x39b3eb(0x134),'Monday',_0x39b3eb(0x14a),_0x39b3eb(0x137),'Thursday','Friday','Saturday'];myFile[_0x39b3eb(0x144)](_0x39b3eb(0x138),function(){var _0x424af8=_0x39b3eb,_0x6e360a=new FileReader();_0x6e360a['onload']=function(){jcaldata=ICAL['parse'](_0x6e360a['result'])[0x2],parseTimetable();},_0x6e360a[_0x424af8(0x127)](this['files'][0x0]);}),Date[_0x39b3eb(0x126)]['addDays']=function(_0xa91e95){var _0x1dd364=_0x39b3eb,_0x22fa3d=new Date(this[_0x1dd364(0x148)]());return _0x22fa3d['setDate'](_0x22fa3d[_0x1dd364(0x142)]()+_0xa91e95),_0x22fa3d;};function isInArray(_0x3f8503,_0x41ea4a){var _0x54be3f=_0x39b3eb;return!!_0x3f8503[_0x54be3f(0x12a)](_0x5b0267=>{var _0x2fab43=_0x54be3f;return _0x5b0267[_0x2fab43(0x139)]()==_0x41ea4a[_0x2fab43(0x139)]();});}function capitalizeWords(_0x4dbca2){var _0x447957=_0x39b3eb;return _0x4dbca2[_0x447957(0x124)]()[_0x447957(0x12e)]('\x20')['map'](_0x1fbd57=>_0x1fbd57[_0x447957(0x136)](0x0)[_0x447957(0x141)]()+_0x1fbd57[_0x447957(0x123)](0x1))[_0x447957(0x132)]('\x20');}function parseTimetable(){var _0x3176e2=_0x39b3eb;const _0x118c1a=[],_0x283783=[];firstmondayvevent=findFirstMonday(),firsteventdate=new Date(firstmondayvevent['toDateString']()),lasteventdate=new Date(firstmondayvevent['addDays'](0x4)[_0x3176e2(0x128)]()),currentveventdate=firsteventdate;let _0x21e36d=0x1;while(currentveventdate<=lasteventdate){currentvevent=jcaldata[_0x21e36d][0x1],currentveventdate=new Date(new Date(currentvevent[0x0][0x3])[_0x3176e2(0x128)]()),currentveventdate<=lasteventdate&&currentveventdate>=firsteventdate&&(currentveventperiod=currentvevent[0x4][0x3]['split']('\x0a')[0x1]['replace']('Period:\x20',''),currentveventname=currentvevent[0x5][0x3],currentveventlocation=currentvevent[0x6][0x3]['replace'](_0x3176e2(0x13a),''),currentveventteacher=capitalizeWords(currentvevent[0x4][0x3][_0x3176e2(0x12e)]('\x0a')[0x0][_0x3176e2(0x12f)](_0x3176e2(0x12b),'')[_0x3176e2(0x124)]()),currentveventperiod[_0x3176e2(0x12c)]<=0x8&&(parseInt(currentveventperiod['slice'](-0x1))>=0x1&&parseInt(currentveventperiod['slice'](-0x1))<=0x8&&(currentveventperiod=currentveventperiod[_0x3176e2(0x123)](-0x1),tempclassdetails=[currentveventdate,currentveventperiod,currentveventname,currentveventlocation,currentveventteacher],_0x118c1a[_0x3176e2(0x121)](tempclassdetails),isInArray(_0x283783,currentveventdate)==![]&&_0x283783[_0x3176e2(0x121)](currentveventdate)))),_0x21e36d++;}createTimetableJson(_0x118c1a,_0x283783);}function findFirstMonday(){var _0x26b34a=_0x39b3eb;for(let _0x4a2436=0x0;_0x4a2436<jcaldata['length'];_0x4a2436++){var _0x15445b=new Date(jcaldata[_0x4a2436][0x1][0x0][0x3]);if(_0x15445b[_0x26b34a(0x140)]()==0x1)return _0x15445b;}}function createTimetableJson(_0x187156,_0x212d5e){var _0x5d5472=_0x39b3eb,_0xf7f317={};let _0x2ddd90=0x0;for(let _0x45f7ff=0x0;_0x45f7ff<_0x212d5e['length'];_0x45f7ff++){var _0x570bbc={},_0x5c0d54=![];while(_0x5c0d54==![]){classlistitemtemp=_0x187156[_0x2ddd90],classlistitemtemp[0x0][_0x5d5472(0x139)]()==_0x212d5e[_0x45f7ff][_0x5d5472(0x139)]()?(_0x570bbc[classlistitemtemp[0x1]]=[classlistitemtemp[0x2],classlistitemtemp[0x3],classlistitemtemp[0x4]],_0x187156[_0x2ddd90+0x1]!=undefined?_0x2ddd90++:(_0xf7f317[days[_0x212d5e[_0x45f7ff][_0x5d5472(0x140)]()]]=_0x570bbc,_0x5c0d54=!![])):(_0xf7f317[days[_0x212d5e[_0x45f7ff]['getDay']()]]=_0x570bbc,_0x5c0d54=!![]);}}jsontimetable=JSON[_0x5d5472(0x130)](_0xf7f317),localStorage[_0x5d5472(0x13d)](_0x5d5472(0x11f))!=null&&localStorage[_0x5d5472(0x135)](_0x5d5472(0x11f)),localStorage['setItem'](_0x5d5472(0x11f),jsontimetable),document[_0x5d5472(0x13e)](_0x5d5472(0x125))['innerHTML']=_0x5d5472(0x11e);}function clearTimetableStorage(){var _0xf5c3b9=_0x39b3eb;try{localStorage[_0xf5c3b9(0x135)](_0xf5c3b9(0x11f)),document['getElementById'](_0xf5c3b9(0x125))['innerHTML']=_0xf5c3b9(0x13f);}catch{}}function _0x55d7(){var _0x2af33f=['charAt','Wednesday','change','getTime','Room:\x20','1067122xdprGI','52FnawJd','getItem','getElementById','Status:\x20Timetable\x20deleted\x20successfully!\x20<a\x20class=\x27link\x27\x20href=\x27/\x27>Click\x20here<a>\x20to\x20return\x20to\x20the\x20main\x20page.','getDay','toUpperCase','getDate','16GLpTcN','addEventListener','6311736sDWcQp','13090957RAoYmA','Status:\x20Timetable\x20already\x20uploaded.\x20Ready\x20to\x20accept\x20new\x20user\x20upload...','valueOf','2EcsHYQ','Tuesday','5301900ADICvk','Status:\x20Timetable\x20saved\x20successfully!\x20Please\x20<a\x20class=\x27link\x27\x20href=\x27/\x27>return\x20to\x20the\x20main\x20page<a>\x20to\x20see\x20your\x20timetable.','userTimetable','611491gEuvcq','push','innerHTML','slice','toLowerCase','uploadstatus','prototype','readAsText','toDateString','timetableupload','find','Teacher:\x20\x20','length','66945PEufAD','split','replace','stringify','1168015KvrOwO','join','6orIgds','Sunday','removeItem'];_0x55d7=function(){return _0x2af33f;};return _0x55d7();}localStorage[_0x39b3eb(0x13d)](_0x39b3eb(0x11f))!=null&&(console['log'](localStorage[_0x39b3eb(0x13d)](_0x39b3eb(0x11f))),document['getElementById']('uploadstatus')[_0x39b3eb(0x122)]=_0x39b3eb(0x147));
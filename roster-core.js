(function () {
'use strict';
function pad2(n){return String(n).padStart(2,'0');}
function addDays(ds,n){const d=new Date(ds+'T00:00:00');d.setDate(d.getDate()+n);return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate());}
function combineDateTime(ds,ts){if(!ds||!ts)return null;const[h,m]=ts.split(':').map(Number);const d=new Date(ds+'T00:00:00');d.setHours(h,m,0,0);return d;}
function weekIndexOf(anchor,ds,wso){const a=new Date(anchor+'T00:00:00'),t=new Date(ds+'T00:00:00');const aw=new Date(a);while(aw.getDay()!==wso)aw.setDate(aw.getDate()-1);const tw=new Date(t);while(tw.getDay()!==wso)tw.setDate(tw.getDate()-1);return Math.round((tw-aw)/(7*24*60*60*1000));}
function getEffectiveTeam(letter,ds,b){const c=b.config;if(!b.anchorDate)return letter;const ws=weekIndexOf(b.anchorDate,ds,c.weekStartsOn);const tl=c.teamLetters;const i=tl.indexOf(letter);if(i===-1)return letter;const e=((i+ws)%tl.length+tl.length)%tl.length;return tl[e];}
function getProgrammeRow(b,letter,member,ds){const t=getEffectiveTeam(letter,ds,b);return b.linkProgramme[t+member]||null;}
function weekdayKey(ds){const d=new Date(ds+'T00:00:00');return ['SUN','MON','TUE','WED','THU','FRI','SAT'][d.getDay()];}

/* Fixed direction map — every train has one direction forever */
const OUT_TRAINS=new Set(['22103','22111','22129','22183','14217','14231','14307','14056','11107','12165','12539']);
const IN_TRAINS =new Set(['22104','22112','22130','22184','14218','14232','14308','14055','11108','12166','12540']);
function dirOf(t){
    const s=String(t||'').trim();
    if(OUT_TRAINS.has(s))return 'OUT';
    if(IN_TRAINS.has(s))return 'IN';
    return null;
}

/* Normalizes a day's slots by the direction map: OUT trains always land in OUT,
   IN trains always land in IN. Same-day pairs naturally form when both directions
   are present on the same day; two-day pairs form when departureOnly is followed
   by arrivalOnly on the next day. */
function getDayStatus(b,letter,member,ds){
    const row=getProgrammeRow(b,letter,member,ds);
    if(!row)return {kind:'blank',out:'',in:'',dayKey:null};
    const k=weekdayKey(ds);
    const rawO=row[k+'_OUT']||'';
    const rawI=row[k+'_IN']||'';
    if(rawO==='REST'||rawI==='REST')return {kind:'rest',out:'',in:'',dayKey:k};
    if(rawO==='CROSSING'||rawI==='CROSSING')return {kind:'crossing',out:'',in:'',dayKey:k};
    const trains=[];
    if(rawO)rawO.split('/').forEach(function(t){t=t.trim();if(t)trains.push(t);});
    if(rawI)rawI.split('/').forEach(function(t){t=t.trim();if(t)trains.push(t);});
    let o='',i='';
    trains.forEach(function(t){
        const d=dirOf(t);
        if(d==='IN')i=i?i+'/'+t:t;
        else o=o?o+'/'+t:t;
    });
    if(o&&i)return {kind:'sameDay',out:o,in:i,dayKey:k};
    if(o)return {kind:'departureOnly',out:o,in:'',dayKey:k};
    if(i)return {kind:'arrivalOnly',out:'',in:i,dayKey:k};
    return {kind:'blank',out:'',in:'',dayKey:k};
}

function getTrainInfo(b,no){if(!no||!b.trainSchedule)return null;return b.trainSchedule[String(no).trim()]||null;}
function fmtTrainTiming(info){if(!info)return '';const s=info.arrNextDay?' <span class="tt-next">+1</span>':'';return info.from+' '+info.dep+' \u2192 '+info.to+' '+info.arr+s;}

const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
function buildCalendarCardHtml(b,letter,member,year,month,navPrefix,opts){
    opts = opts || {};
    const tapHandler = opts.tapHandler || 'window.rosterOpenDayDetail';
    const cells=buildCalendarGridCells(b,letter,member,year,month,tapHandler);
    const mo=MONTHS.map((m,i)=>'<option value="'+i+'"'+(i===month?' selected':'')+'>'+m+'</option>').join('');
    const yo=Array.from({length:61},(_,k)=>year-30+k).map(v=>'<option value="'+v+'"'+(v===year?' selected':'')+'>'+v+'</option>').join('');
    const wd=['S','M','T','W','T','F','S'].map(w=>'<div>'+w+'</div>').join('');
    return '<div class="duty-cal-card">'+
        '<div class="cal-nav">'+
        '<button type="button" class="month-nav-arrow-btn prev" onclick="window.'+navPrefix+'ChangeMonth(-1)">\u2039</button>'+
        '<div class="cal-nav-center">'+
        '<select class="month-year-picker" onchange="window.'+navPrefix+'SetMonth(this.value)">'+mo+'</select>'+
        '<select class="month-year-picker" onchange="window.'+navPrefix+'SetYear(this.value)">'+yo+'</select>'+
        '</div>'+
        '<button type="button" class="month-nav-arrow-btn next" onclick="window.'+navPrefix+'ChangeMonth(1)">\u203A</button>'+
        '</div>'+
        '<div class="cal-weekdays">'+wd+'</div>'+
        '<div class="cal-grid">'+cells+'</div>'+
        '<p class="cal-hint">Tap any date to see duty details</p>'+
        '</div>';
}

function buildCalendarGridCells(b,letter,member,year,month,tapHandler){
    tapHandler = tapHandler || 'window.rosterOpenDayDetail';
    const firstDay=new Date(year,month,1);
    const daysInMonth=new Date(year,month+1,0).getDate();
    const startOffset=firstDay.getDay();
    const totalCells=Math.ceil((startOffset+daysInMonth)/7)*7;
    const today=new Date();const todayStr=today.getFullYear()+'-'+pad2(today.getMonth()+1)+'-'+pad2(today.getDate());
    const days=[];
    for(let i=0;i<totalCells;i++){
        const dn=i-startOffset+1;
        if(dn<1||dn>daysInMonth){days.push(null);continue;}
        const ds=year+'-'+pad2(month+1)+'-'+pad2(dn);
        const st=getDayStatus(b,letter,member,ds);
        days.push({dayNum:dn,dateStr:ds,status:st,isToday:ds===todayStr});
    }
    let html='';
    const rows=totalCells/7;
    for(let r=0;r<rows;r++){
        let col=0;
        while(col<7){
            const cur=days[r*7+col];
            const nxt=col<6?days[r*7+col+1]:null;
            const isPair=cur&&nxt&&cur.status.kind==='departureOnly'&&nxt.status.kind==='arrivalOnly';
            if(isPair){
                html+='<div class="cal-trip-wrapper'+(cur.isToday||nxt.isToday?' cal-trip-today':'')+'" style="grid-column:span 2;">';
                html+='<div class="cal-subday '+statusClass(cur)+'" onclick="'+tapHandler+'(\''+cur.dateStr+'\')">'+dayInner(cur)+'</div>';
                html+='<div class="cal-subday '+statusClass(nxt)+'" onclick="'+tapHandler+'(\''+nxt.dateStr+'\')">'+dayInner(nxt)+'</div>';
                html+='</div>';
                col+=2;
            }else if(cur){
                html+='<div class="cal-day '+statusClass(cur)+(cur.isToday?' cal-day-today':'')+'" onclick="'+tapHandler+'(\''+cur.dateStr+'\')">'+dayInner(cur)+'</div>';
                col++;
            }else{
                html+='<div class="cal-day cal-empty"></div>';
                col++;
            }
        }
    }
    return html;
}
function statusClass(d){
    const k=d.status.kind;
    if(k==='departureOnly')return 'cal-out';
    if(k==='arrivalOnly')return 'cal-in';
    if(k==='sameDay')return 'cal-both';
    if(k==='rest')return 'cal-rest';
    if(k==='crossing')return 'cal-crossing';
    return '';
}
function dayInner(d){
    const st=d.status;
    const num='<div class="cal-daynum">'+d.dayNum+'</div>';
    if(st.kind==='blank')return num;
    if(st.kind==='rest')return num+'<div class="cal-status">REST</div>';
    if(st.kind==='crossing')return num+'<div class="cal-status">CROSSING</div>';
    if(st.kind==='sameDay'){
        return num+
            '<div class="cal-tag">OUT</div>'+
            '<div class="cal-trainno">'+st.out+'</div>'+
            '<div class="cal-arrow">\u2193</div>'+
            '<div class="cal-trainno">'+st.in+'</div>';
    }
    if(st.kind==='departureOnly'){
        return num+
            '<div class="cal-tag">OUT</div>'+
            '<div class="cal-trainno">'+st.out+'</div>';
    }
    if(st.kind==='arrivalOnly'){
        return num+
            '<div class="cal-tag">IN</div>'+
            '<div class="cal-trainno">'+st.in+'</div>';
    }
    return num;
}

function buildDayDetailHtml(b,letter,member,ds){
    const st=getDayStatus(b,letter,member,ds);
    const dt=new Date(ds+'T00:00:00');
    const dayLabel=dt.toLocaleDateString('en-GB',{weekday:'long'});
    const dateLabel=pad2(dt.getDate())+'-'+dt.toLocaleString('en-GB',{month:'short'})+'-'+dt.getFullYear();
    let body='';
    if(st.kind==='blank'){
        body='<p style="text-align:center;color:var(--muted);font-size:13px;padding:20px;">No duty on this date.</p>';
    }else if(st.kind==='rest'){
        body='<div class="daydetail-status" style="color:var(--green);">REST</div>';
    }else if(st.kind==='crossing'){
        body='<div class="daydetail-status" style="color:var(--red);">CROSSING</div>';
    }else if(st.kind==='sameDay'){
        const oi=getTrainInfo(b,st.out),ii=getTrainInfo(b,st.in);
        body='<table class="daydetail-table">'+
            '<thead><tr><th>Direction</th><th>Train No.</th><th>From</th><th>To</th><th>Dep</th><th>Arr</th></tr></thead>'+
            '<tbody>'+
            '<tr><td><span class="ud udd">OUT</span></td><td><b>'+st.out+'</b></td>'+
            '<td>'+(oi?oi.from:'-')+'</td><td>'+(oi?oi.to:'-')+'</td>'+
            '<td>'+(oi?oi.dep:'-')+'</td><td>'+(oi?oi.arr+(oi.arrNextDay?' +1':''):'-')+'</td></tr>'+
            '<tr><td><span class="ud uda">IN</span></td><td><b>'+st.in+'</b></td>'+
            '<td>'+(ii?ii.from:'-')+'</td><td>'+(ii?ii.to:'-')+'</td>'+
            '<td>'+(ii?ii.dep:'-')+'</td><td>'+(ii?ii.arr+(ii.arrNextDay?' +1':''):'-')+'</td></tr>'+
            '</tbody></table>'+
            '<p style="text-align:center;font-size:12px;color:var(--muted);margin:8px 0 0;">Same-day up-and-down duty.</p>';
    }else if(st.kind==='departureOnly'){
        const oi=getTrainInfo(b,st.out);
        body='<table class="daydetail-table">'+
            '<thead><tr><th>Direction</th><th>Train No.</th><th>From</th><th>To</th><th>Dep</th><th>Arr</th></tr></thead>'+
            '<tbody><tr><td><span class="ud udd">OUT</span></td><td><b>'+st.out+'</b></td>'+
            '<td>'+(oi?oi.from:'-')+'</td><td>'+(oi?oi.to:'-')+'</td>'+
            '<td>'+(oi?oi.dep:'-')+'</td><td>'+(oi?oi.arr+(oi.arrNextDay?' +1':''):'-')+'</td></tr></tbody>'+
            '</table>';
    }else{
        const ii=getTrainInfo(b,st.in);
        body='<table class="daydetail-table">'+
            '<thead><tr><th>Direction</th><th>Train No.</th><th>From</th><th>To</th><th>Dep</th><th>Arr</th></tr></thead>'+
            '<tbody><tr><td><span class="ud uda">IN</span></td><td><b>'+st.in+'</b></td>'+
            '<td>'+(ii?ii.from:'-')+'</td><td>'+(ii?ii.to:'-')+'</td>'+
            '<td>'+(ii?ii.dep:'-')+'</td><td>'+(ii?ii.arr+(ii.arrNextDay?' +1':''):'-')+'</td></tr></tbody>'+
            '</table>';
    }
    return '<div class="daydetail-title">'+dayLabel+', '+dateLabel+'</div>'+body;
}
function fmtDateLabel(ds){const d=new Date(ds+'T00:00:00');const m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];return pad2(d.getDate())+'-'+m[d.getMonth()];}
function dayAbbrev(ds){const d=new Date(ds+'T00:00:00');return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];}
function getAppViewportScale(){const vv=window.visualViewport;const lw=document.documentElement.clientWidth||window.innerWidth;if(vv&&vv.width&&lw&&Math.abs(vv.width-lw)>1)return lw/vv.width;return(vv&&vv.scale)?vv.scale:1;}
function hapticTap(){const v=localStorage.getItem('haptic_enabled');const on=v===null?true:v==='true';if(!on)return;if(navigator.vibrate){try{navigator.vibrate(14);}catch(e){}}}
window.RosterCore={addDays,combineDateTime,weekIndexOf,getEffectiveTeam,getProgrammeRow,getDayStatus,weekdayKey,getTrainInfo,fmtTrainTiming,buildCalendarCardHtml,buildCalendarGridCells,buildDayDetailHtml,fmtDateLabel,dayAbbrev,getAppViewportScale,hapticTap,MONTHS,dirOf};
})();
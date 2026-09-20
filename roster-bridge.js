/* roster-bridge.js — v6 */
(function () {
    'use strict';
    console.log('[bridge] v6 loaded');

    function hq() { return window.getUserMainHq ? window.getUserMainHq() : ''; }
    function isOther() { const h = hq(); return !!h && h !== 'BSB'; }
    function pad2(n) { return String(n).padStart(2, '0'); }
    function addDays(ds, n) {
        const d = new Date(ds + 'T00:00:00');
        d.setDate(d.getDate() + n);
        return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
    }

    function getIdentity() {
        const h = hq();
        if (!h) return null;
        const raw = localStorage.getItem('roster_my_identity_' + h);
        if (!raw) return null;
        try { return JSON.parse(raw); } catch (e) { return null; }
    }
    window.getRosterIdentity = getIdentity;

    function mirrorTeamKey() {
        if (!isOther()) return;
        const id = getIdentity();
        if (!id || !id.team) return;
        const cur = localStorage.getItem('roster_my_team');
        if (cur !== String(id.team)) {
            localStorage.setItem('roster_my_team', String(id.team));
        }
    }

    function syncBundleFromCache() {
        const d = window.rosterData;
        if (d && d.teamMaster && d.linkProgramme) return d;
        const h = hq();
        if (!h) return null;
        try {
            const raw = localStorage.getItem('roster_cache_hq_' + h);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed.linkProgramme && parsed.teamMaster) {
                    parsed._hq = h;
                    window.rosterData = parsed;
                    return parsed;
                }
            }
        } catch (e) {}
        return null;
    }

    /* ---------- projected legs (as in v4 — was working) ---------- */
    function buildProjectedLegsForYear(year) {
        const bundle = syncBundleFromCache();
        const id = getIdentity();
        if (!bundle || !id) return [];
        const legs = [];
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31);
        const d = new Date(start);
        while (d <= end) {
            const ds = d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
            const st = window.RosterCore.getDayStatus(bundle, id.team, id.member, ds);
            const push = function (trainNo) {
                if (!trainNo) return;
                const info = window.RosterCore.getTrainInfo(bundle, trainNo);
                if (!info) return;
                const arrDate = info.arrNextDay ? addDays(ds, 1) : ds;
                legs.push({
                    id: 'pygs_' + ds + '_' + trainNo,
                    train: trainNo,
                    depDate: ds, depTime: info.dep,
                    arrDate: arrDate, arrTime: info.arr,
                    depStn: info.from, arrStn: info.to,
                    isNonDuty: false, projected: true
                });
            };
            if (st.kind === 'sameDay') { push(st.out); push(st.in); }
            else if (st.kind === 'departureOnly') push(st.out);
            d.setDate(d.getDate() + 1);
        }
        return legs;
    }

    /* ---------- Quick Add ---------- */
    function installQadd() {
        window.openQuickAddCalendar = function () {
            const id = getIdentity();
            if (!id) {
                window.showModal('Pick Team & Position',
                    'Open Duty Roster, pick your Team + Position, save, then try Quick Add again.',
                    'warning', false);
                return;
            }
            const bundle = syncBundleFromCache();
            if (!bundle) {
                if (!window.firebaseGet || !window.firebaseRef || !window.db) {
                    window.showModal('Roster Not Loaded', 'Firebase not ready. Please reopen the app.', 'warning', false);
                    return;
                }
                window.firebaseGet(window.firebaseRef(window.db, 'roster/' + hq())).then(function (snap) {
                    const d = snap.val();
                    if (!d || !d.teamMaster || !d.linkProgramme) {
                        window.showModal('Roster Empty', 'Open Duty Roster first to set up your roster.', 'warning', false);
                        return;
                    }
                    d._hq = hq();
                    window.rosterData = d;
                    try { localStorage.setItem('roster_cache_hq_' + hq(), JSON.stringify(d)); } catch (e) {}
                    openNow();
                }).catch(function (e) { window.showModal('Load Failed', e.message, 'error', false); });
                return;
            }
            openNow();
        };

        function openNow() {
            const now = new Date();
            window._pygsQadd = { year: now.getFullYear(), month: now.getMonth() };
            const m = document.getElementById('quick-add-cal-modal');
            if (m) m.classList.remove('hidden');
            renderQadd();
        }

        window.qaddChangeMonth = function (delta) {
            let mo = window._pygsQadd.month + delta, y = window._pygsQadd.year;
            if (mo < 0) { mo = 11; y--; }
            if (mo > 11) { mo = 0; y++; }
            window._pygsQadd.month = mo; window._pygsQadd.year = y; renderQadd();
        };
        window.qaddSetMonth = function (v) { window._pygsQadd.month = parseInt(v, 10); renderQadd(); };
        window.qaddSetYear  = function (v) { const y = parseInt(v, 10); if (!isNaN(y) && y > 0) { window._pygsQadd.year = y; renderQadd(); } };
        window.renderQuickAddCalendar = renderQadd;

        function renderQadd() {
            const grid = document.getElementById('qadd-cal-grid');
            if (!grid) return;
            const id = getIdentity();
            const bundle = syncBundleFromCache();
            if (!id || !bundle || !window.RosterCore) { grid.innerHTML = ''; return; }
            const year = window._pygsQadd.year, month = window._pygsQadd.month;
            const ms = document.getElementById('qadd-month-sel');
            const ys = document.getElementById('qadd-year-sel');
            if (ms) ms.value = month;
            if (ys) ys.value = year;
            const firstDay = new Date(year, month, 1);
            const dim = new Date(year, month + 1, 0).getDate();
            const off = firstDay.getDay();
            const total = Math.ceil((off + dim) / 7) * 7;
            const today = new Date();
            const todayStr = today.getFullYear() + '-' + pad2(today.getMonth() + 1) + '-' + pad2(today.getDate());
            let html = '';
            for (let i = 0; i < total; i++) {
                const dn = i - off + 1;
                if (dn < 1 || dn > dim) { html += '<div class="qadd-day qadd-empty"></div>'; continue; }
                const ds = year + '-' + pad2(month + 1) + '-' + pad2(dn);
                const st = window.RosterCore.getDayStatus(bundle, id.team, id.member, ds);
                const ts = ds === todayStr ? ' style="outline:2px solid var(--blue);outline-offset:1px;"' : '';
                if (st.kind === 'blank') html += '<div class="qadd-day qadd-empty"' + ts + '></div>';
                else if (st.kind === 'rest') html += '<div class="qadd-day qadd-rest" onclick="window._pygsQaddTap(\'' + ds + '\')"' + ts + '><div class="qadd-daynum">' + dn + '</div><span class="qadd-tag">REST</span></div>';
                else if (st.kind === 'crossing') html += '<div class="qadd-day qadd-halt" onclick="window._pygsQaddTap(\'' + ds + '\')"' + ts + '><div class="qadd-daynum">' + dn + '</div><span class="qadd-tag">CROSSING</span></div>';
                else if (st.kind === 'sameDay') html += '<div class="qadd-day qadd-outin" onclick="window._pygsQaddTap(\'' + ds + '\')"' + ts + '><div class="qadd-daynum">' + dn + '</div><span class="qadd-tag">OUT</span><span class="qadd-trainno">' + st.out + '</span><span class="qadd-tag">IN</span><span class="qadd-trainno">' + st.in + '</span></div>';
                else if (st.kind === 'departureOnly') html += '<div class="qadd-day qadd-out" onclick="window._pygsQaddTap(\'' + ds + '\')"' + ts + '><div class="qadd-daynum">' + dn + '</div><span class="qadd-tag">OUT</span><span class="qadd-trainno">' + st.out + '</span></div>';
                else if (st.kind === 'arrivalOnly') html += '<div class="qadd-day qadd-in" onclick="window._pygsQaddTap(\'' + ds + '\')"' + ts + '><div class="qadd-daynum">' + dn + '</div><span class="qadd-tag">IN</span><span class="qadd-trainno">' + st.in + '</span></div>';
            }
            grid.innerHTML = html;
        }

        window._pygsQaddTap = function (ds) {
            const id = getIdentity();
            const bundle = syncBundleFromCache();
            if (!id || !bundle) return;
            const st = window.RosterCore.getDayStatus(bundle, id.team, id.member, ds);
            if (st.kind === 'blank' || st.kind === 'rest' || st.kind === 'crossing') return;
            if (st.kind === 'sameDay') {
                const html = '<p style="text-align:center;margin:0 0 12px;color:var(--text-muted);font-size:13px;">Two trains on this date. Which one?</p>' +
                    '<button onclick="window._pygsQaddPick(\'' + ds + '\',\'' + st.out + '\')" style="background:var(--blue-fill);margin-bottom:8px;">OUT — ' + st.out + '</button>' +
                    '<button onclick="window._pygsQaddPick(\'' + ds + '\',\'' + st.in + '\')" style="background:var(--green);">IN — ' + st.in + '</button>';
                window.showModal('Select Train', html, 'info', false);
                return;
            }
            if (st.kind === 'departureOnly') prefill(ds, st.out, bundle);
            if (st.kind === 'arrivalOnly') prefill(ds, st.in, bundle);
        };

        window._pygsQaddPick = function (ds, trainNo) {
            window.closeCustomModal();
            const b = syncBundleFromCache();
            if (b) prefill(ds, trainNo, b);
        };

        function prefill(ds, trainNo, bundle) {
            const info = window.RosterCore.getTrainInfo(bundle, trainNo);
            if (!info) { window.showModal('Timing Missing', 'Train ' + trainNo + ' has no timing yet.', 'warning', false); return; }
            const qm = document.getElementById('quick-add-cal-modal');
            if (qm) qm.classList.add('hidden');
            window.switchAddTab('duty');
            const g = function (id) { return document.getElementById(id); };
            g('trip-train').value = trainNo;
            g('trip-dep-date').value = ds;
            g('trip-dep-time').value = info.dep;
            const arrDate = info.arrNextDay ? addDays(ds, 1) : ds;
            g('trip-arr-date').value = arrDate;
            g('trip-arr-time').value = info.arr;
            g('trip-dep-stn').value = info.from;
            g('trip-arr-stn').value = info.to;
            if (window.clearFieldsInvalid) window.clearFieldsInvalid(['trip-train','trip-dep-date','trip-dep-time','trip-arr-date','trip-arr-time','trip-dep-stn','trip-arr-stn']);
            window.navTo('screen-add');
        }
    }

    /* ---------- Team selector ---------- */
    function installTeamSelector() {
        window.openSelectTeamModal = function () {
            const h = hq();
            const id = getIdentity();
            const curTeam = id ? id.team : '';
            const curMember = id ? id.member : '';
            const letters = ['A','B','C','D','E','F','G','H'];
            const teamOpts = letters.map(function (t) {
                return '<option value="' + t + '"' + (t === curTeam ? ' selected' : '') + '>Team ' + t + '</option>';
            }).join('');
            const memberOpts = [{v:'1',l:'COR'},{v:'2',l:'TTE-1'},{v:'3',l:'TTE-2'},{v:'4',l:'TTE-3'}]
                .map(function (m) { return '<option value="' + m.v + '"' + (String(m.v) === String(curMember) ? ' selected' : '') + '>' + m.l + '</option>'; }).join('');
            const html = '<label style="font-size:12px;font-weight:700;display:block;margin-bottom:4px;">Team</label>' +
                '<select id="pygs-sel-team" style="margin-bottom:12px;">' + teamOpts + '</select>' +
                '<label style="font-size:12px;font-weight:700;display:block;margin-bottom:4px;">Position</label>' +
                '<select id="pygs-sel-member">' + memberOpts + '</select>';
            window.showModal('Select Team & Position', html, 'info', true, function (ok) {
                if (!ok) return;
                const t = document.getElementById('pygs-sel-team').value;
                const m = parseInt(document.getElementById('pygs-sel-member').value, 10);
                localStorage.setItem('roster_my_identity_' + h, JSON.stringify({ team: t, member: m }));
                mirrorTeamKey();
                if (window.updateSelectTeamDisplay) window.updateSelectTeamDisplay();
            });
        };

        window.updateSelectTeamDisplay = function () {
            const el = document.getElementById('select-team-line');
            if (!el) return;
            const prefix = window.i18n ? window.i18n.tOr('add_select_team_short', 'Select team') : 'Select team';
            const id = getIdentity();
            if (!id) { el.textContent = prefix + '-'; return; }
            const labels = { 1: 'COR', 2: 'TTE-1', 3: 'TTE-2', 4: 'TTE-3' };
            el.textContent = prefix + '-' + id.team + ' · ' + (labels[id.member] || '');
        };
    }

    /* ---------- Install everything ---------- */
    function installAll() {
        if (!isOther()) return false;
        if (!window.RosterCore) return false;
        if (!window.getUserMainHq) return false;
        window.buildProjectedDutyLegsForYear = buildProjectedLegsForYear;
        installQadd();
        installTeamSelector();
        return true;
    }

    /* Reinstall every 100ms for 20 seconds (as v4 did for projected).
       This is what makes overrides stick despite the parent's late writes. */
    var ticks = 0, MAX = 200;
    function loop() {
        ticks++;
        mirrorTeamKey();
        const ok = installAll();
        if (ticks === 1 || ticks === 60 || ticks === MAX) {
            console.log('[bridge] tick ' + ticks + ' installed=' + ok + ' hq=' + (hq() || '(none)'));
        }
        if (ticks >= MAX) {
            console.log('[bridge] settled');
            setTimeout(function () { mirrorTeamKey(); installAll(); }, 500);
            return;
        }
        setTimeout(loop, 100);
    }

    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) { mirrorTeamKey(); installAll(); }
    });

    loop();
})();
// ============================================================================
// Shared i18n module — used by TTE LOGS (index.html), BSB Duty Roster
// (roster.html), and Commercial Circulars (circulars.html).
//
// Phase 1 scope only: nav bar / bottom bar, common buttons, and common modal
// titles. Screen-specific content (duty fields, roster grid, circular
// listings, PDFs) is intentionally NOT translated yet — see Phase 2.
//
// Storage: a single localStorage key, shared across all three apps since
// they're same-origin on GitHub Pages. Toggling language in one app carries
// over to the others automatically.
// ============================================================================
(function () {
    const LANG_KEY = 'tte_app_lang';

    const DICT = {
        en: {
            error: "Error",
            warning: "Warning",
            success: "Success",
            saved: "Saved!",
            save_failed: "Save Failed",
            published: "Published!",
            profile_locked: "Profile Locked",
            timing_not_set: "Timing Not Set",
            no_train_found: "No Train Found",
            team_no_not_set: "Team No. Not Set",
            time_error: "Time Error",
            chain_error: "Chain Error",
            confirm: "Confirm",
            notice: "Notice",
            done: "Done",

            cancel: "Cancel",
            save: "Save",
            close: "Close",
            back: "Back",
            add: "Add",
            submit: "Submit",
            refresh: "Refresh",
            sign_out: "Sign Out",
            install: "Install",
            edit_profile: "Edit Profile",
            ok: "OK",
            are_you_sure: "Are you sure?",
            yes: "Yes",
            no: "No",

            home: "Home",
            dashboard: "Dashboard",
            settings: "Settings",
            language: "Language",
            share: "Share",
            alerts: "Alerts",
            add_journey: "Add Journey",
            light: "Light",
            dark: "Dark",

            nav_all_journey: "All Journey",
            nav_view_edit_delete: "View, edit, delete",
            nav_pdf: "PDF",
            nav_ta_journal_nda_bill: "TA Journal / NDA Bill",
            nav_profile: "Profile",
            nav_stations_pay_details: "Stations, pay details",
            nav_circulars: "Circulars",
            nav_important_circulars: "Important Circulars",
            nav_roster: "Roster",
            nav_roster_bsb_only: "Roster For BSB Only",
            nav_expected_salary_month: "Expected Salary - {month}",

            profile_note_fill_carefully: "Please fill out this data carefully. It will be used directly for your TA/NDA calculations and PDF generation.",
            profile_nearby_hq_desc: "This is a nearby HQ station your journey sometimes starts from, other than your Main HQ — you do NOT claim TA for travel within this group.",
            profile_diversion_stn_desc: "It is the station from which a journey starts, other than your Main or Nearby HQ, with TA Claimed — e.g. DDU for BSB HQ.",
            profile_dest_stations_desc: "Set your usual outward destination stations and any known diversion routes (e.g. LKO trains sometimes diverting via AMG) — helps the app auto-recognize your journeys correctly.",
            profile_saved_synced: "Profile Saved & Synced!",
            profile_locked_desc: "Tap 'Edit Profile' first to make changes.",
            dest_diversion_saved: "Destination & Diversion settings saved and synced.",
            reg_mandatory_fields: "{fields} {verb} mandatory.",
            swipe_tabs_hint: "↔️ Swipe left or right to switch tabs",
            shift_midnight_rule: "If the shift starts at/after 22:00 and runs past midnight, it's counted as this date's morning duty (started the day before). If it starts before 22:00 and runs past midnight, it's counted as this date's duty ending the next morning.",
            tap_row_edit_delete: "👆 Tap any row below to Edit or Delete",
            earnings_tap_hint: "Tap the boxes of EFT, Cases, Amount to type and then Save to track your Daily/Monthly Earnings.",
            tap_colored_date_hint: "👆 Tap any coloured date to view duty details",
            bordered_days_hint: "👆 Tap any day — bordered days belong to the same trip. Tap either end to prefill it below.",
            arrows_history_hint: "💡 Use ❮ ❯ arrows below to check previous history.",
            tap_summary_trend_hint: "👆 Tap Summary to view 6-month trend →",
            backup_save_file_desc: "Save a physical backup file to your phone.",
            backup_import_file_desc: "Import a previously downloaded backup file.",
            backup_syncing_google: "Your data is actively syncing to Google.",
            install_home_screen_desc: "Add this app to your home screen for a faster, full-screen experience — no more opening it through a browser link.",
            no_active_announcements: "No active announcements.",
            no_dashboard_announcements: "No dashboard announcements yet.",

            chain_time_error: "Departure time cannot be before previous arrival time ({date} {time}).",
            chain_prev_ended_hq: "Previous journey ended at HQ. New journey must start from HQ.",
            chain_missing_journey: "Station Duty at {stn} (outside HQ, {date}) requires a return train FROM {stn} to HQ before this journey.\n\nPlease add that connecting journey first (Duty Journey tab).",
            chain_known_diversion: "This looks like your saved {stn1} ↔ {stn2} diversion. Confirm to save this journey?",
            chain_station_mismatch: "Previous journey ended at {stn1}, but this new journey starts from {stn2}.\n\nIs this due to a train diversion (e.g. your return train stopped at a nearby station instead of the original destination)?\n\nIf this is a genuine mistake instead, tap Cancel and fix the station.",
            chain_first_journey_hq: "Your very first duty journey must start from HQ.",

            add_mandatory_fields: "Train No., Departure Date, Departure Time, Station From and Station To are mandatory.",
            add_train_5digits: "Train No. must be exactly 5 digits.\n\nYou entered: {train}",
            add_arrival_date_mandatory: "Arrival Date is mandatory.\n\nArrival Time can be left blank for today's or future journeys (will show as pending).",
            add_arrival_time_mandatory: "Arrival Time is mandatory for past journeys.\n\nOnly today's or future duty entries can have arrival time filled later.",
            add_same_station: "From and To stations cannot be same.",
            add_arrival_after_departure: "Arrival must be after Departure.",

            leave_dates_mandatory: "Dates are mandatory.",
            leave_date_mandatory: "Date is mandatory.",
            leave_from_after_to: "From Date cannot be after To Date.",
            leave_station_mandatory: "Station Name is mandatory for {type}.",
            leave_objective_mandatory: "Objective of Duty is mandatory for {type} outside HQ (it will be printed on the TA Journal).",
            leave_shift_mandatory: "Fill both Shift Start and Shift End for Night Duty.",
            leave_custom_label_mandatory: "Custom Label is mandatory for Others.",
            leave_profile_not_loaded: "Profile not loaded.",
            leave_outward_station_block: "Cannot apply {leaveType} from an outward station ({stn}). You must show a return journey to HQ before taking leave. Only Sick Leave (LHAP Sick) can be applied away from HQ.",
            leave_dates_overlap: "Warning: The selected dates overlap with an existing journey or leave!",
            leave_record_saved: "Record saved successfully.",

            quickadd_team_not_set: "Open the Roster app, go to My Duty, select your Team No., and tap Save. Then come back and try Quick Add again.",
            quickadd_rest_day: "Team {no} is on REST this day — nothing to quick-add. You can log it under Add Rest-Leave if you'd like it on record.",
            quickadd_lr_day: "Team {no} is on LR duty this day — nothing to quick-add.",
            quickadd_spare_day: "Team {no} is SPARE this day — nothing to quick-add.",
            quickadd_halt_day: "Team {no} is on a halt day here — no new journey starts on this specific date. Tap the OUT or IN day of this same bordered trip instead.",
            quickadd_no_duty_data: "No roster duty data found for Team {no} on this date.",
            quickadd_no_train_out: "This duty has no train number set in the Link Programme.",
            quickadd_no_train_return: "This return duty has no train number set in the Link Programme.",
            quickadd_timing_not_set: "Train {train}'s timing hasn't been entered yet in Roster's Admin > Edit Schedule.",
            quickadd_prefilled: "Journey details pulled in from your roster. Review, then tap \"Save This Journey\" to confirm.",

            pdf_cloud_syncing: "Cloud data is still syncing. Please wait a moment.",
            pdf_no_entries: "No entries to generate.",
            pdf_pending_entries: "Cannot generate PDF — some journeys have missing arrival time.\n\n{list}{more}\n\nGo to Dashboard's recent entries and tap (+ Add) to complete them first.",
            pdf_unclosed_station_duty: "Station Duty at {stn} has not been closed with a return train FROM {stn} to HQ.\n\nPlease add that connecting journey first (Duty Journey tab), or edit/remove the entry that assumed you were already back.",
            pdf_unpaired_diversion_block: "A gap was detected connecting [{info}], and it isn't a saved diversion pair in your Profile.\n\nPDF generation is blocked until this is resolved:\n\n• If this is a genuine diversion, add it as a diversion pair in Profile → Destination & Diversion Stations, then try again.\n\n• Otherwise, add the missing connecting journey in All Journey first.",
            pdf_nda_16th_notice: "To generate complete NDA, ensure you filled Duty Journey from 16th of previous month.",
            pdf_workingdays_earnings_empty: "Working Days and Earnings are empty. Generate PDF anyway?",
            pdf_earnings_not_filled: "You haven't filled in any Earnings entries for this month yet (Earnings tab under All Journey). The Earnings amount here is ₹0. Fill it in first, or generate anyway if this month genuinely has none.",
            pdf_recheck_values: "Working Days: {wDays} · Earnings: ₹{earn}\n\nThese were auto-fetched from your logged entries — please double-check both are correct before printing.",

            dest_diversion_stations_desc: "For trains that sometimes divert away from a major destination station to a nearby one (e.g. LKO trains diverting via AMG). Optional — only add if you know of specific diversions on your usual routes.",
            quickadd_desc_hint: "📍 Pick your team number once inside <b>Roster</b>, and you can add your upcoming duties here in a single tap by clicking Quick Add.",
            delete_entry_warning: "Deleting an entry may break your continuous journey chain. You can fix it by adding missing legs later.\n\nDo you really want to delete?",
            journey_time_overlap: "This journey's arrival time overlaps with your next journey's departure time ({date} {time}).\n\nOnly one train journey is possible at a time — please check the times."
        },
        hi: {
            error: "त्रुटि",
            warning: "चेतावनी",
            success: "सफल",
            saved: "सेव हो गया!",
            save_failed: "सेव नहीं हुआ",
            published: "प्रकाशित!",
            profile_locked: "प्रोफ़ाइल लॉक है",
            timing_not_set: "टाइम सेट नहीं है",
            no_train_found: "कोई ट्रेन नहीं मिली",
            team_no_not_set: "टीम नंबर सेट नहीं है",
            time_error: "टाइम त्रुटि",
            chain_error: "चेन त्रुटि",
            confirm: "पुष्टि करें",
            notice: "सूचना",
            done: "हो गया",

            cancel: "रद्द करें",
            save: "सेव करें",
            close: "बंद करें",
            back: "वापस",
            add: "जोड़ें",
            submit: "जमा करें",
            refresh: "रिफ्रेश करें",
            sign_out: "साइन आउट",
            install: "इंस्टॉल करें",
            edit_profile: "प्रोफ़ाइल एडिट करें",
            ok: "ठीक है",
            are_you_sure: "क्या आप निश्चित हैं?",
            yes: "हां",
            no: "नहीं",

            home: "होम",
            dashboard: "डैशबोर्ड",
            settings: "सेटिंग्स",
            language: "भाषा",
            share: "शेयर करें",
            alerts: "सूचनाएं",
            add_journey: "यात्रा जोड़ें",
            light: "लाइट",
            dark: "डार्क",

            nav_all_journey: "सभी यात्राएं",
            nav_view_edit_delete: "देखें, एडिट, डिलीट करें",
            nav_pdf: "पीडीएफ",
            nav_ta_journal_nda_bill: "TA जर्नल / NDA बिल",
            nav_profile: "प्रोफ़ाइल",
            nav_stations_pay_details: "स्टेशन, पे डिटेल्स",
            nav_circulars: "सर्कुलर",
            nav_important_circulars: "महत्वपूर्ण सर्कुलर",
            nav_roster: "रोस्टर",
            nav_roster_bsb_only: "सिर्फ BSB के लिए रोस्टर",
            nav_expected_salary_month: "अनुमानित सैलरी - {month}",

            profile_note_fill_carefully: "यह data ध्यान से भरें। यह सीधे आपकी TA/NDA कैलकुलेट करने और PDF प्रिंट करने में इस्तेमाल होगा।",
            profile_nearby_hq_desc: "आपके मुख्य हेडक्वार्टर के अलावा यह एक नजदीक का हेडक्वार्टर स्टेशन है जहां से कभी-कभी यात्रा शुरू होती है — इस स्टेशनों के अंदर यात्रा के लिए TA नहीं मिलता।",
            profile_diversion_stn_desc: "आपके मुख्य या नजदीक के हेडक्वार्टर के अलावा, यह वह स्टेशन है जहां से यात्रा शुरू होती है, जिसमें TA claim होता है, जैसे- BSB HQ के लिए DDU",
            profile_dest_stations_desc: "अपने सामान्य गंतव्य स्टेशन और जाने-पहचाने डायवर्जन रूट सेट करें (जैसे LKO की ट्रेन कभी-कभी AMG से डाईवर्टेड होती हैं) — इससे app आपकी यात्रा सही तरीके से पहचान पाएगा।",
            profile_saved_synced: "प्रोफ़ाइल Save और Sync हो गई!",
            profile_locked_desc: "बदलाव करने के लिए पहले 'Edit Profile' पर क्लिक करें।",
            dest_diversion_saved: "गंतव्य और डायवर्जन सेटिंग save और sync हो गईं।",
            reg_mandatory_fields: "{fields} भरना ज़रूरी है।",
            swipe_tabs_hint: "↔️ tab बदलने के लिए left या right swipe करें",
            shift_midnight_rule: "अगर shift 22:00 बजे या उसके बाद शुरू होकर आधी रात के बाद तक चलती है, तो यह इस तारीख की morning duty मानी जाती है (जो एक दिन पहले शुरू हुई थी)। अगर यह 22:00 से पहले शुरू होकर आधी रात के बाद तक चलती है, तो यह इस तारीख की duty मानी जाती है जो अगली सुबह खत्म होती है।",
            tap_row_edit_delete: "👆 edit या delete करने के लिए नीचे किसी भी row पर क्लिक करें",
            earnings_tap_hint: "EFT, Cases, Amount के boxes में type करें और फिर Save करें, ताकि आपकी अर्निंग्स ट्रैक हो सके।",
            tap_colored_date_hint: "👆 ड्यूटी डिटेल्स देखने के लिए किसी भी तारीख पर क्लिक करें",
            bordered_days_hint: "👆 किसी भी दिन पर क्लिक करें — बॉर्डर वाले दिन एक ही trip के हिस्से हैं। किसी भी छोर पर क्लिक करने से नीचे वह अपने आप भर जाएगा।",
            arrows_history_hint: "💡 पिछली history देखने के लिए नीचे दिए ❮ ❯ arrows का इस्तेमाल करें।",
            tap_summary_trend_hint: "👆 6-महीने का ट्रेंड देखने के लिए Summary पर क्लिक करें →",
            backup_save_file_desc: "अपने फोन में एक physical backup file save करें।",
            backup_import_file_desc: "पहले download की गई backup file import करें।",
            backup_syncing_google: "आपका data गूगल में actively sync हो रहा है।",
            install_home_screen_desc: "Fast और full-screen experience के लिए इस app को अपनी home screen पर add करें — अब इसे browser link से खोलने की ज़रूरत नहीं।",
            no_active_announcements: "कोई active announcement नहीं है।",
            no_dashboard_announcements: "अभी तक कोई dashboard announcement नहीं है।",

            chain_time_error: "Departure time पिछले arrival time ({date} {time}) से पहले नहीं हो सकता।",
            chain_prev_ended_hq: "पिछली यात्रा HQ पर खत्म हुई थी। नई यात्रा HQ से या नजदीक के HQ से ही शुरू होनी चाहिए।",
            chain_missing_journey: "{stn} पर Station Duty (HQ के बाहर, {date}) के लिए इस journey से पहले {stn} से HQ तक वापसी की train ज़रूरी है।\n\nकृपया पहले वह connecting journey जोड़ें (Duty Journey tab)।",
            chain_known_diversion: "यह आपकी saved {stn1} ↔ {stn2} diversion जैसी लग रही है। इस journey को save करने की पुष्टि करें?",
            chain_station_mismatch: "पिछली journey {stn1} पर खत्म हुई थी, लेकिन यह नई journey {stn2} से शुरू हो रही है।\n\nक्या यह train diversion की वजह से है?\n\nअगर यह आपसे भरने में गलती हुई है, तो Cancel पर क्लिक करके station में सुधार करें।",
            chain_first_journey_hq: "आपकी सबसे पहली ड्यूटी HQ या नजदीक के HQ से ही शुरू होनी चाहिए।",

            add_mandatory_fields: "Train No., Departure Date, Departure Time, Station From और Station To भरना ज़रूरी है।",
            add_train_5digits: "Train No. ठीक 5 digits का होना चाहिए।\n\nआपने डाला: {train}",
            add_arrival_date_mandatory: "Arrival Date भरना ज़रूरी है।\n\nआज या आने वाली यात्राओं के लिए Arrival Time खाली छोड़ा जा सकता है (डैशबोर्ड पर पेंडिंग दिखेगा)।",
            add_arrival_time_mandatory: "पिछली यात्राओं के लिए Arrival Time भरना ज़रूरी है।\n\nसिर्फ आज या आने वाली यात्राओं में arrival time बाद में भरा जा सकता है।",
            add_same_station: "From और To station एक जैसे नहीं हो सकते।",
            add_arrival_after_departure: "Arrival Time, Departure Time के बाद ही होनी चाहिए।",

            leave_dates_mandatory: "Dates भरना ज़रूरी है।",
            leave_date_mandatory: "Date भरना ज़रूरी है।",
            leave_from_after_to: "From Date, To Date के बाद नहीं हो सकती।",
            leave_station_mandatory: "{type} के लिए Station नाम भरना ज़रूरी है।",
            leave_objective_mandatory: "HQ के बाहर {type} के लिए Objective of Duty भरना ज़रूरी है (यह TA PDF पर print होगा)।",
            leave_shift_mandatory: "Night Duty के लिए Shift Start और Shift End दोनों भरें।",
            leave_custom_label_mandatory: "Others के लिए Custom Label भरना ज़रूरी है।",
            leave_profile_not_loaded: "Profile load नहीं हुई।",
            leave_outward_station_block: "{stn} (outward station) से {leaveType} apply नहीं किया जा सकता। Leave लेने से पहले HQ तक वापसी journey दिखानी होगी। सिर्फ Sick Leave (LHAP Sick) HQ से बाहर रहते हुए apply किया जा सकता है।",
            leave_dates_overlap: "चेतावनी: चुनी गई dates किसी मौजूदा journey या leave के साथ overlap कर रही हैं!",
            leave_record_saved: "Record सफलतापूर्वक save हो गया।",

            quickadd_team_not_set: "Roster app खोलें, My Duty में जाएं, अपना Team No. select करें और Save पर tap करें। फिर वापस आकर Quick Add फिर से try करें।",
            quickadd_rest_day: "Team {no} आज REST पर है — quick-add करने के लिए कुछ नहीं है। अगर record रखना है तो इसे Add Rest-Leave में log करें।",
            quickadd_lr_day: "Team {no} आज LR duty पर है — quick-add करने के लिए कुछ नहीं है।",
            quickadd_spare_day: "Team {no} आज SPARE है — quick-add करने के लिए कुछ नहीं है।",
            quickadd_halt_day: "Team {no} का आज halt day है — इस date पर कोई नई journey शुरू नहीं होती। इसके बजाय इसी bordered trip के OUT या IN day पर tap करें।",
            quickadd_no_duty_data: "Team {no} के लिए इस date पर कोई roster duty data नहीं मिला।",
            quickadd_no_train_out: "इस duty में Link Programme में कोई train number set नहीं है।",
            quickadd_no_train_return: "इस return duty में Link Programme में कोई train number set नहीं है।",
            quickadd_timing_not_set: "Train {train} का timing अभी Roster के Admin > Edit Schedule में नहीं डाला गया है।",
            quickadd_prefilled: "Journey details आपके roster से आ गई हैं। Review करें, फिर पुष्टि के लिए \"Save This Journey\" पर tap करें।",

            pdf_cloud_syncing: "Cloud data अभी sync हो रहा है। थोड़ा wait करें।",
            pdf_no_entries: "Generate करने के लिए कोई entries नहीं हैं।",
            pdf_pending_entries: "PDF generate नहीं हो सकता — कुछ journeys में arrival time भरा नहीं है।\n\n{list}{more}\n\nपहले Dashboard की recent entries में जाकर (+ Add) से इन्हें पूरा करें।",
            pdf_unclosed_station_duty: "{stn} पर Station Duty, {stn} से HQ तक वापसी train से connect नहीं हुई है। पहले वह connecting journey जोड़ें, या उस entry को edit/remove करें।",
            pdf_unpaired_diversion_block: "[{info}] जोड़ते समय एक gap मिला, और यह आपकी Profile में saved diversion pair में नहीं है।\n\nजब तक यह ठीक नहीं होता, PDF generation block रहेगा:\n\n• अगर यह सच में एक diversion है, तो पहले इसे Profile → Destination & Diversion Stations में diversion pair के रूप में add करें, फिर दोबारा try करें।\n\n• नहीं तो पहले All Journey में missing connecting journey जोड़ें।",
            pdf_nda_16th_notice: "पूरा NDA प्रिंट करने के लिए, सुनिश्चित करें कि आपने पिछले महीने की 16 तारीख से यात्राएं भरी है।",
            pdf_workingdays_earnings_empty: "Working Days और Earnings खाली हैं। फिर भी PDF प्रिंट करें?",
            pdf_earnings_not_filled: "इस महीने के लिए आपने Earnings entries नहीं भरी हैं (All Journey>Earning Tab के अंदर)। यहां Amount ₹0 दिखा रहा है। पहले भरें, या अगर सच में इस महीने कुछ अर्निंग नहीं है तो फिर PDF generate करें।",
            pdf_recheck_values: "Working Days: {wDays} · Earnings: ₹{earn}\n\nये आपकी भरी हुई यात्राओं से automatically add हुए हैं — print करने से पहले दोनों एक बार ज़रूर चेक कर लें।",

            dest_diversion_stations_desc: "उन trains के लिए जो कभी-कभी अपने major destination station से किसी नज़दीकी station पर diversion लेती हैं (जैसे LKO की ट्रेन AMG से diverting होती हैं)। यह optional है — सिर्फ तभी add करें जब आपको अपने usual रूट्स पर किसी निश्चित diversion के बारे में पता हो।",
            quickadd_desc_hint: "📍 अपना team number एक बार <b>Roster</b> के अंदर select करें, फिर आप अपनी आने वाली duties यहां Quick Add पर एक क्लिक से add कर सकते हैं।",
            delete_entry_warning: "यात्रा delete करने से आपकी continuous journey chain टूट सकती है। बाद में missing यात्रा जोड़कर इसे ठीक किया जा सकता है।\n\nक्या आप वाकई delete करना चाहते हैं?",
            journey_time_overlap: "इस यात्रा का arrival time आपकी अगली यात्रा के departure time ({date} {time}) से overlap कर रहा है।\n\nएक समय पर सिर्फ एक ही ट्रेन की यात्रा possible है — कृपया time चेक करें।"
        }
    };

    // Recognizes existing hardcoded modal-title strings (as they appear today
    // in the three apps, including case variants) and maps them to a dict key.
    // Anything NOT in this map is left exactly as-is (Phase 2 territory).
    const TITLE_KEY_MAP = {
        "error": "error", "ERROR": "error",
        "warning": "warning", "WARNING": "warning",
        "success": "success", "SUCCESS": "success",
        "saved!": "saved",
        "save failed": "save_failed", "save error": "save_failed",
        "published!": "published",
        "profile locked": "profile_locked",
        "timing not set": "timing_not_set",
        "no train found": "no_train_found",
        "team no. not set": "team_no_not_set",
        "time error": "time_error",
        "chain error": "chain_error", "chain gap": "chain_error",
        "confirm": "confirm",
        "notice": "notice",
        "done": "done"
    };

    function getLang() {
        return localStorage.getItem(LANG_KEY) || 'en';
    }

    function setLang(lang) {
        localStorage.setItem(LANG_KEY, lang);
    }

    function t(key) {
        const lang = getLang();
        return (DICT[lang] && DICT[lang][key]) || DICT.en[key] || key;
    }

    // Like t(), but substitutes {placeholders} with dynamic values (station codes,
    // dates, times, train numbers etc.) that must stay as-is regardless of language.
    function tf(key, vars) {
        let s = t(key);
        if (vars) {
            Object.keys(vars).forEach(k => {
                s = s.split('{' + k + '}').join(vars[k]);
            });
        }
        return s;
    }

    // Translates a modal/toast title ONLY if it's a string we recognize.
    // Safe to call on every title — unrecognized strings pass through unchanged.
    function translateTitle(title) {
        if (!title || typeof title !== 'string') return title;
        const key = TITLE_KEY_MAP[title.trim()];
        return key ? t(key) : title;
    }

    // Applies translations to any element carrying data-i18n / data-i18n-title /
    // data-i18n-placeholder attributes. Call again after toggling language.
    function applyTranslations(root) {
        root = root || document;
        root.querySelectorAll('[data-i18n]').forEach(el => {
            el.textContent = t(el.getAttribute('data-i18n'));
        });
        root.querySelectorAll('[data-i18n-title]').forEach(el => {
            el.title = t(el.getAttribute('data-i18n-title'));
        });
        root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
        });
        root.querySelectorAll('[data-i18n-html]').forEach(el => {
            el.innerHTML = t(el.getAttribute('data-i18n-html'));
        });
        // Bottom-bar language toggle icon itself shows the OTHER language's
        // initial, so it reads as "tap to switch to ___".
        document.querySelectorAll('.lang-toggle-icon').forEach(el => {
            el.textContent = getLang() === 'hi' ? 'EN' : 'हि';
        });
    }

    window.toggleLanguage = function () {
        setLang(getLang() === 'en' ? 'hi' : 'en');
        applyTranslations();
        if (typeof window.onLanguageChanged === 'function') {
            window.onLanguageChanged(getLang());
        }
    };

    window.i18n = { t, tf, translateTitle, applyTranslations, getLang, setLang, LANG_KEY };

    document.addEventListener('DOMContentLoaded', function () {
        applyTranslations();
    });
})();

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
            sent: "Sent!",
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
            sign_out_confirm_msg: "Sign out of TTE LOGS on this device?",
            signed_in_as: "Signed in as",
            stay_signed_in: "Stay Signed In",
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
            profile_main_hq_desc: "This is your main posting station.",
            profile_nearby_hq_desc: "This is a nearby HQ station your journey sometimes starts from, other than your Main HQ — you do NOT claim TA for travel within this group.",
            profile_diversion_stn_desc: "It is the station from which a journey starts, other than your Main or Nearby HQ, with TA Claimed — e.g. DDU for BSB HQ.",
            profile_dest_stations_desc: "Set your usual outward destination stations and any known diversion routes (e.g. LKO trains sometimes diverting via AMG) — helps the app auto-recognize your journeys correctly.",
            profile_saved_synced: "Profile Saved & Synced!",
            profile_locked_desc: "Tap 'Edit Profile' first to make changes.",
            profile_locked_title: "Edit Profile First",
            settings_title: "🛠️ Settings",
            haptic_feedback_row: "📳 Haptic Feedback",
            hindi_language_row: "🌐 Hindi Language",
            dark_theme_row: "🌙 Dark Theme",
            floating_back_button_row: "🫳 Floating Back Button",
            duty_cal_earnings_button_row: "📅 Duty Calendar & Earnings Button",
            dashboard_balls_row: "⚡ Dashboard Quick Add/Leave Balls",
            suggest_a_circular: "Suggest a Circular",
            request_team_change: "Request Team Change",
            contact_report_issue: "Contact & Report Issue",
            install_app_row: "Install App",
            my_archived_data_row: "My Archived Data",
            my_archive_screen_title: "MY ARCHIVED DATA",
            my_archive_what_is_this: "📂 What is this?",
            my_archive_desc_1: "To keep the app fast, an admin periodically moves very old duty entries out of active storage — this is called <b>archiving</b>. It's a routine housekeeping step, not something you did wrong, and it doesn't affect your recent data at all.",
            my_archive_desc_2: "<b>What you can do here:</b> browse any of your own archived entries below, and regenerate a TA or NDA PDF for any archived month, exactly as it would have looked at the time. <b>What you can't do:</b> edit archived entries directly, or move them back into your active journal yourself — if you need that, ask your admin to restore that period.",
            my_archive_request_title: "✉️ Ask Admin to Restore",
            my_archive_request_desc: "If you need any of your archived data back in your active journal, send a note to the admin below — it goes straight to their Feedback Inbox.",
            my_archive_request_placeholder: "e.g. Could you please restore my May 2026 data? I need to regenerate a corrected PDF.",
            my_archive_request_submit: "📤 Send Request",
            unarchive_request_empty_error: "Please describe which data you'd like restored before sending.",
            unarchive_request_sent: "Your request has been sent to the admin.",
            login_browser_recommend: "For the smoothest experience — especially printing your TA/NDA PDFs correctly — this app works best on Chrome or a similar Chromium-based browser.",
            pdf_browser_recommend: "TA/NDA PDFs print most reliably on Chrome or a similar Chromium-based browser.",
            quick_add: "Quick Add",
            clear_inputs: "Clear Inputs",
            nav_sheet_add_journey: "Add Journey - Sheet Style",
            nav_sheet_add_journey_desc: "Fast, Spreadsheet style entry",
            sheet_add_journey_title: "JOURNEY SHEET",
            sheet_add_journey_hint: "Scroll sideways to see all columns. Fill a row, tap Save",
            sheet_col_train: "Train",
            sheet_col_from: "From",
            sheet_col_to: "To",
            sheet_add_btn: "✔ Save",
            aj_label_train: "Train No.",
            aj_label_dep_date: "Departure Date",
            aj_label_arr_date: "Arrival Date",
            aj_label_dep_time: "Departure Time",
            aj_label_arr_time: "Arrival Time",
            aj_label_opt: "(opt)",
            aj_label_stn_from: "Station From",
            aj_label_stn_to: "Station To",
            sheet_edit_hint: "After Editing, Click <b style=\"color:var(--blue);\">Save Edited</b>",
            sheet_add_hint: "After Filling Row, Click <b style=\"color:var(--green);\">Save Journey</b>",
            nav_dashboard_pill: "DASHBOARD",
            sheet_edit_journey_btn: "✏️ Edit",
            sheet_save_edited_btn: "✔ Save Edited",
            sheet_col_dep_date: "Dep Dt",
            sheet_col_dep_time: "Dep",
            sheet_col_arr_date: "Arr Dt",
            sheet_col_arr_time: "Arr",
            sheet_col_save: "Save/Edit",
            sheet_col_edit: "Edit",
            sheet_col_delete: "Del",
            sheet_add_rest_leave: "🌴 Add Rest-Leave",
            sheet_edit_delete_duty: "Edit/Delete Duty",
            sheet_quick_add_journey: "⚡ Quick Add",
            already_installed_title: "Already Installed",
            app_already_installed: "TTE LOGS is already installed on this device.",
            notifications_title: "Notifications",
            notifications_all_caught_up: "You are all caught up! No active warnings.",
            connectivity_offline: "🔴 You are offline",
            connectivity_online: "🔵 Back online",
            sync_syncing_ellipsis: "Syncing...",
            sync_last_synced_prefix: "Last Synced: ",
            sync_never: "Never",
            sync_status_syncing: "🔄 Syncing your data...",
            sync_status_synced: "Your data is actively syncing to Google.",
            sync_status_pending: "Unsave Data Pending to Sync : Connect to Internet",
            sync_status_offline: "You are Offline - Data is not Syncing",
            sync_status_failing: "❌ Sync keeps failing — tap to retry",
            offline_title: "Offline",
            offline_signed_in_no_data: "You're signed in, but your data couldn't be loaded because you're offline. Reconnect to load your data.",
            offline_could_not_verify_session: "Couldn't verify your session — you appear to be offline. Please connect to the internet and reopen the app.",
            backup_row: "Backup",
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

            rtc_title: "📩 Request Team Change",
            rtc_desc: "If your team has changed, let the admin know and request an update.",
            rtc_name_label: "Your Name",
            rtc_name_placeholder: "Your name",
            rtc_old_team_label: "Current / Old Team No",
            rtc_old_team_placeholder: "e.g. 9",
            rtc_new_team_label: "New Team No (if known)",
            rtc_new_team_placeholder: "e.g. 12 (optional)",
            rtc_message_label: "Message",
            rtc_message_placeholder: "Describe the change needed...",
            rtc_submit_btn: "Submit",
            rtc_cancel_btn: "Cancel",
            mandali_desc: "📍 Mandali is a past, present, and future view of where every team stays at destinations — whether LKO, PRYJ, CNB, or Anywhere else",
            mandali_row_hint: "Click any row inside Mandali to show the duty of team",

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
            sheet_edited_journey_saved: "Your edited journey was saved successfully.",
            sheet_unsaved_title: "⚠️ Unsaved Changes",
            sheet_unsaved_message: "You haven't saved this entry yet. If you leave now, it will be discarded and nothing will be added.",
            sheet_unsaved_discard_btn: "Discard & Leave",
            sheet_unsaved_keep_btn: "Keep Editing",

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
            pdf_workingdays_empty: "Working Days is empty. Generate PDF anyway?",
            pdf_earnings_empty: "Earnings is empty. Generate PDF anyway?",
            pdf_earnings_not_filled: "You haven't filled in any Earnings entries for this month yet (Earnings tab under All Journey). The Earnings amount here is ₹0. Fill it in first, or generate anyway if this month genuinely has none.",
            pdf_recheck_values: "Working Days: {wDays} · Earnings: ₹{earn}\n\nThese were auto-fetched from your logged entries — please double-check both are correct before printing.",

            dest_diversion_stations_desc: "For trains that sometimes divert away from a major destination station to a nearby one (e.g. LKO trains diverting via AMG). Optional — only add if you know of specific diversions on your usual routes.",
            quickadd_desc_hint: "📍 Pick your team number using <b>Select Team</b> below, and you can add your upcoming duties here in a single tap by clicking Quick Add.",
            delete_entry_warning: "Deleting an entry may break your continuous journey chain. You can fix it by adding missing legs later.\n\nDo you really want to delete?",
            journey_time_overlap: "This journey's arrival time overlaps with your next journey's departure time ({date} {time}).\n\nOnly one train journey is possible at a time — please check the times."
        },
        hi: {
            error: "त्रुटि",
            warning: "चेतावनी",
            success: "सफल",
            saved: "सेव हो गया!",
            sent: "भेज दिया गया!",
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
            sign_out_confirm_msg: "क्या आप इस डिवाइस पर TTE LOGS से साइन आउट करना चाहते हैं?",
            signed_in_as: "इस ईमेल से साइन इन है",
            stay_signed_in: "साइन इन रहें",
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
            profile_main_hq_desc: "यह आपका मुख्य पोस्टिंग स्टेशन है।",
            profile_nearby_hq_desc: "आपके मुख्य हेडक्वार्टर के अलावा यह एक नजदीक का हेडक्वार्टर स्टेशन है जहां से कभी-कभी यात्रा शुरू होती है — इस स्टेशनों के अंदर यात्रा के लिए TA नहीं मिलता।",
            profile_diversion_stn_desc: "आपके मुख्य या नजदीक के हेडक्वार्टर के अलावा, यह वह स्टेशन है जहां से यात्रा शुरू होती है, जिसमें TA claim होता है, जैसे- BSB HQ के लिए DDU",
            profile_dest_stations_desc: "अपने सामान्य गंतव्य स्टेशन और जाने-पहचाने डायवर्जन रूट सेट करें (जैसे LKO की ट्रेन कभी-कभी AMG से डाईवर्टेड होती हैं) — इससे app आपकी यात्रा सही तरीके से पहचान पाएगा।",
            profile_saved_synced: "प्रोफ़ाइल Save और Sync हो गई!",
            profile_locked_desc: "बदलाव करने के लिए पहले 'Edit Profile' पर क्लिक करें।",
            profile_locked_title: "पहले Edit Profile करें",
            settings_title: "🛠️ सेटिंग्स",
            haptic_feedback_row: "📳 हैप्टिक फीडबैक",
            hindi_language_row: "🌐 हिंदी भाषा",
            dark_theme_row: "🌙 डार्क थीम",
            floating_back_button_row: "🫳 फ्लोटिंग बैक बटन",
            duty_cal_earnings_button_row: "📅 ड्यूटी कैलेंडर और कमाई बटन",
            dashboard_balls_row: "⚡ डैशबोर्ड क्विक ऐड/लीव बॉल्स",
            suggest_a_circular: "सर्कुलर सुझाएं",
            request_team_change: "टीम बदलने का अनुरोध",
            contact_report_issue: "संपर्क करें और समस्या बताएं",
            install_app_row: "ऐप इंस्टॉल करें",
            my_archived_data_row: "मेरा संग्रहीत डेटा",
            my_archive_screen_title: "मेरा संग्रहीत डेटा",
            my_archive_what_is_this: "📂 यह क्या है?",
            my_archive_desc_1: "ऐप को तेज़ रखने के लिए, एडमिन समय-समय पर बहुत पुरानी ड्यूटी एंट्री को एक्टिव स्टोरेज से हटाकर <b>संग्रहीत (archive)</b> कर देता है। यह एक नियमित सफाई प्रक्रिया है, आपसे कोई गलती नहीं हुई, और इससे आपका हाल का डेटा बिल्कुल प्रभावित नहीं होता।",
            my_archive_desc_2: "<b>आप यहाँ क्या कर सकते हैं:</b> नीचे अपनी संग्रहीत एंट्री देखें, और किसी भी संग्रहीत महीने के लिए TA या NDA PDF दोबारा बनाएं, बिल्कुल वैसे ही जैसे वह उस समय दिखती थी। <b>आप क्या नहीं कर सकते:</b> संग्रहीत एंट्री को सीधे एडिट करना, या उन्हें खुद अपनी एक्टिव जर्नल में वापस लाना — अगर आपको यह चाहिए, तो एडमिन से उस अवधि को बहाल (restore) करने के लिए कहें।",
            my_archive_request_title: "✉️ एडमिन से बहाली का अनुरोध करें",
            my_archive_request_desc: "अगर आपको अपना कोई संग्रहीत डेटा वापस अपनी एक्टिव जर्नल में चाहिए, तो नीचे एडमिन को एक संदेश भेजें — यह सीधे उनके Feedback Inbox में जाएगा।",
            my_archive_request_placeholder: "जैसे: क्या आप कृपया मेरा मई 2026 का डेटा बहाल कर सकते हैं? मुझे एक सही किया हुआ PDF दोबारा बनाना है।",
            my_archive_request_submit: "📤 अनुरोध भेजें",
            unarchive_request_empty_error: "भेजने से पहले कृपया बताएं कि आपको कौन सा डेटा बहाल चाहिए।",
            unarchive_request_sent: "आपका अनुरोध एडमिन को भेज दिया गया है।",
            login_browser_recommend: "सबसे अच्छे अनुभव के लिए — खासकर अपने TA/NDA PDF को सही तरीके से प्रिंट करने के लिए — यह ऐप Chrome या इसी तरह के Chromium-आधारित ब्राउज़र पर सबसे अच्छा काम करता है।",
            pdf_browser_recommend: "TA/NDA PDF Chrome या इसी तरह के Chromium-आधारित ब्राउज़र पर सबसे भरोसेमंद तरीके से प्रिंट होते हैं।",
            quick_add: "क्विक ऐड",
            clear_inputs: "इनपुट साफ़ करें",
            already_installed_title: "पहले से इंस्टॉल है",
            app_already_installed: "TTE LOGS इस डिवाइस पर पहले से इंस्टॉल है।",
            notifications_title: "नोटिफिकेशन",
            notifications_all_caught_up: "आप पूरी तरह अपडेट हैं! कोई सक्रिय चेतावनी नहीं है।",
            connectivity_offline: "🔴 आप ऑफ़लाइन हैं",
            connectivity_online: "🔵 वापस ऑनलाइन",
            sync_syncing_ellipsis: "Sync हो रहा है...",
            sync_last_synced_prefix: "आखिरी Sync: ",
            sync_never: "कभी नहीं",
            sync_status_syncing: "🔄 आपका data sync हो रहा है...",
            sync_status_synced: "आपका data लगातार Google से sync हो रहा है।",
            sync_status_pending: "Save नहीं हुआ Data — Internet से Connect करें",
            sync_status_offline: "आप Offline हैं — Data Sync नहीं हो रहा",
            sync_status_failing: "❌ Sync बार-बार fail हो रहा है — फिर कोशिश करने के लिए tap करें",
            offline_title: "ऑफ़लाइन",
            offline_signed_in_no_data: "आप sign in हैं, लेकिन ऑफ़लाइन होने की वजह से आपका data load नहीं हो सका। data देखने के लिए दोबारा connect करें।",
            offline_could_not_verify_session: "आपका session verify नहीं हो सका — लगता है आप ऑफ़लाइन हैं। कृपया internet से जुड़ें और app दोबारा खोलें।",
            backup_row: "बैकअप",
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

            rtc_title: "📩 Team Change Request करें",
            rtc_desc: "अगर आपकी team बदल गई है, तो admin को बताएं और update के लिए request करें।",
            rtc_name_label: "आपका नाम",
            rtc_name_placeholder: "आपका नाम",
            rtc_old_team_label: "मौजूदा / पुराना Team No",
            rtc_old_team_placeholder: "जैसे 9",
            rtc_new_team_label: "नया Team No (अगर पता हो)",
            rtc_new_team_placeholder: "जैसे 12 (वैकल्पिक)",
            rtc_message_label: "संदेश",
            rtc_message_placeholder: "बदलाव के बारे में बताएं...",
            rtc_submit_btn: "भेजें",
            rtc_cancel_btn: "रद्द करें",
            mandali_desc: "📍 मंडली बताती है कि हर team, LKO, PRYJ, CNB या किसी और स्टेशन पर पहले कब रुकी थी, अभी कहां है, और आगे कहां रुकेगी।",
            mandali_row_hint: "मंडली के अंदर किसी भी row पर tap करें और team की duty देखें",

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
            sheet_edited_journey_saved: "आपकी edited यात्रा सफलतापूर्वक save हो गई।",
            sheet_unsaved_title: "⚠️ Unsaved Changes",
            sheet_unsaved_message: "आपने यह entry अभी तक save नहीं की है। अगर अभी बाहर गए, तो यह discard हो जाएगी और कुछ भी add नहीं होगा।",
            sheet_unsaved_discard_btn: "Discard करें और जाएं",
            sheet_unsaved_keep_btn: "Editing जारी रखें",

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
            pdf_workingdays_empty: "Working Days खाली है। फिर भी PDF प्रिंट करें?",
            pdf_earnings_empty: "Earnings खाली है। फिर भी PDF प्रिंट करें?",
            nav_sheet_add_journey: "यात्रा जोड़ें - शीट स्टाइल",
            nav_sheet_add_journey_desc: "तेज़, स्प्रेडशीट स्टाइल एंट्री",
            sheet_add_journey_title: "यात्रा शीट",
            sheet_add_journey_hint: "सभी कॉलम देखने के लिए बगल में स्क्रॉल करें। एक पंक्ति भरें, Save दबाएं",
            sheet_col_train: "ट्रेन",
            sheet_col_from: "से",
            sheet_col_to: "तक",
            sheet_add_btn: "✔ सेव करें",
            aj_label_train: "ट्रेन नंबर",
            aj_label_dep_date: "प्रस्थान तिथि",
            aj_label_arr_date: "आगमन तिथि",
            aj_label_dep_time: "प्रस्थान समय",
            aj_label_arr_time: "आगमन समय",
            aj_label_opt: "(वैकल्पिक)",
            aj_label_stn_from: "स्टेशन से",
            aj_label_stn_to: "स्टेशन तक",
            sheet_edit_hint: "एडिट करने के बाद, <b style=\"color:var(--blue);\">Save Edited</b> दबाएं",
            sheet_add_hint: "रो भरने के बाद, <b style=\"color:var(--green);\">Save Journey</b> दबाएं",
            nav_dashboard_pill: "डैशबोर्ड",
            sheet_edit_journey_btn: "✏️ एडिट करें",
            sheet_save_edited_btn: "✔ Edited Save करें",
            sheet_col_dep_date: "प्रस्थान दिन",
            sheet_col_dep_time: "प्रस्थान",
            sheet_col_arr_date: "आगमन दिन",
            sheet_col_arr_time: "आगमन",
            sheet_col_save: "Save/Edit",
            sheet_col_edit: "एडिट",
            sheet_col_delete: "हटाएं",
            sheet_add_rest_leave: "🌴 आराम-छुट्टी जोड़ें",
            sheet_edit_delete_duty: "ड्यूटी एडिट/डिलीट करें",
            sheet_quick_add_journey: "⚡ क्विक ऐड",
            pdf_earnings_not_filled: "इस महीने के लिए आपने Earnings entries नहीं भरी हैं (All Journey>Earning Tab के अंदर)। यहां Amount ₹0 दिखा रहा है। पहले भरें, या अगर सच में इस महीने कुछ अर्निंग नहीं है तो फिर PDF generate करें।",
            pdf_recheck_values: "Working Days: {wDays} · Earnings: ₹{earn}\n\nये आपकी भरी हुई यात्राओं से automatically add हुए हैं — print करने से पहले दोनों एक बार ज़रूर चेक कर लें।",

            dest_diversion_stations_desc: "उन trains के लिए जो कभी-कभी अपने major destination station से किसी नज़दीकी station पर diversion लेती हैं (जैसे LKO की ट्रेन AMG से diverting होती हैं)। यह optional है — सिर्फ तभी add करें जब आपको अपने usual रूट्स पर किसी निश्चित diversion के बारे में पता हो।",
            quickadd_desc_hint: "📍 नीचे <b>Select Team</b> से अपना team number चुनें, फिर आप अपनी आने वाली duties यहां Quick Add पर एक क्लिक से add कर सकते हैं।",
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
        "sent!": "sent",
        "already installed": "already_installed_title",
        "notifications": "notifications_title",
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

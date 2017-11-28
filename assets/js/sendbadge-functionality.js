var currentForm;

function changeTab(evt, form) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(form).style.display = "block";
    evt.currentTarget.className += " active";
}

window.onload = function () {
    /* Variables */
    var isLocalhost = false;


    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        isLocalhost = true;
    }

    // Prevent "enter" pressing when filling the text fields
    jQuery(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    /* =====================================
        BADGE FORM # A #
       ===================================== */

    var form_a = jQuery("#form_a");
    form_a.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            confirm: {
                equalTo: "#password"
            }
        }
    });

    form_a.children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex) {
            var currentForm = "a";

            if (newIndex < currentIndex) {
                disableTab(form_a, newIndex, currentIndex);
                form_a.validate().settings.ignore = ":disabled,:hidden";
                return form_a.valid();
            }

            switch (currentIndex) {
                /******* (0) FIELD OF EDUCATION */
                case 0:
                    return load_levels(currentForm, form_a);
                    break;
                /******* (1) LEVEL */
                case 1:
                    return load_badges(currentForm, form_a);
                    break;

                /******* (2) KIND OF BADGE */
                case 2:
                    return load_description(currentForm, form_a);
                    break;

                /******* (3) LANGUAGE */
                case 3:
                    form_a.validate().settings.ignore = ":disabled,:hidden";
                    return form_a.valid();
                    break;

                /******* (4) INFORMATION */
                case 4:
                    return check_information(currentForm, form_a);
                    break;
            }
        },
        onFinishing: function (event, currentIndex) {
            return check_information("a", form_a);
        },
        onFinished: function (event, currentIndex) {
            sendMessageBadge("a");
        }
    });


    /* =====================================
         BADGE FORM # B #
       ===================================== */

    var form_b = jQuery("#form_b");
    form_b.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            confirm: {
                equalTo: "#password"
            }
        }
    });

    form_b.children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex) {
            //Variables
            var currentForm = "b";

            if (newIndex < currentIndex) {
                disableTab(form_b, newIndex, currentIndex);
                form_b.validate().settings.ignore = ":disabled,:hidden";
                return form_b.valid();
            }

            switch (currentIndex) {
                /******* (0) FIELD OF EDUCATION */
                case 0:
                    return load_levels(currentForm, form_b);
                    break;
                /******* (1) LEVEL */
                case 1:
                    return load_badges(currentForm, form_b);
                    break;

                /******* (2) KIND OF BADGE */
                case 2:
                    return load_description(currentForm, form_b);
                    break;
                /******* (3) LANGUAGE */
                case 3:
                    return load_classes(currentForm, form_b);
                    break;
                /******* (4) CLASS */
                case 4:
                    return check_class(currentForm, form_b);
                    break;
                /******* (5) EMAIL */
                case 5:
                    return check_mails(currentForm, form_b);
                    break;
                /******* (6) INFORMATION */
                case 6:
                    return check_information(currentForm, form_b);
                    break;
            }

        },
        onFinishing: function (event, currentIndex) {
            return check_information("b", form_b);

        },
        onFinished: function (event, currentIndex) {
            sendMessageBadge("b");
        }
    });


    /* =====================================
         BADGE FORM # C #
       ===================================== */

    var form_c = jQuery("#form_c");
    form_c.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            confirm: {
                equalTo: "#password"
            }
        }
    });

    form_c.children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex) {
            //Variables
            var currentForm = "c";


            if (newIndex < currentIndex) {
                disableTab(form_c, newIndex, currentIndex);
                form_c.validate().settings.ignore = ":disabled,:hidden";
                return form_c.valid();
            }

            switch (currentIndex) {
                /******* (0) FIELD OF EDUCATION */
                case 0:
                    return load_levels(currentForm, form_c);
                    break;
                /******* (1) LEVEL */
                case 1:
                    return load_badges(currentForm, form_c);
                    break;

                /******* (2) KIND OF BADGE */
                case 2:
                    return load_description(currentForm, form_c);
                    break;
                /******* (3) LANGUAGE */
                case 3:
                    return load_classes(currentForm, form_c);
                    break;
                /******* (4) CLASS */
                case 4:
                    return check_class(currentForm, form_c);
                    break;
                /******* (5) EMAIL */
                case 5:
                    return check_mails(currentForm, form_c);
                    break;
                /******* (6) INFORMATION */
                case 6:
                    return check_information(currentForm, form_c);
                    break;
            }

        },
        onFinishing: function (event, currentIndex) {
            return check_information("c", form_c);

        },
        onFinished: function (event, currentIndex) {
            sendMessageBadge("c");
        }
    });

    /**
     * To load the FIELD OF EDUCATION (PARENT)
     * When you click on the .display_parent_categories to see the other "Field of Education" category (parent),
     * the function call the "action_languages_form" in the other file.
     *
     * @author Alessandro RICCARDI
     * @since 0.6.3
     */
    jQuery(".btn-change-children").click(function (e) {
        e.preventDefault();

        currentForm = checkForm(this);
        //Remove the class 'active' to the old button of the field of education.
        jQuery("#form_" + currentForm + " .btn-change-children.active").removeClass("active");
        //Add the class 'active' to the actual button.
        jQuery(this).addClass("active");

        jQuery("#field_" + currentForm).html("<br />" +
            "<img src='" + globalUrl.loader + "' width='50px' height='50px' />");

        var id_lan = jQuery(this).attr('id');
        id_lan = id_lan.replace(/\s/g, '');

        var data = {
            'action': 'ajaxShowFields',
            'form': currentForm,
            'slug': id_lan,
        };

        // since 2.8 globalUrl.ajax is always defined in the admin header and points to admin-ajax.php
        jQuery.post(
            globalUrl.ajax,
            data,
            function (response) {
                jQuery("#field_" + currentForm).html(response);
            }
        );
    });

    /**
     * To load the LEVEL
     *
     * @param currentForm, contain the letter of the form
     * @param form, contain the form
     *
     * @author Alessandro RICCARDI
     * @since 0.6.3
     */

    function load_levels(currentForm, form) {
        var field = jQuery("#form_" + currentForm + " #field :selected").val();

        if (field == "Select") {
            return false;
        }

        jQuery("#level_" + currentForm).html("<br> <img src='" + globalUrl.loader + "' width='50px' height='50px' />");

        var data = {
            'action': 'ajaxShowLevels',
            'form': currentForm,
            'field': field
        };

        jQuery.post(
            globalUrl.ajax,
            data,
            function (response) {
                jQuery("#level_" + currentForm).html(response);

            }
        );

        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    }

    /**
     * To load the BADGE
     *
     * @author Alessandro RICCARDI
     * @since 0.6.3
     */
    function load_badges(currentForm, form) {
        var check = false;
        var field = jQuery("#form_" + currentForm + " #field :selected").val();
        var levelValue = "";

        jQuery("input[name='level_" + currentForm + "']")
            .each(function () {
                if (jQuery(this).is(':checked')) {
                    check = true;
                    levelValue = jQuery(this).val();
                }
            });

        if (!check) {
            return false;
        }

        jQuery("#badge_" + currentForm).html("<br /><img src='" + globalUrl.loader + "' width='50px' height='50px' />");

        var data = {
            'action': 'ajaxShowBadges',
            'form': currentForm,
            'field': field,
            'level': levelValue
        };

        jQuery.post(
            globalUrl.ajax,
            data,
            function (response) {
                jQuery("#badge_" + currentForm).html(response);

            }
        );

        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    }

    /**
     * To load the DESCRIPTION
     *
     * @param currentForm, contain the letter of the form
     * @param form, contain the form
     *
     * @author Alessandro RICCARDI
     * @since 0.6.3
     */
    function load_description(currentForm, form) {
        var badgeId = "";

        // Check if we selected a badge to permit to switch the page
        jQuery("input[name='badge_" + currentForm + "']")  // check if one badge is selected
            .each(function () {  // first pass, create name mapping
                if (jQuery(this).is(':checked')) {
                    badgeId = jQuery(this).val();
                }
            });

        // Badge no selected
        if (!badgeId) {
            return false;
        }

        // LOAD the GIF
        jQuery("#desc_" + currentForm).html("<br> <img src='" + globalUrl.loader + "' width='50px' height='50px' />");

        // Data for the AJAX call
        var data = {
            'action': 'ajaxShowDescription',
            'form': currentForm,
            'ID': badgeId
        };

        // AJAX call
        jQuery.post(
            globalUrl.ajax,
            data,
            function (response) {
                jQuery("#desc_" + currentForm).html(response);
            }
        );

        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    }

    /**
     * To load the CLASS
     *
     * @param currentForm, contain the letter of the form
     * @param form, contain the form
     *
     * @author Alessandro RICCARDI
     * @since 0.6.3
     */
    function load_classes(currentForm, form) {
        var field = jQuery("#form_" + currentForm + " #field :selected").val();
        var level = "";

        jQuery("input[name='level_" + currentForm + "']")
            .each(function () {
                if (jQuery(this).is(':checked')) {
                    level = jQuery(this).val();
                }
            });

        jQuery("#class_" + currentForm).html("<br /><img src='" + globalUrl.loader + "' width='50px' height='50px' />");

        var data = {
            'action': 'ajaxShowClasses',
            'form': currentForm,
            'field': field,
            'level': level
        };
        jQuery.post(
            globalUrl.ajax,
            data,
            function (response) {
                jQuery("#class_" + currentForm).html(response);
            }
        );
        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    }

    /**
     * Check if is selected the class.
     * @param currentForm, contain the letter of the form
     * @param form, contain the form
     *
     * @author Alessandro RICCARDI
     * @since 0.6.3
     */
    function check_class(currentForm, form) {
        var check = false;

        jQuery("input[name='class_" + currentForm + "']")  // for all checkboxes
            .each(function () {  // first pass, create name mapping
                    // I'm setting this var to understand if the class section is
                    // activated (WP Job Listing)
                    if (jQuery(this).is(':checked')) {
                        check = true;
                    }
                }
            );

        if (check || !check_class) {
            //Load description of language for the next page
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        } else if (!jQuery("#class-section").length) {
            return check_mails(currentForm, form);
        } else {
            return false;
        }
    }


    /**
     * Check if the the email/s contain only email and not garbage.
     *
     * @param currentForm, contain the letter of the form
     * @param form, contain the form
     *
     * @author Alessandro RICCARDI
     * @since 0.6.3
     */
    function check_mails(currentForm, form) {
        var res = false;
        var mails = [jQuery("#mail_" + currentForm).val()];

        if (mails) {
            var patEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (currentForm == 'c') {
                mails = mails[0].split(",");
                for (var i = 0; i < mails.length; i++) {
                    mails[i] = mails[i].replace(/ /g,'')
                }
            }

            for (var i = 0; i < mails.length; i++) {
                res = patEmail.test(mails[i]);
                if (!res && mails[i] <= 220) return false;
            }

            // Everything good
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        } else {
            // No text
            return false;
        }
    }

    /**
     * Check if there are information with text more long than 10 letter and less than 1000
     * @param currentForm,
     * @param form, contain the form
     *
     * @author Alessandro RICCARDI
     * @since 0.6.3
     */
    function check_information(currentForm, form) {
        var info = jQuery("#comment_" + currentForm).val();
        var evidence = jQuery("#evidence_" + currentForm).val();

        var patLink = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

        if ((info.length > 10 && info.length < 1000) && (!evidence || patLink.test(evidence))) {
            // Everything good
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        } else {
            // No text
            return false;
        }
    }

    /**
     * TO SEND THE BADGE
     * This function make an ajax call to permit to send the
     * badge to the right person and also to store in the server.
     *
     * @author Alessandro RICCARDI
     * @since 0.6.3
     */
    function sendMessageBadge(currentForm) {
        //if (!isLocalhost) {
        if (1) {
            var fieldId;
            var levelId;
            var badgeId;
            var theClassId;
            var receivers;
            var info;
            var evidence;

            /* # FIELD ID # */
            fieldId = jQuery("#form_" + currentForm + " #field :selected").val();
            /* # LEVEL ID # */
            jQuery("input[name='level_" + currentForm + "']")
                .each(function () {
                    if (jQuery(this).is(':checked')) {
                        levelId = jQuery(this).val();
                    }
                });
            /* # BADGE ID # */
            jQuery("input[name='badge_" + currentForm + "']")
                .each(function () {
                    if (jQuery(this).is(':checked')) {
                        badgeId = jQuery(this).val();
                    }
                });
            /* # CLASS ID # */
            jQuery("input[name='class_" + currentForm + "']")
                .each(function () {
                    if (jQuery(this).is(':checked')) {
                        theClassId = jQuery(this).val();
                    }
                });
            /* # MAIL # */
            receivers = [jQuery("#mail_" + currentForm).val()];
            if (currentForm == 'c') {
                receivers = receivers[0].split(",");
                for (var i = 0; i < receivers.length; i++) {
                    receivers[i] = receivers[i].replace(/ /g,'')
                }
            }
            /* # INFO # */
            info = jQuery("#comment_" + currentForm).val();
            // EVIDENCE
            evidence = jQuery("#evidence_" + currentForm).val();

            var data = {
                'action': 'ajaxSendBadge',
                'form': currentForm,
                'badgeId': badgeId,
                'fieldId': fieldId,
                'levelId': levelId,
                'theClassId': theClassId,
                'info': info,
                'evidence': evidence,
                'receivers': receivers,
            };

            jQuery.post(
                globalUrl.ajax,
                data,
                function (response) {
                    alert(response);
                    //location.reload();
                }
            );
        } else {
            alert("Sending badge not available because WordPress is running in localhost!");
            location.reload();
        }
    }


    /**
     * This function permit to check the current form and save into a variable.
     * @param event of the event about the click
     *
     * @author Alessandro RICCARDI
     * @since 0.6.3
     */
    function checkForm(event) {
        if (jQuery(event).parents('#form_a').length == 1) {
            return "a";
        } else if (jQuery(event).parents('#form_b').length == 1) {
            return "b";
        } else if (jQuery(event).parents('#form_c').length == 1) {
            return "c";
        } else {
            throw "There aren't other Form."
        }

    }

    /**
     * Disable the selection of the tab from the
     * new index until the current index
     *
     * @author Alessandro RICCARDI
     * @since x.x.x
     */
    function disableTab(form, newIndex, currentIndex) {
        var doneDiv = form.find(".done");
        for (var i = newIndex; i < currentIndex; i++) {
            jQuery(doneDiv[i]).removeClass("done");
            jQuery(doneDiv[i]).addClass("disabled");
        }
        form.find(".current").each(function () {
            jQuery(this).removeClass("done");
            jQuery(this).addClass("disabled");
        });
    }

    function getSelectedValue(e) {
        if (jQuery(e).is(':checked')) {
            return jQuery(e).val();
        }
    }
}
;

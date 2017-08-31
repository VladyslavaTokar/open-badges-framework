<?php

// JAVASCRIPT & JQUERY FUNCTIONS

add_action( 'admin_footer', 'js_form' ); // Write our JS below here
add_action( 'wp_footer', 'js_form' );
/**
 * Loads and displays the available languages of badge's description according to the badge selected.
 *
 * @author Nicolas TORION
 * @since 1.0.0
*/
function js_form() {
  $forms = ["a", "b", "c"];

  foreach ($forms as $form) {
    ?>
    <script>
    jQuery("#badge_form_<?php echo $form; ?> .level").on("click", function() {

      jQuery("#badge_form_<?php echo $form; ?> #select_badge").html("<br /><img src='<?php echo plugins_url( '../../assets/load.gif', __FILE__ ); ?>' width='50px' height='50px' />");

      var data = {
  			'action': 'action_select_badge',
        'form': 'form_<?php echo $form; ?>_',
  			'level_selected': jQuery("#badge_form_<?php echo $form; ?> .level:checked").val(),
        "language_selected": jQuery("#badge_form_<?php echo $form; ?> #language").val()
  		};

  		// since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
  		jQuery.post("<?php echo plugins_url( '../ajax/custom_ajax.php', __FILE__ ); ?>", data, function(response) {
  			jQuery("#badge_form_<?php echo $form; ?> #select_badge").html(response);
  		});
    });

    jQuery("#languages_form_<?php echo $form; ?>").on("click", ".display_parent_categories", function() {
      console.log("clicked");
      jQuery("#languages_form_<?php echo $form; ?>").html("<br /><img src='<?php echo plugins_url( '../../assets/load.gif', __FILE__ ); ?>' width='50px' height='50px' />");

      var id_lan = jQuery(this).attr('id');
      id_lan = id_lan.replace(/\s/g, '');
      var data = {
  			'action': 'action_languages_form',
        'form': '<?php echo $form; ?>',
        'slug': id_lan
  		};

  		// since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
  		jQuery.post("<?php echo plugins_url( '../ajax/custom_ajax.php', __FILE__ ); ?>", data, function(response) {
  			jQuery("#languages_form_<?php echo $form; ?>").html(response);
  		});

    });

    jQuery("#languages_form_<?php echo $form; ?>").on("click", "#display_mi_languages_<?php echo $form ?>", function() {
      jQuery("#languages_form_<?php echo $form; ?>").html("<br /><img src='<?php echo plugins_url( '../../assets/load.gif', __FILE__ ); ?>' width='50px' height='50px' />");

      var data = {
        'action': 'action_mi_languages_form',
        'form': '<?php echo $form; ?>'
      };

      // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
      jQuery.post("<?php echo plugins_url( '../ajax/custom_ajax.php', __FILE__ ); ?>", data, function(response) {
        jQuery("#languages_form_<?php echo $form; ?>").html(response);
      });

    });
    </script>
    <?php
  }

  ?>
  <script>
  function load_classes(form) {
    jQuery("#badge_form_"+form+" #select_class").html("<br /><img src='<?php echo plugins_url( '../../assets/load.gif', __FILE__ ); ?>' width='50px' height='50px' />");

    var data = {
      'action': 'action_select_class',
      'form': 'form_'+form+'_',
      'level_selected': jQuery("#badge_form_"+form+" .level:checked").val(),
      'language_selected': jQuery("#badge_form_"+form+" #language option:selected").text()
    };

    // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
    jQuery.post("<?php echo plugins_url( '../ajax/custom_ajax.php', __FILE__ ); ?>", data, function(response) {
      jQuery("#badge_form_"+form+" #select_class").html(response);
    });
  }
  </script>
  <?php

  $forms_class = ["b", "c"];
  foreach ($forms_class as $form) {
  ?>
    <script>
    jQuery("#badge_form_<?php echo $form; ?> .level").on("click", function() {
      load_classes('<?php echo $form; ?>');
    });
    jQuery(document).on("change", "#badge_form_<?php echo $form; ?> #language",function() {
      load_classes('<?php echo $form; ?>');
    });
    </script>
  <?php
  }
}

add_action( 'admin_footer', 'js_save_metabox_students' ); // Write our JS below here
add_action( 'wp_footer', 'js_save_metabox_students' );

/**
 * Saves the metabox students in the class job listing post type.
 *
 * @author Nicolas TORION
 * @since 1.0.0
*/
function js_save_metabox_students() {
  ?>
  <script>
  function save_metabox_students() {

    console.log("CHANGE DETECTED");
    var post_id = jQuery("#box_students").attr('name');
    var students = {};
    var i = 0;
    jQuery("#box_students tbody").find("tr").each(function(){
      var student_infos = [];
      jQuery(this).find("td").each(function(){
        student_infos.push(jQuery(this).find("center").html());
      });

      var login = student_infos[0];
      var level = student_infos[1];
      var language = student_infos[2];
      var date = student_infos[3];

      var student = {
        'login': login,
        'level': level,
        'language': language,
        'date': date
      };

      students[i] = student;
      i = i + 1;
    });

    var data = {
      'action': 'action_save_metabox_students',
      'class_students': students,
      'post_id': post_id
    };

		// since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
		jQuery.post("<?php echo plugins_url( '../ajax/custom_ajax.php', __FILE__ ); ?>", data, function(response) {
      console.log(response);
    });
  };
  </script>
  <?php
}

add_action( 'admin_footer', 'js_forms' ); // Write our JS below here
add_action( 'wp_footer', 'js_forms' );

/**
 * Check if different forms for sending badges are completed well.
 * If it's the case, the submit buttons are activated.
 *
 * @author Nicolas TORION
 * @since 1.0.0
*/
function js_forms() {
  ?>
  <script>
    setInterval(function(){check_badge_form();}, 500);
    setInterval(function(){check_settings_badges_issuer_form();}, 500);

    function check_mails(mails) {

      if(typeof mails !== 'undefined') {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

        for (var i = 0; i < mails.length; i++) {
          if(!testEmail.test(mails[i])) {
            return false;
          }
        }
        return true;
      }
      else {
        return false;
      }
    }

    function check_urls(urls) {
      var pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      if(typeof urls !== 'undefined') {
        for (var i = 0; i < urls.length; i++) {
          if(!pattern.test(urls[i])) {
            return false;
          }
        }
        return true;
      }
      else {
        return false;
      }
    }

    function check_settings_badges_issuer_form() {
      var name = jQuery("#settings_form_badges_issuer #badges_issuer_name").val();
      var image = jQuery("#settings_form_badges_issuer #badges_issuer_image").val();
      var website = jQuery("#settings_form_badges_issuer #badges_issuer_website").val();
      var mail = jQuery("#settings_form_badges_issuer #badges_issuer_mail").val();

      if(check_mails([mail]) && name!="" && check_urls([image, website])) {
        jQuery('#settings_form_badges_issuer #settings_submit_badges_issuer').prop('disabled', false);
      }
      else {
        jQuery('#settings_form_badges_issuer #settings_submit_badges_issuer').prop('disabled', true);
      }
    }

    function check_badge_form() {
      var badge_a = jQuery("#badge_form_a .input-badge");

      if(typeof jQuery("#badge_form_b .mail").val() !== 'undefined')
        var mails_b = jQuery("#badge_form_b .mail").val().split("\n");

      var badge_b = jQuery("#badge_form_b .input-badge");

      if(typeof jQuery("#badge_form_c .mail").val() !== 'undefined')
        var mails_c = jQuery("#badge_form_c .mail").val().split("\n");

      var badge_c = jQuery("#badge_form_c .input-badge");

      if(!badge_a.is(':checked')) {
        jQuery('#submit_button_a').prop('disabled', true);
      }
      else {
        jQuery('#submit_button_a').prop('disabled', false);
      }

      if(!check_mails(mails_b) || !badge_b.is(':checked')) {
        jQuery('#submit_button_b').prop('disabled', true);
      }
      else {
        jQuery('#submit_button_b').prop('disabled', false);
      }

      if(!check_mails(mails_c) || !badge_c.is(':checked')) {
        jQuery('#submit_button_c').prop('disabled', true);
      }
      else {
        jQuery('#submit_button_c').prop('disabled', false);
      }
    }
  </script>
<?php
}


add_action( 'admin_footer', 'edit_comment_translation' );
add_action( 'wp_footer', 'edit_comment_translation' );

/**
 *
 * JAVASCRIPT code to allow a teacher of the academy to edit his translations.
 *
 * @author Nicolas TORION
 * @since 1.0.0
*/
function edit_comment_translation() {
  ?>
  <script>
  jQuery("#edit_comment_link").on("click", function(){
    var comment_content = jQuery(this).parent();
    var comment_id = comment_content.attr("id");
    var comment_text = comment_content.find("#comment_text");
    var comment_text_value = comment_text.text();

    var content='<textarea id="textarea_edit_comment" rows="6" cols="40">'+ comment_text_value +'</textarea>'
    + '<a href="#" id="save_comment_link">Save your modifications</a>';
    comment_content.html(content);

    jQuery("#save_comment_link").on("click", function(){
      var comment_text_value = comment_content.find("textarea").val();

      var data = {
        'action': 'action_save_comment',
        'comment_id': comment_id,
        'comment_text': comment_text_value
      };

  		// since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
  		jQuery.post("<?php echo plugins_url( '../ajax/custom_ajax.php', __FILE__ ); ?>", data, function(response) {
        console.log(response);
      });

      var content = comment_text_value + '<br /><br /><a href="#" id="edit_comment_link">Edit your translation</a>';
      comment_content.html(content);
    });
  });
  </script>
  <?php
}
 ?>

 <?php
 add_action( 'admin_footer', 'reset_input_radio' );
 add_action( 'wp_footer', 'reset_input_radio' );

 /**
  *
  * JAVASCRIPT code to reset an input radio selection.
  *
  * @author Nicolas TORION
  * @since 1.0.0
 */
 function reset_input_radio() {
   ?>
   <script>
   function reset_input_radio() {
     jQuery('input[name="class_for_student"]').prop('checked', false);
   }
   </script>

 <?php
}
?>

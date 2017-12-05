<?php
/**
 * The SendBadge Class. In this class are stored
 * the most important function that permit us to
 * send a badge.
 *
 * @author      Alessandro RICCARDI
 * @since       x.x.x
 *
 * @package     OpenBadgesFramework
 */

namespace Inc\Utils;

use Inc\Base\BaseController;
use inc\Base\User;
use Inc\Database\DbBadge;
use Inc\OB\JsonManagement;
use Inc\Utils\Badges;
use Inc\Pages\Admin;


class SendBadge extends BaseController {
    private $badgeInfo = null;
    private $jsonMg = null;
    private $badge = null;
    private $field = null;
    private $level = null;
    private $receivers = null;
    private $class = null;
    private $evidence = null;

    /**
     * The constructor that initialize all the variable
     *
     * @author      Alessandro RICCARDI
     * @since       x.x.x
     *
     * @param int    $badgeId   the id of the badge
     * @param int    $fieldId   the id of the field
     * @param int    $levelId   the id of the level
     * @param string $info      the additional from the teacher
     * @param array  $receivers the people that will receive the email
     * @param string $class     the eventual class
     * @param string $evidence  the work of the student in url format
     */
    function __construct($badgeId, $fieldId, $levelId, $info, $receivers, $class = '', $evidence = '') {
        $badges = new Badges();
        $this->badge = $badges->getBadgeById($badgeId);

        $this->field = get_term($fieldId, Admin::TAX_FIELDS);
        $this->level = get_term($levelId, Admin::TAX_LEVELS);

        $this->badgeInfo = array(
            'id' => $this->badge->ID,
            'name' => $this->badge->post_title,
            'field' => $this->field->name,
            'level' => $this->level->name,
            'description' => $this->badge->post_content,
            'link' => get_permalink($this->badge),
            'image' => get_the_post_thumbnail_url($this->badge->ID),
            'tags' => array($this->field->name . "", $this->level->name . ""),
            'info' => $info,
            'evidence' => $evidence
        );

        $this->receivers = $receivers;
        $this->class = $class;
        $this->evidence = $evidence;

        $this->jsonMg = new JsonManagement($this->badgeInfo);
    }

    /**
     * This class do three principal things, crate
     * the json file, crate the body, send the email
     * and store all of that information in the database
     *
     * @author   Alessandro RICCARDI
     * @since    x.x.x
     */
    public function sendBadge() {

        $subject = "Badge: " . $this->badge->post_title . " Field: " . $this->field->name;
        //Setting headers so it"s a MIME mail and a html
        $headers = "From: badges4languages <mylanguageskills@hotmail.com>\n";
        $headers .= "MIME-Version: 1.0\n";
        $headers .= "Content-type: text/html; charset=utf-8\n";
        $headers .= "Reply-To: mylanguageskills@hotmail.com\n";

        if (is_array($this->receivers)) {
            foreach ($this->receivers as $receiver) {

                // Creation of json file
                $hashName = $this->jsonMg->createJsonFile($receiver);

                if ($hashName != null) {
                    // Creating the body of the email
                    $body = $this->getBodyEmail($hashName);
                } else {
                    return "Error json file\n";
                }

                // Sending the email -->-->
                if (!wp_mail($receiver, $subject, $body, $headers)) {
                    return "Error email\n";
                }

                $data = array(
                    'userEmail' => $receiver,
                    'badgeId' => $this->badgeInfo['id'],
                    'fieldId' => $this->field->term_id,
                    'levelId' => $this->level->term_id,
                    'classId' => $this->class,
                    'teacherId' => User::getCurrentUser()->ID,
                    'roleSlug' => User::getCurrentUser()->roles[0],
                    'dateCreation' => DbBadge::now() . '',
                    'json' => $hashName,
                    'info' => $this->badgeInfo['info']
                );

                // Insertion of the email in the database
                $res = DbBadge::insert($data);
                if ($res === DbBadge::ER_DUPLICATE) {
                    echo $receiver . " : " . DbBadge::ER_DUPLICATE;
                } else if (!$res) {
                    return "Db insert error.\n";
                }
            }
            return "Email success.\n";
        } else {
            return "Not array\n";
        }
    }

    /**
     * The body of the email
     *
     * @author   Alessandro RICCARDI
     * @since    x.x.x
     */
    private function getBodyEmail($hash_file) {
        $urlGetBadge = home_url('/' . Admin::SLUG_GETBADGE . '/');

        $badgeLink =
            $urlGetBadge .
            "?json=$hash_file" .
            "&badge=" . $this->badge->ID .
            "&field=" . $this->field->term_id .
            "&level=" . $this->level->term_id;

        $body = "
                <html>
                    <head>
                        <meta http-equiv='Content-Type' content='text/html'; charset='utf-8' />
                    </head>
                    <body>
                        <div class='container'>
                            <a href='$badgeLink'>Get the badge</a>
                        </div>
                    </body>
                </html>
                    ";
        return $body;
    }
}
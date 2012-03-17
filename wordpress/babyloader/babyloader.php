<?php
/*
Plugin Name: Baby Loader
Plugin URI: https://github.com/awayken/Baby-Loader
Description: Displays a progress bar for your fetus.
Version: 1.0.0
Author: Miles Rausch
Author URI: http://awayken.com
*/

define( 'AWAYKEN_BABYLOADER_VERSION', '1.0.0' );

function awayken_babyloader_init() {
	if ( is_active_widget( false, false, 'awayken_babyloader' ) ) {
		wp_enqueue_script( 'awayken_babyloader-js', plugins_url( 'baby.js', __FILE__ ), null, AWAYKEN_BABYLOADER_VERSION );
	}
}
add_action( 'wp_enqueue_scripts', 'awayken_babyloader_init' );

class awayken_babyloader extends WP_Widget {

	function __construct() {
		parent::__construct( false, 'Baby Loader', array( 'description' => 'Displays a progress bar for your fetus.' ) );
	}

	function awayken_babyloader() {
		$this->__construct();
	}

	function update( $new_instance, $old_instance ) {
		return $new_instance;
	}

	function widget($args, $instance) {
		extract($args);
		
		echo $before_widget;
		
		$options = array();
		$options['duedate'] = $instance['duedate'] ? $instance['duedate'] : '';
		$options['gender'] = $instance['gender'] ? $instance['gender'] : '';
		
		echo $before_title . $instance['title'] . $after_title;
		$this->show_baby_loader($options);
		
		echo $after_widget;
	}
	
	function show_baby_loader($options) {
	?>
		<script>new BABY({ duedate: '<?php echo $options['duedate']; ?>', gender: '<?php echo $options['gender']; ?>' });</script>
	<?php
	}

	function form($instance) {
	?>
	<!-- Title -->
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php echo __( 'Title:', 'awayken_babyloader' ); ?></label><br />
			<input type="text" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php if ( isset( $instance['title'] ) ) { echo $instance['title']; } ?>" />
		</p>
		
	<!-- Due Date -->
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'duedate' ) ); ?>"><?php echo __( 'Baby\'s Due Date:', 'awayken_babyloader' ); ?></label><br />
			<input type="text" id="<?php echo esc_attr( $this->get_field_id( 'duedate' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'duedate' ) ); ?>" value="<?php if ( isset( $instance['duedate'] ) ) { echo $instance['duedate']; } ?>" />
		</p>
		
	<!-- Gender -->
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'gender' ) ); ?>"><?php echo __( 'Baby\'s Gender:', 'awayken_babyloader' ); ?></label><br />
			<select id="<?php echo esc_attr( $this->get_field_id( 'gender' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'gender' ) ); ?>">
				<option value=""<?php if ( isset( $instance['gender'] ) && $instance['gender'] === "" ) { ?> selected="selected"<?php } ?>>It's A Surprise!</option>
				<option value="boy"<?php if ( isset( $instance['gender'] ) && $instance['gender'] === "boy" ) { ?> selected="selected"<?php } ?>>It's A Boy!</option>
				<option value="girl"<?php if ( isset( $instance['gender'] ) && $instance['gender'] === "girl" ) { ?> selected="selected"<?php } ?>>It's A Girl!</option>
			</select>
		</p>
	<?php
	}
}

add_action( 'widgets_init', create_function( '', 'return register_widget(\'awayken_babyloader\');' ) );
?>
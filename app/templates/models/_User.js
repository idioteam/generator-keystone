const keystone = require('keystone');
const Types = keystone.Field.Types;
const Roles = require('keystone/lib/list/roles/list');
/**
 * <%= userModel %> Model
 * ==========
 */
const <%= userModel %> = new keystone.List('<%= userModel %>',{
	label: 'Utenti',
	singular: 'Utente',
	plural: 'Utente',
	ui_can_add: 'admin',
	ui_can_delete: 'admin',
	ui_can_edit: 'admin',
});

<%= userModel %>.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	role: { type: Types.Select, options: Roles },
});

// Provide access to Keystone
<%= userModel %>.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

<% if (includeBlog) { %>
/**
 * Relationships
 */
<%= userModel %>.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

<% } %>
/**
 * Registration
 */
<%= userModel %>.defaultColumns = 'name, email, isAdmin';
<%= userModel %>.register();

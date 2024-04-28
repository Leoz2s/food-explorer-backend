exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
  table.text("image");
  table.text("name");
  table.text("category");
  table.text("price");
  table.text("description");
});

exports.down = knex => knex.schema.dropTable("dishes");
